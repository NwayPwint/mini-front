import iconMap from '../../utils/iconMap'

interface DynamicIconProps {
  name?: string
  size?: number
  strokeWidth?: number
  className?: string
}

export default function DynamicIcon({
  name,
  size = 20,
  strokeWidth = 1.5,
  className,
}: DynamicIconProps) {
  if (!name) return null
  const Icon = iconMap[name]
  if (!Icon) return null
  return <Icon size={size} strokeWidth={strokeWidth} className={className} />
}
