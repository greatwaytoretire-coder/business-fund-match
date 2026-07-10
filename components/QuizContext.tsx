'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define what our quiz data structure looks like
interface QuizData {
  fundingAmount?: string;
  timeInBusiness?: string;
  monthlyRevenue?: string;
  creditScore?: string;
  industry?: string;
  businessName?: string;
  email?: string;
  phone?: string;
  currentStep: number;
}

interface QuizContextType {
  quizState: QuizData;
  updateQuizState: (fields: Partial<QuizData>) => void;
  clearQuizState: () => void;
}

const defaultState: QuizData = {
  fundingAmount: '',
  timeInBusiness: '',
  monthlyRevenue: '',
  creditScore: '',
  industry: '',
  businessName: '',
  email: '',
  phone: '',
  currentStep: 0,
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [quizState, setQuizState] = useState<QuizData>(defaultState);
  const [isHydrated, setIsHydrated] = useState(false);

  // 1. Load data from localStorage when the user first opens any page
  useEffect(() => {
    const savedData = localStorage.getItem('bmf_quiz_progress');
    if (savedData) {
      try {
        setQuizState(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved quiz data", e);
      }
    }
    setIsHydrated(true);
  }, []);

  // 2. Save data to localStorage every single time a user answers a question
  const updateQuizState = (fields: Partial<QuizData>) => {
    setQuizState((prev) => {
      const updated = { ...prev, ...fields };
      localStorage.setItem('bmf_quiz_progress', JSON.stringify(updated));
      return updated;
    });
  };

  // 3. Reset everything once they successfully submit the final lead form
  const clearQuizState = () => {
    localStorage.removeItem('bmf_quiz_progress');
    setQuizState(defaultState);
  };

  // Prevent server/client HTML mismatches during initial loading
  if (!isHydrated) return null;

  return (
    <QuizContext.Provider value={{ quizState, updateQuizState, clearQuizState }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}