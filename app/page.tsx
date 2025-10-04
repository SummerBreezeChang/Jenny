import { ChatInterface } from "@/components/chat-interface"
import { VoiceReactiveBackground } from "@/components/voice-reactive-background"

export default function Home() {
  return (
    <div className="min-h-screen bg-black relative">
      <VoiceReactiveBackground />
      <ChatInterface />
    </div>
  )
}
