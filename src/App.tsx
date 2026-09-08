import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import Plan from './pages/Plan'
import ListingPage from './pages/ListingPage'
import NotFound from './pages/NotFound'
import { PLAN_SLUG } from './data/plan'

/**
 * Las rutas son exactamente las del sitio original. `:slug` cubre los 21
 * listados (12 meses + 9 de promesas) desde los datos, sin una página por
 * cada uno; los slugs desconocidos caen en la 404.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={PLAN_SLUG} element={<Plan />} />
        <Route path=":slug" element={<ListingPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
