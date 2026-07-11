"use client";
import Quiz from './Quiz';

export default function QuizWrapper() {
  return <Quiz onComplete={(data) => console.log(data)} />;
}