"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, LogOut, Settings, Package, Megaphone, Home, MessageSquare } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const userData = localStorage.getItem("uddokta_user")
    if (!userData) {
      router.push("/")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("uddokta_user")
    router.push("/")
  }

  if (!mounted || !user) {
    return null
  }

  const isActive = (path: string) => pathname === path

  const navItems = [
    { label: "Dashboard", icon: Home, href: "/dashboard" },
    { label: "Inventory AI", icon: Package, href: "/dashboard/inventory" },
    { label: "Marketing AI", icon: Megaphone, href: "/dashboard/marketing" },
    { label: "Customer Inbox", icon: MessageSquare, href: "/dashboard/inbox" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
  ]

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">⚡</span>
            </div>
            <h1 className="text-lg font-bold text-white">Uddokta AI</h1>
          </div>
          <p className="text-xs text-slate-400">SME Intelligence Platform</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-2 transition-colors ${
                  isActive(item.href)
                    ? "bg-teal-500/20 text-teal-400 hover:bg-teal-500/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <p className="text-xs text-slate-500 mb-2">Logged in as</p>
          <p className="text-sm font-medium text-white truncate">{user.businessName}</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-slate-950">
        {/* Header */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
          <div>
            <h2 className="text-lg font-semibold text-white">{user.businessName}</h2>
            <p className="text-xs text-slate-400">{user.type} Business</p>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800">
              <Bell className="w-5 h-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-full"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800">
                <DropdownMenuItem className="text-slate-300 cursor-pointer hover:text-white hover:bg-slate-800">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-400 cursor-pointer hover:text-red-300 hover:bg-slate-800"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
