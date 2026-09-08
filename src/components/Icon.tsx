export const ICON_NAMES = [
  'spotify',
  'youtube',
  'apple',
  'amazon',
  'instagram',
  'facebook',
  'paypal',
  'play',
  'pause',
  'arrow',
  'download',
  'mail',
  'copy',
  'check',
  'book',
  'sparkle',
  'heart',
  'calendar',
  'headphones',
  'award',
  'quote',
  'chevron',
  'globe',
  'pin',
] as const

export type IconName = (typeof ICON_NAMES)[number]

interface IconProps {
  name: IconName
  className?: string
}

/** Un icono del sprite. `className` se añade a la clase base `.ico`. */
export function Icon({ name, className }: IconProps) {
  return (
    <svg className={className ? `ico ${className}` : 'ico'} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  )
}
