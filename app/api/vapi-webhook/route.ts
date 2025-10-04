import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("[v0] Vapi webhook received:", body)

    // Handle different Vapi event types
    const { type, call, transcript, message } = body

    // Broadcast voice activity to connected clients via Server-Sent Events
    // This will be picked up by the background component
    if (type === "speech-update" || type === "transcript" || type === "function-call") {
      // You can process the voice data here
      // For now, we'll just acknowledge receipt
      return NextResponse.json({
        success: true,
        received: type,
        timestamp: new Date().toISOString(),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Vapi webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
