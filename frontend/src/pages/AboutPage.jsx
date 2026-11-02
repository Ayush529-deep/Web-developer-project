import { useState } from 'react'
import Fireflies from '../components/art/Fireflies'
import Traveller from '../components/art/Traveller'

const FIREFLY_AREA = [45, 10, 98, 85]

// Hero illustration: drop a png/jpg/webp into src/assets/about/ and it replaces the drawn wanderer
const HERO = Object.values(import.meta.glob('../assets/about/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' }))[0]

export default function AboutPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="about">
      {HERO ? (
        <div className="about-art about-art-image" aria-hidden="true">
          <img src={HERO} alt="" />
        </div>
      ) : (
        // no image yet: the wanderer under a full moon, in front of the ridge
        <div className="about-art" aria-hidden="true">
          <svg viewBox="0 0 800 700" preserveAspectRatio="xMidYMax meet">
            <defs>
              <radialGradient id="about-moon" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffe9c2" />
                <stop offset="60%" stopColor="#f6b98a" />
                <stop offset="100%" stopColor="#f6b98a" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="about-halo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#7b5cff" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#7b5cff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle className="glow" cx="470" cy="260" r="300" fill="url(#about-halo)" />
            <circle cx="470" cy="250" r="150" fill="url(#about-moon)" />
            <path d="M0 560 L140 430 L230 500 L360 350 L470 460 L590 380 L800 540 L800 700 L0 700 Z" fill="#241c63" />
            <path d="M0 620 L180 520 L320 590 L480 500 L640 580 L800 530 L800 700 L0 700 Z" fill="#17124a" />
            <g transform="translate(330 235) scale(1.05)">
              <Traveller />
            </g>
          </svg>
          <Fireflies seed={7} count={18} area={FIREFLY_AREA} />
        </div>
      )}

      <div className="about-copy">
        <h1 className="about-title intro">
          Welcome
          <br />
          to Notosan
        </h1>
        <p className="about-lead intro" style={{ '--delay': '0.15s' }}>
          Notosan is a community for travellers and nature lovers to share, learn and explore. It's a place to trade
          trail secrets, swap stories from the Noto peninsula and discover the quiet corners of Japan's wild coast.
        </p>

        <form className="about-form intro" style={{ '--delay': '0.3s' }} onSubmit={onSubmit}>
          <label className="about-field">
            <span aria-hidden="true">@</span>
            <input
              type="email"
              required
              placeholder="Email"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button type="submit" className="btn-accent">
            Get Early Access
          </button>
        </form>
        {sent && <p className="about-note">Thanks! We'll write to {email} soon.</p>}
      </div>
    </section>
  )
}
