import LanguageSelector from '@/components/LanguageSwitcher/LanguageSwitcher'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import React from 'react'

const page = () => {
  return (
    <>
    <LanguageSelector />
    <div id="google_translate_element"></div>
    </>
  )
}

export default page