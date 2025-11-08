'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { Languages } from 'lucide-react'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
      className="flex items-center gap-2"
    >
      <Languages className="h-4 w-4" />
      <span className="hidden sm:inline">{language === 'en' ? 'বাংলা' : 'English'}</span>
      <span className="sm:hidden">{language === 'en' ? 'বাং' : 'EN'}</span>
    </Button>
  )
}
