"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext({
  language: 'en',
  setLanguage: (lang: string) => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'en';
  });

  useEffect(() => {
    // Save selected language to local storage
    localStorage.setItem('selectedLanguage', language);

    // Add Google Translate script if not already present
    if (!document.getElementById('google-translate-script')) {
      const googleTranslateScript = document.createElement('script');
      googleTranslateScript.src = `https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
      googleTranslateScript.id = 'google-translate-script';
      document.body.appendChild(googleTranslateScript);
    }

    // Define the callback function for Google Translate initialization
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,hi,mr,bn',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false, // Prevent automatic display of Google Translate banner
      }, 'google_translate_element');
    };

    // Function to apply the selected language
    const applyLanguageChange = () => {
      const iframe = document.querySelector('iframe.goog-te-banner-frame');
      if (iframe) {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDocument) {
          const selectBox = iframeDocument.querySelector('.goog-te-combo') as HTMLSelectElement;
          if (selectBox) {
            selectBox.value = language; // Set the language
            selectBox.dispatchEvent(new Event('change')); // Trigger the change event
          }
        }
      }
    };

    // Remove the Google Translate banner programmatically
    const removeGoogleTranslateBanner = () => {
      const banner = document.querySelector('.goog-te-banner-frame');
      if (banner) {
        banner.style.display = 'none'; // Hide the banner
      }
    };

    setTimeout(applyLanguageChange, 1000);
    setTimeout(removeGoogleTranslateBanner, 1500); // Hide the banner after it's loaded

  }, [language]); // Rerun effect when language changes

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
