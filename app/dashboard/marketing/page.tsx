"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Send, TrendingUp, Clock, Facebook, MessageCircle, Instagram, Mail, CheckCircle, Clock3 } from "lucide-react"

// Mock data
const trendData = [
  { category: "Premium Blends", sales: 4200 },
  { category: "Organic Tea", sales: 3800 },
  { category: "Specialty Teas", sales: 2100 },
  { category: "Tea Accessories", sales: 1500 },
  { category: "Gift Sets", sales: 980 },
]

const mockGeneratedPost = {
  title: "Discover Our New Premium Tea Collection",
  body: "Elevate your tea experience with our carefully curated selection of premium, organic teas sourced from the finest tea gardens around the world. Each blend has been expertly crafted to deliver exceptional taste and aroma. Perfect for tea enthusiasts who appreciate quality and authenticity.",
  hashtags: "#PremiumTea #OrganicTea #TeaLovers #TeaCulture #SpecialtyTeas #HealthyLiving",
}

const optimalPostingTimes = [
  { day: "Monday", time: "9:00 AM", engagement: "High" },
  { day: "Wednesday", time: "2:30 PM", engagement: "Very High" },
  { day: "Friday", time: "6:00 PM", engagement: "Very High" },
  { day: "Sunday", time: "11:00 AM", engagement: "High" },
]

const socialMediaAccounts = [
  { id: 1, platform: "Facebook", handle: "@TeaLoversClub", connected: true, icon: Facebook },
  { id: 2, platform: "Instagram", handle: "@premium_teas", connected: true, icon: Instagram },
  { id: 3, platform: "WhatsApp", handle: "+1-555-0123", connected: true, icon: MessageCircle },
  { id: 4, platform: "Email", handle: "newsletter@teas.com", connected: false, icon: Mail },
]

const mockPostingHistory = [
  {
    id: 1,
    title: "Summer Tea Special",
    platforms: ["Facebook", "Instagram"],
    postedAt: "2024-01-15 2:30 PM",
    status: "posted",
    engagement: 1240,
  },
  {
    id: 2,
    title: "New Organic Blend Launch",
    platforms: ["Instagram", "WhatsApp"],
    postedAt: "2024-01-14 9:00 AM",
    status: "posted",
    engagement: 892,
  },
  {
    id: 3,
    title: "Weekend Promotion",
    platforms: ["Facebook"],
    postedAt: "2024-01-13 6:00 PM",
    status: "scheduled",
    engagement: null,
  },
]

export default function MarketingPage() {
  const [mounted, setMounted] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [generatedPost, setGeneratedPost] = useState<typeof mockGeneratedPost | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [isPosting, setIsPosting] = useState(false)
  const [postingHistory, setPostingHistory] = useState(mockPostingHistory)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleGeneratePost = () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedPost(mockGeneratedPost)
      setIsGenerating(false)
    }, 1000)
  }

  const handlePostToSocialMedia = () => {
    if (!generatedPost || selectedPlatforms.length === 0) return

    setIsPosting(true)
    // Simulate posting
    setTimeout(() => {
      const newPost = {
        id: postingHistory.length + 1,
        title: generatedPost.title,
        platforms: selectedPlatforms,
        postedAt: new Date().toLocaleString(),
        status: "posted",
        engagement: Math.floor(Math.random() * 2000),
      }
      setPostingHistory([newPost, ...postingHistory])
      setIsPosting(false)
      setSelectedPlatforms([])
      alert(`Post successfully published to ${selectedPlatforms.join(", ")}!`)
    }, 1500)
  }

  const togglePlatformSelection = (platformName: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformName) ? prev.filter((p) => p !== platformName) : [...prev, platformName],
    )
  }

  if (!mounted) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Marketing AI</h1>
        <p className="text-slate-400">AI-powered content generation and social media posting</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Content Generation */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">AI Content Generator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt" className="text-slate-300">
                  What would you like to promote?
                </Label>
                <Textarea
                  id="prompt"
                  placeholder="E.g., Promote our new coffee blend to young professionals..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-500 min-h-20"
                />
              </div>
              <Button
                onClick={handleGeneratePost}
                disabled={!prompt || isGenerating}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold"
              >
                <Send className="w-4 h-4 mr-2" />
                {isGenerating ? "Generating..." : "Generate Post"}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Post Preview */}
          {generatedPost && (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Generated Social Media Post</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{generatedPost.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{generatedPost.body}</p>
                </div>
                <div>
                  <p className="text-teal-400 text-sm">{generatedPost.hashtags}</p>
                </div>
                <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
                  <p className="text-xs text-slate-400 text-center">AI-Generated Graphic Preview</p>
                  <div className="w-full h-32 bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded mt-2 flex items-center justify-center">
                    <span className="text-slate-500">Image will be generated here</span>
                  </div>
                </div>

                {/* Social Media Platform Selection */}
                <div className="border-t border-slate-700 pt-4">
                  <Label className="text-slate-300 mb-3 block">Select platforms to post to:</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {socialMediaAccounts.map((account) => (
                      <button
                        key={account.id}
                        onClick={() => account.connected && togglePlatformSelection(account.platform)}
                        disabled={!account.connected}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedPlatforms.includes(account.platform)
                            ? "border-teal-500 bg-teal-500/10"
                            : "border-slate-600 bg-slate-700/30"
                        } ${!account.connected ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-teal-400"}`}
                      >
                        <div className="flex items-center gap-2">
                          <account.icon className="w-4 h-4" />
                          <div className="text-left">
                            <p className="text-sm font-medium text-white">{account.platform}</p>
                            <p className="text-xs text-slate-400">{account.handle}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Post to Social Media Button */}
                <Button
                  onClick={handlePostToSocialMedia}
                  disabled={selectedPlatforms.length === 0 || isPosting}
                  className="w-full mt-4 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold"
                >
                  {isPosting
                    ? "Posting..."
                    : `Post to ${selectedPlatforms.length} Platform${selectedPlatforms.length !== 1 ? "s" : ""}`}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trend Analysis */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-teal-400" />
                Top Selling Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={trendData} layout="vertical" margin={{ left: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis type="number" stroke="rgb(148, 163, 184)" />
                  <YAxis dataKey="category" type="category" stroke="rgb(148, 163, 184)" tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgb(15, 23, 42)",
                      border: "1px solid rgb(30, 41, 59)",
                    }}
                  />
                  <Bar dataKey="sales" fill="#14b8a6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Optimal Posting Times */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                Optimal Posting Times
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {optimalPostingTimes.map((slot, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-700 pb-2">
                  <div>
                    <p className="text-white font-medium">{slot.day}</p>
                    <p className="text-slate-400 text-xs">{slot.time}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      slot.engagement === "Very High"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {slot.engagement}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Posting History Section */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {postingHistory.map((post) => (
              <div
                key={post.id}
                className="flex items-start justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600"
              >
                <div className="flex-1">
                  <p className="text-white font-medium">{post.title}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    {post.platforms.map((platform) => (
                      <span key={platform} className="text-xs bg-teal-500/20 text-teal-400 px-2 py-1 rounded">
                        {platform}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">{post.postedAt}</p>
                </div>
                <div className="text-right ml-4">
                  <div className="flex items-center gap-1 justify-end mb-2">
                    {post.status === "posted" ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Clock3 className="w-4 h-4 text-yellow-400" />
                    )}
                    <span
                      className={`text-xs font-semibold ${post.status === "posted" ? "text-green-400" : "text-yellow-400"}`}
                    >
                      {post.status === "posted" ? "Posted" : "Scheduled"}
                    </span>
                  </div>
                  {post.engagement && (
                    <p className="text-sm text-slate-300">
                      <span className="text-teal-400 font-semibold">{post.engagement}</span> engagements
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
