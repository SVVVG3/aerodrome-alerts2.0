import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { untrustedData } = body;
    
    // Handle different button actions
    if (untrustedData.buttonIndex === 1) {
      // View Positions action
      return NextResponse.json({
        frames: {
          version: "vNext",
          image: "https://aerodrome-alerts.netlify.app/images/aerodrome-alerts.png",
          buttons: [
            {
              label: "Back",
              action: "post"
            }
          ],
          post_url: "https://aerodrome-alerts.netlify.app/api/frame"
        }
      });
    } else if (untrustedData.buttonIndex === 2) {
      // Settings action
      return NextResponse.json({
        frames: {
          version: "vNext",
          image: "https://aerodrome-alerts.netlify.app/images/aerodrome-alerts.png",
          buttons: [
            {
              label: "Back",
              action: "post"
            }
          ],
          post_url: "https://aerodrome-alerts.netlify.app/api/frame"
        }
      });
    }
    
    // Default response
    return NextResponse.json({
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
    });
  } catch (error) {
    console.error('Error handling frame request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 