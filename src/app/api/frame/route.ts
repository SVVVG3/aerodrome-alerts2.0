import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { untrustedData } = body;

    // Handle different button actions
    switch (untrustedData.buttonIndex) {
      case 1: // View Positions
        return NextResponse.json({
          image: "http://localhost:3000/images/aerodrome-alerts.png",
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
          post_url: "http://localhost:3000/api/frame"
        });
      
      case 2: // Settings
        return NextResponse.json({
          image: "http://localhost:3000/images/aerodrome-alerts.png",
          buttons: [
            {
              label: "Configure Alerts",
              action: "post"
            },
            {
              label: "Back",
              action: "post"
            }
          ],
          post_url: "http://localhost:3000/api/frame"
        });

      default:
        return NextResponse.json({
          image: "http://localhost:3000/images/aerodrome-alerts.png",
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
          post_url: "http://localhost:3000/api/frame"
        });
    }
  } catch (error) {
    console.error('Error processing frame action:', error);
    return NextResponse.json({
      image: "http://localhost:3000/images/aerodrome-alerts.png",
      buttons: [
        {
          label: "Error - Try Again",
          action: "post"
        }
      ],
      post_url: "http://localhost:3000/api/frame"
    });
  }
} 