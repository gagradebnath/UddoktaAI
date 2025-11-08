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
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-[#E0E0E0]"
        onClick={() => {
          const sidebar = document.getElementById('sidebar');
          if (sidebar) {
            sidebar.classList.toggle('hidden');
          }
        }}
        aria-label="Open menu"
        title="Open navigation menu"
      >
        <svg className="w-6 h-6 text-[#4B4B4B]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside id="sidebar" className="hidden lg:flex w-64 bg-white border-r border-[#E0E0E0] flex-col fixed lg:static h-full lg:h-screen z-40">
        <div className="p-6 border-b border-[#E0E0E0]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 mb-1">
              <img 
                src="/logo.png" 
                alt="Uddokta AI Logo" 
                className="h-8 w-auto object-contain"
              />
              <h1 className="text-lg font-bold text-[#333333]">উদ্যোক্তা</h1>
            </div>
            {/* Close button for mobile */}
            <button 
              className="lg:hidden p-2 text-[#4B4B4B]"
              onClick={() => {
                const sidebar = document.getElementById('sidebar');
                if (sidebar) {
                  sidebar.classList.add('hidden');
                }
              }}
              aria-label="Close menu"
              title="Close navigation menu"
            >
              <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <p className="text-xs text-[#555555]">SME Intelligence Platform</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-2 transition-colors ${
                  isActive(item.href)
                    ? "bg-[#FFD8B2] text-[#F57C20] hover:bg-[#FFD8B2]"
                    : "text-[#4B4B4B] hover:text-[#F57C20] hover:bg-[#F9FAFB]"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[#E0E0E0]">
          <p className="text-xs text-[#888888] mb-2">Logged in as</p>
          <p className="text-sm font-medium text-[#333333] truncate">{user.businessName}</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0 w-full">
        {/* Header */}
        <header className="h-16 bg-white border-b border-[#E0E0E0] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <div className="ml-12 lg:ml-0">
            <h2 className="text-base sm:text-lg font-semibold text-[#333333]">{user.businessName}</h2>
            <p className="text-xs text-[#555555]">{user.type} Business</p>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="icon" className="text-[#4B4B4B] hover:text-[#F57C20] hover:bg-[#F9FAFB]">
              <Bell className="w-5 h-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#4B4B4B] hover:text-[#F57C20] hover:bg-[#F9FAFB] rounded-full"
                >
                  <div className="w-8 h-8 bg-[#F57C20] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border-[#E0E0E0]">
                <DropdownMenuItem className="text-[#555555] cursor-pointer hover:text-[#333333] hover:bg-[#F9FAFB]">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-[#E74C3C] cursor-pointer hover:text-[#C0392B] hover:bg-[#F9FAFB]"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
