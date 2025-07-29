import React from 'react';
import Footer from './Footer'; 
function Contact() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "923001234567"; 
    const message = "Hello! I'm interested in FrontlinePrep Academy courses. Could you please provide more information?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailClick = () => {
    const email = "contact@frontlineprep.com";
    const subject = "Inquiry about FrontlinePrep Academy";
    const body = "Hello,\n\nI'm interested in learning more about your courses and services.\n\nBest regards,";
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <>
      <div style={{
        minHeight: '80vh',
        background: 'linear-gradient(135deg, #E8F5E8 0%, #F1F8E9 100%)',
        padding: '2rem 1rem'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {/* Header Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h1 style={{
              color: '#2E7D32',
              fontSize: '2.5rem',
              marginBottom: '1rem',
              fontWeight: 'bold'
            }}>
              Contact FrontlinePrep Academy
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: '#424242',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Ready to start your educational journey? Get in touch with us today!
            </p>
          </div>

          {/* Contact Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {/* WhatsApp Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '2rem',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              textAlign: 'center',
              border: '2px solid #E8F5E8',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{
                backgroundColor: '#25D366',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                fontSize: '2rem'
              }}>
                💬
              </div>
              <h3 style={{
                color: '#2E7D32',
                marginBottom: '1rem',
                fontSize: '1.5rem'
              }}>
                WhatsApp Chat
              </h3>
              <p style={{
                color: '#666',
                marginBottom: '1.5rem',
                lineHeight: '1.6'
              }}>
                Get instant responses to your questions via WhatsApp
              </p>
              <p style={{
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: '#2E7D32',
                marginBottom: '1.5rem'
              }}>
                +92 300 1234567
              </p>
              <button
                onClick={handleWhatsAppClick}
                style={{
                  backgroundColor: '#25D366',
                  color: 'white',
                  border: 'none',
                  padding: '12px 30px',
                  fontSize: '1.1rem',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#128C7E'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#25D366'}
              >
                Chat on WhatsApp
              </button>
            </div>

            {/* Email Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '2rem',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              textAlign: 'center',
              border: '2px solid #E8F5E8',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{
                backgroundColor: '#4CAF50',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                fontSize: '2rem'
              }}>
                📧
              </div>
              <h3 style={{
                color: '#2E7D32',
                marginBottom: '1rem',
                fontSize: '1.5rem'
              }}>
                Email Us
              </h3>
              <p style={{
                color: '#666',
                marginBottom: '1.5rem',
                lineHeight: '1.6'
              }}>
                Send us a detailed message and we'll get back to you soon
              </p>
              <p style={{
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: '#2E7D32',
                marginBottom: '1.5rem'
              }}>
                contact@frontlineprep.com
              </p>
              <button
                onClick={handleEmailClick}
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  padding: '12px 30px',
                  fontSize: '1.1rem',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#2E7D32'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
              >
                Send Email
              </button>
            </div>
          </div>

          {/* Additional Info Section */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '2.5rem',
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
            textAlign: 'center',
            border: '2px solid #E8F5E8'
          }}>
            <h2 style={{
              color: '#2E7D32',
              marginBottom: '1.5rem',
              fontSize: '2rem'
            }}>
              Why Choose FrontlinePrep Academy?
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              marginTop: '2rem'
            }}>
              <div>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎯</div>
                <h4 style={{ color: '#2E7D32', marginBottom: '0.5rem' }}>Expert Guidance</h4>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Professional instructors with years of experience</p>
              </div>
              <div>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📚</div>
                <h4 style={{ color: '#2E7D32', marginBottom: '0.5rem' }}>Comprehensive Courses</h4>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Complete curriculum covering all essential topics</p>
              </div>
              <div>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏰</div>
                <h4 style={{ color: '#2E7D32', marginBottom: '0.5rem' }}>Flexible Schedule</h4>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Learn at your own pace with flexible timings</p>
              </div>
              <div>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💬</div>
                <h4 style={{ color: '#2E7D32', marginBottom: '0.5rem' }}>24/7 Support</h4>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Round-the-clock assistance via WhatsApp</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div style={{
            textAlign: 'center',
            marginTop: '3rem',
            padding: '2rem',
            backgroundColor: '#2E7D32',
            borderRadius: '15px',
            color: 'white'
          }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.8rem' }}>
              Ready to Start Your Learning Journey?
            </h3>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
              Contact us now and take the first step towards academic excellence!
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={handleWhatsAppClick}
                style={{
                  backgroundColor: '#25D366',
                  color: 'white',
                  border: 'none',
                  padding: '15px 35px',
                  fontSize: '1.1rem',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                💬 WhatsApp Now
              </button>
              <button
                onClick={handleEmailClick}
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: '2px solid white',
                  padding: '15px 35px',
                  fontSize: '1.1rem',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                📧 Send Email
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default Contact;