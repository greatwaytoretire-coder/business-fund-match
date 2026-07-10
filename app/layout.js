import React from 'react';
import './globals.css';
import { QuizProvider } from '../components/QuizContext';

export const metadata = {
  title: 'BusinessFundMatch | Connect with Elite Underwriting Tiers',
  description: 'Instantly pre-qualify for matching commercial financing solutions using our programmatic lead-routing engine.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        {/* Injecting the global memory tier around all pages */}
        <QuizProvider>
          {children}
        </QuizProvider>
      </body>
    </html>
  );
}