import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Log the incoming request
    console.log('Received Frame request');
    
    // Parse the request body
    const body = await req.json();
    console.log('Request body:', JSON.stringify(body));
    
    // Extract the button index from the untrustedData
    const buttonIndex = body?.untrustedData?.buttonIndex;
    console.log('Button index:', buttonIndex);
    
    // Handle different button actions
    if (buttonIndex === 1) {
      console.log('Handling View Positions action');
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
    } else if (buttonIndex === 2) {
      console.log('Handling Settings action');
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
    
    console.log('Returning default response');
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
    // Return a more detailed error response
    return NextResponse.json({ 
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500 
    });
  }
}

// Add a GET handler for testing
export async function GET() {
  console.log('Received GET request to Frame API');
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
} 