import { Hero } from '../components/home/Hero'
import { Marquee } from '../components/home/Marquee'
import { Stats } from '../components/home/Stats'
import { BookSection } from '../components/home/BookSection'
import { Sample } from '../components/home/Sample'
import { Testimonials } from '../components/home/Testimonials'
import { Digital } from '../components/home/Digital'
import { Podcast } from '../components/home/Podcast'
import { Reto } from '../components/home/Reto'
import { Autora } from '../components/home/Autora'
import { Apoyo } from '../components/home/Apoyo'
import { CtaFinal } from '../components/home/CtaFinal'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function Home() {
  useDocumentMeta(
    'Wenddy Neciosup — 40 días de amistad con Dios · #365conDios',
    'Devocionales diarios, libros y podcast de Wenddy Neciosup. «40 días de amistad con Dios» y «365 con Dios»: inspiración para caminar con Dios un día a la vez.',
  )

  return (
    <>
      <Hero />
      <Marquee />
      <Stats />
      <BookSection />
      <Sample />
      <Testimonials />
      <Digital />
      <Podcast />
      <Reto />
      <Autora />
      <Apoyo />
      <CtaFinal />
    </>
  )
}
