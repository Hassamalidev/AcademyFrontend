import { useEffect, useState } from "react";
import { getRandomQuestions } from "../api/api";

function TestPage() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [lastFeedback, setLastFeedback] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getRandomQuestions();
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowResult(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (selected) {
      const q = questions[current];
      const isCorrect = selected.toUpperCase() === q.correctOption.toUpperCase();
      if (isCorrect) setScore(score + 1);

      setAnswers([
        ...answers,
        {
          question: q.questionText,
          selected,
          correct: q.correctOption,
          isCorrect,
        },
      ]);

      setLastFeedback(isCorrect ? "Correct!" : `Wrong! Correct Answer: ${q.correctOption.toUpperCase()}`);
      setSelected(null);
      if (current + 1 < questions.length) {
        setTimeout(() => {
          setCurrent(current + 1);
          setLastFeedback("");
        }, 1500); // Wait before next question
      } else {
        setTimeout(() => setShowResult(true), 1500);
      }
    }
  };

  const handleFinish = () => {
    setShowResult(true);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  if (!questions.length) return <p style={{ padding: "2rem", textAlign: "center" }}>Loading Questions...</p>;

  const currentQuestion = questions[current];

  if (showResult) {
    const attempted = answers.length;
    const percentage = ((score / attempted) * 100).toFixed(2);
    const wrongAnswers = answers.filter(a => !a.isCorrect);

    return (
      <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", backgroundColor: "#fff" }}>
        <h2 style={{ textAlign: "center", color: "#1565C0" }}>Your Test Result</h2>
        <div style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
          <p>Attempted: {attempted} / {questions.length}</p>
          <p>Correct: {score}</p>
          <p style={{ fontWeight: "bold" }}>Score: {percentage}%</p>
        </div>

        <hr />

        <h3 style={{ marginTop: "1rem", color: "#e53935" }}>Review Incorrect Answers:</h3>
        {wrongAnswers.length === 0 ? (
          <p style={{ color: "green", fontWeight: "bold" }}>Excellent! All answers were correct 🎉</p>
        ) : (
          wrongAnswers.map((a, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                marginBottom: "0.75rem",
                borderRadius: "6px",
                backgroundColor: "#fff3f3"
              }}
            >
              <strong>Q{i + 1}:</strong> {a.question}
              <br />
              <span style={{ color: "#d32f2f" }}>Your Answer: {a.selected.toUpperCase()}</span> <br />
              <span style={{ color: "#388e3c" }}>Correct Answer: {a.correct.toUpperCase()}</span>
            </div>
          ))
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", fontFamily: "Arial" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <span style={{ fontWeight: "bold", fontSize: "1.1rem", color: "#37474F" }}>
          Time Left: {formatTime(timeLeft)}
        </span>
        <button
          onClick={handleFinish}
          style={{
            backgroundColor: "#e53935",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "0.4rem 1rem",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Finish Test
        </button>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "2rem",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
        }}
      >
        <h2 style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#0d47a1" }}>
          Q{current + 1}: {currentQuestion.questionText}
        </h2>

        <div style={{ marginTop: "1.2rem" }}>
          {["A", "B", "C", "D"].map((opt) => (
            <label
              key={opt}
              style={{
                display: "block",
                margin: "0.6rem 0",
                padding: "0.6rem 1rem",
                backgroundColor: selected === opt ? "#e3f2fd" : "#fff",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              <input
                type="radio"
                name="option"
                value={opt}
                checked={selected === opt}
                onChange={() => setSelected(opt)}
                style={{ marginRight: "0.6rem" }}
              />
              {currentQuestion[`option${opt}`]}
            </label>
          ))}
        </div>

        {lastFeedback && (
          <div
            style={{
              marginTop: "1rem",
              fontWeight: "bold",
              color: lastFeedback.startsWith("Correct") ? "green" : "red",
              fontSize: "1rem"
            }}
          >
            {lastFeedback}
          </div>
        )}

        <button
          onClick={handleNext}
          disabled={!selected}
          style={{
            marginTop: "1.5rem",
            backgroundColor: "#1565C0",
            color: "white",
            padding: "0.6rem 1.5rem",
            border: "none",
            borderRadius: "5px",
            cursor: selected ? "pointer" : "not-allowed",
            fontWeight: "bold"
          }}
        >
          {current + 1 < questions.length ? "Next" : "Finish"}
        </button>
      </div>
    </div>
  );
}

export default TestPage;
