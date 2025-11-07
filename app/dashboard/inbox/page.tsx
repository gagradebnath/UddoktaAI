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
        return "bg-green-500/20 text-green-300 border-green-500/50"
      case "messenger":
        return "bg-blue-500/20 text-blue-300 border-blue-500/50"
      case "instagram":
        return "bg-pink-500/20 text-pink-300 border-pink-500/50"
      case "email":
        return "bg-slate-500/20 text-slate-300 border-slate-500/50"
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/50"
    }
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="h-full flex gap-6">
      {/* Conversations List */}
      <div className="w-80 flex flex-col bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800">
          <h2 className="text-lg font-semibold text-white mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              placeholder="Search conversations..."
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
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
              className={`w-full px-4 py-3 border-b border-slate-800 text-left transition-colors hover:bg-slate-800/50 ${
                selectedConversation.id === conv.id ? "bg-slate-800 border-l-2 border-l-teal-500" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                  {conv.customerImage}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-white truncate">{conv.customerName}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getPlatformColor(conv.platform)}`}>
                      {conv.platform}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 truncate">{conv.lastMessage}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {Math.floor((Date.now() - conv.lastMessageTime.getTime()) / 60000)}m ago
                  </p>
                </div>
                {conv.unread > 0 && (
                  <span className="w-5 h-5 bg-teal-500 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">
                    {conv.unread}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {selectedConversation.customerImage}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">{selectedConversation.customerName}</h2>
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
                  ? "bg-teal-500/20 border-teal-500/50 text-teal-300 hover:bg-teal-500/30"
                  : "border-slate-700 text-slate-400 hover:text-white"
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
            <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-800">
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
                    <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-white text-xs">
                      {selectedConversation.customerImage[0]}
                    </div>
                  ) : msg.sender === "bot" ? (
                    <div className="w-6 h-6 bg-teal-500/20 border border-teal-500/50 rounded-full flex items-center justify-center">
                      <Bot className="w-3 h-3 text-teal-300" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-blue-500/20 border border-blue-500/50 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-blue-300" />
                    </div>
                  )}
                </div>
                <div
                  className={`rounded-lg px-4 py-2 ${
                    msg.sender === "customer"
                      ? "bg-slate-800 text-slate-100 border border-slate-700"
                      : msg.sender === "bot"
                        ? "bg-teal-500/20 text-teal-100 border border-teal-500/50"
                        : "bg-blue-500/20 text-blue-100 border border-blue-500/50"
                  }`}
                >
                  <p className="text-sm break-words">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === "customer" ? "text-slate-500" : ""}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          {selectedConversation.aiEnabled && (
            <p className="text-xs text-teal-300 bg-teal-500/10 border border-teal-500/30 px-3 py-2 rounded">
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
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            />
            <Button
              onClick={() => handleSendMessage(false)}
              size="icon"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              title="Send manual reply"
            >
              <User className="w-4 h-4" />
            </Button>
            {selectedConversation.aiEnabled && (
              <Button
                onClick={() => handleSendMessage(true)}
                size="icon"
                className="bg-teal-600 hover:bg-teal-700 text-white"
                title="Send AI-powered reply"
              >
                <Bot className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="text-xs text-slate-400 space-y-1">
            <p>• Click the AI button to send an intelligent response</p>
            <p>• Click the Manual button to send a regular reply</p>
            <p>• Toggle AI mode to pause/resume automatic replies</p>
          </div>
        </div>
      </div>
    </div>
  )
}
