import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#0a192f',
      color: '#ccd6f6',
      padding: '60px 20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      borderTop: '1px solid #233554'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px'
      }}>
        {/* About Section */}
        <div>
          <h3 style={{
            color: '#64ffda',
            fontSize: '20px',
            marginBottom: '25px',
            fontWeight: '600',
            letterSpacing: '1px'
          }}>
            Elite Defense Academy
          </h3>
          <p style={{
            lineHeight: '1.6',
            fontSize: '15px',
            marginBottom: '20px'
          }}>
            We forge future leaders through rigorous training and comprehensive education, preparing cadets for excellence in military service.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{
            color: '#64ffda',
            fontSize: '20px',
            marginBottom: '25px',
            fontWeight: '600',
            letterSpacing: '1px'
          }}>
            Quick Links
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: '0',
            lineHeight: '2'
          }}>
            <li><a href="/about" style={{
              color: '#ccd6f6',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              ':hover': { color: '#64ffda' }
            }}>About Our Academy</a></li>
            <li><a href="/contact" style={{
              color: '#ccd6f6',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              ':hover': { color: '#64ffda' }
            }}>Contact Admissions</a></li>
            <li><a href="/faq" style={{
              color: '#ccd6f6',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              ':hover': { color: '#64ffda' }
            }}>FAQ</a></li>
            <li><a href="/alumni" style={{
              color: '#ccd6f6',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              ':hover': { color: '#64ffda' }
            }}>Alumni Network</a></li>
          </ul>
        </div>

        {/* Programs */}
        <div>
          <h3 style={{
            color: '#64ffda',
            fontSize: '20px',
            marginBottom: '25px',
            fontWeight: '600',
            letterSpacing: '1px'
          }}>
            Our Programs
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: '0',
            lineHeight: '2'
          }}>
            <li><a href="/courses/officer-training" style={{
              color: '#ccd6f6',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              ':hover': { color: '#64ffda' }
            }}>Officer Training Program</a></li>
            <li><a href="/courses/technical" style={{
              color: '#ccd6f6',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              ':hover': { color: '#64ffda' }
            }}>Technical Warfare Course</a></li>
            <li><a href="/courses/leadership" style={{
              color: '#ccd6f6',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              ':hover': { color: '#64ffda' }
            }}>Leadership Development</a></li>
            <li><a href="/courses/special-forces" style={{
              color: '#ccd6f6',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              ':hover': { color: '#64ffda' }
            }}>Special Forces Prep</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 style={{
            color: '#64ffda',
            fontSize: '20px',
            marginBottom: '25px',
            fontWeight: '600',
            letterSpacing: '1px'
          }}>
            Contact Us
          </h3>
          <address style={{ fontStyle: 'normal', lineHeight: '1.8' }}>
            <p style={{ margin: '5px 0' }}>
              <i className="fas fa-map-marker-alt" style={{ marginRight: '10px' }}></i>
              Defense Avenue, Sector G-10, Islamabad
            </p>
            <p style={{ margin: '5px 0' }}>
              <i className="fas fa-phone" style={{ marginRight: '10px' }}></i>
              +92 51 1234567
            </p>
            <p style={{ margin: '5px 0' }}>
              <i className="fas fa-envelope" style={{ marginRight: '10px' }}></i>
              admissions@elitedefense.edu.pk
            </p>
          </address>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '40px auto 0',
        paddingTop: '20px',
        borderTop: '1px solid #233554',
        textAlign: 'center',
        fontSize: '14px'
      }}>
        <p style={{ margin: '0' }}>
          © {new Date().getFullYear()} Elite Defense Academy. All Rights Reserved.
        </p>
        <p style={{ margin: '10px 0 0', color: '#8892b0' }}>
          Proudly serving the nation since 1947
        </p>
      </div>
    </footer>
  );
};

export default Footer;