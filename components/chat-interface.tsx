"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Mic } from "lucide-react"
import { LiquidMetal, PulsingBorder } from "@paper-design/shaders-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function ChatInterface() {
  const [isFocused, setIsFocused] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [voiceActive, setVoiceActive] = useState(false)
  const [voiceIntensity, setVoiceIntensity] = useState(0)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/voice-stream")
        if (response.ok) {
          const data = await response.json()

          if (data.isActive !== undefined) {
            setVoiceActive(data.isActive)
          }
          if (data.intensity !== undefined) {
            setVoiceIntensity(data.intensity)
          }

          if (data.messages && data.messages.length > 0) {
            setMessages((prev) => {
              const newMessages = data.messages.map((msg: any, index: number) => ({
                id: `${msg.timestamp}-${msg.role}-${index}`,
                content: msg.content,
                role: msg.role,
                timestamp: new Date(msg.timestamp),
              }))

              const existingSignatures = new Set(prev.map((m) => `${m.role}:${m.content}`))
              const uniqueNewMessages = newMessages.filter(
                (m: Message) => !existingSignatures.has(`${m.role}:${m.content}`),
              )

              return [...prev, ...uniqueNewMessages]
            })
          }
        }
      } catch (error) {
        console.error("[v0] Failed to fetch messages:", error)
      }
    }

    const interval = setInterval(fetchMessages, 500)
    fetchMessages()

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative">
      <motion.div
        id="voice-visualizer"
        className="fixed inset-0 flex items-center justify-center z-0 pointer-events-none"
        animate={{
          opacity: voiceActive ? 1 : 0.3,
          scale: voiceActive ? 1 + voiceIntensity * 0.3 : 1,
        }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        <LiquidMetal
          style={{ height: 600, width: 600, filter: "blur(60px)", position: "absolute" }}
          colorBack="hsl(0, 0%, 0%, 0)"
          colorTint={voiceActive ? "hsl(180, 100%, 60%)" : "hsl(190, 85%, 55%)"}
          repetition={4}
          softness={0.5}
          shiftRed={0.3}
          shiftBlue={0.3}
          distortion={0.1 + voiceIntensity * 0.3}
          contour={1}
          shape="circle"
          offsetX={0}
          offsetY={0}
          scale={0.7 + voiceIntensity * 0.4}
          rotation={50 + (voiceActive ? voiceIntensity * 100 : 0)}
          speed={5 + voiceIntensity * 10}
        />
        <LiquidMetal
          style={{ height: 600, width: 600, filter: "blur(60px)", position: "absolute" }}
          colorBack="hsl(0, 0%, 0%, 0)"
          colorTint={voiceActive ? "hsl(180, 100%, 60%)" : "hsl(190, 85%, 55%)"}
          repetition={4}
          softness={0.5}
          shiftRed={0.3}
          shiftBlue={0.3}
          distortion={0.1 + voiceIntensity * 0.3}
          contour={1}
          shape="circle"
          offsetX={0}
          offsetY={0}
          scale={0.7 + voiceIntensity * 0.4}
          rotation={50 + (voiceActive ? voiceIntensity * 100 : 0)}
          speed={5 + voiceIntensity * 10}
        />

        {voiceActive && (
          <motion.div
            className="absolute text-cyan-400 text-sm font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ bottom: "40%" }}
          >
            Listening...
          </motion.div>
        )}
      </motion.div>

      <div className="w-full max-w-4xl relative z-10">
        <div className="relative">
          <motion.div
            className="absolute w-full h-full z-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isFocused ? 1 : 0 }}
            transition={{
              duration: 0.8,
            }}
          >
            <PulsingBorder
              style={{ height: "146.5%", minWidth: "143%" }}
              colorBack="hsl(0, 0%, 0%)"
              roundness={0.18}
              thickness={0}
              softness={0}
              intensity={0.3}
              bloom={2}
              spots={2}
              spotSize={0.25}
              pulse={0}
              smoke={0.35}
              smokeSize={0.4}
              scale={0.7}
              rotation={0}
              offsetX={0}
              offsetY={0}
              speed={1}
              colors={[
                "hsl(190, 85%, 55%)",
                "hsl(200, 90%, 65%)",
                "hsl(210, 80%, 50%)",
                "hsl(220, 85%, 60%)",
                "hsl(180, 75%, 45%)",
              ]}
            />
          </motion.div>

          <motion.div
            className="relative bg-[#040404] rounded-2xl p-4 z-10"
            animate={{
              borderColor: isFocused ? "#3DD9E8" : "#3D3D3D",
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            style={{
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            {messages.length > 0 && (
              <div className="mb-4 rounded-lg bg-zinc-900/30 border border-cyan-500/20 p-4 max-h-[400px] overflow-y-auto">
                <div className="space-y-3">
                  {messages.map((msg, index) => (
                    <div key={msg.id} className="text-white text-sm">
                      <div className="flex items-start gap-2">
                        <span
                          className={`text-xs font-medium ${msg.role === "user" ? "text-zinc-400" : "text-cyan-400"}`}
                        >
                          {msg.role === "user" ? "You:" : "Bot:"}
                        </span>
                        <p className="flex-1 leading-relaxed">{msg.content}</p>
                      </div>
                      {index < messages.length - 1 && <div className="h-px bg-zinc-800/50 mt-3" />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="relative mb-6">
              <Textarea
                placeholder=""
                className="min-h-[80px] resize-none bg-transparent border-none text-white text-base placeholder:text-zinc-500 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none [&:focus]:ring-0 [&:focus]:outline-none [&:focus-visible]:ring-0 [&:focus-visible]:outline-none"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>

            <div className="flex items-center justify-center">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(34, 211, 238, 0.4), 0 0 40px rgba(34, 211, 238, 0.2)",
                      "0 0 30px rgba(34, 211, 238, 0.6), 0 0 60px rgba(34, 211, 238, 0.3)",
                      "0 0 20px rgba(34, 211, 238, 0.4), 0 0 40px rgba(34, 211, 238, 0.2)",
                    ],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="rounded-full"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-10 w-10 rounded-full bg-cyan-400 hover:bg-cyan-300 text-cyan-950 p-0 shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.7)] transition-all duration-300 hover:scale-110"
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
