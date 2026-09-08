import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { SplitText } from '../components/SplitText'
import { MonthSwitcher } from '../components/inner/MonthSwitcher'
import { DayCard } from '../components/inner/DayCard'
import { Lightbox } from '../components/inner/Lightbox'
import { PlatformStrip } from '../components/inner/PlatformStrip'
import NotFound from './NotFound'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { PLATFORMS } from '../data/site'
import {
  bigImage,
  getCards,
  getCounterpart,
  getListing,
  getNeighbours,
  MONTHS,
  PLAN_SLUG,
  PROMESAS,
  seriesLabel,
  unitLabel,
  COVERS,
} from '../data/plan'
import { prefersReducedMotion, scrollOffset } from '../lib/scroll'

/** Un mes de devocionales o de promesas. La ruta es la misma del sitio original. */
export default function ListingPage() {
  const { slug = '' } = useParams()
  const listing = getListing(slug)
  const [query, setQuery] = useState('')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const cards = useMemo(() => (listing ? getCards(listing.slug) : []), [listing])
  const images = useMemo(
    () =>
      cards.map((c, i) => ({
        src: bigImage(c.img),
        alt: `${listing?.kind === 'promesas' ? 'Promesa' : 'Devocional'} ${i + 1}`,
      })),
    [cards, listing],
  )

  useDocumentMeta(
    listing
      ? `${listing.kind === 'promesas' ? `Promesas de ${listing.name.toLowerCase()}` : listing.name} · ${seriesLabel(listing.kind)} — Wenddy Neciosup`
      : 'Página no encontrada — Wenddy Neciosup',
    listing
      ? `${cards.length} ${unitLabel(listing.kind, cards.length)} de ${listing.name.toLowerCase()} del plan «${seriesLabel(listing.kind)}» de Wenddy Neciosup, con audio en Spotify y video en YouTube.`
      : undefined,
  )

  if (!listing) return <NotFound />

  const isPromesas = listing.kind === 'promesas'
  const title = isPromesas ? `Promesas de ${listing.name.toLowerCase()}` : listing.name
  const series = isPromesas ? PROMESAS : MONTHS
  const { prev, next } = getNeighbours(listing)
  const counterpart = getCounterpart(listing)
  const cover = isPromesas ? undefined : COVERS[listing.num]

  const wanted = query.trim() ? parseInt(query, 10) : null
  const isHidden = (i: number) => wanted !== null && i + 1 !== wanted
  const noMatch = wanted !== null && (wanted < 1 || wanted > cards.length)

  const onFind = (value: string) => {
    setQuery(value)
    const n = parseInt(value, 10)
    if (!value.trim() || Number.isNaN(n) || n < 1 || n > cards.length) return
    requestAnimationFrame(() => {
      const el = document.querySelector<HTMLElement>('.day:not([hidden])')
      if (!el) return
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - scrollOffset(24),
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      })
    })
  }

  return (
    <>
      <section className={isPromesas ? 'phero phero--gold' : 'phero'}>
        <div className="phero__bg" aria-hidden="true">
          <span className="blob blob--1" />
          <span className="blob blob--2" />
        </div>

        <div className="wrap phero__in">
          <div>
            <nav className="crumbs" aria-label="Ruta">
              <Link to="/">Inicio</Link>
              <span>/</span>
              <Link to={`/${PLAN_SLUG}/`}>{seriesLabel(listing.kind)}</Link>
              <span>/</span>
              <b>{title}</b>
            </nav>

            <SplitText as="h1" className="phero__h1">
              {title}
            </SplitText>

            <Reveal as="p" className="phero__lede" d={1}>
              {cards.length} {unitLabel(listing.kind, cards.length)} para escuchar o ver, uno por
              día. Toca una portada para ampliarla.
            </Reveal>

            <Reveal className="phero__act" d={2}>
              <div className="finder">
                <label htmlFor="find">Ir al día</label>
                <input
                  id="find"
                  type="number"
                  min={1}
                  max={cards.length}
                  inputMode="numeric"
                  placeholder={`1–${cards.length}`}
                  value={query}
                  onChange={(e) => onFind(e.target.value)}
                />
              </div>

              {counterpart && (
                <Link className="btn btn--ghost" to={`/${counterpart.slug}/`}>
                  <Icon name={isPromesas ? 'calendar' : 'sparkle'} />
                  <span>
                    {isPromesas ? 'Devocionales' : 'Promesas'} de {listing.name.toLowerCase()}
                  </span>
                </Link>
              )}
            </Reveal>
          </div>

          {cover && (
            <Reveal
              as="img"
              className="phero__cover"
              src={cover}
              alt={`Portada de ${listing.name}`}
              data-parallax="-0.05"
            />
          )}
        </div>
      </section>

      <MonthSwitcher items={series} current={listing.slug} />

      <section className="sec sec--days">
        <div className="wrap">
          {noMatch && <p className="days__empty">No hay ningún día con ese número.</p>}

          <div className="days">
            {cards.map((card, i) => (
              <DayCard
                key={`${listing.slug}-${i}`}
                card={card}
                n={i + 1}
                index={i}
                alt={`${isPromesas ? 'Promesa' : 'Devocional'} ${i + 1} de ${listing.name.toLowerCase()}`}
                hidden={isHidden(i)}
                onOpen={() => setLightbox(i)}
              />
            ))}
          </div>

          <nav className="pager">
            {prev ? (
              <Link className="pager__l" to={`/${prev.slug}/`}>
                <Icon name="chevron" className="ico--l" />
                <span>
                  <em>Anterior</em>
                  <b>{prev.name}</b>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link className="pager__r" to={`/${next.slug}/`}>
                <span>
                  <em>Siguiente</em>
                  <b>{next.name}</b>
                </span>
                <Icon name="chevron" className="ico--r" />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </section>

      <PlatformStrip
        text="Escucha el devocional completo cada día en tu plataforma favorita."
        platforms={PLATFORMS.slice(0, 3)}
      />

      <Lightbox images={images} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />
    </>
  )
}
