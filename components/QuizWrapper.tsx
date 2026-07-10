'use client';
import Quiz from './Quiz';

export default function QuizWrapper() {
  // This satisfies the required 'onComplete' prop and prevents build failures
  const handleComplete = (data: any) => {
    console.log("Quiz completed", data);
  };

  return <Quiz onComplete={handleComplete} />;
}