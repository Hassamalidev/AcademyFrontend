import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero_2 from "../pages/Hero_2";
function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // WhatsApp numbers for each slide (replace with actual numbers)
  const whatsappNumbers = {
    navy: "923001234567",
    airforce: "923001234568",
    army: "923001234569",
    issb: "923001234570"
  };

  const slides = [
    {
      id: "navy",
      title: "Pakistan Navy: Initial Test",
      subtitle: "Your naval career starts here! Structured lessons and mock exams.",
      buttonText: "Enroll today!",
      bgColor: "#2F2010",
      shapeColor: "white",
      image: "./download.png",
      shapeStyle: {
        borderRadius: "70% 30% 30% 70% / 60% 40% 60% 40%",
        width: "380px",
        height: "380px",
        transform: "rotate(-10deg)"
      }
    },
    {
      id: "airforce",
      title: "Pakistan Air Force: Initial Test",
      subtitle: "Take flight with confidence! Expert strategies, real-time practice, and mock exams.",
      buttonText: "Start Now",
      bgColor: "#2F2010",
      shapeColor: "white",
     image: "./download.png",
     shapeStyle: {
        borderRadius: "40% 60% 60% 40% / 70% 50% 50% 30%",
        width: "400px",
        height: "360px",
        transform: "rotate(15deg)"
      }
    },
    {
      id: "army",
      title: "Pakistan Army: Initial Test",
      subtitle: "Join the elite! Expert guidance, structured lessons, and mock exams.",
      buttonText: "Register Now!",
      bgColor: "#2F2010",
      shapeColor: "white",
     image: "./download.png",
      shapeStyle: {
        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        width: "350px",
        height: "350px",
        transform: "rotate(0deg)"
      }
    },
    {
      id: "issb",
      title: "ISSB Test Preparation",
      subtitle: "Your final step to success! Leadership tasks, psychological tests, and mock drills.",
      buttonText: "Sign up today!",
      bgColor: "#2F2010",
      shapeColor: "white",
      image: "./download.png",
      shapeStyle: {
        borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
        width: "400px",
        height: "400px",
        transform: "rotate(45deg)"
      }
    },
  ];

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto slide transition
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000); // Change slide every 5 seconds
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

  // Function to open WhatsApp
  const openWhatsApp = (slideId) => {
    const number = whatsappNumbers[slideId];
    const message = `Hello, I'm interested in ${slides.find(s => s.id === slideId).title}`;
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
     
    <div style={{
      minHeight: "calc(100vh - 80px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      backgroundColor: "#ffffff",
      paddingTop: "20px",
    }}>
      {/* Navigation arrows */}
      <button
        onClick={goToPrev}
        style={{
          position: "absolute",
          left: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.2)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          width: "50px",
          height: "50px",
          fontSize: "1.5rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          transition: "all 0.3s",
        }}
        onMouseOver={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.3)"}
        onMouseOut={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.2)"}
        aria-label="Previous slide"
      >
        &lt;
      </button>
      
      <button
        onClick={goToNext}
        style={{
          position: "absolute",
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.2)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          width: "50px",
          height: "50px",
          fontSize: "1.5rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          transition: "all 0.3s",
        }}
        onMouseOver={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.3)"}
        onMouseOut={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.2)"}
        aria-label="Next slide"
      >
        &gt;
      </button>

      {/* Slides container */}
      <div style={{
        width: "100%",
        maxWidth: "1400px",
        margin: "0 80px",
        position: "relative",
        zIndex: 2,
      }}>
        {/* Slide background (colored section) */}
        <div style={{
          background: slides[currentSlide].bgColor,
          borderRadius: "20px",
          transition: "all 0.5s ease",
          padding: "40px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          height: isMobile ? "auto" : "600px",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}>
          {/* Left content */}
          <div style={{
            flex: 1,
            color: "white",
            padding: isMobile ? "20px 0" : "0 40px 0 20px",
            textAlign: isMobile ? "center" : "left",
            zIndex: 3,
          }}>
            <h1 style={{
              fontSize: isMobile ? "2rem" : "2.8rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              lineHeight: "1.2",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}>
              {slides[currentSlide].title}
            </h1>
            <p style={{
              fontSize: isMobile ? "1.1rem" : "1.3rem",
              marginBottom: "2.5rem",
              opacity: 0.9,
              lineHeight: "1.6",
              textShadow: "0 1px 2px rgba(0,0,0,0.2)",
            }}>
              {slides[currentSlide].subtitle}
            </p>
            <button
              onClick={() => openWhatsApp(slides[currentSlide].id)}
              style={{
                backgroundColor: "white",
                color: slides[currentSlide].bgColor,
                padding: "15px 35px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              {slides[currentSlide].buttonText}
            </button>
          </div>

          {/* Right image with shape */}
          {!isMobile && (
            <div style={{
              flex: 1,
              position: "relative",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              {/* Colored shape background - customized per slide */}
              <div style={{
                position: "absolute",
                background: slides[currentSlide].shapeColor,
                opacity: 0.8,
                zIndex: 1,
                ...slides[currentSlide].shapeStyle
              }}></div>
              
              {/* Transparent image - properly cropped */}
              <div style={{
                position: "relative",
                zIndex: 2,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
              }}>
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  style={{ 
                    width: "auto",
                    height: "90%",
                    maxHeight: "500px",
                    objectFit: "contain",
                    filter: "drop-shadow(0 5px 15px rgba(0,0,0,0.3))"
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Slide indicators */}
      <div style={{
        position: "absolute",
        bottom: "40px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "12px",
        zIndex: 10,
      }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              border: "none",
              background: currentSlide === index ? "white" : "rgba(255,255,255,0.4)",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s",
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
    <Hero_2 />
    </>
  );
}

export default Home;