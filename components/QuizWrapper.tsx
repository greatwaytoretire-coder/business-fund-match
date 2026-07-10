'use client';
import Quiz from './Quiz';

export default function QuizWrapper() {
  // This satisfies the requirement for the onComplete prop
  const handleComplete = (data: any) => {
    console.log("Quiz completed", data);
  };

  return <Quiz onComplete={handleComplete} />;
}