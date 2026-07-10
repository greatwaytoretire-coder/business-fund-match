'use client';
import Quiz from './Quiz';

export default function QuizWrapper() {
  // This forces the site to ignore all wrapper logic 
  // and just show your original Quiz.tsx file.
  return <Quiz />;
}