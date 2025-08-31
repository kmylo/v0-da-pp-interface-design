"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Users, Send } from "lucide-react"

type ChatMessage = {
  id: string
  type: "user" | "system"
  content: string
  timestamp: Date
}

interface AIChatInterfaceProps {
  messages: ChatMessage[]
  onSendMessage: (message: string) => void
  isTyping: boolean
  placeholder?: string
}

export function AIChatInterface({ messages, onSendMessage, isTyping, placeholder }: AIChatInterfaceProps) {
  const [currentInput, setCurrentInput] = useState("")

  const handleSubmit = () => {
    if (!currentInput.trim()) return
    onSendMessage(currentInput)
    setCurrentInput("")
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-6 space-y-4">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <span className="text-white font-medium">OKBond AI Assistant</span>
      </div>

      <div className="space-y-3 max-h-60 overflow-y-auto">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex-shrink-0">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div className="bg-slate-700 rounded-lg p-3 max-w-xs">
            <p className="text-slate-200 text-sm">I'm the OKBond AI. How can I help you today?</p>
          </div>
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${message.type === "user" ? "justify-end" : ""}`}
          >
            {message.type === "system" && (
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex-shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
            )}
            <div
              className={`rounded-lg p-3 max-w-xs ${
                message.type === "user" ? "bg-orange-500 text-white" : "bg-slate-700 text-slate-200"
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
            {message.type === "user" && (
              <div className="p-2 rounded-lg bg-slate-600 flex-shrink-0">
                <Users className="h-4 w-4 text-slate-300" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex-shrink-0">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-slate-700 rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <Input
          placeholder={placeholder || "Describe your financial need or investment goal..."}
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
          className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 rounded-lg"
        />
        <Button onClick={handleSubmit} className="bg-orange-500 hover:bg-orange-600 rounded-lg px-4">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
