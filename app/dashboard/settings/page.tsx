"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SettingsIcon } from "lucide-react"

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    setMounted(true)
    const userData = localStorage.getItem("uddokta_user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  if (!mounted || !user) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-2">
          <SettingsIcon className="w-8 h-8" />
          Settings
        </h1>
        <p className="text-slate-400">Manage your business profile and preferences</p>
      </div>

      {/* Business Profile */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Business Profile</CardTitle>
          <CardDescription className="text-slate-400">Update your business information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="business-name" className="text-slate-300">
                Business Name
              </Label>
              <Input
                id="business-name"
                defaultValue={user.businessName}
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Email
              </Label>
              <Input id="email" defaultValue={user.email} className="bg-slate-700/50 border-slate-600 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-type" className="text-slate-300">
                Business Type
              </Label>
              <Select defaultValue={user.type}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="Retail">Retail</SelectItem>
                  <SelectItem value="F&B">Food & Beverage</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="Services">Services</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">Save Changes</Button>
        </CardContent>
      </Card>

      {/* AI Preferences */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">AI Preferences</CardTitle>
          <CardDescription className="text-slate-400">Configure your AI agent behavior</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 border border-slate-600">
              <div>
                <p className="text-white font-medium">Inventory Alerts</p>
                <p className="text-sm text-slate-400">Get notified about low stock</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 border border-slate-600">
              <div>
                <p className="text-white font-medium">Marketing Insights</p>
                <p className="text-sm text-slate-400">Receive daily marketing recommendations</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 border border-slate-600">
              <div>
                <p className="text-white font-medium">Customer Support Automation</p>
                <p className="text-sm text-slate-400">Enable AI chatbot responses</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer" />
            </div>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">Save Preferences</Button>
        </CardContent>
      </Card>

      {/* API Configuration */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">API Configuration</CardTitle>
          <CardDescription className="text-slate-400">Integrate with external services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key" className="text-slate-300">
              API Key
            </Label>
            <Input
              id="api-key"
              type="password"
              defaultValue="sk_demo_xxxxxxxxxxxxx"
              className="bg-slate-700/50 border-slate-600 text-white"
            />
            <p className="text-xs text-slate-500">Keep your API key confidential</p>
          </div>
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
            Regenerate Key
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
