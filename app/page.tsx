"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BarChart3, Brain, MessageSquare, TrendingUp, Shield, Zap } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"


export default function LandingPage() {
  const { t } = useLanguage()
  
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
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/auth">
              <Button className="bg-[#F57C20] hover:bg-[#E86E12] text-white font-semibold">{t('nav.getStarted')}</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#333333] text-balance">
              {t('hero.title')}
            </h1>
            <p className="text-base sm:text-lg text-[#555555] max-w-xl text-balance leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/auth" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#F57C20] hover:bg-[#E86E12] text-white font-semibold text-base"
                >
                  {t('hero.startFreeTrial')} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-[#F57C20] text-[#F57C20] hover:bg-[#FFF1E6] bg-transparent"
              >
                {t('nav.watchDemo')}
              </Button>
            </div>
            <p className="text-sm text-[#888888]">{t('hero.freeTrialInfo')}</p>
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-[#333333]">{t('businessTools.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
            <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#E0E0E0] hover:border-[#F57C20] transition-colors">
              <h3 className="text-lg font-bold text-[#333333] mb-3">{t('businessTools.increaseRevenue.title')}</h3>
              <p className="text-[#555555]">
                {t('businessTools.increaseRevenue.description')}
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#E0E0E0] hover:border-[#F57C20] transition-colors">
              <h3 className="text-lg font-bold text-[#333333] mb-3">{t('businessTools.connectPlatforms.title')}</h3>
              <p className="text-[#555555]">
                {t('businessTools.connectPlatforms.description')}
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#E0E0E0] hover:border-[#F57C20] transition-colors">
              <h3 className="text-lg font-bold text-[#333333] mb-3">{t('businessTools.trackPerformance.title')}</h3>
              <p className="text-[#555555]">
                {t('businessTools.trackPerformance.description')}
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#E0E0E0] hover:border-[#F57C20] transition-colors">
              <h3 className="text-lg font-bold text-[#333333] mb-3">{t('businessTools.automateMarketing.title')}</h3>
              <p className="text-[#555555]">
                {t('businessTools.automateMarketing.description')}
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#E0E0E0] hover:border-[#F57C20] transition-colors">
              <h3 className="text-lg font-bold text-[#333333] mb-3">{t('businessTools.optimizeOperations.title')}</h3>
              <p className="text-[#555555]">
                {t('businessTools.optimizeOperations.description')}
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#E0E0E0] hover:border-[#F57C20] transition-colors">
              <h3 className="text-lg font-bold text-[#333333] mb-3">{t('businessTools.scaleGlobally.title')}</h3>
              <p className="text-[#555555]">
                {t('businessTools.scaleGlobally.description')}
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#333333] mb-4 sm:mb-6">{t('cta.title')}</h2>
          <p className="text-base sm:text-lg text-[#555555] mb-6 sm:mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#F57C20] hover:bg-[#E86E12] text-white font-semibold text-base"
              >
                {t('cta.startToday')} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-[#F57C20] text-[#F57C20] hover:bg-[#FFF1E6] bg-transparent"
            >
              {t('nav.watchDemo')}
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
