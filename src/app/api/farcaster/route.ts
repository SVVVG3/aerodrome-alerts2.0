import { NextResponse } from 'next/server'

export async function GET() {
  const farcasterJson = {
    name: "Aerodrome Alerts",
    description: "Monitor your Aerodrome positions and get alerts when they go out of range",
    image: "https://aerodrome-alerts.netlify.app/images/aerodrome-alerts.png",
    external_url: "https://aerodrome-alerts.netlify.app",
    frames: {
      version: "vNext",
      image: "https://aerodrome-alerts.netlify.app/images/aerodrome-alerts.png",
      buttons: [
        {
          label: "View Positions",
          action: "post"
        },
        {
          label: "Settings",
          action: "post"
        }
      ],
      post_url: "https://aerodrome-alerts.netlify.app/api/frame"
    }
  }

  return NextResponse.json(farcasterJson, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Cache-Control': 'public, max-age=0, must-revalidate'
    }
  })
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Cache-Control': 'public, max-age=0, must-revalidate'
    }
  })
} 