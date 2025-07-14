import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero_2 from "../pages/Hero_2";
import { FaArrowRight, FaArrowLeft, FaWhatsapp } from "react-icons/fa";
import HomeCategory from "./HomeCategory.jsx";
import NotesPage from "./NotesPage.jsx";
import Footer from "./Footer.jsx";

function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const whatsappNumber = "923001234567"; 

  const slides = [
    {
      id: "navy",
      title: "Pakistan Navy",
      subtitle: "Your naval career starts here! Structured lessons and mock exams.",
      buttonText: "Enroll today!",
      themeColor: "#1a4b8c",
       image: "data:image/jpeg;base64,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",
     icon: "⚓",
      shape: "wave"
    },
    {
      id: "airforce",
      title: "Pakistan Air Force",
      subtitle: "Take flight with confidence! Expert strategies and real-time practice.",
      buttonText: "Start Now",
      themeColor: "#3a7ca5",
      image: "data:image/jpeg;base64,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",
     icon: "✈️",
      shape: "cloud"
    },
    {
      id: "army",
      title: "Pakistan Army",
      subtitle: "Join the elite! Expert guidance and comprehensive training.",
      buttonText: "Register Now!",
      themeColor: "#2F2010",
      image: "data:image/jpeg;base64,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",
     icon: "🪖",
      shape: "blob"
    },
    {
      id: "issb",
      title: "ISSB Preparation",
      subtitle: "Your final step to success! Leadership and psychological tests.",
      buttonText: "Sign up today!",
      themeColor: "#5c2018",
      image: "data:image/jpeg;base64,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",
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
    }, 5000);
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
    const message = `Hello, I'm interested in ${slideTitle} course`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getShapeStyle = (shape) => {
    switch(shape) {
      case 'wave':
        return { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' };
      case 'cloud':
        return { borderRadius: '60% 40% 40% 60% / 70% 50% 50% 30%' };
      case 'blob':
        return { borderRadius: '53% 47% 43% 57% / 45% 43% 57% 55%' };
      case 'swirl':
        return { borderRadius: '63% 37% 56% 44% / 46% 37% 63% 54%' };
      default:
        return { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' };
    }
  };

  return (
    <>
      <div className="hero-slider" style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Animated background elements */}
     <div style={{
  position: "absolute",
  top: 0,
  left: 0,
  width: "calc(100% - 40px)", // Only define once
  height: "calc(100% - 40px)", // Only define once
  background: `linear-gradient(135deg, ${slides[currentSlide].themeColor} 0%, #000 100%)`,
  transition: "all 0.8s cubic-bezier(0.77, 0, 0.175, 1)",
  zIndex: 0,
  borderRadius: "20px",
  margin: "20px",
}}></div>

        {/* Floating particles */}
        <div className="particles" style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          opacity: 0.3,
        }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              background: "#fff",
              borderRadius: "50%",
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}></div>
          ))}
        </div>

        {/* Main content */}
        <div className="slider-content" style={{
          position: "relative",
          zIndex: 2,
          height: "calc(100vh - 40px)",
          display: "flex",
          alignItems: "center",
          padding: "0 5%",
          margin: "20px",
          borderRadius: "20px",
          overflow: "hidden",
        }}>
          {/* Text content */}
          <div className="text-content" style={{
            flex: 1,
            color: "#fff",
            maxWidth: "600px",
            padding: "40px",
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.1)",
            transform: isMobile ? "none" : "translateX(50px)",
            opacity: isMobile ? 1 : 0,
            animation: isMobile ? "none" : "fadeIn 0.5s 0.3s forwards",
          }}>
            <div style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              marginBottom: "10px",
              color: "rgba(255,255,255,0.8)",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <span style={{ fontSize: "1.5rem" }}>{slides[currentSlide].icon}</span>
              Military Career Prep
            </div>
            
            <h1 style={{
              fontSize: isMobile ? "2.2rem" : "3.5rem",
              fontWeight: "800",
              margin: "20px 0",
              lineHeight: "1.2",
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}>
              {slides[currentSlide].title}
            </h1>
            
            <p style={{
              fontSize: "1.2rem",
              lineHeight: "1.6",
              marginBottom: "40px",
              opacity: 0.9,
            }}>
              {slides[currentSlide].subtitle}
            </p>
            
            <button
              onClick={() => openWhatsApp(slides[currentSlide].title)}
              style={{
                background: "#fff",
                color: slides[currentSlide].themeColor,
                border: "none",
                padding: "15px 30px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                borderRadius: "50px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                transition: "all 0.3s",
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
              }}
            >
              {slides[currentSlide].buttonText}
              <FaWhatsapp style={{ fontSize: "1.2rem" }} />
            </button>

            {/* Slide indicators */}
            <div style={{
              display: "flex",
              gap: "10px",
              marginTop: "40px",
            }}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    border: "none",
                    background: currentSlide === index ? "#fff" : "rgba(255,255,255,0.3)",
                    cursor: "pointer",
                    padding: 0,
                    transition: "all 0.3s",
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Image content - only on desktop */}
          {!isMobile && (
            <div className="image-content" style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              height: "100%",
              opacity: 0,
              animation: "fadeIn 0.5s 0.5s forwards",
            }}>
              <div style={{
                position: "relative",
                width: "100%",
                maxWidth: "600px",
                height: "80%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
                {/* Shape background */}
                <div style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  background: slides[currentSlide].themeColor,
                  opacity: 0.2,
                  ...getShapeStyle(slides[currentSlide].shape),
                  transition: "all 0.8s cubic-bezier(0.77, 0, 0.175, 1)",
                  transform: "scale(1.2)",
                  filter: "blur(20px)",
                }}></div>
                
                {/* Image with organic shape mask */}
                <div style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  ...getShapeStyle(slides[currentSlide].shape),
                  overflow: "hidden",
                  border: "5px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                  transition: "all 0.8s cubic-bezier(0.77, 0, 0.175, 1)",
                }}>
                  <img
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transform: "translateY(20px)",
                      opacity: 0,
                      animation: "floatUp 0.5s 0.7s forwards",
                      filter: "brightness(1.1) contrast(1.1)",
                    }}
                  />
                </div>
                
                {/* Glow effect */}
                <div style={{
                  position: "absolute",
                  width: "120%",
                  height: "120%",
                  background: `radial-gradient(circle at center, ${slides[currentSlide].themeColor} 0%, transparent 70%)`,
                  zIndex: -1,
                  opacity: 0.3,
                  borderRadius: "50%",
                }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation arrows */}
        {!isMobile && (
          <>
            <button
              onClick={goToPrev}
              style={{
                position: "absolute",
                left: "60px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.2)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                fontSize: "1.5rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                transition: "all 0.3s",
                backdropFilter: "blur(5px)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.3)";
                e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                e.currentTarget.style.transform = "translateY(-50%)";
              }}
              aria-label="Previous slide"
            >
              <FaArrowLeft />
            </button>
            
            <button
              onClick={goToNext}
              style={{
                position: "absolute",
                right: "60px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.2)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                fontSize: "1.5rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                transition: "all 0.3s",
                backdropFilter: "blur(5px)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.3)";
                e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                e.currentTarget.style.transform = "translateY(-50%)";
              }}
              aria-label="Next slide"
            >
              <FaArrowRight />
            </button>
          </>
        )}
      </div>

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes floatUp {
            from { 
              transform: translateY(20px);
              opacity: 0;
            }
            to { 
              transform: translateY(0);
              opacity: 1;
            }
          }
          .hero-slider {
            perspective: 1000px;
          }
        `}
      </style>
     <Hero_2/>
     <HomeCategory/>
     <NotesPage/>
    <Footer/>
    </>
  );
}

export default Home;