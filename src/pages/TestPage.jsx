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
  const [timeLeft, setTimeLeft] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [lastFeedback, setLastFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(null);
  const [testStarted, setTestStarted] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestionsByCategory(categoryId);
        if (data.questions && data.category) {
          setQuestions(data.questions);
          setCategoryName(data.category.name);
         
          setTimeLeft(data.category.time ? parseInt(data.category.time) * 60 : 300);
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
    if (!timerRunning || !testStarted) return;

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
  }, [timerRunning, testStarted]);

  const startTest = () => {
    setTestStarted(true);
    setTimerRunning(true);
  };

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

      setLastFeedback(isCorrect ? "Correct! ✅" : `Wrong! Correct Answer: ${q.correctOption.toUpperCase()}`);
      setSelected(null);
      if (current + 1 < questions.length) {
        setTimeout(() => {
          setCurrent(current + 1);
          setLastFeedback("");
        }, 1500);
      } else {
        setTimeout(() => {
          setShowResult(true);
          setTimerRunning(false);
        }, 1500);
      }
    }
  };

  const handleFinish = () => {
    setShowResult(true);
    setTimerRunning(false);
  };

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setTimeLeft(questions.length * 60); // Reset time based on question count
    setShowResult(false);
    setAnswers([]);
    setLastFeedback("");
    setTestStarted(false);
    setTimerRunning(false);
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}>
        <div style={{
          textAlign: "center",
          padding: "2rem",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          maxWidth: "500px",
          width: "90%"
        }}>
          <div style={{
            width: "50px",
            height: "50px",
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #4CAF50",
            borderRadius: "50%",
            margin: "0 auto 1rem",
            animation: "spin 1s linear infinite"
          }}></div>
          <p style={{ 
            color: "#333",
            fontSize: "1rem",
            fontWeight: "500"
          }}>
            Loading questions for {categoryName || "this category"}...
          </p>
        </div>
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `
        }} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}>
        <div style={{
          textAlign: "center",
          padding: "2rem",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          maxWidth: "500px",
          width: "90%"
        }}>
          <div style={{
            width: "60px",
            height: "60px",
            backgroundColor: "#fee2e2",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1rem",
            color: "#dc2626",
            fontSize: "24px"
          }}>
            !
          </div>
          <h3 style={{ 
            color: "#dc2626",
            fontSize: "1.25rem",
            marginBottom: "0.5rem"
          }}>
            Error Loading Test
          </h3>
          <p style={{ 
            color: "#666",
            marginBottom: "1.5rem",
            lineHeight: "1.5"
          }}>
            {error}
          </p>
          <button
            onClick={handleReturnToCategories}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "0.8rem 1.5rem",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.3s"
            }}
          >
            Return to Categories
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length && !loading) {
    return (
      <div style={{ 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}>
        <div style={{
          textAlign: "center",
          padding: "2rem",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          maxWidth: "500px",
          width: "90%"
        }}>
          <h3 style={{ 
            color: "#2c3e50",
            fontSize: "1.25rem",
            marginBottom: "0.5rem"
          }}>
            No Questions Available
          </h3>
          <p style={{ 
            color: "#666",
            marginBottom: "1.5rem",
            lineHeight: "1.5"
          }}>
            There are no questions available for {categoryName || "this category"}.
          </p>
          <button
            onClick={handleReturnToCategories}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "0.8rem 1.5rem",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.3s"
            }}
          >
            Return to Categories
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    const attempted = answers.length;
    const percentage = attempted > 0 ? ((score / attempted) * 100).toFixed(2) : 0;
    const wrongAnswers = answers.filter(a => !a.isCorrect);

    return (
      <div style={{ 
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "2rem 1rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}>
        <div style={{ 
          maxWidth: "800px", 
          margin: "0 auto", 
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          padding: "2.5rem",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Decorative elements */}
          <div style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "200px",
            height: "200px",
            backgroundColor: "rgba(76, 175, 80, 0.1)",
            borderRadius: "50%"
          }}></div>
          <div style={{
            position: "absolute",
            bottom: "-30px",
            left: "-30px",
            width: "100px",
            height: "100px",
            backgroundColor: "rgba(76, 175, 80, 0.05)",
            borderRadius: "50%"
          }}></div>
          
          <h2 style={{ 
            textAlign: "center", 
            color: "#2c3e50",
            fontSize: "2rem",
            marginBottom: "1.5rem",
            position: "relative"
          }}>
            Test Results: {categoryName}
          </h2>
          
          <div style={{ 
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
            padding: "1.5rem",
            backgroundColor: "#f5f7fa",
            borderRadius: "12px",
            border: "1px solid #e0e6ed"
          }}>
            <div style={{ 
              textAlign: "center",
              padding: "1rem",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
            }}>
              <div style={{ fontSize: "0.9rem", color: "#7f8c8d", marginBottom: "0.5rem" }}>Questions</div>
              <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#2c3e50" }}>{questions.length}</div>
            </div>
            <div style={{ 
              textAlign: "center",
              padding: "1rem",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
            }}>
              <div style={{ fontSize: "0.9rem", color: "#7f8c8d", marginBottom: "0.5rem" }}>Attempted</div>
              <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#2c3e50" }}>{attempted}</div>
            </div>
            <div style={{ 
              textAlign: "center",
              padding: "1rem",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
            }}>
              <div style={{ fontSize: "0.9rem", color: "#7f8c8d", marginBottom: "0.5rem" }}>Correct</div>
              <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#27ae60" }}>{score}</div>
            </div>
            <div style={{ 
              textAlign: "center",
              padding: "1rem",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
            }}>
              <div style={{ fontSize: "0.9rem", color: "#7f8c8d", marginBottom: "0.5rem" }}>Score</div>
              <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#2c3e50" }}>{percentage}%</div>
            </div>
          </div>

          {wrongAnswers.length === 0 ? (
            <div style={{ 
              textAlign: "center",
              padding: "2rem",
              backgroundColor: "#e8f5e9",
              borderRadius: "12px",
              marginBottom: "2rem",
              border: "1px solid #c8e6c9"
            }}>
              <h3 style={{ color: "#27ae60", fontSize: "1.5rem", marginBottom: "0.5rem" }}>Perfect Score! 🎉</h3>
              <p style={{ color: "#2ecc71", fontSize: "1.1rem" }}>You answered all questions correctly!</p>
            </div>
          ) : (
            <>
              <h3 style={{ 
                marginTop: "1rem", 
                color: "#e74c3c",
                fontSize: "1.3rem",
                paddingBottom: "0.8rem",
                borderBottom: "1px solid #f1f1f1"
              }}>
                Review Incorrect Answers ({wrongAnswers.length})
              </h3>
              {wrongAnswers.map((a, i) => (
                <div
                  key={i}
                  style={{
                    border: "1px solid #ffcdd2",
                    padding: "1.5rem",
                    marginBottom: "1.2rem",
                    borderRadius: "10px",
                    backgroundColor: "#ffebee",
                    position: "relative"
                  }}
                >
                  <div style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "#e74c3c",
                    color: "white",
                    borderRadius: "4px",
                    padding: "0.2rem 0.5rem",
                    fontSize: "0.8rem"
                  }}>
                    Question {answers.findIndex(ans => ans.question === a.question) + 1}
                  </div>
                  <p style={{ 
                    color: "#2c3e50",
                    fontWeight: "500",
                    marginBottom: "1rem"
                  }}>
                    {a.question}
                  </p>
                  <div style={{ 
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem"
                  }}>
                    <div style={{
                      padding: "0.8rem 1rem",
                      backgroundColor: "#ffebee",
                      borderRadius: "8px",
                      border: "1px solid #ef9a9a",
                      flex: "1",
                      minWidth: "200px"
                    }}>
                      <div style={{ 
                        fontSize: "0.8rem",
                        color: "#e74c3c",
                        marginBottom: "0.3rem"
                      }}>
                        Your Answer
                      </div>
                      <div style={{ 
                        fontWeight: "bold",
                        color: "#c0392b"
                      }}>
                        {a.selected.toUpperCase()}
                      </div>
                    </div>
                    <div style={{
                      padding: "0.8rem 1rem",
                      backgroundColor: "#e8f5e9",
                      borderRadius: "8px",
                      border: "1px solid #a5d6a7",
                      flex: "1",
                      minWidth: "200px"
                    }}>
                      <div style={{ 
                        fontSize: "0.8rem",
                        color: "#27ae60",
                        marginBottom: "0.3rem"
                      }}>
                        Correct Answer
                      </div>
                      <div style={{ 
                        fontWeight: "bold",
                        color: "#27ae60"
                      }}>
                        {a.correct.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            marginTop: "3rem",
            flexWrap: "wrap"
          }}>
            <button
              onClick={handleRestart}
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "1rem 2rem",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "1rem",
                transition: "all 0.3s",
                minWidth: "200px",
                ":hover": {
                  backgroundColor: "#3e8e41",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                }
              }}
            >
              Restart Test
            </button>
            <button
              onClick={handleReturnToCategories}
              style={{
                backgroundColor: "#f5f5f5",
                color: "#2c3e50",
                border: "none",
                borderRadius: "8px",
                padding: "1rem 2rem",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "1rem",
                transition: "all 0.3s",
                minWidth: "200px",
                ":hover": {
                  backgroundColor: "#e0e0e0",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                }
              }}
            >
              Return to Categories
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div style={{ 
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "2rem 1rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div style={{ 
          maxWidth: "600px", 
          margin: "0 auto", 
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          padding: "3rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Decorative elements */}
          <div style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "300px",
            height: "300px",
            backgroundColor: "rgba(76, 175, 80, 0.1)",
            borderRadius: "50%"
          }}></div>
          <div style={{
            position: "absolute",
            bottom: "-50px",
            left: "-50px",
            width: "200px",
            height: "200px",
            backgroundColor: "rgba(76, 175, 80, 0.05)",
            borderRadius: "50%"
          }}></div>
          
          <h2 style={{ 
            color: "#2c3e50",
            fontSize: "2rem",
            marginBottom: "1rem",
            position: "relative"
          }}>
            {categoryName} Challenge
          </h2>
          
          <div style={{ 
            backgroundColor: "#f5f7fa",
            borderRadius: "12px",
            padding: "1.5rem",
            margin: "2rem 0",
            border: "1px solid #e0e6ed",
            position: "relative"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem"
            }}>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "0.9rem", color: "#7f8c8d" }}>Questions</div>
                <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{questions.length}</div>
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "0.9rem", color: "#7f8c8d" }}>Time</div>
                <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{formatTime(timeLeft)}</div>
              </div>
            </div>
            <p style={{ 
              color: "#7f8c8d",
              fontSize: "0.95rem",
              lineHeight: "1.6"
            }}>
              This test contains {questions.length} questions to be completed in {Math.floor(timeLeft / 60)} minutes.
              Answer carefully as you can't go back to previous questions.
            </p>
          </div>
          
          <button
            onClick={startTest}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "1rem 2.5rem",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s",
              boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)",
              ":hover": {
                backgroundColor: "#3e8e41",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 16px rgba(76, 175, 80, 0.4)"
              }
            }}
          >
            Start Test Now
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[current];

  return (
    <div style={{ 
      minHeight: "100vh",
      backgroundColor: "#f8f9fa",
      padding: "2rem 1rem",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{ 
        maxWidth: "800px", 
        margin: "0 auto", 
        backgroundColor: "#fff",
        borderRadius: "16px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
        overflow: "hidden"
      }}>
        {/* Header with progress and timer */}
        <div style={{ 
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.5rem 2rem",
          backgroundColor: "#2c3e50",
          color: "white"
        }}>
          <div>
            <h2 style={{ 
              fontSize: "1.2rem", 
              margin: 0,
              fontWeight: "500"
            }}>
              {categoryName}
            </h2>
            <p style={{ 
              fontSize: "0.9rem", 
              margin: "0.25rem 0 0 0",
              opacity: 0.8
            }}>
              Question {current + 1} of {questions.length}
            </p>
          </div>
          
          <div style={{ 
            display: "flex",
            alignItems: "center",
            gap: "1.5rem"
          }}>
            <div style={{ 
              backgroundColor: "rgba(255,255,255,0.2)",
              padding: "0.5rem 1rem",
              borderRadius: "20px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              <span>⏱️</span>
              <span>{formatTime(timeLeft)}</span>
            </div>
            <button
              onClick={handleFinish}
              style={{
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: "20px",
                padding: "0.5rem 1.5rem",
                cursor: "pointer",
                fontWeight: "500",
                fontSize: "0.9rem",
                transition: "all 0.3s",
                ":hover": {
                  backgroundColor: "#c0392b"
                }
              }}
            >
              Finish Test
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          width: "100%",
          height: "4px",
          backgroundColor: "#ecf0f1"
        }}>
          <div style={{
            width: `${((current + 1) / questions.length) * 100}%`,
            height: "100%",
            backgroundColor: "#4CAF50",
            transition: "width 0.3s ease"
          }}></div>
        </div>

        {/* Question content */}
        <div style={{ padding: "2.5rem" }}>
          <h2 style={{ 
            fontSize: "1.5rem", 
            fontWeight: "600", 
            color: "#2c3e50",
            marginBottom: "2rem",
            lineHeight: "1.4"
          }}>
            {currentQuestion.questionText}
          </h2>

          <div style={{ marginTop: "1.5rem" }}>
            {["A", "B", "C", "D"].map((opt) => (
              <label
                key={opt}
                style={{
                  display: "block",
                  margin: "1rem 0",
                  padding: "1.2rem 1.5rem",
                  backgroundColor: selected === opt ? "#e8f5e9" : "#f5f7fa",
                  border: selected === opt ? "2px solid #4CAF50" : "1px solid #e0e6ed",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  ":hover": {
                    backgroundColor: selected === opt ? "#e8f5e9" : "#ebf0f5"
                  }
                }}
              >
                <input
                  type="radio"
                  name="option"
                  value={opt}
                  checked={selected === opt}
                  onChange={() => setSelected(opt)}
                  style={{ 
                    marginRight: "1rem",
                    transform: "scale(1.3)",
                    accentColor: "#4CAF50"
                  }}
                />
                <span style={{ 
                  fontWeight: selected === opt ? "600" : "500",
                  color: selected === opt ? "#2c3e50" : "#2c3e50"
                }}>
                  {currentQuestion[`option${opt}`]}
                </span>
              </label>
            ))}
          </div>

          {lastFeedback && (
            <div
              style={{
                marginTop: "1.5rem",
                padding: "1.2rem",
                fontWeight: "bold",
                color: lastFeedback.startsWith("Correct") ? "#27ae60" : "#e74c3c",
                fontSize: "1rem",
                backgroundColor: lastFeedback.startsWith("Correct") ? "#e8f5e9" : "#ffebee",
                borderRadius: "8px",
                textAlign: "center",
                border: lastFeedback.startsWith("Correct") ? "1px solid #a5d6a7" : "1px solid #ef9a9a"
              }}
            >
              {lastFeedback}
            </div>
          )}

          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "2.5rem"
          }}>
            <button
              onClick={handleNext}
              disabled={!selected}
              style={{
                backgroundColor: !selected ? "#bdc3c7" : "#4CAF50",
                color: "white",
                padding: "1rem 3rem",
                border: "none",
                borderRadius: "8px",
                cursor: selected ? "pointer" : "not-allowed",
                fontWeight: "600",
                fontSize: "1rem",
                transition: "all 0.3s",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                ":hover": {
                  backgroundColor: selected ? "#3e8e41" : "#bdc3c7",
                  transform: selected ? "translateY(-2px)" : "none",
                  boxShadow: selected ? "0 4px 12px rgba(76, 175, 80, 0.3)" : "none"
                }
              }}
            >
              <span>{current + 1 < questions.length ? "Next Question" : "Finish Test"}</span>
              <span style={{ 
                transition: "transform 0.3s",
                transform: selected ? "translateX(3px)" : "none",
                fontSize: "1.2rem"
              }}>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestPage;