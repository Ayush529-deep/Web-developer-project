import logging

from sqlalchemy import or_, select

from app import models
from app.config import ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_USERNAME
from app.database import SessionLocal
from app.security import hash_password

logger = logging.getLogger("uvicorn.error")


def seed_admin() -> None:
    """Create the default admin from .env if it doesn't exist. Never overwrites an existing user."""
    if not ADMIN_USERNAME or not ADMIN_PASSWORD:
        logger.info("ADMIN_USERNAME/ADMIN_PASSWORD not set, skipping admin seed")
        return
    if not 6 <= len(ADMIN_PASSWORD) <= 72:
        logger.warning("ADMIN_PASSWORD must be 6-72 characters, skipping admin seed")
        return

    email = ADMIN_EMAIL or f"{ADMIN_USERNAME}@example.com"
    with SessionLocal() as db:
        existing = db.scalar(
            select(models.User).where(
                or_(models.User.username == ADMIN_USERNAME, models.User.email == email)
            )
        )
        if existing:
            return

        db.add(
            models.User(
                username=ADMIN_USERNAME,
                email=email,
                hashed_password=hash_password(ADMIN_PASSWORD),
            )
        )
        db.commit()
        logger.info("Seeded default admin user '%s'", ADMIN_USERNAME)
