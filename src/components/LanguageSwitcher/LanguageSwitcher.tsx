// components/LanguageSelector.tsx
"use client"
import React from 'react';

const LanguageSelector = () => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value;

    // Load Google Translate script if not already loaded
    if (!document.getElementById('google-translate-script')) {
      const googleTranslateScript = document.createElement('script');
      googleTranslateScript.src = `https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
      googleTranslateScript.id = 'google-translate-script';
      document.body.appendChild(googleTranslateScript);
    }

    // Initialize Google Translate once the script is loaded
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,hi,mr',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      }, 'google_translate_element');
    };

    // Trigger language change
    const frame = document.querySelector('iframe.goog-te-banner-frame');
    if (frame) {
      const selectBox = frame.contentWindow.document.querySelector('.goog-te-combo') as HTMLSelectElement;
      selectBox.value = lang;
      selectBox.dispatchEvent(new Event('change'));
    }
  };

  return (
    <select onChange={handleChange}>
      <option value="en">English</option>
      <option value="hi">Hindi</option>
      <option value="mr">Marathi</option>
    </select>
  );
};

export default LanguageSelector;