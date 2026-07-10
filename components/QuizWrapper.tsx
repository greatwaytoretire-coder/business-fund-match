'use client';
import Quiz from './Quiz';

export default function QuizWrapper() {
  // Providing a function to satisfy the onComplete requirement
  const handleComplete = (data: any) => {
    console.log("Quiz completed", data);
  };

  return <Quiz onComplete={handleComplete} />;
}