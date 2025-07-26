import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestionsByCategory } from "../api/api";

function TestPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [lastFeedback, setLastFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestionsByCategory(categoryId);
        if (data.questions && data.category) {
          setQuestions(data.questions);
          setCategoryName(data.category.name);
        } else {
          throw new Error("Invalid data format");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions. Please try again later.");
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [categoryId]);

  useEffect(() => {
    if (questions.length === 0) return;

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
  }, [questions]);

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
        }, 1500);
      } else {
        setTimeout(() => setShowResult(true), 1500);
      }
    }
  };

  const handleFinish = () => {
    setShowResult(true);
  };

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setTimeLeft(300);
    setShowResult(false);
    setAnswers([]);
    setLastFeedback("");
  };

  const handleReturnToCategories = () => {
    navigate("/");
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  if (loading) {
    return (
      <div style={{ 
        padding: "2rem", 
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}>
        <div>
          <p>Loading questions for {categoryName || "this category"}...</p>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: "2rem", 
        textAlign: "center",
        maxWidth: "600px",
        margin: "0 auto"
      }}>
        <h2 style={{ color: "#e53935" }}>Error Loading Test</h2>
        <p>{error}</p>
        <button
          onClick={handleReturnToCategories}
          style={{
            marginTop: "1rem",
            backgroundColor: "#1565C0",
            color: "white",
            padding: "0.6rem 1.5rem",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Return to Categories
        </button>
      </div>
    );
  }

  if (!questions.length && !loading) {
    return (
      <div style={{ 
        padding: "2rem", 
        textAlign: "center",
        maxWidth: "600px",
        margin: "0 auto"
      }}>
        <h2>No Questions Available</h2>
        <p>There are no questions available for {categoryName || "this category"}.</p>
        <button
          onClick={handleReturnToCategories}
          style={{
            marginTop: "1rem",
            backgroundColor: "#1565C0",
            color: "white",
            padding: "0.6rem 1.5rem",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Return to Categories
        </button>
      </div>
    );
  }

  const currentQuestion = questions[current];

  if (showResult) {
    const attempted = answers.length;
    const percentage = attempted > 0 ? ((score / attempted) * 100).toFixed(2) : 0;
    const wrongAnswers = answers.filter(a => !a.isCorrect);

    return (
      <div style={{ 
        padding: "2rem", 
        maxWidth: "800px", 
        margin: "0 auto", 
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ 
          textAlign: "center", 
          color: "#1565C0",
          marginBottom: "1rem"
        }}>
          Test Results: {categoryName}
        </h2>
        
        <div style={{ 
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
          padding: "1rem",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px"
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.9rem", color: "#616161" }}>Questions</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{questions.length}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.9rem", color: "#616161" }}>Attempted</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{attempted}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.9rem", color: "#616161" }}>Correct</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#388e3c" }}>{score}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.9rem", color: "#616161" }}>Score</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{percentage}%</div>
          </div>
        </div>

        {wrongAnswers.length === 0 ? (
          <div style={{ 
            textAlign: "center",
            padding: "2rem",
            backgroundColor: "#e8f5e9",
            borderRadius: "8px",
            marginBottom: "2rem"
          }}>
            <h3 style={{ color: "#388e3c" }}>Perfect Score! 🎉</h3>
            <p>You answered all questions correctly!</p>
          </div>
        ) : (
          <>
            <h3 style={{ 
              marginTop: "1rem", 
              color: "#e53935",
              paddingBottom: "0.5rem",
              borderBottom: "1px solid #eee"
            }}>
              Review Incorrect Answers ({wrongAnswers.length})
            </h3>
            {wrongAnswers.map((a, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #ffcdd2",
                  padding: "1rem",
                  marginBottom: "1rem",
                  borderRadius: "6px",
                  backgroundColor: "#ffebee"
                }}
              >
                <strong>Question {answers.findIndex(ans => ans.question === a.question) + 1}:</strong> {a.question}
                <div style={{ marginTop: "0.5rem" }}>
                  <span style={{ color: "#d32f2f", display: "inline-block", marginRight: "1rem" }}>
                    <strong>Your Answer:</strong> {a.selected.toUpperCase()}
                  </span>
                  <span style={{ color: "#388e3c" }}>
                    <strong>Correct Answer:</strong> {a.correct.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </>
        )}

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "2rem"
        }}>
          <button
            onClick={handleRestart}
            style={{
              backgroundColor: "#1565C0",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "0.8rem 1.5rem",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem"
            }}
          >
            Restart Test
          </button>
          <button
            onClick={handleReturnToCategories}
            style={{
              backgroundColor: "#e0e0e0",
              color: "#424242",
              border: "none",
              borderRadius: "5px",
              padding: "0.8rem 1.5rem",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem"
            }}
          >
            Return to Categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: "2rem", 
      maxWidth: "800px", 
      margin: "0 auto", 
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "1.5rem",
        paddingBottom: "1rem",
        borderBottom: "1px solid #eee"
      }}>
        <div>
          <h2 style={{ 
            fontSize: "1.2rem", 
            color: "#1565C0",
            margin: 0
          }}>
            {categoryName}
          </h2>
          <p style={{ 
            fontSize: "0.9rem", 
            color: "#616161",
            margin: "0.25rem 0 0 0"
          }}>
            Question {current + 1} of {questions.length}
          </p>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ 
            backgroundColor: "#e3f2fd",
            padding: "0.5rem 1rem",
            borderRadius: "20px",
            fontWeight: "bold",
            color: "#0d47a1"
          }}>
            Time: {formatTime(timeLeft)}
          </div>
          <button
            onClick={handleFinish}
            style={{
              backgroundColor: "#e53935",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "0.9rem"
            }}
          >
            Finish Test
          </button>
        </div>
      </div>

      <div
        style={{
          border: "1px solid #e0e0e0",
          padding: "2rem",
          borderRadius: "10px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
        }}
      >
        <h2 style={{ 
          fontSize: "1.4rem", 
          fontWeight: "bold", 
          color: "#0d47a1",
          marginBottom: "1.5rem"
        }}>
          {currentQuestion.questionText}
        </h2>

        <div style={{ marginTop: "1.2rem" }}>
          {["A", "B", "C", "D"].map((opt) => (
            <label
              key={opt}
              style={{
                display: "block",
                margin: "0.8rem 0",
                padding: "0.8rem 1.2rem",
                backgroundColor: selected === opt ? "#e3f2fd" : "#f5f5f5",
                border: selected === opt ? "2px solid #1565C0" : "1px solid #e0e0e0",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              <input
                type="radio"
                name="option"
                value={opt}
                checked={selected === opt}
                onChange={() => setSelected(opt)}
                style={{ 
                  marginRight: "0.8rem",
                  transform: "scale(1.2)"
                }}
              />
              <span style={{ fontWeight: selected === opt ? "bold" : "normal" }}>
                {currentQuestion[`option${opt}`]}
              </span>
            </label>
          ))}
        </div>

        {lastFeedback && (
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem",
              fontWeight: "bold",
              color: lastFeedback.startsWith("Correct") ? "#388e3c" : "#d32f2f",
              fontSize: "1rem",
              backgroundColor: lastFeedback.startsWith("Correct") ? "#e8f5e9" : "#ffebee",
              borderRadius: "6px",
              textAlign: "center"
            }}
          >
            {lastFeedback}
          </div>
        )}

        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "2rem"
        }}>
          <button
            onClick={handleNext}
            disabled={!selected}
            style={{
              backgroundColor: "#1565C0",
              color: "white",
              padding: "0.8rem 2rem",
              border: "none",
              borderRadius: "6px",
              cursor: selected ? "pointer" : "not-allowed",
              fontWeight: "bold",
              fontSize: "1rem",
              opacity: selected ? 1 : 0.7,
              transition: "all 0.2s ease"
            }}
          >
            {current + 1 < questions.length ? "Next Question →" : "Finish Test"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestPage;