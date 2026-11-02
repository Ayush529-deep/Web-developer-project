import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import useParallax from './hooks/useParallax'
import AboutPage from './pages/AboutPage'
import BiodiversityScene from './scenes/BiodiversityScene'
import JourneyScene from './scenes/JourneyScene'

function Home() {
  useParallax()

  // Sections render after page load, so jump to a #hash link ourselves
  useEffect(() => {
    if (!window.location.hash) return
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' })
  }, [])

  return (
    <>
      <JourneyScene />
      <BiodiversityScene />
    </>
  )
}

export default function App() {
  // the About page draws its own footer
  const onAbout = useLocation().pathname === '/about'

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      {!onAbout && (
        <footer id="contact" className="footer">
          <span className="logo">Notosan</span>
          <span>Noto Nature Park · Ishikawa, Japan</span>
          <span>© Notosan</span>
        </footer>
      )}
    </>
  )
}
