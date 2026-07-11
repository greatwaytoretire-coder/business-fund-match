"use client";
import Quiz from './Quiz';

export default function QuizWrapper() {
  // Define the function here, where it is allowed to exist!
  const handleComplete = (data: any) => {
    console.log("Data collected:", data);
  };

  return <Quiz onComplete={handleComplete} />;
}