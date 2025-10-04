# Vapi Webhook Setup Guide

## Webhook URL
Configure your Vapi agent to send webhooks to:
\`\`\`
https://your-domain.com/api/vapi-webhook
\`\`\`

## Triggering Voice Activity

To make the background respond to voice, your Vapi agent should send POST requests to:
\`\`\`
https://your-domain.com/api/voice-stream
\`\`\`

### Request Format
\`\`\`json
{
  "isActive": true,
  "intensity": 0.75
}
\`\`\`

- `isActive`: Boolean indicating if voice is currently active
- `intensity`: Number between 0 and 1 representing voice volume/activity level

## Example Vapi Configuration

In your Vapi dashboard, set up a function that sends voice activity updates:

\`\`\`javascript
// In your Vapi function
async function updateVoiceActivity(isActive, intensity) {
  await fetch('https://your-domain.com/api/voice-stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isActive, intensity })
  });
}
\`\`\`

## Testing Locally

You can test the voice-reactive background by sending curl requests:

\`\`\`bash
# Activate voice with high intensity
curl -X POST http://localhost:3000/api/voice-stream \
  -H "Content-Type: application/json" \
  -d '{"isActive": true, "intensity": 0.8}'

# Deactivate voice
curl -X POST http://localhost:3000/api/voice-stream \
  -H "Content-Type: application/json" \
  -d '{"isActive": false, "intensity": 0}'
\`\`\`

## How It Works

1. Vapi sends voice activity data to `/api/voice-stream`
2. The server stores the current voice state
3. The background component connects via Server-Sent Events
4. Shader animations respond in real-time to voice intensity
5. Background automatically decays when voice stops
