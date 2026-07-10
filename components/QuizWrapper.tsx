'use client';
import Quiz from './Quiz';

export default function QuizWrapper() {
  // This function is required by the Quiz component to build successfully
  const handleComplete = (data: any) => {
    console.log("Quiz completed", data);
  };

  return <Quiz onComplete={handleComplete} />;
}