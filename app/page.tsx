"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BarChart3, Brain, MessageSquare, TrendingUp, Shield, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#333333]">
      {/* Navigation */}
      <nav className="border-b border-[#E0E0E0] sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/uddogtaAI.png" 
              alt="Uddokta AI Logo" 
              className="h-13 w-auto object-contain"
            />
            <span className="text-xl font-bold text-[#333333]"></span>
          </div>
          <Link href="/auth">
            <Button className="bg-[#F57C20] hover:bg-[#E86E12] text-white font-semibold">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#333333] text-balance">
              Get started with Uddokta AI
            </h1>
            <p className="text-base sm:text-lg text-[#555555] max-w-xl text-balance leading-relaxed">
              By using Uddokta AI, you can access intelligent business insights across your entire operation. Connect
              with customers, track performance metrics, and grow your business faster with AI-powered recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/auth" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#F57C20] hover:bg-[#E86E12] text-white font-semibold text-base"
                >
                  Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-[#F57C20] text-[#F57C20] hover:bg-[#FFF1E6] bg-transparent"
              >
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-[#888888]">14 days free • No credit card required • Cancel anytime</p>
          </div>
          {/* Hero Illustration Placeholder */}
          <div className="rounded-2xl h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg">
            <img
              src="/uddokta-ai-business-intelligence-dashboard-with-ch.jpg"
              alt="Uddokta AI Dashboard Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Business Tools Section */}
      <section className="bg-white py-12 sm:py-20 lg:py-28 border-t border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-[#333333]">Our business tools can help you:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
            <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#E0E0E0] hover:border-[#F57C20] transition-colors">
              <h3 className="text-lg font-bold text-[#333333] mb-3">Increase Revenue</h3>
              <p className="text-[#555555]">
                Get AI-driven insights to identify growth opportunities, optimize pricing, and maximize sales across all
                channels.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#E0E0E0] hover:border-[#F57C20] transition-colors">
              <h3 className="text-lg font-bold text-[#333333] mb-3">Connect Across Platforms</h3>
              <p className="text-[#555555]">
                Manage customer conversations from Facebook, WhatsApp, Instagram, and Email in one unified inbox.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#E0E0E0] hover:border-[#F57C20] transition-colors">
              <h3 className="text-lg font-bold text-[#333333] mb-3">Track Performance Insights</h3>
              <p className="text-[#555555]">
                Monitor KPIs, revenue trends, and engagement metrics across your entire business in real-time
                dashboards.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#E0E0E0] hover:border-[#F57C20] transition-colors">
              <h3 className="text-lg font-bold text-[#333333] mb-3">Automate Marketing</h3>
              <p className="text-[#555555]">
                Generate engaging social media content, optimize posting times, and reach your audience automatically.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#E0E0E0] hover:border-[#F57C20] transition-colors">
              <h3 className="text-lg font-bold text-[#333333] mb-3">Optimize Operations</h3>
              <p className="text-[#555555]">
                Predict demand, prevent stockouts, reduce waste, and streamline inventory management with AI
                forecasting.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#E0E0E0] hover:border-[#F57C20] transition-colors">
              <h3 className="text-lg font-bold text-[#333333] mb-3">Save Time & Cost</h3>
              <p className="text-[#555555]">
                Let AI handle repetitive tasks so your team can focus on strategic decisions and business growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is Uddokta AI Section */}
      <section className="py-12 sm:py-20 lg:py-28 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#333333] mb-8 sm:mb-12">What is Uddokta AI?</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-3 flex items-center gap-3">
                  <Brain className="w-6 h-6 text-[#F57C20]" />
                  Autonomous Business Intelligence
                </h3>
                <p className="text-[#555555]">
                  Uddokta AI is an intelligent platform built for SMEs to make data-driven decisions instantly. Our
                  advanced machine learning algorithms analyze your business data and provide actionable insights.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-3 flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-[#F57C20]" />
                  Unified Customer Communication
                </h3>
                <p className="text-[#555555]">
                  Manage all customer conversations from multiple platforms in one place. Reply with AI or take manual
                  control whenever you need to.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-3 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-[#F57C20]" />
                  Real-Time Analytics
                </h3>
                <p className="text-[#555555]">
                  Monitor KPIs, revenue, inventory levels, and customer engagement with beautiful, easy-to-understand
                  dashboards updated in real-time.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-3 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-[#F57C20]" />
                  Marketing Automation
                </h3>
                <p className="text-[#555555]">
                  Generate engaging social media content automatically and post directly to your integrated social media
                  accounts.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-3 flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-[#F57C20]" />
                  Predictive Forecasting
                </h3>
                <p className="text-[#555555]">
                  Predict customer demand, prevent stockouts, and optimize inventory levels with AI-powered demand
                  forecasting.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-3 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-[#F57C20]" />
                  Enterprise Security
                </h3>
                <p className="text-[#555555]">
                  Bank-level encryption, role-based access control, and regular security audits protect your business
                  data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#F57C20] text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">500+</div>
              <p className="text-[#FFD8B2] text-sm sm:text-base">SMEs Growing Their Business</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">45%</div>
              <p className="text-[#FFD8B2] text-sm sm:text-base">Average Revenue Growth</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">24/7</div>
              <p className="text-[#FFD8B2] text-sm sm:text-base">AI-Powered Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 lg:py-28 bg-white border-t border-[#E0E0E0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#333333] mb-4 sm:mb-6">Ready to grow your business?</h2>
          <p className="text-base sm:text-lg text-[#555555] mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join hundreds of SMEs already using Uddokta AI to make smarter decisions and accelerate growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#F57C20] hover:bg-[#E86E12] text-white font-semibold text-base"
              >
                Start Your Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-[#F57C20] text-[#F57C20] hover:bg-[#FFF1E6] bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E0E0E0] bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 sm:mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#F57C20] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">
                    <img src="/uddoktaAi.png" alt="" />
                  </span>
                </div>
                <span className="font-bold text-[#333333]">Uddokta AI</span>
              </div>
              <p className="text-[#555555] text-sm">Autonomous Business Intelligence for SMEs</p>
            </div>

            <div>
              <h3 className="font-bold text-[#333333] mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-[#555555]">
                <li>
                  <a href="#" className="hover:text-[#F57C20] transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#F57C20] transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#F57C20] transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#F57C20] transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-[#333333] mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-[#555555]">
                <li>
                  <a href="#" className="hover:text-[#F57C20] transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#F57C20] transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#F57C20] transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#F57C20] transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-[#333333] mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-[#555555]">
                <li>
                  <a href="#" className="hover:text-[#F57C20] transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#F57C20] transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#F57C20] transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#F57C20] transition-colors">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#E0E0E0] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[#555555] text-sm">© 2025 Uddokta AI. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-[#555555] hover:text-[#F57C20] transition-colors text-sm">
                Twitter
              </a>
              <a href="#" className="text-[#555555] hover:text-[#F57C20] transition-colors text-sm">
                LinkedIn
              </a>
              <a href="#" className="text-[#555555] hover:text-[#F57C20] transition-colors text-sm">
                Facebook
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
