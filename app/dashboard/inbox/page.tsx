"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pause, Settings2, Search, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "customer" | "bot" | "manual"
  timestamp: Date
  platform: "messenger" | "whatsapp" | "instagram" | "email"
}

interface Conversation {
  id: string
  customerName: string
  customerImage: string
  platform: "messenger" | "whatsapp" | "instagram" | "email"
  lastMessage: string
  lastMessageTime: Date
  unread: number
  aiEnabled: boolean
  messages: Message[]
}

// Mock data for conversations
const mockConversations: Conversation[] = [
  {
    id: "1",
    customerName: "Sarah Johnson",
    customerImage: "SJ",
    platform: "whatsapp",
    lastMessage: "Can you tell me about the new product?",
    lastMessageTime: new Date(Date.now() - 5 * 60000),
    unread: 2,
    aiEnabled: true,
    messages: [
      {
        id: "m1",
        text: "Hi, I'm interested in your services",
        sender: "customer",
        timestamp: new Date(Date.now() - 30 * 60000),
        platform: "whatsapp",
      },
      {
        id: "m2",
        text: "Hello Sarah! Thanks for reaching out. We'd love to help you! 👋",
        sender: "bot",
        timestamp: new Date(Date.now() - 28 * 60000),
        platform: "whatsapp",
      },
      {
        id: "m3",
        text: "Can you tell me about the new product?",
        sender: "customer",
        timestamp: new Date(Date.now() - 5 * 60000),
        platform: "whatsapp",
      },
    ],
  },
  {
    id: "2",
    customerName: "Mike Chen",
    customerImage: "MC",
    platform: "messenger",
    lastMessage: "I'd like to place an order",
    lastMessageTime: new Date(Date.now() - 15 * 60000),
    unread: 0,
    aiEnabled: false,
    messages: [
      {
        id: "m4",
        text: "I'd like to place an order",
        sender: "customer",
        timestamp: new Date(Date.now() - 15 * 60000),
        platform: "messenger",
      },
      {
        id: "m5",
        text: "Great! Which product are you interested in?",
        sender: "manual",
        timestamp: new Date(Date.now() - 12 * 60000),
        platform: "messenger",
      },
    ],
  },
  {
    id: "3",
    customerName: "Emma Davis",
    customerImage: "ED",
    platform: "instagram",
    lastMessage: "Love your new collection! 🎉",
    lastMessageTime: new Date(Date.now() - 2 * 60000),
    unread: 1,
    aiEnabled: true,
    messages: [
      {
        id: "m6",
        text: "Love your new collection! 🎉",
        sender: "customer",
        timestamp: new Date(Date.now() - 2 * 60000),
        platform: "instagram",
      },
    ],
  },
  {
    id: "4",
    customerName: "John Smith",
    customerImage: "JS",
    platform: "whatsapp",
    lastMessage: "Thanks for the quick response!",
    lastMessageTime: new Date(Date.now() - 45 * 60000),
    unread: 0,
    aiEnabled: true,
    messages: [
      {
        id: "m7",
        text: "Do you offer bulk discounts?",
        sender: "customer",
        timestamp: new Date(Date.now() - 60 * 60000),
        platform: "whatsapp",
      },
      {
        id: "m8",
        text: "Yes! We offer 10% discount for orders over 100 units and 15% for 500+ units.",
        sender: "bot",
        timestamp: new Date(Date.now() - 58 * 60000),
        platform: "whatsapp",
      },
      {
        id: "m9",
        text: "Thanks for the quick response!",
        sender: "customer",
        timestamp: new Date(Date.now() - 45 * 60000),
        platform: "whatsapp",
      },
    ],
  },
]

export default function InboxPage() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations)
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(mockConversations[0])
  const [messageText, setMessageText] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [selectedConversation.messages])

  const handleSendMessage = (isAI: boolean) => {
    if (!messageText.trim()) return

    const newMessage: Message = {
      id: `m${Date.now()}`,
      text: messageText,
      sender: isAI ? "bot" : "manual",
      timestamp: new Date(),
      platform: selectedConversation.platform,
    }

    const updatedConversations = conversations.map((conv) => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: messageText,
          lastMessageTime: new Date(),
        }
      }
      return conv
    })

    setConversations(updatedConversations)
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
      lastMessage: messageText,
      lastMessageTime: new Date(),
    })
    setMessageText("")
  }

  const toggleAI = (conversationId: string) => {
    const updated = conversations.map((conv) => {
      if (conv.id === conversationId) {
        return { ...conv, aiEnabled: !conv.aiEnabled }
      }
      return conv
    })
    setConversations(updated)
    const selected = updated.find((c) => c.id === selectedConversation.id)
    if (selected) setSelectedConversation(selected)
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "whatsapp":
        return "bg-[#34A853]/20 text-[#34A853] border-[#34A853]/50"
      case "messenger":
        return "bg-[#F57C20]/20 text-[#F57C20] border-[#F57C20]/50"
      case "instagram":
        return "bg-[#E74C3C]/20 text-[#E74C3C] border-[#E74C3C]/50"
      case "email":
        return "bg-[#4B4B4B]/20 text-[#555555] border-[#4B4B4B]/50"
      default:
        return "bg-[#4B4B4B]/20 text-[#555555] border-[#4B4B4B]/50"
    }
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="h-full flex flex-col lg:flex-row gap-4 lg:gap-6">
      {/* Conversations List */}
      <div className="w-full lg:w-80 flex flex-col bg-white rounded-lg border border-[#E0E0E0] overflow-hidden">
        <div className="p-4 border-b border-[#E0E0E0]">
          <h2 className="text-lg font-semibold text-[#333333] mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
            <Input
              placeholder="Search conversations..."
              className="pl-10 bg-white border-[#E0E0E0] text-[#333333] placeholder:text-[#888888]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={`w-full px-4 py-3 border-b border-[#E0E0E0] text-left transition-colors hover:bg-[#F9FAFB] ${
                selectedConversation.id === conv.id ? "bg-[#FFF1E6] border-l-2 border-l-[#F57C20]" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#F57C20] rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                  {conv.customerImage}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-[#333333] truncate">{conv.customerName}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getPlatformColor(conv.platform)}`}>
                      {conv.platform}
                    </span>
                  </div>
                  <p className="text-sm text-[#555555] truncate">{conv.lastMessage}</p>
                  <p className="text-xs text-[#888888] mt-1">
                    {Math.floor((Date.now() - conv.lastMessageTime.getTime()) / 60000)}m ago
                  </p>
                </div>
                {conv.unread > 0 && (
                  <span className="w-5 h-5 bg-[#F57C20] text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">
                    {conv.unread}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white rounded-lg border border-[#E0E0E0] overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-[#E0E0E0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#F57C20] rounded-full flex items-center justify-center text-white font-bold">
              {selectedConversation.customerImage}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#333333]">{selectedConversation.customerName}</h2>
              <span
                className={`text-xs px-2 py-1 rounded-full border ${getPlatformColor(selectedConversation.platform)}`}
              >
                {selectedConversation.platform}
              </span>
            </div>
          </div>

          {/* AI Toggle & Settings */}
          <div className="flex items-center gap-2">
            <Button
              onClick={() => toggleAI(selectedConversation.id)}
              size="sm"
              variant={selectedConversation.aiEnabled ? "default" : "outline"}
              className={`${
                selectedConversation.aiEnabled
                  ? "bg-[#F57C20]/20 border-[#F57C20]/50 text-[#F57C20] hover:bg-[#F57C20]/30"
                  : "border-[#E0E0E0] text-[#555555] hover:text-[#333333]"
              }`}
            >
              {selectedConversation.aiEnabled ? (
                <>
                  <Bot className="w-4 h-4 mr-1" />
                  AI On
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4 mr-1" />
                  AI Paused
                </>
              )}
            </Button>
            <Button size="sm" variant="ghost" className="text-[#555555] hover:text-[#333333] hover:bg-[#F9FAFB]">
              <Settings2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages Display */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedConversation.messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "customer" ? "justify-start" : "justify-end"}`}>
              <div
                className={`flex items-end gap-2 max-w-xs ${
                  msg.sender === "customer" ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                  {msg.sender === "customer" ? (
                    <div className="w-6 h-6 bg-[#E0E0E0] rounded-full flex items-center justify-center text-[#333333] text-xs">
                      {selectedConversation.customerImage[0]}
                    </div>
                  ) : msg.sender === "bot" ? (
                    <div className="w-6 h-6 bg-[#F57C20]/20 border border-[#F57C20]/50 rounded-full flex items-center justify-center">
                      <Bot className="w-3 h-3 text-[#F57C20]" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-[#4B4B4B]/20 border border-[#4B4B4B]/50 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-[#4B4B4B]" />
                    </div>
                  )}
                </div>
                <div
                  className={`rounded-lg px-4 py-2 ${
                    msg.sender === "customer"
                      ? "bg-[#F9FAFB] text-[#333333] border border-[#E0E0E0]"
                      : msg.sender === "bot"
                        ? "bg-[#F57C20]/20 text-[#333333] border border-[#F57C20]/50"
                        : "bg-[#4B4B4B]/20 text-[#333333] border border-[#4B4B4B]/50"
                  }`}
                >
                  <p className="text-sm break-words">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === "customer" ? "text-[#888888]" : "text-[#888888]"}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-[#E0E0E0] space-y-3">
          {selectedConversation.aiEnabled && (
            <p className="text-xs text-[#F57C20] bg-[#F57C20]/10 border border-[#F57C20]/30 px-3 py-2 rounded">
              💡 AI Reply Mode is ON. Messages will be sent with AI assistance.
            </p>
          )}

          <div className="flex gap-2">
            <Input
              placeholder="Type your reply..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage(false)
                }
              }}
              className="bg-white border-[#E0E0E0] text-[#333333] placeholder:text-[#888888]"
            />
            <Button
              onClick={() => handleSendMessage(false)}
              size="icon"
              className="bg-[#4B4B4B] hover:bg-[#333333] text-white"
              title="Send manual reply"
            >
              <User className="w-4 h-4" />
            </Button>
            {selectedConversation.aiEnabled && (
              <Button
                onClick={() => handleSendMessage(true)}
                size="icon"
                className="bg-[#F57C20] hover:bg-[#E86E12] text-white"
                title="Send AI-powered reply"
              >
                <Bot className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="text-xs text-[#888888] space-y-1">
            <p>• Click the AI button to send an intelligent response</p>
            <p>• Click the Manual button to send a regular reply</p>
            <p>• Toggle AI mode to pause/resume automatic replies</p>
          </div>
        </div>
      </div>
    </div>
  )
}
