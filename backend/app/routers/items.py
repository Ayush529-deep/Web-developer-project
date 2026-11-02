from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app import models, schemas
from app.database import get_db
from app.security import get_current_user

router = APIRouter(prefix="/items", tags=["items"])


def get_own_item(item_id: int, db: Session, user: models.User) -> models.Item:
    item = db.get(models.Item, item_id)
    if not item or item.owner_id != user.id:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@router.get("/", response_model=list[schemas.ItemOut])
def list_items(db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    return db.scalars(
        select(models.Item).where(models.Item.owner_id == user.id).order_by(models.Item.id.desc())
    ).all()


@router.post("/", response_model=schemas.ItemOut, status_code=status.HTTP_201_CREATED)
def create_item(
    item_in: schemas.ItemCreate,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    item = models.Item(**item_in.model_dump(), owner_id=user.id)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.get("/{item_id}", response_model=schemas.ItemOut)
def get_item(item_id: int, db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    return get_own_item(item_id, db, user)


@router.put("/{item_id}", response_model=schemas.ItemOut)
def update_item(
    item_id: int,
    item_in: schemas.ItemUpdate,
    db: Session = Depends(get_db),
    user: models.User = Depends(get_current_user),
):
    item = get_own_item(item_id, db, user)
    for field, value in item_in.model_dump(exclude_unset=True).items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item(item_id: int, db: Session = Depends(get_db), user: models.User = Depends(get_current_user)):
    item = get_own_item(item_id, db, user)
    db.delete(item)
    db.commit()
