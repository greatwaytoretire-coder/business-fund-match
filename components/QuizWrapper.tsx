'use client';
import Quiz from './Quiz';

export default function QuizWrapper() {
  // This function satisfies the required 'onComplete' prop
  const handleComplete = (data: any) => {
    console.log("Quiz completed", data);
  };

  return <Quiz onComplete={handleComplete} />;
}