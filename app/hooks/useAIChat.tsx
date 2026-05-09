"use client"

import { useState } from "react"
import { ChatMessage, Equipment } from "../types"

export function useAIChat(
  equipment: Equipment[],
  stats: {
    total: number
    working: number
    broken: number
    retired: number
  }
) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Bonjour! Je suis votre assistant IT.",
    },
  ])

  const sendMessage = (input: string) => {
    if (!input.trim()) return

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
    ])

    setTimeout(() => {
      let response = "Je peux vous aider."

      if (input.includes("combien")) {
        response = `Vous avez ${stats.total} équipements.`
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response,
        },
      ])
    }, 500)
  }

  return {
    messages,
    sendMessage,
  }
}