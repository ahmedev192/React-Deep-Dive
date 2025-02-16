import React from "react";

export default function Question({
  question,
  handleAnswer,
  showCorrectAnswer,
  selectedAnswer,
}) {
  const getButtonStyle = (answer) => {
    if (!showCorrectAnswer) return {};
    if (answer === question.correctAnswer)
      return { backgroundColor: "green", color: "white" };
    if (selectedAnswer === answer)
      return { backgroundColor: "red", color: "white" };
    return {};
  };

  return (
    <div id="question">
      <h2>{question.text}</h2>
      <div>
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(answer)}
            style={getButtonStyle(answer)}
            disabled={showCorrectAnswer}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}
