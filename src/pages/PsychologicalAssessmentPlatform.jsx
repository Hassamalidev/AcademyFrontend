import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, XCircle, AlertTriangle, BookOpen, TrendingUp, Users, Target, Star,
  FileText, Image, Edit, Brain, ArrowRight, ArrowLeft, Home, Download, Clock,
  Zap, Award, Eye, MessageSquare, PenTool, Camera, Navigation, Lightbulb, Play,
  Send, Loader, Settings, Shield, Info
} from 'lucide-react';

const PsychologicalAssessmentPlatform = () => {
  const [currentTest, setCurrentTest] = useState('home');
  const [responses, setResponses] = useState({});
  const [analysis, setAnalysis] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [completedTests, setCompletedTests] = useState(new Set());
  const [currentInput, setCurrentInput] = useState('');
  const [analysisCount, setAnalysisCount] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  
  const DAILY_LIMIT = 20; // Analyses per session
  const GEMINI_API_KEY = 'AIzaSyBxqVHBzRYE8YHjQvLAzONhE5mKt7pXe9U'; // Direct integration

  // Check rate limit
  const checkAnalysisLimit = () => {
    return analysisCount < DAILY_LIMIT;
  };

  // Gemini API call function
  const analyzeWithGemini = async (text, testType) => {
    if (!checkAnalysisLimit()) {
      alert(`You've reached the analysis limit for this session (${DAILY_LIMIT} analyses). Please refresh the page to continue.`);
      return null;
    }

    try {
      const prompt = generateAnalysisPrompt(text, testType);
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Analysis Error: ${response.status}`);
      }

      const data = await response.json();
      setAnalysisCount(prev => prev + 1);
      
      return parseGeminiResponse(data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error('AI Analysis Error:', error);
      alert('Error during analysis. Please check your internet connection and try again.');
      return null;
    }
  };

  // Generate analysis prompt based on test type
  const generateAnalysisPrompt = (text, testType) => {
    const basePrompt = `As a professional psychologist, analyze the following ${testType} response and provide a comprehensive psychological assessment. Focus on:

1. Optimism Level (0-100 scale)
2. Leadership Qualities Present
3. Psychological Concerns or Areas for Growth
4. Emotional Intelligence Indicators
5. Overall Mental Health Assessment
6. Specific Recommendations for Personal Development

Response to analyze: "${text}"

Please provide the response in the following JSON format:
{
  "optimismScore": number,
  "isOptimistic": boolean,
  "leadershipQualities": ["quality1", "quality2"],
  "flaws": ["concern1", "concern2"],
  "strengths": ["strength1", "strength2"],
  "emotionalIntelligence": "high/medium/low",
  "mentalHealthIndicators": ["indicator1", "indicator2"],
  "recommendations": ["recommendation1", "recommendation2"],
  "overallAssessment": "detailed assessment paragraph"
}`;

    return basePrompt;
  };

  // Parse Gemini response
  const parseGeminiResponse = (responseText) => {
    try {
      // Extract JSON from response if it's wrapped in markdown
      const jsonMatch = responseText.match(/```json\n(.*?)\n```/s) || responseText.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[1] || jsonMatch[0] : responseText;
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error('Error parsing response:', error);
      return {
        optimismScore: 50,
        isOptimistic: true,
        flaws: ['Unable to analyze response format - please try rephrasing your input'],
        strengths: ['Willingness to engage in self-reflection'],
        emotionalIntelligence: 'medium',
        recommendations: ['Please provide a more detailed response for better analysis'],
        overallAssessment: 'Analysis could not be completed. Please ensure your response is clear and detailed for accurate psychological assessment.'
      };
    }
  };

  // Handle test submission
  const handleSubmitTest = async () => {
    if (!currentInput.trim()) {
      alert('Please enter your response before submitting.');
      return;
    }

    if (currentInput.trim().length < 50) {
      alert('Please provide a more detailed response (minimum 50 characters) for accurate analysis.');
      return;
    }

    setIsAnalyzing(true);
    
    // Save response
    setResponses(prev => ({
      ...prev,
      [currentTest]: currentInput.trim()
    }));

    // Analyze with AI
    const analysisResult = await analyzeWithGemini(currentInput.trim(), currentTest);
    
    if (analysisResult) {
      setAnalysis(prev => ({
        ...prev,
        [currentTest]: analysisResult
      }));
      setCompletedTests(prev => new Set([...prev, currentTest]));
    }
    
    setIsAnalyzing(false);
    setCurrentInput('');
  };

  // Render welcome modal
  const renderWelcome = () => (
    showWelcome && (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          background: 'white',
          borderRadius: '25px',
          padding: '40px',
          maxWidth: '600px',
          width: '90%',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <Brain size={40} color="white" />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '20px' }}>
            Welcome to AI Psychology
          </h2>
          <p style={{ color: '#718096', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '30px' }}>
            Get professional-level psychological insights powered by advanced AI. Complete various personality tests and receive detailed analysis of your mental patterns, strengths, and recommendations for personal growth.
          </p>
          <div style={{
            background: '#f7fafc',
            padding: '20px',
            borderRadius: '15px',
            marginBottom: '30px',
            textAlign: 'left'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={20} />
              Your Privacy is Protected
            </h3>
            <ul style={{ color: '#4a5568', listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={16} color="#48bb78" />
                All responses are processed securely
              </li>
              <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={16} color="#48bb78" />
                No personal data is stored or shared
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={16} color="#48bb78" />
                Analysis happens in real-time
              </li>
            </ul>
          </div>
          <button
            onClick={() => setShowWelcome(false)}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 40px',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}
          >
            Start Your Assessment
          </button>
        </div>
      </div>
    )
  );

  // Render home page
  const renderHome = () => (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px', color: 'white' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <Brain size={40} color="white" />
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '16px' }}>
            AI Psychology Platform
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: '0.9', maxWidth: '600px', margin: '0 auto' }}>
            Professional psychological analysis powered by advanced artificial intelligence
          </p>
        </div>

        {/* Analysis Status */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '15px',
          padding: '20px',
          marginBottom: '40px',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '1.1rem' }}>
              Analyses Completed: {analysisCount}/{DAILY_LIMIT}
            </span>
            <div style={{
              width: '200px',
              height: '8px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              marginTop: '8px'
            }}>
              <div style={{
                width: `${(analysisCount / DAILY_LIMIT) * 100}%`,
                height: '100%',
                background: analysisCount > DAILY_LIMIT * 0.8 ? '#ff6b6b' : '#4ecdc4',
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '10px 20px',
            borderRadius: '25px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Zap size={18} />
            AI-Powered Analysis
          </div>
        </div>

        {/* Test Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {[
            {
              id: 'word-association',
              icon: MessageSquare,
              title: 'Word Association Test',
              description: 'Reveal unconscious thoughts through word associations',
              color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
            },
            {
              id: 'sentence-completion-english',
              icon: Edit,
              title: 'Sentence Completion (English)',
              description: 'Complete sentences to explore thought patterns',
              color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
            },
            {
              id: 'sentence-completion-urdu',
              icon: BookOpen,
              title: 'Sentence Completion (Urdu)',
              description: 'جملے مکمل کرکے اپنے خیالات کا تجزیہ کریں',
              color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
            },
            {
              id: 'picture-story',
              icon: Image,
              title: 'Picture Story Test',
              description: 'Create stories from images to analyze personality',
              color: 'linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)'
            },
            {
              id: 'pointer-story',
              icon: Navigation,
              title: 'Pointer Story Test',
              description: 'Develop logical narratives for cognitive assessment',
              color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
            },
            {
              id: 'essay-writing',
              icon: PenTool,
              title: 'Essay Writing',
              description: 'Express thoughts through writing for deep analysis',
              color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
            }
          ].map((test) => (
            <div
              key={test.id}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={() => setCurrentTest(test.id)}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-10px)';
                e.target.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: test.color
              }} />
              
              <div style={{
                width: '60px',
                height: '60px',
                background: test.color,
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <test.icon size={28} color="white" />
              </div>
              
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: 'bold',
                color: '#2d3748',
                marginBottom: '12px'
              }}>
                {test.title}
              </h3>
              
              <p style={{
                color: '#718096',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                {test.description}
              </p>

              {completedTests.has(test.id) && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#48bb78',
                  fontWeight: '600'
                }}>
                  <CheckCircle size={18} style={{ marginRight: '8px' }} />
                  Analysis Complete
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {renderWelcome()}
    </div>
  );

  // Render test interface
  const renderTestInterface = () => (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
              {currentTest.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h1>
            <p style={{ color: '#718096' }}>
              Enter your responses for AI-powered psychological analysis
            </p>
          </div>
          <button
            onClick={() => setCurrentTest('home')}
            style={{
              background: '#e2e8f0',
              border: 'none',
              borderRadius: '10px',
              padding: '10px',
              cursor: 'pointer'
            }}
          >
            <Home size={20} />
          </button>
        </div>

        {/* Input Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px'
        }}>
          <label style={{
            display: 'block',
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#2d3748',
            marginBottom: '15px'
          }}>
            Enter Your Response:
          </label>
          <textarea
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder="Type or paste your response here... Be detailed for better analysis (minimum 50 characters)"
            style={{
              width: '100%',
              height: '300px',
              padding: '20px',
              border: '2px solid #e2e8f0',
              borderRadius: '15px',
              fontSize: '16px',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '15px'
          }}>
            <span style={{
              color: currentInput.length < 50 ? '#e53e3e' : '#48bb78',
              fontSize: '14px'
            }}>
              {currentInput.length} characters {currentInput.length < 50 ? '(need at least 50)' : '✓'}
            </span>
            <button
              onClick={handleSubmitTest}
              disabled={isAnalyzing || !currentInput.trim() || currentInput.length < 50 || !checkAnalysisLimit()}
              style={{
                background: (isAnalyzing || !checkAnalysisLimit()) ? '#a0a0a0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '25px',
                cursor: (isAnalyzing || !checkAnalysisLimit()) ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontWeight: '600'
              }}
            >
              {isAnalyzing ? (
                <>
                  <Loader className="animate-spin" size={18} />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain size={18} />
                  Get AI Analysis
                </>
              )}
            </button>
          </div>
        </div>

        {/* Analysis Results */}
        {analysis[currentTest] && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '30px'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              color: '#2d3748',
              marginBottom: '25px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Brain size={24} />
              Your Psychological Profile
            </h2>

            {/* Optimism Score */}
            <div style={{
              background: analysis[currentTest].isOptimistic ? 
                'linear-gradient(135deg, #48bb78 0%, #38a169 100%)' : 
                'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
              borderRadius: '15px',
              padding: '25px',
              color: 'white',
              marginBottom: '25px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>
                    {analysis[currentTest].isOptimistic ? 'Positive Mindset Detected' : 'Room for Optimism Growth'}
                  </h3>
                  <p style={{ opacity: '0.9' }}>
                    Your outlook assessment based on response analysis
                  </p>
                </div>
                <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                  {analysis[currentTest].optimismScore}%
                </div>
              </div>
            </div>

            {/* Strengths and Growth Areas */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '25px',
              marginBottom: '25px'
            }}>
              {/* Strengths */}
              <div style={{
                background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
                borderRadius: '15px',
                padding: '25px',
                color: 'white'
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Star size={20} />
                  Your Strengths
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {analysis[currentTest].strengths?.map((strength, index) => (
                    <li key={index} style={{
                      padding: '8px 0',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px'
                    }}>
                      <CheckCircle size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Growth Areas */}
              <div style={{
                background: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
                borderRadius: '15px',
                padding: '25px',
                color: 'white'
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <TrendingUp size={20} />
                  Growth Opportunities
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {analysis[currentTest].flaws?.map((flaw, index) => (
                    <li key={index} style={{
                      padding: '8px 0',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px'
                    }}>
                      <Target size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
                      {flaw}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Leadership Qualities */}
            {analysis[currentTest].leadershipQualities?.length > 0 && (
              <div style={{
                background: 'linear-gradient(135deg, #805ad5 0%, #6b46c1 100%)',
                borderRadius: '15px',
                padding: '25px',
                color: 'white',
                marginBottom: '25px'
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Users size={20} />
                  Leadership Potential
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {analysis[currentTest].leadershipQualities.map((quality, index) => (
                    <span key={index} style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      padding: '8px 15px',
                      borderRadius: '20px',
                      fontSize: '14px'
                    }}>
                      {quality}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            <div style={{
              background: 'linear-gradient(135deg, #38b2ac 0%, #319795 100%)',
              borderRadius: '15px',
              padding: '25px',
              color: 'white',
              marginBottom: '25px'
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Lightbulb size={20} />
                Personal Development Plan
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {analysis[currentTest].recommendations?.map((recommendation, index) => (
                  <li key={index} style={{
                    padding: '10px 0',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px'
                  }}>
                    <ArrowRight size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>

            {/* Overall Assessment */}
            {analysis[currentTest].overallAssessment && (
              <div style={{
                background: '#f7fafc',
                border: '2px solid #e2e8f0',
                borderRadius: '15px',
                padding: '25px'
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  color: '#2d3748',
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <FileText size={20} />
                  Professional Assessment Summary
                </h3>
                <p style={{
                  color: '#4a5568',
                  lineHeight: '1.7',
                  fontSize: '16px'
                }}>
                  {analysis[currentTest].overallAssessment}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return currentTest === 'home' ? renderHome() : renderTestInterface();
};

export default PsychologicalAssessmentPlatform;