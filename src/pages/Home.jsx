import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero_2 from "../pages/Hero_2";
import { FaArrowRight, FaArrowLeft, FaWhatsapp } from "react-icons/fa";
import HomeCategory from "./HomeCategory.jsx";
import NotesPage from "./NotesPage.jsx";
import Footer from "./Footer.jsx";
import Testimonials from "./Testimonals.jsx";
import navyCadet from "../assets/navy_cadet.png";
import airCadet from "../assets/air_force_officer.png"
import armyCadet from "../assets/army_officer.png"
import IssbPic from "../assets/issb_pic.png"

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
      image: navyCadet,
      icon: "⚓",
      shape: "wave"
    },
    {
      id: "airforce",
      title: "Pakistan Air Force",
      subtitle: "Take flight with confidence! Expert strategies and real-time practice.",
      buttonText: "Start Now",
      themeColor: "#3a7ca5",
      image: airCadet,
     icon: "✈️",
      shape: "cloud"
    },
    {
      id: "army",
      title: "Pakistan Army",
      subtitle: "Join the elite! Expert guidance and comprehensive training.",
      buttonText: "Register Now!",
      themeColor: "#2F2010",
      image: armyCadet,
     icon: "🪖",
      shape: "blob"
    },
    {
      id: "issb",
      title: "ISSB Preparation",
      subtitle: "Your final step to success! Leadership and psychological tests.",
      buttonText: "Sign up today!",
      themeColor: "#5c2018",
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
     <div style={{
  position: "absolute",
  top: 0,
  left: 0,
  width: "calc(100% - 40px)", 
  height: "calc(100% - 40px)", 
  background: `linear-gradient(135deg, ${slides[currentSlide].themeColor} 0%, #000 100%)`,
  transition: "all 0.8s cubic-bezier(0.77, 0, 0.175, 1)",
  zIndex: 0,
  borderRadius: "20px",
  margin: "20px",
}}></div>

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
    
    <Testimonials/>
    <Footer/>
    </>
  );
}

export default Home;