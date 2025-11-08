"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Login state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Signup state
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupSMEType, setSignupSMEType] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock authentication - redirect to dashboard
    setTimeout(() => {
      localStorage.setItem(
        "uddokta_user",
        JSON.stringify({
          name: "Demo User",
          email: loginEmail,
          type: "Retail",
          businessName: "The Khulna Coffee House",
        }),
      )
      router.push("/dashboard")
    }, 500)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock authentication - redirect to dashboard
    setTimeout(() => {
      localStorage.setItem(
        "uddokta_user",
        JSON.stringify({
          name: signupName,
          email: signupEmail,
          type: signupSMEType,
          businessName: signupName,
        }),
      )
      router.push("/dashboard")
    }, 500)
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD8B2]/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F57C20]/10 rounded-full blur-3xl -z-10" />

      <Card className="w-full max-w-md shadow-2xl border-[#E0E0E0] bg-white backdrop-blur">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <div className="w-10 h-10 bg-[#F57C20] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-[#333333]">Uddokta AI</CardTitle>
          <CardDescription className="text-[#555555]">Start Your Autonomous Business</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#F9FAFB]">
              <TabsTrigger value="login" className="text-[#555555] data-[state=active]:bg-white data-[state=active]:text-[#F57C20]">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="text-[#555555] data-[state=active]:bg-white data-[state=active]:text-[#F57C20]">
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-4 mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-[#333333]">
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="name@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="bg-white border-[#E0E0E0] text-[#333333] placeholder-[#888888]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-[#333333]">
                    Password
                  </Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="bg-white border-[#E0E0E0] text-[#333333] placeholder-[#888888]"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#F57C20] hover:bg-[#E86E12] text-white font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup" className="space-y-4 mt-6">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-[#333333]">
                    Business Name
                  </Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Your Business Name"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    className="bg-white border-[#E0E0E0] text-[#333333] placeholder-[#888888]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-[#333333]">
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="name@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="bg-white border-[#E0E0E0] text-[#333333] placeholder-[#888888]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-[#333333]">
                    Password
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="bg-white border-[#E0E0E0] text-[#333333] placeholder-[#888888]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sme-type" className="text-[#333333]">
                    Business Type
                  </Label>
                  <Select value={signupSMEType} onValueChange={setSignupSMEType}>
                    <SelectTrigger className="bg-white border-[#E0E0E0] text-[#333333]">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#E0E0E0]">
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="F&B">Food & Beverage</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Services">Services</SelectItem>
                      <SelectItem value="E-commerce">E-commerce</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#F57C20] hover:bg-[#E86E12] text-white font-semibold"
                  disabled={isLoading || !signupSMEType}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
