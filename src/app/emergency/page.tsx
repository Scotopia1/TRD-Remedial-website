import { permanentRedirect } from 'next/navigation'

export default function EmergencyPage() {
  permanentRedirect('/contact')
}
