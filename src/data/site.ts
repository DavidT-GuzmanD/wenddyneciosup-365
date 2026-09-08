import type { IconName } from '../components/Icon'

export const EMAIL = 'wen.neciosup@gmail.com'

export const LINKS = {
  spotify: 'https://open.spotify.com/show/6WmA7TTxcGMUM7Kp4abXVx',
  youtube: 'https://www.youtube.com/@WenddyNeciosup',
  youtubePlaylist: 'https://www.youtube.com/playlist?list=PLYkJP2_zxCIoVz6dP3OEFuD_2yxP1--dp',
  apple: 'https://podcasts.apple.com/pe/podcast/365-con-dios/id1546917854',
  instagram: 'https://www.instagram.com/wenddyneciosup/',
  facebook: 'https://www.facebook.com/wenddyneciosupm',
  amazon40: 'https://www.amazon.com/-/es/Wenddy-Neciosup-ebook/dp/B07NTW74YR/',
  amazon365: 'https://www.amazon.com/-/es/Wenddy-Neciosup-ebook/dp/B0BNY7Z4Z5/',
  paypal: 'https://paypal.me/wenddyneciosup?country.x=PE&locale.x=es_XC',
  westernUnion: 'https://www.westernunion.com/pe/es/home.html',
  certificado: 'https://wenddyneciosup.com/wp-content/uploads/2025/12/CERTIFICADO-365-.pdf',
  audioSample: '/assets/audio/proverbios3.mp3',
} as const

export interface NavItem {
  label: string
  hash: string
}

export const NAV: NavItem[] = [
  { label: 'El libro', hash: '#libro' },
  { label: '365 con Dios', hash: '#digital' },
  { label: 'Podcast', hash: '#podcast' },
  { label: 'Reto 365', hash: '#reto' },
  { label: 'Autora', hash: '#autora' },
  { label: 'Apoyar', hash: '#apoyo' },
]

export const DRAWER_NAV: { n: string; label: string; hash: string }[] = [
  { n: '01', label: 'El libro', hash: '#libro' },
  { n: '02', label: 'Muestra de un día', hash: '#muestra' },
  { n: '03', label: '365 con Dios', hash: '#digital' },
  { n: '04', label: 'Podcast', hash: '#podcast' },
  { n: '05', label: 'Reto 365', hash: '#reto' },
  { n: '06', label: 'La autora', hash: '#autora' },
  { n: '07', label: 'Apoyar', hash: '#apoyo' },
]

export interface Platform {
  icon: IconName
  modifier: string
  eyebrow: string
  name: string
  href: string
}

export const PLATFORMS: Platform[] = [
  { icon: 'spotify', modifier: 'spotify', eyebrow: 'Escúchalo en', name: 'Spotify', href: LINKS.spotify },
  { icon: 'youtube', modifier: 'yt', eyebrow: 'Míralo en', name: 'YouTube', href: LINKS.youtubePlaylist },
  { icon: 'apple', modifier: 'apple', eyebrow: 'Suscríbete en', name: 'Apple Podcasts', href: LINKS.apple },
  { icon: 'amazon', modifier: 'amazon', eyebrow: 'También en', name: 'Amazon Music', href: LINKS.amazon365 },
]

export interface Social {
  icon: IconName
  modifier: string
  label: string
  href: string
}

export const SOCIALS: Social[] = [
  { icon: 'facebook', modifier: 'fb', label: 'Facebook', href: LINKS.facebook },
  { icon: 'instagram', modifier: 'ig', label: 'Instagram', href: LINKS.instagram },
  { icon: 'youtube', modifier: 'yt', label: 'YouTube', href: LINKS.youtube },
  { icon: 'spotify', modifier: 'sp', label: 'Spotify', href: LINKS.spotify },
  { icon: 'apple', modifier: 'ap', label: 'Apple Podcasts', href: LINKS.apple },
  { icon: 'amazon', modifier: 'am', label: 'Amazon', href: LINKS.amazon365 },
]

export interface Stat {
  value: number
  prefix?: string
  suffix?: string
  label: string
}

export const STATS: Stat[] = [
  { value: 365, label: 'devocionales al año' },
  { value: 40, label: 'días en el libro impreso' },
  { value: 15, suffix: '+', label: 'años inspirando' },
  { value: 1, prefix: '#', label: 'en podcasts cristianos' },
]

export interface Feature {
  icon: IconName
  title: string
  text: string
}

export const BOOK_FEATURES: Feature[] = [
  { icon: 'book', title: 'Espacios para tus notas', text: 'Escribe lo que Dios te habla cada día.' },
  { icon: 'sparkle', title: 'Contenido inspiracional', text: 'Una idea poderosa por devocional.' },
  { icon: 'heart', title: 'Lecturas bíblicas', text: 'Pasajes seleccionados para profundizar.' },
]

export const DIGITAL_FEATURES: Feature[] = [
  {
    icon: 'calendar',
    title: 'Devocionales diarios',
    text: 'Reflexiones breves y poderosas que te llevarán a un viaje espiritual de 365 días, acompañado por la sabiduría bíblica.',
  },
  {
    icon: 'book',
    title: 'Pasajes bíblicos',
    text: 'Versículos cuidadosamente seleccionados que complementan cada devoción, en la versión Nueva Biblia Viva (NBV).',
  },
  {
    icon: 'sparkle',
    title: 'Inspiración continua',
    text: 'Orientación, fortaleza y consuelo mientras te sumerges en la presencia de Dios. Tu compañero constante todo el año.',
  },
]

export interface Testimonial {
  quote: string
  name: string
  role: string
  photo: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Doy infinitas gracias a Dios por este libro devocional de 40 días de amistad con Dios, que será un compañero infaltable en este nuevo año para que nuestra relación con Dios no decaiga. Como dice su brillante autora: «cuando pierdes la comunión con Dios pierdes la esperanza, pierdes la fe».',
    name: 'Mirta Hornung',
    role: 'Fundadora de Comunidad Cristiana Agua Viva',
    photo: '/assets/img/t-mirta.png',
  },
  {
    quote:
      'Nada puede ser mejor que pasar la vida junto al Señor, y este devocional te permitirá disfrutar 40 días de reflexiones que te ayudarán a conocerlo mejor y a mirarte en los ojos de su amor y el espejo de su palabra. ¡Gracias Wenddy por este aporte sensacional!',
    name: 'Lucas y Valeria Leys',
    role: 'Fundadores de Instituto625.com',
    photo: '/assets/img/t-lucas.png',
  },
  {
    quote:
      'Leer la Palabra de Dios es una cosa, aplicarla es otra. Aquí un libro práctico y peligroso que te ayudará a pensar mejores decisiones espirituales. La puesta en marcha la haces un día a la vez. ¡Gracias Wenddy por inspirarnos con tu ejemplo!',
    name: 'Howard Andruejol',
    role: 'Director de Instituto625.com',
    photo: '/assets/img/t-howard.png',
  },
  {
    quote:
      'Wenddy es una apasionada por Dios, y su amistad con Él le ha permitido afirmar cada paso que da en su vida. Desde los 13 años, su búsqueda incansable por la Presencia de Dios la ha llevado a experimentar una emocionante vida de fe. Gracias Wenddy por compartir este regalo. Te amamos.',
    name: 'José y Ángela Neciosup',
    role: 'Pastores en C.C. Agua Viva · Padres de Wenddy',
    photo: '/assets/img/t-neciosup.png',
  },
  {
    quote:
      'Mi sobrina Wenddy escribió 40 días de amistad con Dios. Amo a mi querida sobrina y sé de lo mucho que ella también ama a nuestro Señor Jesucristo. Le ruego a nuestro Dios para que ustedes todos sean muy bendecidos con su poderoso amor al leer este libro.',
    name: 'Alex Acuña',
    role: 'Reconocido músico internacional',
    photo: '/assets/img/t-acuna.png',
  },
  {
    quote:
      'Siempre has tenido esa hermosa sonrisa, una palabra de aliento en el momento oportuno, una impresionante pasión por Dios y una fe genuina. 40 días de amistad con Dios es un libro que, con un lenguaje claro y sencillo, inspira, alienta, ministra y revela más del corazón del Padre.',
    name: 'Nereida Silva',
    role: 'Pastora MCI Paraguay',
    photo: '/assets/img/t-nereida.png',
  },
]

export interface Milestone {
  year: string
  title: string
  text: string
}

export const TIMELINE: Milestone[] = [
  { year: '2010', title: 'Nace el blog', text: 'Abre wenddyneciosup.com y empieza a escribir.' },
  { year: '2012', title: 'Premio Águila', text: '«Mejor blog por excelencia en los medios de comunicación».' },
  { year: '2017', title: '365 con Dios', text: 'Su primer libro digital: un devocional para los 365 días del año.' },
  {
    year: '2019',
    title: '40 días de amistad con Dios',
    text: 'Recopila los 40 mejores devocionales en su primer libro impreso.',
  },
  {
    year: '2021',
    title: 'El podcast',
    text: 'Uno de los podcasts cristianos más escuchados de Iberoamérica: primeros puestos en Colombia, Perú, Costa Rica y España.',
  },
]

export const BADGES = [
  { src: '/assets/img/badge-aguila.png', alt: 'Premio Águila' },
  { src: '/assets/img/badge-365.png', alt: '365 con Dios' },
  { src: '/assets/img/badge-40dias.png', alt: '40 días de amistad con Dios' },
]
