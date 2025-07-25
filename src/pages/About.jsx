import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Award, 
  Users, 
  BookOpen, 
  Target, 
  Star, 
  ChevronRight, 
  Play, 
  CheckCircle, 
  ArrowRight,
  Volume2,
  VolumeX
} from "lucide-react";

// Image imports
import aboutBackground from "../assets/about_us_background.jpg";
import seniorTeacher from "../assets/senior_teacher.jpg";
import psychTeacher from "../assets/virtual_trainer.jpg";
import virtualTrainer from "../assets/logo-badge.jpg";

const TeamMember = ({ member, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`
      }}
    >
      <div style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        borderRadius: "24px",
        padding: "32px",
        boxShadow: isHovered 
          ? "0 25px 50px rgba(78, 31, 175, 0.15), 0 0 0 1px rgba(78, 31, 175, 0.1)" 
          : "0 10px 30px rgba(0, 0, 0, 0.08)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        border: "1px solid rgba(78, 31, 175, 0.1)",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: "-50%",
          right: "-50%",
          width: "100%",
          height: "100%",
          background: "linear-gradient(45deg, rgba(78, 31, 175, 0.03), transparent)",
          borderRadius: "50%",
          transform: isHovered ? "scale(1.5)" : "scale(1)",
          transition: "transform 0.6s ease"
        }} />
        
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            width: "100px",
            height: "100px",
            borderRadius: "20px",
            backgroundImage: `url(${member.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            margin: "0 auto 24px",
            border: "4px solid rgba(78, 31, 175, 0.1)",
            transition: "all 0.3s ease",
            transform: isHovered ? "scale(1.05)" : "scale(1)"
          }} />
          
          <div style={{ textAlign: "center" }}>
            <h4 style={{
              fontSize: "1.25rem",
              fontWeight: "700",
              color: "#1e293b",
              marginBottom: "8px",
              transition: "color 0.3s ease"
            }}>
              {member.name}
            </h4>
            
            <div style={{
              display: "inline-block",
              backgroundColor: "rgba(78, 31, 175, 0.1)",
              color: "#4e1faf",
              padding: "6px 16px",
              borderRadius: "12px",
              fontSize: "0.875rem",
              fontWeight: "600",
              marginBottom: "16px"
            }}>
              {member.role}
            </div>
            
            <p style={{
              color: "#64748b",
              fontSize: "0.95rem",
              lineHeight: "1.6",
              margin: 0
            }}>
              {member.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    
    const element = document.getElementById(`counter-${end}`);
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, [end]);

  return (
    <span id={`counter-${end}`}>
      {count}{suffix}
    </span>
  );
};

const About = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  
  // Military training video (placeholder - replace with your actual video)
  const videoSrc = "https://assets.mixkit.co/videos/preview/mixkit-soldiers-on-a-military-parade-1233-large.mp4";
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsVideoPlaying(true);
    const handlePause = () => setIsVideoPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Attempt autoplay
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("Autoplay prevented:", error);
        // Show fallback play button
      });
    }

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const teamMembers = [
    {
      name: "Col. (Retd) Ali Khan",
      role: "Military Strategy Expert",
      bio: "20+ years of experience in Army selection processes with specialized training in leadership development",
      image: seniorTeacher
    },
    {
      name: "Dr. Sara Ahmed",
      role: "Psychological Assessment Specialist",
      bio: "PhD in Behavioral Psychology with ISSB specialization and extensive research in candidate evaluation",
      image: psychTeacher
    },
    {
      name: "Maj. (Retd) Usman Malik",
      role: "Physical Training Instructor",
      bio: "Specialized in military fitness standards with proven track record in candidate preparation",
      image: virtualTrainer
    }
  ];

  const features = [
    {
      icon: Award,
      title: "Proven Methodology",
      description: "Scientifically-developed training programs with 10+ years of consistent success and continuous improvement"
    },
    {
      icon: Target,
      title: "Highest Selection Rate",
      description: "Trusted by thousands with the industry's best ISSB passing ratio and comprehensive success tracking"
    },
    {
      icon: Users,
      title: "Personalized Guidance",
      description: "Tailored coaching programs designed for each candidate's unique strengths and development areas"
    }
  ];

  const stats = [
    { number: 10, suffix: "+", label: "Years of Excellence" },
    { number: 5000, suffix: "+", label: "Successful Candidates" },
    { number: 98, suffix: "%", label: "Satisfaction Rate" },
    { number: 15, suffix: "+", label: "Comprehensive Courses" }
  ];

  const keyframes = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)",
        minHeight: "100vh",
        overflowX: "hidden"
      }}>
        {/* Hero Section */}
        <div style={{
          position: "relative",
          padding: "120px 24px 80px",
          textAlign: "center",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            background: `url(${aboutBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: "0.03",
            zIndex: 0
          }} />
          
          <div style={{
            position: "absolute",
            top: "20%",
            left: "-10%",
            width: "300px",
            height: "300px",
            background: "linear-gradient(135deg, rgba(78, 31, 175, 0.1), transparent)",
            borderRadius: "50%",
            animation: "float 6s ease-in-out infinite"
          }} />
          
          <div style={{
            position: "absolute",
            bottom: "20%",
            right: "-5%",
            width: "200px",
            height: "200px",
            background: "linear-gradient(135deg, transparent, rgba(78, 31, 175, 0.08))",
            borderRadius: "50%",
            animation: "float 6s ease-in-out infinite 3s"
          }} />

          <div style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "900px",
            margin: "0 auto"
          }}>
            <div style={{
              display: "inline-block",
              backgroundColor: "rgba(78, 31, 175, 0.1)",
              color: "#4e1faf",
              padding: "8px 20px",
              borderRadius: "20px",
              fontSize: "0.875rem",
              fontWeight: "600",
              marginBottom: "24px",
              border: "1px solid rgba(78, 31, 175, 0.2)"
            }}>
              🎖️ Pakistan's Premier ISSB Training Institute
            </div>
            
            <h1 style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: "800",
              background: "linear-gradient(135deg, #4e1faf 0%, #7c3aed 50%, #a855f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "24px",
              lineHeight: "1.1",
              animation: "slideInLeft 1s ease-out"
            }}>
              Frontline Prep
            </h1>
            
            <h2 style={{
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
              fontWeight: "600",
              color: "#334155",
              marginBottom: "32px",
              lineHeight: "1.4",
              animation: "slideInRight 1s ease-out 0.2s both"
            }}>
              Your Trusted Partner in Armed Forces Preparation
            </h2>
            
            <p style={{
              fontSize: "1.125rem",
              color: "#64748b",
              lineHeight: "1.7",
              marginBottom: "48px",
              maxWidth: "700px",
              margin: "0 auto 48px",
              animation: "fadeInUp 1s ease-out 0.4s both"
            }}>
              Transforming aspirations into achievements through scientifically-proven methodologies and personalized guidance from military experts.
            </p>

            <div style={{
              position: "relative",
              maxWidth: "800px",
              margin: "0 auto",
              animation: "fadeInUp 1s ease-out 0.6s both",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
            }}>
              <video
                ref={videoRef}
                src={videoSrc}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1540324155974-7523202daa3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  display: "block"
                }}
              />
              
              {/* Video overlay controls */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "16px",
                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "12px"
              }}>
                {/* Play/Pause button (only shown if autoplay fails) */}
                {!isVideoPlaying && (
                  <button
                    onClick={togglePlay}
                    style={{
                      width: "44px",
                      height: "44px",
                      backgroundColor: "rgba(78, 31, 175, 0.9)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      animation: "pulse 2s infinite"
                    }}
                  >
                    <Play size={20} color="white" />
                  </button>
                )}
                
                {/* Mute toggle button */}
                <button
                  onClick={toggleMute}
                  style={{
                    width: "44px",
                    height: "44px",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(5px)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                >
                  {isMuted ? (
                    <VolumeX size={20} color="white" />
                  ) : (
                    <Volume2 size={20} color="white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Features Section */}
        <div style={{
          padding: "80px 24px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: "80px",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto"
          }}>
            <div style={{ animation: "slideInLeft 1s ease-out" }}>
              <div style={{
                display: "inline-block",
                backgroundColor: "rgba(78, 31, 175, 0.1)",
                color: "#4e1faf",
                padding: "6px 16px",
                borderRadius: "12px",
                fontSize: "0.875rem",
                fontWeight: "600",
                marginBottom: "24px"
              }}>
                Our Mission & Vision
              </div>
              
              <h3 style={{
                fontSize: "2.25rem",
                fontWeight: "800",
                color: "#1e293b",
                marginBottom: "32px",
                lineHeight: "1.2"
              }}>
                Empowering Future <span style={{
                  background: "linear-gradient(135deg, #4e1faf, #7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>Leaders</span>
              </h3>
              
              <div style={{ marginBottom: "24px" }}>
                <p style={{
                  fontSize: "1.125rem",
                  lineHeight: "1.8",
                  color: "#475569",
                  marginBottom: "24px"
                }}>
                  We are committed to making forces test preparation accessible, affordable, and effective for everyone. Our dream is to see every passionate student wear the proud uniform of Pakistan Armed Forces.
                </p>
                
                <p style={{
                  fontSize: "1.125rem",
                  lineHeight: "1.8",
                  color: "#475569",
                  marginBottom: "24px"
                }}>
                  At Frontline Prep, we transform dreams into selections through scientifically-proven training methods, cultivating the leadership and confidence needed for success at ISSB and beyond.
                </p>
                
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "20px",
                  backgroundColor: "rgba(78, 31, 175, 0.05)",
                  borderRadius: "16px",
                  border: "1px solid rgba(78, 31, 175, 0.1)"
                }}>
                  <CheckCircle size={24} color="#4e1faf" />
                  <p style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#4e1faf",
                    margin: 0
                  }}>
                    "Every student has a soldier within. We awaken that spirit."
                  </p>
                </div>
              </div>
            </div>
            
            <div style={{ animation: "slideInRight 1s ease-out 0.2s both" }}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px"
              }}>
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  const isActive = activeFeature === index;
                  
                  return (
                    <div
                      key={index}
                      onMouseEnter={() => setActiveFeature(index)}
                      style={{
                        padding: "32px",
                        backgroundColor: isActive ? "rgba(78, 31, 175, 0.05)" : "rgba(255, 255, 255, 0.8)",
                        borderRadius: "20px",
                        border: isActive ? "2px solid rgba(78, 31, 175, 0.2)" : "1px solid rgba(226, 232, 240, 0.8)",
                        cursor: "pointer",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        transform: isActive ? "translateY(-4px)" : "translateY(0)",
                        boxShadow: isActive 
                          ? "0 20px 40px rgba(78, 31, 175, 0.1)" 
                          : "0 4px 20px rgba(0, 0, 0, 0.05)"
                      }}
                    >
                      <div style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "20px"
                      }}>
                        <div style={{
                          width: "56px",
                          height: "56px",
                          backgroundColor: isActive ? "#4e1faf" : "rgba(78, 31, 175, 0.1)",
                          borderRadius: "16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          transition: "all 0.3s ease"
                        }}>
                          <IconComponent size={24} color={isActive ? "white" : "#4e1faf"} />
                        </div>
                        
                        <div>
                          <h4 style={{
                            fontSize: "1.25rem",
                            fontWeight: "700",
                            color: isActive ? "#4e1faf" : "#1e293b",
                            marginBottom: "8px",
                            transition: "color 0.3s ease"
                          }}>
                            {feature.title}
                          </h4>
                          <p style={{
                            color: "#64748b",
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            margin: 0
                          }}>
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div style={{
          padding: "80px 24px",
          backgroundColor: "rgba(248, 250, 252, 0.8)"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto"
          }}>
            <div style={{
              textAlign: "center",
              marginBottom: "64px",
              animation: "fadeInUp 1s ease-out"
            }}>
              <div style={{
                display: "inline-block",
                backgroundColor: "rgba(78, 31, 175, 0.1)",
                color: "#4e1faf",
                padding: "6px 16px",
                borderRadius: "12px",
                fontSize: "0.875rem",
                fontWeight: "600",
                marginBottom: "16px"
              }}>
                Expert Team
              </div>
              
              <h3 style={{
                fontSize: "2.25rem",
                fontWeight: "800",
                color: "#1e293b",
                marginBottom: "16px"
              }}>
                Meet Our <span style={{
                  background: "linear-gradient(135deg, #4e1faf, #7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>Military Experts</span>
              </h3>
              
              <p style={{
                fontSize: "1.125rem",
                color: "#64748b",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: "1.7"
              }}>
                Learn from seasoned professionals with decades of military experience and proven track records in ISSB preparation.
              </p>
            </div>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "32px"
            }}>
              {teamMembers.map((member, index) => (
                <TeamMember key={index} member={member} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div style={{
          background: "linear-gradient(135deg, #4e1faf 0%, #7c3aed 50%, #a855f7 100%)",
          padding: "80px 24px",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: "-50%",
            left: "-25%",
            width: "150%",
            height: "200%",
            background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"white\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>') repeat",
            opacity: 0.3
          }} />
          
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1
          }}>
            <div style={{
              textAlign: "center",
              marginBottom: "64px",
              color: "white"
            }}>
              <h3 style={{
                fontSize: "2.25rem",
                fontWeight: "800",
                marginBottom: "16px"
              }}>
                Our Impact in Numbers
              </h3>
              <p style={{
                fontSize: "1.125rem",
                opacity: 0.9,
                maxWidth: "600px",
                margin: "0 auto"
              }}>
                Measurable success that speaks for our commitment to excellence
              </p>
            </div>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "32px"
            }}>
              {stats.map((stat, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: "center",
                    color: "white",
                    padding: "32px 16px",
                    borderRadius: "20px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    animation: `fadeInUp 1s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div style={{
                    fontSize: "3.5rem",
                    fontWeight: "900",
                    marginBottom: "12px",
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                  }}>
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                  </div>
                  <div style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    opacity: 0.9
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{
          padding: "80px 24px",
          backgroundColor: "rgba(255, 255, 255, 0.9)"
        }}>
          <div style={{
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "center",
            padding: "64px 48px",
            background: "linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%)",
            borderRadius: "32px",
            border: "1px solid rgba(226, 232, 240, 0.8)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{
              position: "absolute",
              top: "-50%",
              right: "-50%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(45deg, rgba(78, 31, 175, 0.05), transparent)",
              borderRadius: "50%"
            }} />
            
            <div style={{ position: "relative", zIndex: 1 }}>
              <h3 style={{
                fontSize: "2.25rem",
                fontWeight: "800",
                marginBottom: "20px",
                background: "linear-gradient(135deg, #4e1faf, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                Ready to Begin Your Journey?
              </h3>
              
              <p style={{
                fontSize: "1.25rem",
                marginBottom: "40px",
                color: "#64748b",
                lineHeight: "1.7"
              }}>
                Join thousands of successful candidates who transformed their dreams into reality with Frontline
              </p>
             
              <div style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                flexWrap: "wrap"
              }}>
                <button 
                  onClick={() => window.open("https://wa.me/923001234567", "_blank")}
                  style={{
                    background: "linear-gradient(135deg, #4e1faf 0%, #7c3aed 100%)",
                    color: "white",
                    padding: "16px 32px",
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    border: "none",
                    borderRadius: "16px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    boxShadow: "0 8px 20px rgba(78, 31, 175, 0.3)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 12px 30px rgba(78, 31, 175, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 8px 20px rgba(78, 31, 175, 0.3)";
                  }}
                >
                  Enroll Now <ArrowRight size={20} />
                </button>
                
                <button 
                  onClick={() => navigate("/learn-more")}
                  style={{
                    backgroundColor: "transparent",
                    color: "#4e1faf",
                    padding: "16px 32px",
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    border: "2px solid #4e1faf",
                    borderRadius: "16px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#4e1faf";
                    e.target.style.color = "white";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#4e1faf";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  Learn More <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;