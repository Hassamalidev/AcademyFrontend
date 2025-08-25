import React, { useState } from 'react';
import { 
  Brain, Home, CheckCircle, Loader, 
  MessageSquare, Edit, BookOpen, Image, Navigation, 
  PenTool, Shield, Info, Zap, Star, TrendingUp, 
  Target, Lightbulb, FileText, ArrowRight, Sparkles
} from 'lucide-react';

// Configuration constants
const CONFIG = {
  DAILY_LIMIT: 20,
  MIN_CHARACTERS: 10,
  COLORS: {
    primaryGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    white: '#ffffff',
    gray100: '#f8f9ff',
    gray200: '#e8f2ff',
    gray300: '#e2e8f0',
    gray400: '#cbd5e0',
    gray500: '#a0aec0',
    gray600: '#718096',
    gray700: '#4a5568',
    gray800: '#2d3748',
    success: '#48bb78',
    warning: '#ed8936',
    error: '#e53e3e'
  },
  SHADOWS: {
    small: '0 5px 15px rgba(102, 126, 234, 0.3)',
    medium: '0 10px 25px rgba(0, 0, 0, 0.05)',
    large: '0 15px 35px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 40px rgba(0, 0, 0, 0.15)'
  },
  BORDER_RADIUS: {
    sm: '12px',
    md: '20px',
    lg: '25px',
    xl: '30px'
  },
  SPACING: {
    xs: '8px',
    sm: '15px',
    md: '20px',
    lg: '25px',
    xl: '30px',
    xxl: '40px'
  },
  TEST_TYPES: [
    {
      id: 'word-association',
      icon: MessageSquare,
      title: 'Word Association Test',
      description: 'Reveal unconscious thoughts through word associations',
      color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      shadowColor: 'rgba(255, 154, 158, 0.3)'
    },
    {
      id: 'sentence-completion-english',
      icon: Edit,
      title: 'Sentence Completion (English)',
      description: 'Complete sentences to explore thought patterns',
      color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      shadowColor: 'rgba(168, 237, 234, 0.3)'
    },
    {
      id: 'sentence-completion-urdu',
      icon: BookOpen,
      title: 'Sentence Completion (Urdu)',
      description: 'جملے مکمل کرکے اپنے خیالات کا تجزیہ کریں',
      color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      shadowColor: 'rgba(255, 236, 210, 0.3)'
    },
    {
      id: 'picture-story',
      icon: Image,
      title: 'Picture Story Test',
      description: 'Create stories from images to analyze personality',
      color: 'linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)',
      shadowColor: 'rgba(168, 192, 255, 0.3)'
    },
    {
      id: 'pointer-story',
      icon: Navigation,
      title: 'Pointer Story Test',
      description: 'Develop logical narratives for cognitive assessment',
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      shadowColor: 'rgba(250, 112, 154, 0.3)'
    },
    {
      id: 'essay-writing',
      icon: PenTool,
      title: 'Essay Writing',
      description: 'Express thoughts through writing for deep analysis',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      shadowColor: 'rgba(79, 172, 254, 0.3)'
    }
  ],
  API_CONFIG: {
    endpoint: "http://localhost:11434/api/generate",
    model: "llama2"
  },
  WELCOME_MESSAGE: {
    title: 'Welcome to AI Psychology',
    description: 'Get professional-level psychological insights powered by advanced AI.',
    privacyItems: [
      'All responses are processed locally on your device',
      'No data is sent to external servers',
      'Analysis happens in real-time using your local AI'
    ]
  }
};

const Card = ({ children, style = {}, ...props }) => (
  <div style={{
    background: CONFIG.COLORS.white,
    borderRadius: CONFIG.BORDER_RADIUS.lg,
    padding: CONFIG.SPACING.xl,
    boxShadow: CONFIG.SHADOWS.medium,
    border: `1px solid ${CONFIG.COLORS.gray300}`,
    ...style
  }} {...props}>
    {children}
  </div>
);

const Button = ({ children, onClick, disabled = false, variant = 'primary', ...props }) => {
  const baseStyle = {
    border: 'none',
    padding: `${CONFIG.SPACING.sm} ${CONFIG.SPACING.xl}`,
    borderRadius: CONFIG.BORDER_RADIUS.lg,
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: CONFIG.SPACING.xs,
    fontWeight: '600',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    ...props.style
  };

  const variants = {
    primary: {
      background: disabled ? 
        'linear-gradient(135deg, #a0a0a0 0%, #808080 100%)' : 
        CONFIG.COLORS.primaryGradient,
      color: CONFIG.COLORS.white,
      boxShadow: disabled ? 'none' : CONFIG.SHADOWS.small
    },
    secondary: {
      background: CONFIG.COLORS.gray100,
      color: CONFIG.COLORS.gray700,
      border: `1px solid ${CONFIG.COLORS.gray300}`
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyle, ...variants[variant] }}
      {...props}
    >
      {children}
    </button>
  );
};

const PsychologicalAssessmentPlatform = () => {
  const [currentTest, setCurrentTest] = useState('home');
  const [responses, setResponses] = useState({});
  const [analysis, setAnalysis] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [completedTests, setCompletedTests] = useState(new Set());
  const [currentInput, setCurrentInput] = useState('');
  const [analysisCount, setAnalysisCount] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [error, setError] = useState(null);
  const [ollamaStatus, setOllamaStatus] = useState('checking'); // checking, connected, error

  // Check if Ollama is running when component mounts
  React.useEffect(() => {
    checkOllamaConnection();
  }, []);

  const checkOllamaConnection = async () => {
    try {
      const response = await fetch('http://localhost:11434/api/tags', {
        method: 'GET',
      });
      
      if (response.ok) {
        setOllamaStatus('connected');
      } else {
        setOllamaStatus('error');
        setError('Ollama is not running. Please make sure Ollama is installed and running on your computer.');
      }
    } catch (error) {
      setOllamaStatus('error');
      setError('Cannot connect to Ollama. Please make sure Ollama is installed and running on http://localhost:11434');
    }
  };

  const performPsychologicalAnalysis = async (text, testType) => {
    if (ollamaStatus !== 'connected') {
      setError('Ollama is not connected. Please make sure Ollama is running.');
      throw new Error('Ollama not connected');
    }

    setIsAnalyzing(true);
    setError(null);
    
    try {
      const prompt = createAnalysisPrompt(text, testType);
      const analysisText = await callOllamaAPI(prompt);
      return parseOllamaResponse(analysisText);
    } catch (error) {
      console.error('Analysis Error:', error);
      setError(error.message || 'Failed to analyze response. Please try again.');
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const createAnalysisPrompt = (text, testType) => {
    return `As an expert psychological analyst with expertise in philosophical interpretation, provide a deep analysis of this ${testType.replace(/-/g, ' ')} test response.

STUDENT'S RESPONSE: "${text}"

Please provide your analysis in the following structured JSON format:
{
  "thinkingPattern": "Positive", "Negative", or "Neutral",
  "optimismScore": number (0-100),
  "philosophicalInterpretation": "Deep philosophical interpretation of what this response reveals about the student's worldview and underlying beliefs",
  "positiveAspects": ["Specific positive aspects revealed in the response", "What these aspects indicate about the student's strengths"],
  "concerns": ["Specific concerning patterns revealed in the response", "What these patterns might indicate about areas needing attention"],
  "underlyingBeliefs": ["Key underlying beliefs or assumptions revealed", "How these beliefs shape the student's perspective"],
  "recommendations": ["Specific, actionable recommendations for personal development", "How to build on strengths and address concerns"],
  "overallAssessment": "Comprehensive summary connecting the response to broader psychological and philosophical patterns"
}

Guidelines for analysis:
- Focus on the philosophical and psychological meaning behind the specific words and phrases used
- Connect the response to broader patterns of thinking and worldview
- Provide specific examples from the response to support your interpretation
- Offer balanced insights that highlight both strengths and growth areas
- Ensure recommendations are practical and actionable
- Consider cultural context, especially for Urdu responses

IMPORTANT: Return ONLY valid JSON without any additional text, markdown, or code formatting.`;
  };

  const callOllamaAPI = async (prompt) => {
    try {
      const response = await fetch(CONFIG.API_CONFIG.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: CONFIG.API_CONFIG.model,
          prompt: prompt,
          stream: false,
          options: {
            temperature: 0.7,
            top_p: 0.9,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status}`);
      }

      const data = await response.json();
      if (!data.response) {
        throw new Error('Invalid response format from Ollama');
      }
      
      return data.response;
    } catch (error) {
      console.error('Ollama API Error:', error);
      setOllamaStatus('error');
      throw new Error(`Failed to connect to Ollama: ${error.message}`);
    }
  };

  const parseOllamaResponse = (analysisText) => {
    try {
      // Try to extract JSON from the response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in Ollama response. The AI might not have followed instructions.');
      }
      
      const parsedData = JSON.parse(jsonMatch[0]);
      
      // Validate required fields
      const requiredFields = ['thinkingPattern', 'optimismScore', 'philosophicalInterpretation', 
                             'positiveAspects', 'concerns', 'underlyingBeliefs', 
                             'recommendations', 'overallAssessment'];
      
      for (const field of requiredFields) {
        if (parsedData[field] === undefined) {
          throw new Error(`Missing required field: ${field}`);
        }
      }
      
      return {
        thinkingPattern: parsedData.thinkingPattern,
        optimismScore: parsedData.optimismScore,
        philosophicalInterpretation: parsedData.philosophicalInterpretation,
        positiveAspects: Array.isArray(parsedData.positiveAspects) ? 
          parsedData.positiveAspects : [parsedData.positiveAspects],
        concerns: Array.isArray(parsedData.concerns) ? 
          parsedData.concerns : [parsedData.concerns],
        underlyingBeliefs: Array.isArray(parsedData.underlyingBeliefs) ? 
          parsedData.underlyingBeliefs : [parsedData.underlyingBeliefs],
        recommendations: Array.isArray(parsedData.recommendations) ? 
          parsedData.recommendations : [parsedData.recommendations],
        overallAssessment: parsedData.overallAssessment
      };
    } catch (error) {
      console.error('Failed to parse Ollama response:', error, analysisText);
      throw new Error('Failed to parse analysis response. The AI might not have followed the JSON format instructions.');
    }
  };

  const handleSubmitTest = async () => {
    if (!currentInput.trim()) {
      setError('Please enter your response before submitting.');
      return;
    }

    if (currentInput.trim().length < CONFIG.MIN_CHARACTERS) {
      setError(`Please provide a more detailed response (minimum ${CONFIG.MIN_CHARACTERS} characters) for accurate analysis.`);
      return;
    }

    if (analysisCount >= CONFIG.DAILY_LIMIT) {
      setError(`You've reached the analysis limit for this session (${CONFIG.DAILY_LIMIT} analyses). Please refresh the page to continue.`);
      return;
    }

    if (ollamaStatus !== 'connected') {
      setError('Ollama is not connected. Please make sure Ollama is running.');
      return;
    }

    setError(null);
    
    try {
      setResponses(prev => ({
        ...prev,
        [currentTest]: currentInput.trim()
      }));

      const analysisResult = await performPsychologicalAnalysis(currentInput.trim(), currentTest);
      
      setAnalysis(prev => ({
        ...prev,
        [currentTest]: analysisResult
      }));
      setCompletedTests(prev => new Set([...prev, currentTest]));
      setAnalysisCount(prev => prev + 1);
      
    } catch (error) {
      // Error is already handled in performPsychologicalAnalysis
      console.error('Submission Error:', error);
    } finally {
      setCurrentInput('');
    }
  };

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
        <Card style={{
          maxWidth: '600px',
          width: '90%',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: CONFIG.COLORS.primaryGradient,
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: CONFIG.SPACING.md
          }}>
            <Brain size={40} color={CONFIG.COLORS.white} />
          </div>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: CONFIG.COLORS.gray800, 
            marginBottom: CONFIG.SPACING.md 
          }}>
            {CONFIG.WELCOME_MESSAGE.title}
          </h2>
          <p style={{ 
            color: CONFIG.COLORS.gray600, 
            fontSize: '1.1rem', 
            lineHeight: '1.6', 
            marginBottom: CONFIG.SPACING.xl 
          }}>
            {CONFIG.WELCOME_MESSAGE.description}
          </p>
          
          <Card style={{
            background: CONFIG.COLORS.gray100,
            textAlign: 'left',
            marginBottom: CONFIG.SPACING.xl
          }}>
            <h3 style={{ 
              color: CONFIG.COLORS.gray800, 
              marginBottom: CONFIG.SPACING.sm, 
              display: 'flex', 
              alignItems: 'center', 
              gap: CONFIG.SPACING.xs 
            }}>
              <Shield size={20} />
              Your Privacy is Protected
            </h3>
            <ul style={{ color: CONFIG.COLORS.gray700, listStyle: 'none', padding: 0 }}>
              {CONFIG.WELCOME_MESSAGE.privacyItems.map((item, index) => (
                <li key={index} style={{ marginBottom: CONFIG.SPACING.xs, display: 'flex', alignItems: 'center', gap: CONFIG.SPACING.xs }}>
                  <CheckCircle size={16} color={CONFIG.COLORS.success} />
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <div style={{
            background: ollamaStatus === 'connected' ? '#f0fff4' : '#fff5f5',
            border: `1px solid ${ollamaStatus === 'connected' ? CONFIG.COLORS.success : CONFIG.COLORS.error}`,
            borderRadius: CONFIG.BORDER_RADIUS.md,
            padding: CONFIG.SPACING.md,
            marginBottom: CONFIG.SPACING.xl,
            textAlign: 'left'
          }}>
            <h4 style={{
              color: ollamaStatus === 'connected' ? CONFIG.COLORS.success : CONFIG.COLORS.error,
              marginBottom: CONFIG.SPACING.xs,
              display: 'flex',
              alignItems: 'center',
              gap: CONFIG.SPACING.xs
            }}>
              {ollamaStatus === 'connected' ? (
                <>
                  <CheckCircle size={18} />
                  Ollama Connected
                </>
              ) : (
                <>
                  <Info size={18} />
                  Ollama Not Detected
                </>
              )}
            </h4>
            <p style={{ 
              color: CONFIG.COLORS.gray700, 
              fontSize: '14px', 
              margin: 0,
              lineHeight: '1.5'
            }}>
              {ollamaStatus === 'connected' 
                ? 'Your local AI is ready for analysis. All processing happens on your device.'
                : 'Please install and run Ollama to use this application. Visit ollama.ai for instructions.'}
            </p>
          </div>
          
          <Button
            onClick={() => setShowWelcome(false)}
            style={{
              padding: `${CONFIG.SPACING.sm} ${CONFIG.SPACING.xxl}`,
              fontSize: '1.1rem'
            }}
            disabled={ollamaStatus !== 'connected'}
          >
            Start Your Assessment
          </Button>

          {ollamaStatus !== 'connected' && (
            <p style={{ 
              color: CONFIG.COLORS.error, 
              fontSize: '14px', 
              marginTop: CONFIG.SPACING.md 
            }}>
              You need to install Ollama first to use this application.
            </p>
          )}
        </Card>
      </div>
    )
  );

  const renderHome = () => (
    <div style={{
      minHeight: '100vh',
      background: CONFIG.COLORS.white,
      padding: CONFIG.SPACING.md
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: CONFIG.SPACING.xxl,
          padding: CONFIG.SPACING.xxl,
          background: CONFIG.COLORS.primaryGradient,
          borderRadius: CONFIG.BORDER_RADIUS.xl,
          color: CONFIG.COLORS.white,
          boxShadow: CONFIG.SHADOWS.xl
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: CONFIG.SPACING.xl,
            backdropFilter: 'blur(10px)'
          }}>
            <Brain size={50} color={CONFIG.COLORS.white} />
          </div>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: 'bold', 
            marginBottom: CONFIG.SPACING.md, 
            textShadow: '0 4px 8px rgba(0,0,0,0.1)' 
          }}>
            AI Psychology Platform
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            opacity: '0.9', 
            maxWidth: '700px', 
            margin: '0 auto' 
          }}>
            Professional psychological analysis powered by Ollama AI
          </p>
        </div>

        {ollamaStatus !== 'connected' && (
          <Card style={{
            background: 'rgba(229, 62, 62, 0.1)',
            border: `2px solid ${CONFIG.COLORS.error}`,
            marginBottom: CONFIG.SPACING.xl
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: CONFIG.SPACING.md }}>
              <Info size={24} color={CONFIG.COLORS.error} />
              <div>
                <h3 style={{ color: CONFIG.COLORS.error, margin: '0 0 8px 0' }}>
                  Ollama Not Connected
                </h3>
                <p style={{ color: CONFIG.COLORS.gray700, margin: 0 }}>
                  Please install and run Ollama to use this application. Visit{' '}
                  <a 
                    href="https://ollama.ai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: CONFIG.COLORS.error, fontWeight: 'bold' }}
                  >
                    ollama.ai
                  </a>{' '}
                  for instructions. Then restart this application.
                </p>
              </div>
              <Button 
                onClick={checkOllamaConnection}
                style={{ marginLeft: 'auto' }}
              >
                Check Again
              </Button>
            </div>
          </Card>
        )}

        <Card style={{
          background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%)',
          marginBottom: CONFIG.SPACING.xl
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: CONFIG.SPACING.md
          }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <h3 style={{ 
                color: CONFIG.COLORS.gray800, 
                fontSize: '1.2rem', 
                marginBottom: CONFIG.SPACING.xs 
              }}>
                Session Progress
              </h3>
              <span style={{ 
                fontSize: '1.1rem', 
                color: CONFIG.COLORS.gray600 
              }}>
                Analyses Completed: {analysisCount}/{CONFIG.DAILY_LIMIT}
              </span>
              <div style={{
                width: '100%',
                height: '10px',
                background: CONFIG.COLORS.gray300,
                borderRadius: '5px',
                marginTop: CONFIG.SPACING.xs,
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(analysisCount / CONFIG.DAILY_LIMIT) * 100}%`,
                  height: '100%',
                  background: analysisCount > CONFIG.DAILY_LIMIT * 0.8 ? 
                    'linear-gradient(90deg, #ff6b6b, #ee5a52)' : 
                    'linear-gradient(90deg, #4ecdc4, #44a08d)',
                  borderRadius: '5px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
            <div style={{
              background: CONFIG.COLORS.primaryGradient,
              color: CONFIG.COLORS.white,
              padding: `${CONFIG.SPACING.sm} ${CONFIG.SPACING.lg}`,
              borderRadius: CONFIG.BORDER_RADIUS.lg,
              display: 'flex',
              alignItems: 'center',
              gap: CONFIG.SPACING.xs,
              boxShadow: CONFIG.SHADOWS.small
            }}>
              <Zap size={20} />
              Local AI Analysis
            </div>
          </div>
        </Card>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: CONFIG.SPACING.xl
        }}>
          {CONFIG.TEST_TYPES.map((test) => (
            <Card
              key={test.id}
              style={{
                padding: CONFIG.SPACING.xl,
                boxShadow: `0 15px 35px ${test.shadowColor}`,
                transition: 'all 0.4s ease',
                cursor: ollamaStatus === 'connected' ? 'pointer' : 'not-allowed',
                position: 'relative',
                overflow: 'hidden',
                opacity: ollamaStatus === 'connected' ? 1 : 0.7
              }}
              onClick={() => ollamaStatus === 'connected' && setCurrentTest(test.id)}
              onMouseEnter={(e) => {
                if (ollamaStatus === 'connected') {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = `0 25px 50px ${test.shadowColor}`;
                }
              }}
              onMouseLeave={(e) => {
                if (ollamaStatus === 'connected') {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 15px 35px ${test.shadowColor}`;
                }
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '5px',
                background: test.color
              }} />
              
              <div style={{
                width: '70px',
                height: '70px',
                background: test.color,
                borderRadius: CONFIG.BORDER_RADIUS.md,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: CONFIG.SPACING.lg,
                boxShadow: `0 8px 20px ${test.shadowColor}`
              }}>
                <test.icon size={32} color={CONFIG.COLORS.white} />
              </div>
              
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: CONFIG.COLORS.gray800,
                marginBottom: CONFIG.SPACING.sm
              }}>
                {test.title}
              </h3>
              
              <p style={{
                color: CONFIG.COLORS.gray600,
                lineHeight: '1.7',
                marginBottom: CONFIG.SPACING.lg,
                fontSize: '16px'
              }}>
                {test.description}
              </p>

              {completedTests.has(test.id) && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: CONFIG.COLORS.success,
                  fontWeight: '600',
                  background: '#f0fff4',
                  padding: `${CONFIG.SPACING.xs} ${CONFIG.SPACING.sm}`,
                  borderRadius: CONFIG.BORDER_RADIUS.lg
                }}>
                  <CheckCircle size={18} style={{ marginRight: CONFIG.SPACING.xs }} />
                  Analysis Complete
                </div>
              )}

              {ollamaStatus !== 'connected' && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: CONFIG.COLORS.error,
                  fontWeight: '600',
                  background: '#fff5f5',
                  padding: `${CONFIG.SPACING.xs} ${CONFIG.SPACING.sm}`,
                  borderRadius: CONFIG.BORDER_RADIUS.lg,
                  marginTop: CONFIG.SPACING.sm
                }}>
                  <Info size={18} style={{ marginRight: CONFIG.SPACING.xs }} />
                  Connect Ollama to use
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {renderWelcome()}
    </div>
  );

  const renderTestInterface = () => {
    const testConfig = CONFIG.TEST_TYPES.find(test => test.id === currentTest);
    const currentAnalysis = analysis[currentTest];

    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%)',
        padding: CONFIG.SPACING.md
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
          <Card style={{
            padding: CONFIG.SPACING.xl,
            marginBottom: CONFIG.SPACING.xl,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <h1 style={{ 
                fontSize: '2.2rem', 
                fontWeight: 'bold', 
                color: CONFIG.COLORS.gray800, 
                marginBottom: CONFIG.SPACING.xs 
              }}>
                {testConfig?.title || currentTest.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h1>
              <p style={{ 
                color: CONFIG.COLORS.gray600, 
                fontSize: '16px' 
              }}>
                {testConfig?.description || 'Enter your responses for AI-powered psychological analysis'}
              </p>
            </div>
            <Button
              onClick={() => setCurrentTest('home')}
              style={{ padding: CONFIG.SPACING.sm }}
            >
              <Home size={22} />
            </Button>
          </Card>

          {error && (
            <Card style={{
              background: 'rgba(229, 62, 62, 0.1)',
              border: `1px solid ${CONFIG.COLORS.error}`,
              color: CONFIG.COLORS.error,
              marginBottom: CONFIG.SPACING.xl
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: CONFIG.SPACING.sm }}>
                <Info size={20} />
                <p style={{ margin: 0 }}>{error}</p>
              </div>
            </Card>
          )}

          <Card style={{
            padding: CONFIG.SPACING.xl,
            marginBottom: CONFIG.SPACING.xl
          }}>
            <label style={{
              display: 'block',
              fontSize: '1.3rem',
              fontWeight: '600',
              color: CONFIG.COLORS.gray800,
              marginBottom: CONFIG.SPACING.md
            }}>
              Enter Your Response:
            </label>
            <textarea
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder={`Type or paste your response here... Be detailed for better analysis (minimum ${CONFIG.MIN_CHARACTERS} characters)`}
              style={{
                width: '100%',
                height: '300px',
                padding: CONFIG.SPACING.lg,
                border: `2px solid ${CONFIG.COLORS.gray300}`,
                borderRadius: CONFIG.BORDER_RADIUS.md,
                fontSize: '16px',
                resize: 'vertical',
                fontFamily: 'inherit',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = CONFIG.COLORS.gray300;
                e.target.style.boxShadow = 'none';
              }}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: CONFIG.SPACING.md,
              flexWrap: 'wrap',
              gap: CONFIG.SPACING.sm
            }}>
              <span style={{
                color: currentInput.length < CONFIG.MIN_CHARACTERS ? 
                  CONFIG.COLORS.error : CONFIG.COLORS.success,
                fontSize: '16px',
                fontWeight: '500'
              }}>
                {currentInput.length} characters {currentInput.length < CONFIG.MIN_CHARACTERS ? 
                  `(need at least ${CONFIG.MIN_CHARACTERS})` : '✓'}
              </span>
              <Button
                onClick={handleSubmitTest}
                disabled={isAnalyzing || !currentInput.trim() || 
                         currentInput.length < CONFIG.MIN_CHARACTERS || 
                         analysisCount >= CONFIG.DAILY_LIMIT ||
                         ollamaStatus !== 'connected'}
              >
                {isAnalyzing ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain size={20} />
                    Get AI Analysis
                  </>
                )}
              </Button>
            </div>
          </Card>

          {currentAnalysis && (
            <Card style={{
              padding: CONFIG.SPACING.xl,
              boxShadow: CONFIG.SHADOWS.large
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: CONFIG.COLORS.gray800,
                marginBottom: CONFIG.SPACING.xl,
                display: 'flex',
                alignItems: 'center',
                gap: CONFIG.SPACING.xs
              }}>
                <div style={{
                  background: testConfig?.color || CONFIG.COLORS.primaryGradient,
                  padding: CONFIG.SPACING.xs,
                  borderRadius: CONFIG.BORDER_RADIUS.sm
                }}>
                  <Brain size={28} color={CONFIG.COLORS.white} />
                </div>
                Your Psychological Profile
              </h2>

              <div style={{
                background: `linear-gradient(135deg, ${
                  currentAnalysis.thinkingPattern === 'Positive' ? '#48bb78, #38a169' :
                  currentAnalysis.thinkingPattern === 'Negative' ? '#ed8936, #dd6b20' :
                  '#a0aec0, #718096'
                })`,
                borderRadius: CONFIG.BORDER_RADIUS.md,
                padding: CONFIG.SPACING.xl,
                color: CONFIG.COLORS.white,
                marginBottom: CONFIG.SPACING.xl,
                boxShadow: CONFIG.SHADOWS.medium
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  flexWrap: 'wrap', 
                  gap: CONFIG.SPACING.md 
                }}>
                  <div>
                    <h3 style={{ 
                      fontSize: '1.5rem', 
                      marginBottom: CONFIG.SPACING.xs 
                    }}>
                      Thinking Pattern: {currentAnalysis.thinkingPattern}
                    </h3>
                     <p style={{ opacity: '0.9', fontSize: '1rem' }}>
                      Optimism Score: {currentAnalysis.optimismScore}/100
                    </p>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: CONFIG.SPACING.md,
                    borderRadius: CONFIG.BORDER_RADIUS.md,
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}>
                    Overall Assessment
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gap: CONFIG.SPACING.xl }}>
                <Section title="Philosophical Interpretation" content={currentAnalysis.philosophicalInterpretation} />
                <Section title="Positive Aspects" list={currentAnalysis.positiveAspects} />
                <Section title="Concerns" list={currentAnalysis.concerns} />
                <Section title="Underlying Beliefs" list={currentAnalysis.underlyingBeliefs} />
                <Section title="Recommendations" list={currentAnalysis.recommendations} />
                <Section title="Overall Assessment" content={currentAnalysis.overallAssessment} />
              </div>
            </Card>
          )}
        </div>
      </div>
    );
  };

  // Helper Section component to avoid repetition
  const Section = ({ title, content, list }) => (
    <div>
      <h3 style={{
        fontSize: '1.4rem',
        fontWeight: '600',
        color: CONFIG.COLORS.gray800,
        marginBottom: CONFIG.SPACING.sm,
        display: 'flex',
        alignItems: 'center',
        gap: CONFIG.SPACING.xs
      }}>
        <Star size={18} color={CONFIG.COLORS.gray600} />
        {title}
      </h3>
      {content && (
        <p style={{
          fontSize: '1rem',
          color: CONFIG.COLORS.gray700,
          lineHeight: '1.6',
          marginBottom: CONFIG.SPACING.md
        }}>
          {content}
        </p>
      )}
      {list && (
        <ul style={{
          paddingLeft: CONFIG.SPACING.lg,
          color: CONFIG.COLORS.gray700,
          lineHeight: '1.6'
        }}>
          {list.map((item, idx) => (
            <li key={idx} style={{ marginBottom: CONFIG.SPACING.xs }}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  // Final return: decide between home and test interface
  return currentTest === 'home' ? renderHome() : renderTestInterface();
};

export default PsychologicalAssessmentPlatform;

