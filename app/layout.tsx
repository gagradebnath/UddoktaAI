import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/LanguageContext"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Uddokta AI - Business Intelligence Dashboard",
  description: "AI-powered business intelligence platform for SMEs",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/*
        Some browser extensions (or other client-side code) can inject attributes
        into the body element (for example Grammarly adds `data-new-gr-c-s-check-loaded`)
        which leads to React hydration mismatches. Adding `suppressHydrationWarning`
        tells React to ignore attribute differences for this node during hydration.
        This is a low-risk, local fix — prefer removing non-deterministic server/client
        behaviors for the long term (Date.now(), Math.random, conditional window checks, etc.).
      */}
      <body suppressHydrationWarning className={`font-sans antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
