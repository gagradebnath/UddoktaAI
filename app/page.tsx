"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BarChart3, Brain, MessageSquare, TrendingUp, Shield, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Uddokta AI</span>
          </div>
          <Link href="/auth">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight text-gray-900 text-balance">
              Get started with Uddokta AI
            </h1>
            <p className="text-lg text-gray-600 max-w-xl text-balance leading-relaxed">
              By using Uddokta AI, you can access intelligent business insights across your entire operation. Connect
              with customers, track performance metrics, and grow your business faster with AI-powered recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/auth">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base"
                >
                  Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-gray-300 text-gray-900 hover:bg-gray-50 bg-transparent"
              >
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-gray-500">14 days free • No credit card required • Cancel anytime</p>
          </div>
          {/* Hero Illustration Placeholder */}
          <div className="rounded-2xl h-80 sm:h-96 overflow-hidden shadow-lg">
            <img
              src="/uddokta-ai-business-intelligence-dashboard-with-ch.jpg"
              alt="Uddokta AI Dashboard Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Business Tools Section */}
      <section className="bg-gray-50 py-20 sm:py-28 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">Our business tools can help you:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Increase Revenue</h3>
              <p className="text-gray-600">
                Get AI-driven insights to identify growth opportunities, optimize pricing, and maximize sales across all
                channels.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Connect Across Platforms</h3>
              <p className="text-gray-600">
                Manage customer conversations from Facebook, WhatsApp, Instagram, and Email in one unified inbox.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Track Performance Insights</h3>
              <p className="text-gray-600">
                Monitor KPIs, revenue trends, and engagement metrics across your entire business in real-time
                dashboards.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Automate Marketing</h3>
              <p className="text-gray-600">
                Generate engaging social media content, optimize posting times, and reach your audience automatically.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Optimize Operations</h3>
              <p className="text-gray-600">
                Predict demand, prevent stockouts, reduce waste, and streamline inventory management with AI
                forecasting.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Save Time & Cost</h3>
              <p className="text-gray-600">
                Let AI handle repetitive tasks so your team can focus on strategic decisions and business growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is Uddokta AI Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">What is Uddokta AI?</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                  <Brain className="w-6 h-6 text-blue-600" />
                  Autonomous Business Intelligence
                </h3>
                <p className="text-gray-600">
                  Uddokta AI is an intelligent platform built for SMEs to make data-driven decisions instantly. Our
                  advanced machine learning algorithms analyze your business data and provide actionable insights.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                  Unified Customer Communication
                </h3>
                <p className="text-gray-600">
                  Manage all customer conversations from multiple platforms in one place. Reply with AI or take manual
                  control whenever you need to.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  Real-Time Analytics
                </h3>
                <p className="text-gray-600">
                  Monitor KPIs, revenue, inventory levels, and customer engagement with beautiful, easy-to-understand
                  dashboards updated in real-time.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-blue-600" />
                  Marketing Automation
                </h3>
                <p className="text-gray-600">
                  Generate engaging social media content automatically and post directly to your integrated social media
                  accounts.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  Predictive Forecasting
                </h3>
                <p className="text-gray-600">
                  Predict customer demand, prevent stockouts, and optimize inventory levels with AI-powered demand
                  forecasting.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-blue-600" />
                  Enterprise Security
                </h3>
                <p className="text-gray-600">
                  Bank-level encryption, role-based access control, and regular security audits protect your business
                  data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-bold mb-2">500+</div>
              <p className="text-blue-100">SMEs Growing Their Business</p>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold mb-2">45%</div>
              <p className="text-blue-100">Average Revenue Growth</p>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold mb-2">24/7</div>
              <p className="text-blue-100">AI-Powered Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Ready to grow your business?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of SMEs already using Uddokta AI to make smarter decisions and accelerate growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base"
              >
                Start Your Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-gray-300 text-gray-900 hover:bg-gray-100 bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">⚡</span>
                </div>
                <span className="font-bold text-gray-900">Uddokta AI</span>
              </div>
              <p className="text-gray-600 text-sm">Autonomous Business Intelligence for SMEs</p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">© 2025 Uddokta AI. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                Twitter
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                LinkedIn
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                Facebook
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
