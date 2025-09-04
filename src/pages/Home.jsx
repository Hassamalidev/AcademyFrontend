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

  const whatsappChannel = "https://whatsapp.com/channel/0029Vb6OOf2JuyABkRXFLn2m";

  const slides = [
    {
      id: "navy",
      title: "Pakistan Navy",
      subtitle: "Your naval career starts here! Structured lessons and comprehensive mock exams to prepare you for maritime excellence.",
      buttonText: "Enroll Today!",
      themeColor: "#006400", // Navy Dark Green
      gradientColor: "#1e7a1e", // Navy Medium Green
      accentColor: "#20B2AA", // Navy Teal accent
      image: navyCadet,
      icon: "⚓",
      shape: "wave",
      pattern: "navy-pattern"
    },
    {
      id: "airforce",
      title: "Pakistan Air Force",
      subtitle: "Take flight with confidence! Expert strategies and real-time practice sessions designed for your aviation success.",
      buttonText: "Start Now",
      themeColor: "#1C4C1C", // Air Force Dark Green
      gradientColor: "#2B6B2B", // Air Force Medium Green
      accentColor: "#3a7ca5", // Air Force Blue accent
      image: airCadet,
      icon: "✈️",
      shape: "cloud",
      pattern: "airforce-pattern"
    },
    {
      id: "army",
      title: "Pakistan Army",
      subtitle: "Join the elite forces! Expert guidance and comprehensive training modules for aspiring army officers.",
      buttonText: "Register Now!",
      themeColor: "#143814", // Army Dark Green
      gradientColor: "#235823", // Army Medium Green
      accentColor: "#8B4513", // Army Brown accent
      image: armyCadet,
      icon: "🪖",
      shape: "blob",
      pattern: "army-pattern"
    },
    {
      id: "issb",
      title: "ISSB Preparation",
      subtitle: "Your final step to commission! Complete preparation for leadership assessment and psychological evaluation tests.",
      buttonText: "Sign Up Today!",
      themeColor: "#1E3A1E", // ISSB Dark Green
      gradientColor: "#2D572C", // ISSB Medium Green
      accentColor: "#FFD700", // ISSB Gold accent
      image: IssbPic,
      icon: "🎯",
      shape: "swirl",
      pattern: "issb-pattern"
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
    window.open(whatsappChannel, "_blank");
  };

  const handleLearnMore = () => {
    navigate('/learn-more');
  };

  const getShapeStyle = (shape) => {
    const shapes = {
      wave: "rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%]",
      cloud: "rounded-[60%_40%_40%_60%_/_70%_50%_50%_30%]",
      blob: "rounded-[53%_47%_43%_57%_/_45%_43%_57%_55%]",
      swirl: "rounded-[63%_37%_56%_44%_/_46%_37%_63%_54%]"
    };
    return shapes[shape] || shapes.wave;
  };

  const currentSlideData = slides[currentSlide];

  return (
    <>
      <div className="min-h-screen relative overflow-hidden bg-gray-50 rounded-t-[40px] md:rounded-[40px]">
        {/* Background gradient */}
        <div 
          className="absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out z-0 rounded-t-[40px] md:rounded-[40px]"
          style={{
            background: `linear-gradient(135deg, ${currentSlideData.themeColor} 0%, ${currentSlideData.gradientColor} 40%, #1a202c 100%)`
          }}
        />

        {/* Pattern overlay based on slide */}
        <div className={`absolute top-0 left-0 w-full h-full z-1 opacity-10 pointer-events-none rounded-t-[40px] md:rounded-[40px] ${currentSlideData.pattern}`} />

        {/* Floating particles */}
        <div className="absolute top-0 left-0 w-full h-full z-1 opacity-15 pointer-events-none rounded-t-[40px] md:rounded-[40px]">
          {Array.from({ length: 25 }).map((_, i) => (
            <div 
              key={i}
              className="absolute bg-white/80 rounded-full animate-floatParticle"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-2 min-h-screen flex items-center px-4 py-16 md:py-0 md:px-5 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center w-full">
            {/* Text content */}
            <div className="text-white max-w-full md:max-w-xl p-6 md:p-10 bg-black/25 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl transform transition-all duration-800 animate-slideInLeft">
              <div 
                className="inline-flex items-center gap-3 backdrop-blur-md py-2 px-4 rounded-full text-sm font-semibold mb-6 border border-white/10"
                style={{ backgroundColor: `${currentSlideData.accentColor}30` }}
              >
                <span className="text-xl">{currentSlideData.icon}</span>
                <span>Military Career Preparation</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {currentSlideData.title}
              </h1>

              <p className="text-base sm:text-lg md:text-xl mb-8 text-white/90 font-normal leading-relaxed">
                {currentSlideData.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={() => openWhatsApp(currentSlideData.title)}
                  className="py-3 px-6 sm:py-4 sm:px-8 text-base sm:text-lg font-bold rounded-full cursor-pointer flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-md relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentSlideData.accentColor} 0%, ${currentSlideData.themeColor} 100%)`,
                    color: 'white'
                  }}
                >
                  {currentSlideData.buttonText}
                  <FaWhatsapp className="text-xl" />
                </button>

                <button 
                  onClick={handleLearnMore}
                  className="bg-transparent text-white border-2 border-white/80 py-3 px-6 sm:py-4 sm:px-8 text-base sm:text-lg font-semibold rounded-full cursor-pointer flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-sm hover:bg-white/10 hover:border-white"
                >
                  Learn More
                  <FaArrowRight />
                </button>
              </div>

              <div className="flex gap-3 items-center">
                {slides.map((slide, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 ease-in-out backdrop-blur-sm cursor-pointer ${
                      currentSlide === index 
                        ? "w-8 bg-white/90" 
                        : "w-3 bg-white/30 hover:bg-white/50"
                    } h-3 rounded-full`}
                    aria-label={`Go to ${slide.title} slide`}
                  />
                ))}
              </div>
            </div>

            {/* Image content - hidden on mobile */}
            {!isMobile && (
              <div className="flex justify-center items-center relative h-[400px] lg:h-[500px] animate-slideInRight">
                <div className="relative w-full max-w-md h-full flex justify-center items-center">
                  {/* Background glow */}
                  <div 
                    className={`absolute w-[120%] h-[120%] transition-all duration-1000 ease-in-out ${getShapeStyle(currentSlideData.shape)} scale-130 blur-3xl z-[-1]`}
                    style={{ background: `radial-gradient(ellipse at center, ${currentSlideData.accentColor}40 0%, transparent 70%)` }}
                  />

                  {/* Main image container */}
                  <div 
                    className={`relative w-full h-full overflow-hidden border-2 border-white/20 shadow-2xl transition-all duration-1000 ease-in-out ${getShapeStyle(currentSlideData.shape)} animate-imageFloat hover:scale-105 hover:shadow-2xl`}
                    style={{ borderColor: `${currentSlideData.accentColor}60` }}
                  >
                    <img
                      src={currentSlideData.image}
                      alt={`${currentSlideData.title} preparation course`}
                      className="w-full h-full object-cover transition-all duration-1000 ease-in-out brightness-110 contrast-105 saturate-110"
                    />
                    
                    {/* Overlay gradient */}
                    <div 
                      className="absolute inset-0 transition-all duration-1000 ease"
                      style={{ background: `linear-gradient(135deg, transparent 0%, ${currentSlideData.themeColor}25 100%)` }}
                    />
                  </div>

                  {/* Decorative ring */}
                  <div 
                    className={`absolute w-[110%] h-[110%] border-2 transition-all duration-1000 ease ${getShapeStyle(currentSlideData.shape)} animate-rotateRing z-[-1]`}
                    style={{ borderColor: `${currentSlideData.accentColor}30` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation arrows - hidden on mobile */}
        {!isMobile && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 bg-white/15 text-white border border-white/20 rounded-full w-12 h-12 md:w-14 md:h-14 text-lg cursor-pointer flex items-center justify-center z-10 transition-all duration-300 backdrop-blur-md hover:bg-white/25 hover:scale-110 hover:border-white/40"
              aria-label="Previous slide"
            >
              <FaArrowLeft />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 bg-white/15 text-white border border-white/20 rounded-full w-12 h-12 md:w-14 md:h-14 text-lg cursor-pointer flex items-center justify-center z-10 transition-all duration-300 backdrop-blur-md hover:bg-white/25 hover:scale-110 hover:border-white/40"
              aria-label="Next slide"
            >
              <FaArrowRight />
            </button>
          </>
        )}
      </div>

      {/* Custom styles and animations */}
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
          
          /* Pattern styles for different slides */
          .navy-pattern {
            background-image: radial-gradient(circle, rgba(32, 178, 170, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
          }
          
          .airforce-pattern {
            background-image: linear-gradient(45deg, rgba(58, 124, 165, 0.1) 25%, transparent 25%, transparent 75%, rgba(58, 124, 165, 0.1) 75%, rgba(58, 124, 165, 0.1)),
                              linear-gradient(-45deg, rgba(58, 124, 165, 0.1) 25%, transparent 25%, transparent 75%, rgba(58, 124, 165, 0.1) 75%, rgba(58, 124, 165, 0.1));
            background-size: 20px 20px;
          }
          
          .army-pattern {
            background-image: repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(139, 69, 19, 0.1) 10px, rgba(139, 69, 19, 0.1) 12px);
          }
          
          .issb-pattern {
            background-image: radial-gradient(circle, rgba(255, 215, 0, 0.1) 1px, transparent 1px);
            background-size: 15px 15px;
          }
          
          @media (max-width: 768px) {
            .hero-content {
              padding-top: 4rem;
              padding-bottom: 4rem;
            }
          }
        `}
      </style>

      <Hero_2 />
      <HomeCategory />
      <NotesPage />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;