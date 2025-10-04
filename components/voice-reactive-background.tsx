"use client"

import { useEffect, useState } from "react"
import { LiquidMetal } from "@paper-design/shaders-react"
import { motion } from "framer-motion"

interface VoiceActivity {
  isActive: boolean
  intensity: number
  lastUpdate: number
}

export function VoiceReactiveBackground() {
  const [voiceActivity, setVoiceActivity] = useState<VoiceActivity>({
    isActive: false,
    intensity: 0,
    lastUpdate: Date.now(),
  })
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    let eventSource: EventSource | null = null
    let reconnectTimeout: NodeJS.Timeout | null = null

    const connect = () => {
      try {
        eventSource = new EventSource("/api/voice-stream")

        eventSource.onopen = () => {
          console.log("[v0] Voice stream connected")
          setIsConnected(true)
        }

        eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            setVoiceActivity(data)
          } catch (error) {
            console.error("[v0] Failed to parse voice activity:", error)
          }
        }

        eventSource.onerror = (error) => {
          console.log("[v0] Voice stream disconnected, will retry...")
          setIsConnected(false)
          eventSource?.close()

          reconnectTimeout = setTimeout(() => {
            connect()
          }, 2000)
        }
      } catch (error) {
        console.error("[v0] Failed to create EventSource:", error)
      }
    }

    connect()

    return () => {
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout)
      }
      eventSource?.close()
    }
  }, [])

  // Calculate shader properties based on voice intensity
  const scale = 0.5 + voiceActivity.intensity * 0.5
  const speed = 3 + voiceActivity.intensity * 7
  const distortion = 0.1 + voiceActivity.intensity * 0.4
  const opacity = 0.3 + voiceActivity.intensity * 0.4

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated gradient orbs that respond to voice */}
      <motion.div
        className="absolute top-1/4 left-1/4"
        animate={{
          scale: voiceActivity.isActive ? [1, 1.2, 1] : 1,
          x: voiceActivity.isActive ? [0, 50, 0] : 0,
          y: voiceActivity.isActive ? [0, -30, 0] : 0,
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <LiquidMetal
          style={{
            height: 400,
            width: 400,
            filter: "blur(80px)",
            opacity: opacity,
          }}
          colorBack="hsl(0, 0%, 0%, 0)"
          colorTint="hsl(190, 85%, 55%)"
          repetition={4}
          softness={0.5}
          shiftRed={0.3}
          shiftBlue={0.3}
          distortion={distortion}
          contour={1}
          shape="circle"
          offsetX={0}
          offsetY={0}
          scale={scale}
          rotation={50}
          speed={speed}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-1/4"
        animate={{
          scale: voiceActivity.isActive ? [1, 1.3, 1] : 1,
          x: voiceActivity.isActive ? [0, -40, 0] : 0,
          y: voiceActivity.isActive ? [0, 40, 0] : 0,
        }}
        transition={{
          duration: 2.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <LiquidMetal
          style={{
            height: 350,
            width: 350,
            filter: "blur(90px)",
            opacity: opacity * 0.8,
          }}
          colorBack="hsl(0, 0%, 0%, 0)"
          colorTint="hsl(210, 80%, 50%)"
          repetition={3}
          softness={0.6}
          shiftRed={0.4}
          shiftBlue={0.2}
          distortion={distortion * 1.2}
          contour={1}
          shape="circle"
          offsetX={0}
          offsetY={0}
          scale={scale * 0.9}
          rotation={-30}
          speed={speed * 0.8}
        />
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-1/3"
        animate={{
          scale: voiceActivity.isActive ? [1, 1.15, 1] : 1,
          x: voiceActivity.isActive ? [0, 30, 0] : 0,
          y: voiceActivity.isActive ? [0, -50, 0] : 0,
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <LiquidMetal
          style={{
            height: 300,
            width: 300,
            filter: "blur(70px)",
            opacity: opacity * 0.6,
          }}
          colorBack="hsl(0, 0%, 0%, 0)"
          colorTint="hsl(180, 75%, 60%)"
          repetition={5}
          softness={0.4}
          shiftRed={0.2}
          shiftBlue={0.4}
          distortion={distortion * 0.8}
          contour={1}
          shape="circle"
          offsetX={0}
          offsetY={0}
          scale={scale * 1.1}
          rotation={90}
          speed={speed * 1.2}
        />
      </motion.div>
    </div>
  )
}
