import React, { useState } from "react";
import Header from "./components/Header";
import Question from "./components/Question";
import questions from "./questions";
import Timer from "./components/Timer";
import { useTimer } from "./hooks/useTimer";

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [studentAnswers, setStudentAnswers] = useState({});
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleTimerExpire = () => {
    if (!showCorrectAnswer) {
      setShowCorrectAnswer(true);
      setTimeLeft(6); // Show the correct answer timer
    } else {
      moveToNextQuestion();
    }
  };

  const [timeLeft, setTimeLeft] = useTimer(6, handleTimerExpire);

  const moveToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setShowCorrectAnswer(false);
    setTimeLeft(6);
  };

  const handleAnswer = (answer) => {
    setStudentAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }));
    setShowCorrectAnswer(true);
    setTimeLeft(6);
  };

  return (
    <>
      <Header />
      <main>
        {currentQuestion && (
          <>
            <Timer timeLeft={timeLeft} />
            <Question
              question={currentQuestion}
              handleAnswer={handleAnswer}
              showCorrectAnswer={showCorrectAnswer}
              selectedAnswer={studentAnswers[currentQuestionIndex]}
            />
          </>
        )}
      </main>
    </>
  );
}

export default App;
