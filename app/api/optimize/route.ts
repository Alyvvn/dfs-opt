import { NextRequest, NextResponse } from "next/server"

const PYTHON_API_BASE = process.env.PYTHON_API_BASE || "http://localhost:8000"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const sport = searchParams.get("sport") || "MLB"
    
    // Fetch players for the selected sport
    const res = await fetch(`${PYTHON_API_BASE}/players/${sport.toUpperCase()}`)
    
    if (!res.ok) {
      return NextResponse.json(
        { status: "error", message: `Failed to fetch ${sport} players` },
        { status: res.status }
      )
    }
    
    const data = await res.json()
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error?.message || "Failed to fetch players" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const sport = formData.get("sport") || "MLB"
    
    // Log incoming request for debugging
    console.log(`[API] POST /optimize - Sport: ${sport}`)
    
    const res = await fetch(`${PYTHON_API_BASE}/optimize-batch`, {
      method: "POST",
      body: formData,
    })

    if (!res.ok) {
      const error = await res.text()
      console.error(`[API] Error from backend: ${res.status} - ${error}`)
      return NextResponse.json(
        { 
          status: "error", 
          message: error || `Backend error: ${res.status}`,
          details: error,
          backend: PYTHON_API_BASE 
        },
        { status: 500 }
      )
    }

    const data = await res.json()
    console.log(`[API] Success: Generated ${data.count || 1} lineup(s)`)
    return NextResponse.json(data)
  } catch (error: any) {
    console.error(`[API] Exception: ${error?.message}`)
    return NextResponse.json(
      { 
        status: "error", 
        message: error?.message || "Failed to optimize",
        backend_url: PYTHON_API_BASE,
        check_backend: "Make sure Python backend is running on " + PYTHON_API_BASE
      },
      { status: 500 }
    )
  }
}
