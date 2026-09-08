import { useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import IconSprite from './IconSprite'
import { Header } from './Header'
import { Drawer } from './Drawer'
import { Footer } from './Footer'
import { Preloader } from './Preloader'
import { CursorGlow } from './CursorGlow'
import { BackToTop } from './BackToTop'
import { useScrollEffects } from '../hooks/useScrollEffects'
import { scrollToId } from '../lib/scroll'

/**
 * Lleva la vista al sitio correcto en cada navegación: al elemento del hash
 * (reintentando hasta que la página nueva termine de montarse) o al principio.
 */
function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }
    let tries = 0
    let raf = 0
    const attempt = () => {
      if (scrollToId(hash) || tries++ > 40) return
      raf = requestAnimationFrame(attempt)
    }
    attempt()
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash, key])

  return null
}

export function Layout() {
  const { pathname } = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)
  // Las capas con parallax cambian en cada ruta: el efecto se vuelve a enganchar.
  const { progress, stuck, hidden, showTop } = useScrollEffects([pathname])

  useEffect(() => setDrawerOpen(false), [pathname])

  const toggleDrawer = useCallback(() => setDrawerOpen((v) => !v), [])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  return (
    <>
      <IconSprite />
      <Preloader />
      <div className="progress" style={{ width: `${progress * 100}%` }} aria-hidden="true" />
      <CursorGlow />

      <Header
        stuck={stuck}
        hidden={hidden}
        drawerOpen={drawerOpen}
        onToggleDrawer={toggleDrawer}
      />
      <Drawer open={drawerOpen} onClose={closeDrawer} />

      <ScrollManager />
      <main>
        <Outlet />
      </main>

      <Footer />
      <BackToTop visible={showTop} />
    </>
  )
}
