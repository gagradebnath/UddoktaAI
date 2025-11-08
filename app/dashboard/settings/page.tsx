"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SettingsIcon } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<any>(null)
  const { t } = useLanguage()

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
        <h1 className="text-3xl font-bold text-[#333333] mb-1 flex items-center gap-2">
          <SettingsIcon className="w-8 h-8" />
          {t('settings.title')}
        </h1>
        <p className="text-[#555555]">{t('settings.subtitle')}</p>
      </div>

      {/* Business Profile */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-[#333333]">{t('settings.businessProfile')}</CardTitle>
          <CardDescription className="text-[#555555]">{t('settings.businessProfileDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="business-name" className="text-[#333333]">
                {t('settings.businessName')}
              </Label>
              <Input
                id="business-name"
                defaultValue={user.businessName}
                className="bg-white border-gray-300 text-[#333333]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#333333]">
                {t('settings.email')}
              </Label>
              <Input id="email" defaultValue={user.email} className="bg-white border-gray-300 text-[#333333]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-type" className="text-[#333333]">
                {t('settings.businessType')}
              </Label>
              <Select defaultValue={user.type}>
                <SelectTrigger className="bg-white border-gray-300 text-[#333333]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="Retail">{t('businessTypes.retail')}</SelectItem>
                  <SelectItem value="F&B">{t('businessTypes.fb')}</SelectItem>
                  <SelectItem value="Manufacturing">{t('businessTypes.manufacturing')}</SelectItem>
                  <SelectItem value="Services">{t('businessTypes.services')}</SelectItem>
                  <SelectItem value="E-commerce">{t('businessTypes.ecommerce')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="bg-[#F57C20] hover:bg-[#E06D1A] text-white">{t('settings.saveChanges')}</Button>
        </CardContent>
      </Card>

      {/* AI Preferences */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-[#333333]">{t('settings.aiPreferences')}</CardTitle>
          <CardDescription className="text-[#555555]">{t('settings.aiPreferencesDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#F9FAFB] border border-gray-200">
              <label htmlFor="inventory-alerts" className="flex-1 cursor-pointer">
                <p className="text-[#333333] font-medium">{t('settings.inventoryAlerts')}</p>
                <p className="text-sm text-[#555555]">{t('settings.inventoryAlertsDesc')}</p>
              </label>
              <input 
                id="inventory-alerts"
                type="checkbox" 
                defaultChecked 
                className="w-4 h-4 cursor-pointer"
                aria-label={t('settings.inventoryAlerts')}
                title={t('settings.inventoryAlerts')}
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#F9FAFB] border border-gray-200">
              <label htmlFor="marketing-insights" className="flex-1 cursor-pointer">
                <p className="text-[#333333] font-medium">{t('settings.marketingInsights')}</p>
                <p className="text-sm text-[#555555]">{t('settings.marketingInsightsDesc')}</p>
              </label>
              <input 
                id="marketing-insights"
                type="checkbox" 
                defaultChecked 
                className="w-4 h-4 cursor-pointer"
                aria-label={t('settings.marketingInsights')}
                title={t('settings.marketingInsights')}
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-[#F9FAFB] border border-gray-200">
              <label htmlFor="customer-support-automation" className="flex-1 cursor-pointer">
                <p className="text-[#333333] font-medium">{t('settings.customerSupportAutomation')}</p>
                <p className="text-sm text-[#555555]">{t('settings.customerSupportAutomationDesc')}</p>
              </label>
              <input 
                id="customer-support-automation"
                type="checkbox" 
                defaultChecked 
                className="w-4 h-4 cursor-pointer"
                aria-label={t('settings.customerSupportAutomation')}
                title={t('settings.customerSupportAutomation')}
              />
            </div>
          </div>
          <Button className="bg-[#F57C20] hover:bg-[#E06D1A] text-white">{t('settings.savePreferences')}</Button>
        </CardContent>
      </Card>

      {/* API Configuration */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-[#333333]">{t('settings.apiConfiguration')}</CardTitle>
          <CardDescription className="text-[#555555]">{t('settings.apiConfigurationDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key" className="text-[#333333]">
              {t('settings.apiKey')}
            </Label>
            <Input
              id="api-key"
              type="password"
              defaultValue="sk_demo_xxxxxxxxxxxxx"
              className="bg-white border-gray-300 text-[#333333]"
            />
            <p className="text-xs text-[#555555]">Keep your API key confidential</p>
          </div>
          <Button variant="outline" className="border-gray-300 text-[#555555] hover:bg-[#F9FAFB] bg-transparent">
            {t('settings.generateNewKey')}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
