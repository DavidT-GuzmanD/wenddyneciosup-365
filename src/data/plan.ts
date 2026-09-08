import routesJson from './routes.json'

/** Una lámina diaria: imagen del devocional y sus enlaces de audio y video. */
export interface Card {
  img: string
  yt: string | null
  sp: string | null
  link: string | null
}

interface RawRoute {
  title: string
  cards: Card[]
}

const RAW = routesJson as Record<string, RawRoute>

export type ListingKind = 'mes' | 'promesas'

/** Una ruta de listado. `slug` es el mismo del sitio original y no debe cambiar. */
export interface Listing {
  slug: string
  name: string
  num: string
  kind: ListingKind
}

export const PLAN_SLUG = 'la-biblia-en-365-dias'

/**
 * Los slugs heredados de WordPress se conservan tal cual, aunque no coincidan
 * con el mes que muestran: `mayo-2` es junio, `agosto-2` es agosto y `agosto`
 * es setiembre. Cambiarlos rompería enlaces y posicionamiento ya ganados.
 */
export const MONTHS: Listing[] = [
  { slug: 'enero', name: 'Enero', num: '01', kind: 'mes' },
  { slug: 'febrero', name: 'Febrero', num: '02', kind: 'mes' },
  { slug: 'marzo', name: 'Marzo', num: '03', kind: 'mes' },
  { slug: 'abril', name: 'Abril', num: '04', kind: 'mes' },
  { slug: 'mayo', name: 'Mayo', num: '05', kind: 'mes' },
  { slug: 'mayo-2', name: 'Junio', num: '06', kind: 'mes' },
  { slug: 'julio', name: 'Julio', num: '07', kind: 'mes' },
  { slug: 'agosto-2', name: 'Agosto', num: '08', kind: 'mes' },
  { slug: 'agosto', name: 'Setiembre', num: '09', kind: 'mes' },
  { slug: 'octubre', name: 'Octubre', num: '10', kind: 'mes' },
  { slug: 'noviembre', name: 'Noviembre', num: '11', kind: 'mes' },
  { slug: 'diciembre', name: 'Diciembre', num: '12', kind: 'mes' },
]

export const PROMESAS: Listing[] = [
  { slug: 'promesas-enero', name: 'Enero', num: '01', kind: 'promesas' },
  { slug: 'promesas-febrero', name: 'Febrero', num: '02', kind: 'promesas' },
  { slug: 'promesas-marzo', name: 'Marzo', num: '03', kind: 'promesas' },
  { slug: 'promesas-abril', name: 'Abril', num: '04', kind: 'promesas' },
  { slug: 'promesas-mayo', name: 'Mayo', num: '05', kind: 'promesas' },
  { slug: 'promesas-junio', name: 'Junio', num: '06', kind: 'promesas' },
  { slug: 'promesas-julio', name: 'Julio', num: '07', kind: 'promesas' },
  { slug: 'promesas-agosto', name: 'Agosto', num: '08', kind: 'promesas' },
  { slug: 'promesas-setiembre', name: 'Setiembre', num: '09', kind: 'promesas' },
]

export const LISTINGS: Listing[] = [...MONTHS, ...PROMESAS]

const BY_SLUG = new Map(LISTINGS.map((l) => [l.slug, l]))
const MONTH_BY_NUM = new Map(MONTHS.map((m) => [m.num, m]))
const PROMESA_BY_NUM = new Map(PROMESAS.map((p) => [p.num, p]))

/** Devuelve la variante en grande de una imagen de WordPress. */
export const bigImage = (url: string): string =>
  url.replace(/-\d+x\d+(\.(?:jpg|jpeg|png))$/i, '$1')

/** Las 12 portadas del plan, indexadas por número de mes. */
export const COVERS: Record<string, string> = Object.fromEntries(
  (RAW[PLAN_SLUG]?.cards ?? []).map((card, i) => [MONTHS[i]!.num, bigImage(card.img)]),
)

export const planCovers = (): { month: Listing; cover: string }[] =>
  MONTHS.map((month) => ({ month, cover: COVERS[month.num] ?? '' }))

export const getListing = (slug: string | undefined): Listing | undefined =>
  slug ? BY_SLUG.get(slug) : undefined

export const getCards = (slug: string): Card[] => RAW[slug]?.cards ?? []

/** Vecinos dentro de su propia serie, para la paginación anterior/siguiente. */
export function getNeighbours(listing: Listing): { prev?: Listing; next?: Listing } {
  const series = listing.kind === 'mes' ? MONTHS : PROMESAS
  const i = series.findIndex((l) => l.slug === listing.slug)
  return { prev: series[i - 1], next: series[i + 1] }
}

/** El listado equivalente del otro tipo para el mismo mes, si existe. */
export const getCounterpart = (listing: Listing): Listing | undefined =>
  listing.kind === 'mes' ? PROMESA_BY_NUM.get(listing.num) : MONTH_BY_NUM.get(listing.num)

export const seriesLabel = (kind: ListingKind): string =>
  kind === 'promesas' ? '365 promesas' : 'La Biblia en 365 días'

export const unitLabel = (kind: ListingKind, n: number): string =>
  kind === 'promesas' ? (n === 1 ? 'promesa' : 'promesas') : n === 1 ? 'devocional' : 'devocionales'
