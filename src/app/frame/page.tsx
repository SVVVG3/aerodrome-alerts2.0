import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aerodrome Alerts',
  description: 'Monitor your Aerodrome positions and get alerts when they go out of range',
  openGraph: {
    title: 'Aerodrome Alerts',
    description: 'Monitor your Aerodrome positions and get alerts when they go out of range',
    images: ['https://aerodrome-alerts.netlify.app/images/aerodrome-alerts.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://aerodrome-alerts.netlify.app/images/aerodrome-alerts.png',
    'fc:frame:button:1': 'View Positions',
    'fc:frame:button:2': 'Settings',
    'fc:frame:post_url': 'https://aerodrome-alerts.netlify.app/api/frame',
  },
}

export default function FramePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Aerodrome Alerts</h1>
      <p className="text-center mb-4">Monitor your Aerodrome positions and get alerts when they go out of range</p>
      <img 
        src="/images/aerodrome-alerts.png" 
        alt="Aerodrome Alerts" 
        className="max-w-md w-full"
      />
    </div>
  )
} 