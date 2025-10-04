import type { NextRequest } from "next/server"

let voiceActivity = {
  isActive: false,
  intensity: 0,
  lastUpdate: Date.now(),
  messages: [] as Array<{ role: string; content: string; timestamp: number }>,
}

export async function GET() {
  return Response.json(voiceActivity)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (body.message && body.message.artifact && body.message.artifact.messages) {
      // Extract messages from Vapi format
      const vapiMessages = body.message.artifact.messages
        .filter((msg: any) => msg.role !== "system") // Skip system messages
        .map((msg: any) => ({
          role: msg.role,
          content: msg.message || msg.content || "",
          timestamp: body.message.timestamp || Date.now(),
        }))

      voiceActivity = {
        isActive: body.isActive ?? true,
        intensity: body.intensity ?? 0.8,
        lastUpdate: Date.now(),
        messages: vapiMessages,
      }

      console.log("[v0] Vapi webhook received:", vapiMessages.length, "messages")
    } else {
      const { isActive, intensity, message } = body

      if (message) {
        voiceActivity.messages = [
          {
            role: "assistant",
            content: message,
            timestamp: Date.now(),
          },
        ]
      }

      voiceActivity = {
        ...voiceActivity,
        isActive: isActive ?? voiceActivity.isActive,
        intensity: intensity ?? voiceActivity.intensity,
        lastUpdate: Date.now(),
      }

      console.log("[v0] Simple webhook received:", { isActive, intensity, message })
    }

    return Response.json({ success: true, data: voiceActivity })
  } catch (error) {
    console.error("[v0] Webhook error:", error)
    return Response.json({ error: "Failed to update voice activity" }, { status: 500 })
  }
}
