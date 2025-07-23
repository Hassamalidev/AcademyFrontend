import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero_2 from "../pages/Hero_2";
import { FaArrowRight, FaArrowLeft, FaWhatsapp } from "react-icons/fa";
import HomeCategory from "./HomeCategory.jsx";
import NotesPage from "./NotesPage.jsx";
import Footer from "./Footer.jsx";
import Testimonials from "./Testimonals.jsx";
import navyCadet from "../assets/navy_cadet.png";
import airCadet from "../assets/air_force_officer.png";
import armyCadet from "../assets/army_officer.png";
import IssbPic from "../assets/issb_pic.png";

function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const whatsappNumber = "923001234567";

  const slides = [
    {
      id: "navy",
      title: "Pakistan Navy",
      subtitle: "Your naval career starts here! Structured lessons and comprehensive mock exams to prepare you for maritime excellence.",
      buttonText: "Enroll Today!",
      themeColor: "#20B2AA",
      gradientColor: "#008B8B",
      image: navyCadet,
      icon: "⚓",
      shape: "wave"
    },
    {
      id: "airforce",
      title: "Pakistan Air Force",
      subtitle: "Take flight with confidence! Expert strategies and real-time practice sessions designed for your aviation success.",
      buttonText: "Start Now",
      themeColor: "#3a7ca5",
      gradientColor: "#1e5f7a",
      image: airCadet,
      icon: "✈️",
      shape: "cloud"
    },
    {
      id: "army",
      title: "Pakistan Army",
      subtitle: "Join the elite forces! Expert guidance and comprehensive training modules for aspiring army officers.",
      buttonText: "Register Now!",
      themeColor: "#2F4F2F",
      gradientColor: "#1C3A1C",
      image: armyCadet,
      icon: "🪖",
      shape: "blob"
    },
    {
      id: "issb",
      title: "ISSB Preparation",
      subtitle: "Your final step to commission! Complete preparation for leadership assessment and psychological evaluation tests.",
      buttonText: "Sign Up Today!",
      themeColor: "#8B4513",
      gradientColor: "#654321",
      image: IssbPic,
      icon: "🎯",
      shape: "swirl"
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const openWhatsApp = (slideTitle) => {
    const message = `Hello, I'm interested in the ${slideTitle} preparation course. Please provide me with more details.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getShapeStyle = (shape) => {
    const shapes = {
      wave: { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
      cloud: { borderRadius: '60% 40% 40% 60% / 70% 50% 50% 30%' },
      blob: { borderRadius: '53% 47% 43% 57% / 45% 43% 57% 55%' },
      swirl: { borderRadius: '63% 37% 56% 44% / 46% 37% 63% 54%' }
    };
    return shapes[shape] || shapes.wave;
  };

  const currentSlideData = slides[currentSlide];

  return (
    <>
      {/* Hero Slider Section */}
      <div style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "#f8fafc"
      }}>
        {/* Enhanced Background with better gradient transition */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${currentSlideData.themeColor} 0%, ${currentSlideData.gradientColor} 40%, #1a202c 100%)`,
          transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          zIndex: 0,
        }} />

        {/* Improved animated particles with better performance */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          opacity: 0.15,
          pointerEvents: "none"
        }}>
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              background: "rgba(255, 255, 255, 0.8)",
              borderRadius: "50%",
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatParticle ${Math.random() * 8 + 6}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }} />
          ))}
        </div>

        {/* Main content container with improved layout */}
        <div style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: isMobile ? "60px 20px" : "0 5%",
          maxWidth: "1400px",
          margin: "0 auto"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "40px" : "60px",
            alignItems: "center",
            width: "100%"
          }}>
            {/* Enhanced text content */}
            <div style={{
              color: "#fff",
              maxWidth: isMobile ? "100%" : "600px",
              padding: isMobile ? "30px 25px" : "50px 40px",
              background: "rgba(0, 0, 0, 0.25)",
              backdropFilter: "blur(15px)",
              borderRadius: "24px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              transform: "translateY(0)",
              animation: "slideInLeft 0.8s ease-out"
            }}>
              {/* Enhanced category badge */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                padding: "12px 20px",
                borderRadius: "50px",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "24px",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}>
                <span style={{ fontSize: "20px" }}>{currentSlideData.icon}</span>
                <span>Military Career Preparation</span>
              </div>

              {/* Enhanced title */}
              <h1 style={{
                fontSize: isMobile ? "2.5rem" : "4rem",
                fontWeight: "800",
                margin: "0 0 24px 0",
                lineHeight: "1.1",
                textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                {currentSlideData.title}
              </h1>

              {/* Enhanced subtitle */}
              <p style={{
                fontSize: isMobile ? "1.1rem" : "1.3rem",
                lineHeight: "1.7",
                marginBottom: "40px",
                color: "rgba(255, 255, 255, 0.9)",
                fontWeight: "400"
              }}>
                {currentSlideData.subtitle}
              </p>

              {/* Enhanced CTA buttons */}
              <div style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: "16px",
                marginBottom: "40px"
              }}>
                <button
                  onClick={() => openWhatsApp(currentSlideData.title)}
                  style={{
                    background: "linear-gradient(135deg, #fff 0%, #f8f9fa 100%)",
                    color: currentSlideData.themeColor,
                    border: "none",
                    padding: "16px 32px",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    borderRadius: "50px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                    position: "relative",
                    overflow: "hidden"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-3px) scale(1.02)";
                    e.target.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0) scale(1)";
                    e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
                  }}
                >
                  {currentSlideData.buttonText}
                  <FaWhatsapp style={{ fontSize: "1.3rem", color: "#25D366" }} />
                </button>

                <button style={{
                  background: "transparent",
                  color: "#fff",
                  border: "2px solid rgba(255, 255, 255, 0.8)",
                  padding: "16px 32px",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  borderRadius: "50px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  backdropFilter: "blur(10px)"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.1)";
                  e.target.style.borderColor = "#fff";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.8)";
                  e.target.style.transform = "translateY(0)";
                }}
                >
                  Learn More
                  <FaArrowRight />
                </button>
              </div>

              {/* Enhanced slide indicators */}
              <div style={{
                display: "flex",
                gap: "12px",
                alignItems: "center"
              }}>
                {slides.map((slide, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    style={{
                      width: currentSlide === index ? "40px" : "12px",
                      height: "12px",
                      borderRadius: "6px",
                      border: "none",
                      background: currentSlide === index 
                        ? "rgba(255, 255, 255, 0.9)" 
                        : "rgba(255, 255, 255, 0.3)",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                      backdropFilter: "blur(5px)"
                    }}
                    onMouseEnter={(e) => {
                      if (currentSlide !== index) {
                        e.target.style.background = "rgba(255, 255, 255, 0.5)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentSlide !== index) {
                        e.target.style.background = "rgba(255, 255, 255, 0.3)";
                      }
                    }}
                    aria-label={`Go to ${slide.title} slide`}
                  />
                ))}
              </div>
            </div>

            {/* Enhanced image content for desktop */}
            {!isMobile && (
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                height: "600px",
                animation: "slideInRight 0.8s ease-out 0.2s both"
              }}>
                <div style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "500px",
                  height: "500px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  {/* Background glow effect */}
                  <div style={{
                    position: "absolute",
                    width: "120%",
                    height: "120%",
                    background: `radial-gradient(ellipse at center, ${currentSlideData.themeColor}40 0%, transparent 70%)`,
                    ...getShapeStyle(currentSlideData.shape),
                    transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    transform: "scale(1.3)",
                    filter: "blur(30px)",
                    zIndex: -1
                  }} />

                  {/* Main image container */}
                  <div style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    ...getShapeStyle(currentSlideData.shape),
                    overflow: "hidden",
                    border: "3px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3)",
                    transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    transform: "scale(1)",
                    animation: "imageFloat 6s ease-in-out infinite"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05) rotateY(5deg)";
                    e.currentTarget.style.boxShadow = "0 40px 80px rgba(0, 0, 0, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 30px 60px rgba(0, 0, 0, 0.3)";
                  }}
                  >
                    <img
                      src={currentSlideData.image}
                      alt={`${currentSlideData.title} preparation course`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        filter: "brightness(1.1) contrast(1.05) saturate(1.1)"
                      }}
                    />
                    
                    {/* Image overlay gradient */}
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(135deg, transparent 0%, ${currentSlideData.themeColor}15 100%)`,
                      transition: "all 1s ease"
                    }} />
                  </div>

                  {/* Decorative ring */}
                  <div style={{
                    position: "absolute",
                    width: "110%",
                    height: "110%",
                    border: "2px solid rgba(255, 255, 255, 0.1)",
                    ...getShapeStyle(currentSlideData.shape),
                    animation: "rotateRing 20s linear infinite",
                    zIndex: -1
                  }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced navigation arrows */}
        {!isMobile && (
          <>
            <button
              onClick={goToPrev}
              style={{
                position: "absolute",
                left: "40px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255, 255, 255, 0.15)",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                fontSize: "1.4rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                backdropFilter: "blur(10px)"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.25)";
                e.target.style.transform = "translateY(-50%) scale(1.1)";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.15)";
                e.target.style.transform = "translateY(-50%) scale(1)";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              }}
              aria-label="Previous slide"
            >
              <FaArrowLeft />
            </button>

            <button
              onClick={goToNext}
              style={{
                position: "absolute",
                right: "40px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255, 255, 255, 0.15)",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                fontSize: "1.4rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                backdropFilter: "blur(10px)"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.25)";
                e.target.style.transform = "translateY(-50%) scale(1.1)";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.15)";
                e.target.style.transform = "translateY(-50%) scale(1)";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              }}
              aria-label="Next slide"
            >
              <FaArrowRight />
            </button>
          </>
        )}
      </div>

      {/* Enhanced CSS animations */}
      <style>
        {`
          @keyframes floatParticle {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.3;
            }
            50% { 
              transform: translateY(-30px) rotate(180deg); 
              opacity: 0.8;
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
          
          @keyframes imageFloat {
            0%, 100% { 
              transform: translateY(0px) scale(1);
            }
            50% { 
              transform: translateY(-10px) scale(1.02);
            }
          }
          
          @keyframes rotateRing {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .hero-slider {
            perspective: 1000px;
          }
          
          /* Mobile specific optimizations */
          @media (max-width: 768px) {
            .hero-slider .particles {
              display: none;
            }
          }
        `}
      </style>

      {/* Other components */}
      <Hero_2 />
      <HomeCategory />
      <NotesPage />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;