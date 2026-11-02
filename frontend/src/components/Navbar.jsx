import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const LINKS = [
  { href: '/#biodiversity', label: 'Community' },
  { to: '/about', label: 'About' },
  { href: '#contact', label: 'Support' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 40)
  const [open, setOpen] = useState(false)
  const onAbout = useLocation().pathname === '/about'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''} ${onAbout ? 'nav-about' : ''}`}>
      <div className="nav-inner">
        <a href="/#top" className="logo" onClick={close}>
          Notosan
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>

        <nav className="nav-links">
          {LINKS.map((l) =>
            l.to ? (
              <Link key={l.label} to={l.to} onClick={close}>
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} onClick={close}>
                {l.label}
              </a>
            ),
          )}
          <button type="button" className="btn-outline" onClick={close}>
            Register
          </button>
        </nav>
      </div>
    </header>
  )
}
