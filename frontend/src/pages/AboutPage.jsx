import { useState } from 'react'
import deer from '../assets/scenes/deer-999.webp'
import forest from '../assets/scenes/forest.webp'
import tranquility from '../assets/scenes/tranquility.webp'
import express from '../assets/sections/express.webp'
import grow from '../assets/sections/grow.webp'
import Fireflies from '../components/art/Fireflies'
import Traveller from '../components/art/Traveller'

const FIREFLY_AREA = [45, 10, 98, 85]

// illustrated sections below the showcase, alternating art left / right
const FEATURES = [
  {
    title: 'Express yourself',
    text: "Notosan is a home for travellers and nature lovers. Gone are the days of scattered travel forums. Together we will create a welcoming place where you can share your latest trips, photos and discoveries.",
    art: express,
  },
  {
    title: 'Grow Your Knowledge',
    text: "What's your goal? Hiking? Wildlife photography? Camping? From trail safety to spotting the park's deer, we'll work with local guides to help you learn the secrets of the Noto peninsula.",
    art: grow,
    reverse: true,
  },
]

const SHOWCASE_TABS = ['Portfolio', 'Home Page']
const SITE_LINKS = ['Activity', 'Trails', 'Market', 'Jobs', 'Blogs', 'Events', 'Guides']
const PROFILE_TABS = ['Portfolio', 'Blog', 'Video', 'Store', 'Following', 'Followers']
const PHOTOS = [
  { src: forest, pos: '62% 70%', alt: 'A deer grazing below a waterfall' },
  { src: tranquility, pos: '72% 62%', alt: 'A traveller resting by the falls' },
  { src: deer, pos: 'center', alt: 'A sika deer looking up', cutout: true },
]

const MARKET_TABS = ['Jobs & Hires', 'Marketplace']
const LIST_TABS = ['Trending', 'Latest']
const PEOPLE = [
  { name: 'Hana Mori', meta: 'Trail Guide', src: forest, pos: '62% 70%' },
  { name: 'Kenji Sato', meta: 'Wildlife Photographer', src: deer, pos: 'center', cutout: true },
  { name: 'Aiko Tanaka', meta: 'Illustrator', src: express, pos: '50% 40%' },
  { name: 'Ren Ito', meta: '3D Map Maker', src: grow, pos: '50% 35%' },
  { name: 'Yui Kato', meta: 'Waterfall Tours', src: tranquility, pos: '30% 40%' },
  { name: 'Daichi Abe', meta: 'Camp Host', src: forest, pos: '20% 60%' },
  { name: 'Mei Ogawa', meta: 'Nature Writer', src: tranquility, pos: '72% 62%' },
  { name: 'Sora Fujii', meta: 'Bird Spotter', src: forest, pos: '85% 30%' },
]
const PRODUCTS = [
  { name: 'Falls at Dusk print', meta: '¥2,400', src: forest, pos: '70% 40%' },
  { name: 'Sika Deer sticker', meta: '¥400', src: deer, pos: 'center', cutout: true },
  { name: 'Sketchbook set', meta: '¥1,800', src: express, pos: '50% 40%' },
  { name: 'Trail map, 3D printed', meta: '¥3,200', src: grow, pos: '50% 35%' },
  { name: 'Guided falls walk', meta: '¥5,000', src: tranquility, pos: '30% 40%' },
  { name: 'Forest postcard pack', meta: '¥900', src: forest, pos: '20% 60%' },
  { name: 'Wanderer poster', meta: '¥2,000', src: tranquility, pos: '72% 62%' },
  { name: 'Night hike ticket', meta: '¥3,500', src: forest, pos: '85% 30%' },
]

// Hero illustration: drop a png/jpg/webp into src/assets/about/ and it replaces the drawn wanderer
const HERO = Object.values(import.meta.glob('../assets/about/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' }))[0]

// Email sign-up used by the hero and the campaign card (nothing is sent anywhere yet)
function EmailForm({ id, className = '', style, button }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <form id={id} className={`about-form ${className}`} style={style} onSubmit={onSubmit}>
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
          {button}
        </button>
      </form>
      {sent && <p className="about-note">Thanks! We'll write to {email} soon.</p>}
    </>
  )
}

export default function AboutPage() {
  return (
    <>
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

          <EmailForm id="early-access" className="intro" style={{ '--delay': '0.3s' }} button="Get Early Access" />
        </div>
      </section>

      <Community />

      {FEATURES.map((f) => (
        <section key={f.title} className={`feature ${f.reverse ? 'feature-reverse' : ''}`}>
          <div className="feature-copy">
            <h2 className="feature-title">{f.title}</h2>
            <p className="feature-text">{f.text}</p>
            <a href="#early-access" className="btn-ghost">
              Get Early Access
            </a>
          </div>
          <img className="feature-art" src={f.art} alt="" />
        </section>
      ))}

      <Marketplace />
      <Campaign />
      <AboutFooter />
    </>
  )
}

// A heading + text row, tabs, and a browser window previewing part of the site, with two colour blobs behind
function Showcase({ title, text, tabs, tab, onTab, flip, children }) {
  return (
    <section className={`community ${flip ? 'is-flipped' : ''}`}>
      <div className="community-head">
        <h2 className="community-title">{title}</h2>
        <p className="community-text">{text}</p>
      </div>

      <div className="showcase-tabs" role="tablist">
        {tabs.map((t) => (
          <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => onTab(t)}>
            {t}
          </button>
        ))}
      </div>

      <div className="showcase">
        <span className="blob blob-red" aria-hidden="true" />
        <span className="blob blob-teal" aria-hidden="true" />

        <div className="browser">
          <div className="browser-bar" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="mini-site">{children}</div>
        </div>
      </div>
    </section>
  )
}

function MiniNav({ active }) {
  return (
    <div className="mini-nav">
      <span className="logo">Notosan</span>
      <nav>
        {SITE_LINKS.map((l) => (
          <span key={l} className={l === active ? 'is-active' : undefined}>
            {l}
          </span>
        ))}
      </nav>
      <span className="mini-login">Log in</span>
    </div>
  )
}

// "Engage in the community": a member's profile or the site's home page
function Community() {
  const [tab, setTab] = useState(SHOWCASE_TABS[0])

  return (
    <Showcase
      title="Engage in the community"
      text="Our mission at Notosan is to give guides, photographers and nature lovers alike a space to showcase their trips, inspire others, discover hidden trails and share the park in a safe, friendly environment."
      tabs={SHOWCASE_TABS}
      tab={tab}
      onTab={setTab}
    >
      <MiniNav />
      {tab === 'Portfolio' ? (
        <>
          <div className="mini-profile">
            <div className="mini-avatar">
              <img src={tranquility} alt="" />
              <span className="mini-pro">PRO</span>
            </div>
            <h3>Hana Trails</h3>
            <div className="mini-tabs">
              {PROFILE_TABS.map((t, i) => (
                <span key={t} className={i === 0 ? 'is-active' : undefined}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="mini-grid">
            {PHOTOS.map((p) => (
              <img
                key={p.alt}
                src={p.src}
                alt={p.alt}
                className={p.cutout ? 'is-cutout' : undefined}
                style={{ objectPosition: p.pos }}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="mini-home" style={{ backgroundImage: `url(${tranquility})` }}>
          <h3>Discover Noto</h3>
          <p>Waterfalls, wild deer and quiet trails, shared by the people who walk them.</p>
          <span className="btn-accent">Join the community</span>
        </div>
      )}
    </Showcase>
  )
}

// "Have Fun. Make Money.": the jobs board or the marketplace
function Marketplace() {
  const [tab, setTab] = useState(MARKET_TABS[0])
  const [list, setList] = useState(LIST_TABS[0])
  const jobs = tab === MARKET_TABS[0]
  const items = jobs ? PEOPLE : PRODUCTS

  return (
    <Showcase
      title={
        <>
          Have Fun.
          <br />
          Make Money.
        </>
      }
      text="Notosan will help you sell prints, guided tours and handmade goods to travellers from around the world. Together we will connect guides, makers, local businesses and events with everyone who loves the Noto peninsula."
      tabs={MARKET_TABS}
      tab={tab}
      onTab={setTab}
      flip
    >
      <MiniNav active={jobs ? 'Jobs' : 'Market'} />
      <div className="mini-board">
        <h3>{tab}</h3>
        <label className="mini-search">
          <input type="search" placeholder="Search" aria-label={`Search ${tab}`} />
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4 4" />
          </svg>
        </label>
        <div className="mini-tabs">
          {LIST_TABS.map((t) => (
            <button
              key={t}
              type="button"
              className={t === list ? 'is-active' : undefined}
              aria-pressed={t === list}
              onClick={() => setList(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="mini-cards">
        {(list === LIST_TABS[0] ? items : [...items].reverse()).map((c) => (
          <article key={c.name} className="mini-card">
            <img src={c.src} alt="" style={{ objectPosition: c.pos }} className={c.cutout ? 'is-cutout' : undefined} />
            <div>
              <h4>{c.name}</h4>
              <p>{c.meta}</p>
            </div>
          </article>
        ))}
      </div>
    </Showcase>
  )
}

function MountainIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M4 40 L18 16 L26 28 L31 21 L44 40 Z" />
      <circle cx="35" cy="11" r="4" />
    </svg>
  )
}

// Founding-members campaign card with its own sign-up
function Campaign() {
  return (
    <section className="campaign">
      <div className="campaign-card">
        <span className="campaign-icon">
          <MountainIcon />
        </span>
        <h2>Founding Members Campaign</h2>
        <p>
          To help realise our dream, we are asking travellers and nature lovers everywhere to help us build this
          community. In spring we will open a founding members campaign to fund the trails, guides and events of the
          new platform. If you'd like to support it or get early access, please sign up with your email below.
        </p>
        <EmailForm className="campaign-form" button="Join List & Get Early Access" />
      </div>
    </section>
  )
}

const FOOTER_LINKS = ['FAQ', 'Privacy Policy', 'Terms of Service', 'Press']
const SOCIAL = [
  {
    label: 'Instagram',
    d: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM17.5 6.5h.01',
  },
  { label: 'Facebook', d: 'M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zM13.5 21v-9a2.5 2.5 0 0 1 2.5-2.5h1M10.5 13.5h5' },
  { label: 'YouTube', d: 'M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zM10 9l5 3-5 3z' },
  { label: 'Blog', d: 'M4 5h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4zM20 5h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6z' },
]

// The About page's own footer: logo, links and social icons, centred
function AboutFooter() {
  return (
    <footer id="contact" className="about-footer">
      <span className="about-footer-logo">
        <MountainIcon />
        Notosan
      </span>
      <nav className="about-footer-links">
        {FOOTER_LINKS.map((l) => (
          <a key={l} href="/#contact">
            {l}
          </a>
        ))}
      </nav>
      <div className="about-footer-social">
        {SOCIAL.map((s) => (
          <a key={s.label} href="/#contact" aria-label={s.label}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={s.d} />
            </svg>
          </a>
        ))}
      </div>
    </footer>
  )
}
