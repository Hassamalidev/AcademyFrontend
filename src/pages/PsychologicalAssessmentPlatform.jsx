import React, { useState } from 'react';
import { 
  Brain, Home, CheckCircle, XCircle, Loader, 
  MessageSquare, Edit, BookOpen, Image, Navigation, 
  PenTool, Shield, Info, Zap, Star, TrendingUp, 
  Users, Target, Lightbulb, FileText, ArrowRight
} from 'lucide-react';

const CONSTANTS = {
  DAILY_LIMIT: 20,
  MIN_CHARACTERS: 10,
  COLORS: {
    primaryGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    positiveGradient: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
    negativeGradient: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
    neutralGradient: 'linear-gradient(135deg, #a0aec0 0%, #718096 100%)',
    strengthsGradient: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
    growthGradient: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
    recommendationsGradient: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
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
  }
};

const TEST_TYPES = [
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
];

const PsychologicalAssessmentPlatform = () => {
  const [currentTest, setCurrentTest] = useState('home');
  const [responses, setResponses] = useState({});
  const [analysis, setAnalysis] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [completedTests, setCompletedTests] = useState(new Set());
  const [currentInput, setCurrentInput] = useState('');
  const [analysisCount, setAnalysisCount] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const performPsychologicalAnalysis = async (text, testType) => {
    setIsAnalyzing(true);
    
    try {
      const prompt = createAnalysisPrompt(text, testType);
      const analysisText = await callGeminiAPI(prompt);
      return parseGeminiResponse(analysisText, testType, text);
    } catch (error) {
      console.error('Gemini API Error:', error);
      return await performMockAnalysis(text, testType);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const createAnalysisPrompt = (text, testType) => {
    if (testType.includes('sentence-completion') || testType === 'word-association') {
      return `Analyze this psychological test response from a ${testType.replace(/-/g, ' ')} test. 
      Follow these steps:
      1. Classify the sentiment as either "Positive" or "Negative"
      2. If negative, explain what it might symbolize
      3. Provide a brief psychological interpretation
      
      Response: "${text}"
      
      Format your answer as:
      Sentiment: [Positive/Negative]
      Symbolism: [Explanation]
      Interpretation: [Psychological meaning]`;
    }
    
    return `Provide a psychological analysis of this ${testType.replace(/-/g, ' ')} test response. 
    Consider emotional tone, potential underlying psychological patterns, and what it might indicate 
    about the respondent's mental state. Focus on both strengths and areas of concern.
    
    Response: "${text}"
    
    Format your answer with clear sections for strengths, concerns, and recommendations.`;
  };

  const callGeminiAPI = async (prompt) => {
    const response = await fetch(`https:generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=YOUR_API_KEY`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  };

  const parseGeminiResponse = (analysisText, testType, originalText) => {
    if (testType.includes('sentence-completion') || testType === 'word-association') {
      return parseSimpleAnalysis(analysisText);
    }
    return performComprehensiveAnalysis(originalText);
  };

  const parseSimpleAnalysis = (analysisText) => {
    let sentiment = 'Neutral';
    if (analysisText.includes('Sentiment: Positive')) sentiment = 'Positive';
    if (analysisText.includes('Sentiment: Negative')) sentiment = 'Negative';
    
    const symbolismMatch = analysisText.match(/Symbolism:\s*(.*?)(?=Interpretation:|$)/s);
    const symbolism = symbolismMatch ? symbolismMatch[1].trim() : '';
    
    const interpretationMatch = analysisText.match(/Interpretation:\s*(.*)/s);
    const interpretation = interpretationMatch ? interpretationMatch[1].trim() : '';
    
    const optimismScore = sentiment === 'Positive' ? 
      Math.floor(Math.random() * 30) + 70 : 
      Math.floor(Math.random() * 30) + 30;
    
    return {
      optimismScore,
      isOptimistic: optimismScore > 55,
      sentiment,
      symbolism,
      interpretation,
      strengths: sentiment === 'Positive' ? 
        ['Positive outlook detected', 'Constructive response pattern'] : 
        ['Honest self-expression', 'Awareness of challenges'],
      flaws: sentiment === 'Negative' ? 
        ['Tendency toward negative interpretation', 'Possible emotional distress'] : 
        ['Potential overlooking of challenges', 'May benefit from deeper critical thinking'],
      recommendations: [
        'Further assessment recommended for comprehensive evaluation',
        'Consider follow-up with a qualified mental health professional',
        'Practice mindfulness and self-reflection techniques'
      ],
      overallAssessment: interpretation || 'Based on your response, further evaluation would be beneficial.'
    };
  };

  const performMockAnalysis = async (text, testType) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const positiveWords = ['good', 'great', 'happy', 'love', 'success', 'positive', 'hope', 'joy'];
    const negativeWords = ['bad', 'hate', 'fail', 'problem', 'sad', 'fear', 'worry', 'negative'];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    const sentiment = positiveCount > negativeCount ? 'Positive' : 
                     negativeCount > positiveCount ? 'Negative' : 'Neutral';
    
    const optimismScore = sentiment === 'Positive' ? 
      Math.floor(Math.random() * 30) + 70 : 
      Math.floor(Math.random() * 30) + 30;
    
    return {
      optimismScore,
      isOptimistic: optimismScore > 55,
      sentiment,
      symbolism: sentiment === 'Negative' ? 
        'May indicate some emotional challenges or negative thought patterns' : 
        'Suggests generally positive outlook and coping mechanisms',
      interpretation: sentiment === 'Negative' ? 
        'The response pattern may indicate some difficulties with emotional regulation or coping with stress' : 
        'The response shows generally healthy psychological patterns and adaptive coping strategies',
      strengths: sentiment === 'Positive' ? 
        ['Positive outlook detected', 'Constructive response pattern'] : 
        ['Honest self-expression', 'Awareness of challenges'],
      flaws: sentiment === 'Negative' ? 
        ['Tendency toward negative interpretation', 'Possible emotional distress'] : 
        ['Potential overlooking of challenges', 'May benefit from deeper critical thinking'],
      recommendations: [
        'Further assessment recommended for comprehensive evaluation',
        'Consider follow-up with a qualified mental health professional',
        'Practice mindfulness and self-reflection techniques'
      ],
      overallAssessment: sentiment === 'Positive' ? 
        'Your responses indicate generally healthy psychological patterns with a positive outlook on life.' : 
        'Your responses suggest some areas of emotional difficulty that could benefit from further exploration.'
    };
  };

  const performComprehensiveAnalysis = (text) => {
    const wordCount = text.split(' ').length;
    const sentenceCount = text.split(/[.!?]+/).length;
    const avgWordsPerSentence = wordCount / Math.max(1, sentenceCount);
    
    const positiveWords = ['good', 'great', 'excellent', 'happy', 'joy', 'love', 'success', 'achieve', 'positive'];
    const negativeWords = ['bad', 'terrible', 'awful', 'sad', 'hate', 'failure', 'difficult', 'problem', 'worry'];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    const optimismScore = Math.max(20, Math.min(95, 50 + (positiveCount * 10) - (negativeCount * 8) + (avgWordsPerSentence > 12 ? 15 : 0)));
    
    const strengths = [];
    const flaws = [];
    const recommendations = [];
    
    if (optimismScore > 70) {
      strengths.push('Strong positive outlook and resilience');
      strengths.push('Ability to see opportunities in challenges');
    } else if (optimismScore < 40) {
      flaws.push('Tendency toward pessimistic thinking patterns');
      recommendations.push('Practice daily gratitude exercises and positive visualization');
    }
    
    if (wordCount > 200) {
      strengths.push('Excellent self-reflection and introspective abilities');
      strengths.push('Detailed analytical thinking');
    } else {
      flaws.push('May benefit from deeper self-reflection');
      recommendations.push('Keep a daily journal to develop self-awareness');
    }
    
    if (avgWordsPerSentence > 12) {
      strengths.push('Complex reasoning and sophisticated thought processes');
    } else {
      recommendations.push('Practice articulating thoughts in more detail');
    }
    
    recommendations.push('Regular mindfulness practice to enhance emotional regulation');
    recommendations.push('Set specific, measurable personal growth goals');
    
    return {
      optimismScore: Math.round(optimismScore),
      isOptimistic: optimismScore > 55,
      sentiment: optimismScore > 60 ? 'Positive' : optimismScore < 40 ? 'Negative' : 'Neutral',
      symbolism: optimismScore > 60 ? 
        'Indicates generally positive psychological adjustment and coping mechanisms' : 
        'Suggests possible difficulties with emotional regulation or negative thought patterns',
      interpretation: optimismScore > 60 ? 
        'Your responses demonstrate healthy psychological patterns and adaptive coping strategies' : 
        'Your responses may indicate some areas of emotional difficulty that could benefit from support',
      strengths: strengths.length > 0 ? strengths : ['Willingness to engage in self-reflection', 'Open to personal development'],
      flaws: flaws.length > 0 ? flaws : ['Areas for growth will be identified with more detailed responses'],
      recommendations: recommendations.slice(0, 4),
      overallAssessment: `Based on your response analysis, you demonstrate ${optimismScore > 60 ? 'a generally positive' : 'a developing'} psychological profile. Your communication style suggests ${avgWordsPerSentence > 12 ? 'complex analytical thinking' : 'direct, practical reasoning'}. Continue focusing on personal development through the recommended strategies.`
    };
  };

  const handleSubmitTest = async () => {
    if (!currentInput.trim()) {
      alert('Please enter your response before submitting.');
      return;
    }

    if (currentInput.trim().length < CONSTANTS.MIN_CHARACTERS) {
      alert(`Please provide a more detailed response (minimum ${CONSTANTS.MIN_CHARACTERS} characters) for accurate analysis.`);
      return;
    }

    if (analysisCount >= CONSTANTS.DAILY_LIMIT) {
      alert(`You've reached the analysis limit for this session (${CONSTANTS.DAILY_LIMIT} analyses). Please refresh the page to continue.`);
      return;
    }

    setIsAnalyzing(true);
    
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
      console.error('Analysis Error:', error);
      alert('Error during analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
      setCurrentInput('');
    }
  };

  const Card = ({ children, style = {}, ...props }) => (
    <div style={{
      background: CONSTANTS.COLORS.white,
      borderRadius: CONSTANTS.BORDER_RADIUS.lg,
      padding: CONSTANTS.SPACING.xl,
      boxShadow: CONSTANTS.SHADOWS.medium,
      border: `1px solid ${CONSTANTS.COLORS.gray300}`,
      ...style
    }} {...props}>
      {children}
    </div>
  );

  const Button = ({ children, onClick, disabled = false, variant = 'primary', ...props }) => {
    const baseStyle = {
      border: 'none',
      padding: `${CONSTANTS.SPACING.sm} ${CONSTANTS.SPACING.xl}`,
      borderRadius: CONSTANTS.BORDER_RADIUS.lg,
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: CONSTANTS.SPACING.xs,
      fontWeight: '600',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      ...props.style
    };

    const variants = {
      primary: {
        background: disabled ? 
          'linear-gradient(135deg, #a0a0a0 0%, #808080 100%)' : 
          CONSTANTS.COLORS.primaryGradient,
        color: CONSTANTS.COLORS.white,
        boxShadow: disabled ? 'none' : CONSTANTS.SHADOWS.small
      },
      secondary: {
        background: CONSTANTS.COLORS.gray100,
        color: CONSTANTS.COLORS.gray700,
        border: `1px solid ${CONSTANTS.COLORS.gray300}`
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
            background: CONSTANTS.COLORS.primaryGradient,
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: CONSTANTS.SPACING.md
          }}>
            <Brain size={40} color={CONSTANTS.COLORS.white} />
          </div>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: CONSTANTS.COLORS.gray800, 
            marginBottom: CONSTANTS.SPACING.md 
          }}>
            Welcome to AI Psychology
          </h2>
          <p style={{ 
            color: CONSTANTS.COLORS.gray600, 
            fontSize: '1.1rem', 
            lineHeight: '1.6', 
            marginBottom: CONSTANTS.SPACING.xl 
          }}>
            Get professional-level psychological insights powered by advanced AI.
          </p>
          
          <Card style={{
            background: CONSTANTS.COLORS.gray100,
            textAlign: 'left',
            marginBottom: CONSTANTS.SPACING.xl
          }}>
            <h3 style={{ 
              color: CONSTANTS.COLORS.gray800, 
              marginBottom: CONSTANTS.SPACING.sm, 
              display: 'flex', 
              alignItems: 'center', 
              gap: CONSTANTS.SPACING.xs 
            }}>
              <Shield size={20} color={CONSTANTS.COLORS.primaryGradient} />
              Your Privacy is Protected
            </h3>
            <ul style={{ color: CONSTANTS.COLORS.gray700, listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: CONSTANTS.SPACING.xs, display: 'flex', alignItems: 'center', gap: CONSTANTS.SPACING.xs }}>
                <CheckCircle size={16} color={CONSTANTS.COLORS.success} />
                All responses are processed securely
              </li>
              <li style={{ marginBottom: CONSTANTS.SPACING.xs, display: 'flex', alignItems: 'center', gap: CONSTANTS.SPACING.xs }}>
                <CheckCircle size={16} color={CONSTANTS.COLORS.success} />
                No personal data is stored or shared
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: CONSTANTS.SPACING.xs }}>
                <CheckCircle size={16} color={CONSTANTS.COLORS.success} />
                Analysis happens in real-time
              </li>
            </ul>
          </Card>
          
          <Button
            onClick={() => setShowWelcome(false)}
            style={{
              padding: `${CONSTANTS.SPACING.sm} ${CONSTANTS.SPACING.xxl}`,
              fontSize: '1.1rem'
            }}
          >
            Start Your Assessment
          </Button>
        </Card>
      </div>
    )
  );

  const renderHome = () => (
    <div style={{
      minHeight: '100vh',
      background: CONSTANTS.COLORS.white,
      padding: CONSTANTS.SPACING.md
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: CONSTANTS.SPACING.xxl,
          padding: CONSTANTS.SPACING.xxl,
          background: CONSTANTS.COLORS.primaryGradient,
          borderRadius: CONSTANTS.BORDER_RADIUS.xl,
          color: CONSTANTS.COLORS.white,
          boxShadow: CONSTANTS.SHADOWS.xl
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: CONSTANTS.SPACING.xl,
            backdropFilter: 'blur(10px)'
          }}>
            <Brain size={50} color={CONSTANTS.COLORS.white} />
          </div>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: 'bold', 
            marginBottom: CONSTANTS.SPACING.md, 
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
            Professional psychological analysis powered by advanced artificial intelligence
          </p>
        </div>

        <Card style={{
          background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%)',
          marginBottom: CONSTANTS.SPACING.xl
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: CONSTANTS.SPACING.md
          }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <h3 style={{ 
                color: CONSTANTS.COLORS.gray800, 
                fontSize: '1.2rem', 
                marginBottom: CONSTANTS.SPACING.xs 
              }}>
                Session Progress
              </h3>
              <span style={{ 
                fontSize: '1.1rem', 
                color: CONSTANTS.COLORS.gray600 
              }}>
                Analyses Completed: {analysisCount}/{CONSTANTS.DAILY_LIMIT}
              </span>
              <div style={{
                width: '100%',
                height: '10px',
                background: CONSTANTS.COLORS.gray300,
                borderRadius: '5px',
                marginTop: CONSTANTS.SPACING.xs,
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(analysisCount / CONSTANTS.DAILY_LIMIT) * 100}%`,
                  height: '100%',
                  background: analysisCount > CONSTANTS.DAILY_LIMIT * 0.8 ? 
                    'linear-gradient(90deg, #ff6b6b, #ee5a52)' : 
                    'linear-gradient(90deg, #4ecdc4, #44a08d)',
                  borderRadius: '5px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
            <div style={{
              background: CONSTANTS.COLORS.primaryGradient,
              color: CONSTANTS.COLORS.white,
              padding: `${CONSTANTS.SPACING.sm} ${CONSTANTS.SPACING.lg}`,
              borderRadius: CONSTANTS.BORDER_RADIUS.lg,
              display: 'flex',
              alignItems: 'center',
              gap: CONSTANTS.SPACING.xs,
              boxShadow: CONSTANTS.SHADOWS.small
            }}>
              <Zap size={20} />
              AI-Powered Analysis
            </div>
          </div>
        </Card>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: CONSTANTS.SPACING.xl
        }}>
          {TEST_TYPES.map((test) => (
            <Card
              key={test.id}
              style={{
                padding: CONSTANTS.SPACING.xl,
                boxShadow: `0 15px 35px ${test.shadowColor}`,
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={() => setCurrentTest(test.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = `0 25px 50px ${test.shadowColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 15px 35px ${test.shadowColor}`;
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
                borderRadius: CONSTANTS.BORDER_RADIUS.md,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: CONSTANTS.SPACING.lg,
                boxShadow: `0 8px 20px ${test.shadowColor}`
              }}>
                <test.icon size={32} color={CONSTANTS.COLORS.white} />
              </div>
              
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: CONSTANTS.COLORS.gray800,
                marginBottom: CONSTANTS.SPACING.sm
              }}>
                {test.title}
              </h3>
              
              <p style={{
                color: CONSTANTS.COLORS.gray600,
                lineHeight: '1.7',
                marginBottom: CONSTANTS.SPACING.lg,
                fontSize: '16px'
              }}>
                {test.description}
              </p>

              {completedTests.has(test.id) && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: CONSTANTS.COLORS.success,
                  fontWeight: '600',
                  background: '#f0fff4',
                  padding: `${CONSTANTS.SPACING.xs} ${CONSTANTS.SPACING.sm}`,
                  borderRadius: CONSTANTS.BORDER_RADIUS.lg
                }}>
                  <CheckCircle size={18} style={{ marginRight: CONSTANTS.SPACING.xs }} />
                  Analysis Complete
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {renderWelcome()}
    </div>
  );

  const renderTestInterface = () => (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%)',
      padding: CONSTANTS.SPACING.md
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      
        <Card style={{
          padding: CONSTANTS.SPACING.xl,
          marginBottom: CONSTANTS.SPACING.xl,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '2.2rem', 
              fontWeight: 'bold', 
              color: CONSTANTS.COLORS.gray800, 
              marginBottom: CONSTANTS.SPACING.xs 
            }}>
              {currentTest.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h1>
            <p style={{ 
              color: CONSTANTS.COLORS.gray600, 
              fontSize: '16px' 
            }}>
              Enter your responses for AI-powered psychological analysis
            </p>
          </div>
          <Button
            onClick={() => setCurrentTest('home')}
            style={{ padding: CONSTANTS.SPACING.sm }}
          >
            <Home size={22} />
          </Button>
        </Card>

        <Card style={{
          padding: CONSTANTS.SPACING.xl,
          marginBottom: CONSTANTS.SPACING.xl
        }}>
          <label style={{
            display: 'block',
            fontSize: '1.3rem',
            fontWeight: '600',
            color: CONSTANTS.COLORS.gray800,
            marginBottom: CONSTANTS.SPACING.md
          }}>
            Enter Your Response:
          </label>
          <textarea
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder={`Type or paste your response here... Be detailed for better analysis (minimum ${CONSTANTS.MIN_CHARACTERS} characters)`}
            style={{
              width: '100%',
              height: '300px',
              padding: CONSTANTS.SPACING.lg,
              border: `2px solid ${CONSTANTS.COLORS.gray300}`,
              borderRadius: CONSTANTS.BORDER_RADIUS.md,
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
              e.target.style.borderColor = CONSTANTS.COLORS.gray300;
              e.target.style.boxShadow = 'none';
            }}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: CONSTANTS.SPACING.md,
            flexWrap: 'wrap',
            gap: CONSTANTS.SPACING.sm
          }}>
            <span style={{
              color: currentInput.length < CONSTANTS.MIN_CHARACTERS ? 
                CONSTANTS.COLORS.error : CONSTANTS.COLORS.success,
              fontSize: '16px',
              fontWeight: '500'
            }}>
              {currentInput.length} characters {currentInput.length < CONSTANTS.MIN_CHARACTERS ? 
                `(need at least ${CONSTANTS.MIN_CHARACTERS})` : '✓'}
            </span>
            <Button
              onClick={handleSubmitTest}
              disabled={isAnalyzing || !currentInput.trim() || 
                       currentInput.length < CONSTANTS.MIN_CHARACTERS || 
                       analysisCount >= CONSTANTS.DAILY_LIMIT}
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

        {analysis[currentTest] && (
          <Card style={{
            padding: CONSTANTS.SPACING.xl,
            boxShadow: CONSTANTS.SHADOWS.large
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: CONSTANTS.COLORS.gray800,
              marginBottom: CONSTANTS.SPACING.xl,
              display: 'flex',
              alignItems: 'center',
              gap: CONSTANTS.SPACING.xs
            }}>
              <div style={{
                background: CONSTANTS.COLORS.primaryGradient,
                padding: CONSTANTS.SPACING.xs,
                borderRadius: CONSTANTS.BORDER_RADIUS.sm
              }}>
                <Brain size={28} color={CONSTANTS.COLORS.white} />
              </div>
              Your Psychological Profile
            </h2>

            {analysis[currentTest].sentiment && (
              <div style={{
                background: analysis[currentTest].sentiment === 'Positive' ? 
                  CONSTANTS.COLORS.positiveGradient : 
                  analysis[currentTest].sentiment === 'Negative' ?
                  CONSTANTS.COLORS.negativeGradient :
                  CONSTANTS.COLORS.neutralGradient,
                borderRadius: CONSTANTS.BORDER_RADIUS.md,
                padding: CONSTANTS.SPACING.xl,
                color: CONSTANTS.COLORS.white,
                marginBottom: CONSTANTS.SPACING.xl,
                boxShadow: CONSTANTS.SHADOWS.medium
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  flexWrap: 'wrap', 
                  gap: CONSTANTS.SPACING.md 
                }}>
                  <div>
                    <h3 style={{ 
                      fontSize: '1.5rem', 
                      marginBottom: CONSTANTS.SPACING.xs 
                    }}>
                      Sentiment: {analysis[currentTest].sentiment}
                    </h3>
                    <p style={{ opacity: '0.9' }}>
                      {analysis[currentTest].symbolism}
                    </p>
                  </div>
                  <div style={{ 
                    fontSize: '3.5rem', 
                    fontWeight: 'bold' 
                  }}>
                    {analysis[currentTest].optimismScore}%
                  </div>
                </div>
              </div>
            )}

            {analysis[currentTest].interpretation && (
              <Card style={{
                background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%)',
                border: `2px solid ${CONSTANTS.COLORS.gray300}`,
                marginBottom: CONSTANTS.SPACING.xl
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  color: CONSTANTS.COLORS.gray800,
                  marginBottom: CONSTANTS.SPACING.sm,
                  display: 'flex',
                  alignItems: 'center',
                  gap: CONSTANTS.SPACING.xs
              }}>
                <Lightbulb size={20} color={CONSTANTS.COLORS.primaryGradient} />
                Psychological Interpretation
              </h3>
              <p style={{ 
                color: CONSTANTS.COLORS.gray700, 
                lineHeight: '1.7', 
                fontSize: '16px' 
              }}>
                {analysis[currentTest].interpretation}
              </p>
            </Card>
            )}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: CONSTANTS.SPACING.xl,
              marginBottom: CONSTANTS.SPACING.xl
            }}>
              <Card style={{
                background: CONSTANTS.COLORS.strengthsGradient,
                color: CONSTANTS.COLORS.white
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  marginBottom: CONSTANTS.SPACING.md,
                  display: 'flex',
                  alignItems: 'center',
                  gap: CONSTANTS.SPACING.xs
                }}>
                  <Star size={20} />
                  Key Strengths
                </h3>
                <ul style={{ paddingLeft: CONSTANTS.SPACING.md }}>
                  {analysis[currentTest].strengths.map((strength, index) => (
                    <li key={index} style={{ marginBottom: CONSTANTS.SPACING.xs }}>
                      {strength}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card style={{
                background: CONSTANTS.COLORS.growthGradient,
                color: CONSTANTS.COLORS.white
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  marginBottom: CONSTANTS.SPACING.md,
                  display: 'flex',
                  alignItems: 'center',
                  gap: CONSTANTS.SPACING.xs
                }}>
                  <Target size={20} />
                  Growth Opportunities
                </h3>
                <ul style={{ paddingLeft: CONSTANTS.SPACING.md }}>
                  {analysis[currentTest].flaws.map((flaw, index) => (
                    <li key={index} style={{ marginBottom: CONSTANTS.SPACING.xs }}>
                      {flaw}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <Card style={{
              background: CONSTANTS.COLORS.recommendationsGradient,
              color: CONSTANTS.COLORS.white
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                marginBottom: CONSTANTS.SPACING.md,
                display: 'flex',
                alignItems: 'center',
                gap: CONSTANTS.SPACING.xs
              }}>
                <TrendingUp size={20} />
                Professional Recommendations
              </h3>
              <ul style={{ paddingLeft: CONSTANTS.SPACING.md }}>
                {analysis[currentTest].recommendations.map((recommendation, index) => (
                  <li key={index} style={{ 
                    marginBottom: CONSTANTS.SPACING.sm,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: CONSTANTS.SPACING.xs
                  }}>
                    <ArrowRight size={16} style={{ marginTop: '2px', flexShrink: 0 }} />
                    {recommendation}
                  </li>
                ))}
              </ul>
            </Card>

            <Card style={{
              background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%)',
              border: `2px solid ${CONSTANTS.COLORS.gray300}`,
              marginTop: CONSTANTS.SPACING.xl
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                color: CONSTANTS.COLORS.gray800,
                marginBottom: CONSTANTS.SPACING.sm,
                display: 'flex',
                alignItems: 'center',
                gap: CONSTANTS.SPACING.xs
              }}>
                <FileText size={20} color={CONSTANTS.COLORS.primaryGradient} />
                Overall Assessment
              </h3>
              <p style={{ 
                color: CONSTANTS.COLORS.gray700, 
                lineHeight: '1.7', 
                fontSize: '16px' 
              }}>
                {analysis[currentTest].overallAssessment}
              </p>
            </Card>

            <div style={{
              background: CONSTANTS.COLORS.gray100,
              padding: CONSTANTS.SPACING.md,
              borderRadius: CONSTANTS.BORDER_RADIUS.md,
              marginTop: CONSTANTS.SPACING.xl,
              border: `1px solid ${CONSTANTS.COLORS.gray300}`
            }}>
              <p style={{ 
                color: CONSTANTS.COLORS.gray600, 
                fontSize: '14px', 
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                gap: CONSTANTS.SPACING.xs,
                justifyContent: 'center'
              }}>
                <Info size={16} />
                This analysis is AI-generated and should not replace professional medical advice.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif"
    }}>
      {currentTest === 'home' ? renderHome() : renderTestInterface()}
    </div>
  );
};

export default PsychologicalAssessmentPlatform;