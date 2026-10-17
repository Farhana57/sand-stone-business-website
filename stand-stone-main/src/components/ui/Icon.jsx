import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  Building2,
  Calculator,
  CheckCircle2,
  ChevronDown,
  Clock,
  Copy,
  Eye,
  FileText,
  Layers,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mountain,
  Package,
  Percent,
  Phone,
  Scale,
  Send,
  Shield,
  Star,
  Truck,
  Wallet,
  X,
} from 'lucide-react'

/** Names used by the data files (company.guarantees, services, values...). */
const registry = {
  alert: AlertCircle,
  arrowRight: ArrowRight,
  badge: BadgeCheck,
  bricks: Building2,
  calculate: Calculator,
  check: CheckCircle2,
  chevronDown: ChevronDown,
  clock: Clock,
  copy: Copy,
  document: FileText,
  eye: Eye,
  layers: Layers,
  loader: Loader2,
  mail: Mail,
  mapPin: MapPin,
  menu: Menu,
  message: MessageCircle,
  mountain: Mountain,
  package: Package,
  percent: Percent,
  phone: Phone,
  scale: Scale,
  send: Send,
  shield: Shield,
  star: Star,
  truck: Truck,
  wallet: Wallet,
  x: X,
}

/**
 * Renders a Lucide icon by name so content files can stay plain data.
 * Falls back to `Mountains`-style generic mark when a name is unknown.
 */
export function Icon({ name, ...props }) {
  const Component = registry[name] ?? Mountain
  return <Component aria-hidden="true" {...props} />
}

export default Icon
