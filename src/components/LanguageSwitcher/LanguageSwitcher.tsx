"use client";
import React from 'react';
import { useLanguage } from './LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();


  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value); // Set the new language
  };

  return (
    <>
      <select value={language} onChange={handleChange}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="mr">Marathi</option>
        <option value="bn">Bengali</option>
      </select>
      {/* Div for Google Translate element */}
      <div id="google_translate_element"></div>
    </>
  );
};

export default LanguageSelector;
