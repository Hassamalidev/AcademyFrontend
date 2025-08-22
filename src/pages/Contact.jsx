import React from 'react';
import Footer from './Footer'; 
function Contact() {
  const handleWhatsAppClick = () => {
    const whatsappUrl = "https://whatsapp.com/channel/0029Vb6OOf2JuyABkRXFLn2m";
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'white',
        padding: '2rem 1rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          {/* Header Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem',
            padding: '0 1rem'
          }}>
            <h1 style={{
              color: '#2E7D32',
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              marginBottom: '1rem',
              fontWeight: '700',
              lineHeight: '1.2'
            }}>
              Contact Defence Preparatory Academy
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: '#555',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
              fontWeight: '400'
            }}>
              Ready to excel in your ISSB preparation? Join our expert community today!
            </p>
          </div>

          {/* WhatsApp Contact Card */}
          <div style={{
            maxWidth: '600px',
            margin: '0 auto 4rem auto',
            padding: '0 1rem'
          }}>
            <div style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '20px',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              textAlign: 'center',
              border: '1px solid #e9ecef',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                borderRadius: '50%',
                width: 'clamp(70px, 15vw, 90px)',
                height: 'clamp(70px, 15vw, 90px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)'
              }}>
                💬
              </div>
              <h3 style={{
                color: '#2E7D32',
                marginBottom: '1rem',
                fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                fontWeight: '600',
                lineHeight: '1.3'
              }}>
                Join Our WhatsApp Channel
              </h3>
              <p style={{
                color: '#666',
                marginBottom: '2rem',
                lineHeight: '1.6',
                fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                fontWeight: '400'
              }}>
                Get instant updates, expert tips, and connect with our ISSB preparation community
              </p>
              <div style={{
                backgroundColor: '#e8f5e8',
                padding: '1rem',
                borderRadius: '12px',
                marginBottom: '2rem',
                border: '1px dashed #25D366'
              }}>
                <p style={{
                  color: '#2E7D32',
                  fontWeight: '500',
                  margin: 0,
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                }}>
                  📢 Defence Preparatory Academy Channel
                </p>
              </div>
              <button
                onClick={handleWhatsAppClick}
                style={{
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  color: 'white',
                  border: 'none',
                  padding: 'clamp(12px, 3vw, 15px) clamp(25px, 6vw, 40px)',
                  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  width: '100%',
                  maxWidth: '280px'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.3)';
                }}
              >
                Follow Channel Now
              </button>
            </div>
          </div>

          <div style={{
            backgroundColor: '#f8f9fa',
            borderRadius: '20px',
            padding: 'clamp(2rem, 5vw, 3rem)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid #e9ecef',
            margin: '0 1rem'
          }}>
            <h2 style={{
              color: '#2E7D32',
              marginBottom: '1rem',
              fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
              fontWeight: '600',
              textAlign: 'center',
              lineHeight: '1.3'
            }}>
              Why Defence Preparatory Academy?
            </h2>
            <p style={{
              textAlign: 'center',
              color: '#666',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              marginBottom: '3rem',
              maxWidth: '600px',
              margin: '0 auto 3rem auto',
              lineHeight: '1.6',
              fontWeight: '400'
            }}>
              Your success in ISSB is our mission. We provide comprehensive preparation with proven results.
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(1.5rem, 4vw, 2.5rem)'
            }}>
              {[
                {
                  icon: '🎯',
                  title: 'Expert ISSB Instructors',
                  description: 'Learn from experienced military officers and successful ISSB candidates',
                  color: '#FF6B35'
                },
                {
                  icon: '📊',
                  title: 'Proven Success Rate',
                  description: 'High selection rate with personalized guidance and regular assessments',
                  color: '#4A90E2'
                },
                {
                  icon: '🏆',
                  title: 'Complete Test Preparation',
                  description: 'Comprehensive coverage of all ISSB stages - Intelligence, Physical, Medical',
                  color: '#7ED321'
                },
                {
                  icon: '⚡',
                  title: 'Real-time Updates',
                  description: 'Latest ISSB information, tips, and motivation directly to your phone',
                  color: '#9013FE'
                },
                {
                  icon: '👥',
                  title: 'Active Community',
                  description: 'Connect with fellow aspirants and share experiences in our WhatsApp channel',
                  color: '#F5A623'
                },
                {
                  icon: '🎓',
                  title: 'Mock Interviews',
                  description: 'Practice sessions that simulate real ISSB interview conditions',
                  color: '#D0021B'
                }
              ].map((feature, index) => (
                <div key={index} style={{
                  textAlign: 'center',
                  padding: 'clamp(1rem, 3vw, 1.5rem)',
                  borderRadius: '16px',
                  backgroundColor: 'white',
                  border: '1px solid #e9ecef',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = feature.color;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#e9ecef';
                }}>
                  <div style={{
                    backgroundColor: feature.color,
                    borderRadius: '50%',
                    width: 'clamp(60px, 12vw, 70px)',
                    height: 'clamp(60px, 12vw, 70px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem auto',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    boxShadow: `0 4px 15px ${feature.color}30`
                  }}>
                    {feature.icon}
                  </div>
                  <h4 style={{
                    color: '#2E7D32',
                    marginBottom: '1rem',
                    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                    fontWeight: '600',
                    lineHeight: '1.3'
                  }}>
                    {feature.title}
                  </h4>
                  <p style={{
                    color: '#666',
                    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                    lineHeight: '1.5',
                    margin: 0,
                    fontWeight: '400'
                  }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div style={{
            textAlign: 'center',
            marginTop: '4rem',
            padding: 'clamp(2rem, 5vw, 3rem) clamp(1rem, 4vw, 2rem)',
            background: 'linear-gradient(135deg, #2E7D32, #4CAF50)',
            borderRadius: '20px',
            color: 'white',
            margin: '4rem 1rem 0 1rem'
          }}>
            <h3 style={{
              marginBottom: '1rem',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: '600',
              lineHeight: '1.3'
            }}>
              Ready to Ace Your ISSB?
            </h3>
            <p style={{
              marginBottom: '2rem',
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              opacity: '0.9',
              maxWidth: '500px',
              margin: '0 auto 2rem auto',
              lineHeight: '1.6',
              fontWeight: '400'
            }}>
              Join thousands of successful candidates who trusted Defence Preparatory Academy for their ISSB preparation!
            </p>
            <button
              onClick={handleWhatsAppClick}
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)',
                padding: 'clamp(15px, 3vw, 18px) clamp(30px, 6vw, 45px)',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                borderRadius: '35px',
                cursor: 'pointer',
                fontWeight: '600',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                width: '100%',
                maxWidth: '300px'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'rgba(255,255,255,0.25)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'rgba(255,255,255,0.15)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              🚀 Start Your Journey
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Contact;