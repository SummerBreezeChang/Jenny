# Webhook Usage Guide

## Send Vapi Messages (Full Format)

Send the complete Vapi message format with conversation history:

\`\`\`bash
curl -X POST http://localhost:3000/api/voice-stream \
  -H "Content-Type: application/json" \
  -d '{
    "message": {
      "timestamp": 1759```markdown file="WEBHOOK_USAGE.md"
# Webhook Usage Guide

## Send Vapi Messages (Full Format)

Send the complete Vapi message format with conversation history:

\`\`\`bash
curl -X POST http://localhost:3000/api/voice-stream \
  -H "Content-Type: application/json" \
  -d '{
    "message": {
      "timestamp": 1759613629479,
      "type": "status-update",
      "status": "in-progress",
      "artifact": {
        "messages": [
          {
            "role": "assistant",
            "message": "Hello! How can I help you today?"
          },
          {
            "role": "user",
            "message": "I need to book an appointment"
          }
        ]
      }
    }
  }'
\`\`\`

## Send Simple Text Messages

You can also send simple text messages:

\`\`\`bash
curl -X POST http://localhost:3000/api/voice-stream \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from Vapi!"}'
\`\`\`

## Send Voice Activity

Send voice activity updates to animate the background:

\`\`\`bash
curl -X POST http://localhost:3000/api/voice-stream \
  -H "Content-Type: application/json" \
  -d '{"isActive": true, "intensity": 0.8}'
\`\`\`

## Send Both Together

You can send both text and voice activity in the same request:

\`\`\`bash
curl -X POST http://localhost:3000/api/voice-stream \
  -H "Content-Type: application/json" \
  -d '{"message": "I am speaking now", "isActive": true, "intensity": 0.9}'
\`\`\`

## Integration with Vapi

Configure your Vapi assistant to send POST requests to:
- Production: `https://your-app.vercel.app/api/voice-stream`
- Local: `http://localhost:3000/api/voice-stream`

The webhook accepts two formats:

### Full Vapi Format
\`\`\`json
{
  "message": {
    "artifact": {
      "messages": [
        {"role": "user|assistant", "message": "text"}
      ]
    }
  }
}
\`\`\`

### Simple Format
- `message` (string): Text to display in the chat
- `isActive` (boolean): Whether voice is currently active
- `intensity` (number 0-1): Voice activity level for background animation
