import React, { useState } from 'react';
import { 
  FaFacebookF, 
  FaTiktok, 
  FaInstagram, 
  FaYoutube,
  FaRocket,
  FaArrowRight
} from 'react-icons/fa';

const Footer = () => {
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);

  // Animated background particles
  const BackgroundParticles = () => (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      pointerEvents: 'none'
    }}>
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '3px',
            height: '3px',
            background: 'linear-gradient(45deg, #10b981, #34d399)',
            borderRadius: '50%',
            opacity: '0.3',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float${(i % 4) + 1} ${4 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
      <style>
        {`
          @keyframes float1 {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
            50% { transform: translateY(-15px) rotate(180deg); opacity: 0.7; }
          }
          @keyframes float2 {
            0%, 100% { transform: translateX(0px) rotate(0deg); opacity: 0.3; }
            50% { transform: translateX(15px) rotate(360deg); opacity: 0.6; }
          }
          @keyframes float3 {
            0%, 100% { transform: translate(0px, 0px) rotate(0deg); opacity: 0.3; }
            33% { transform: translate(8px, -8px) rotate(120deg); opacity: 0.5; }
            66% { transform: translate(-8px, 8px) rotate(240deg); opacity: 0.7; }
          }
          @keyframes float4 {
            0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
            50% { transform: translateY(-10px) scale(1.2); opacity: 0.6; }
          }
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
            50% { box-shadow: 0 0 30px rgba(16, 185, 129, 0.6), 0 0 40px rgba(16, 185, 129, 0.3); }
          }
        `}
      </style>
    </div>
  );

  const footerStyle = {
    position: 'relative',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    color: '#e2e8f0',
    padding: '60px 20px 20px',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    overflow: 'hidden',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  };

  const topSectionStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '40px',
    marginBottom: '40px',
  };

  const brandSectionStyle = {
    gridColumn: '1 / -1',
    maxWidth: '100%',
    '@media (min-width: 768px)': {
      gridColumn: 'span 2',
      maxWidth: '600px',
    },
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    '@media (min-width: 768px)': {
      fontSize: '28px',
    },
  };

  const logoIconStyle = {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #10b981, #059669)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)',
    animation: 'pulse-glow 4s ease-in-out infinite',
    '@media (min-width: 768px)': {
      width: '40px',
      height: '40px',
      borderRadius: '12px',
    },
  };

  const descriptionStyle = {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#cbd5e1',
    marginBottom: '25px',
    '@media (min-width: 768px)': {
      fontSize: '16px',
      lineHeight: '1.7',
      marginBottom: '30px',
    },
  };

  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gap: '15px',
    marginBottom: '25px',
    '@media (min-width: 480px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      marginBottom: '30px',
    },
  };

  const statStyle = {
    textAlign: 'center',
    padding: '15px',
    background: 'rgba(16, 185, 129, 0.1)',
    borderRadius: '12px',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    backdropFilter: 'blur(10px)',
    '@media (min-width: 480px)': {
      padding: '20px',
      borderRadius: '16px',
    },
  };

  const statNumberStyle = {
    fontSize: '20px',
    fontWeight: '700',
    color: '#10b981',
    display: 'block',
    '@media (min-width: 768px)': {
      fontSize: '24px',
    },
  };

  const statLabelStyle = {
    fontSize: '11px',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    '@media (min-width: 768px)': {
      fontSize: '12px',
    },
  };

  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: '20px',
    position: 'relative',
    paddingLeft: '15px',
    '@media (min-width: 768px)': {
      fontSize: '20px',
      marginBottom: '25px',
    },
  };

  const sectionTitleBeforeStyle = {
    content: '""',
    position: 'absolute',
    left: '0',
    top: '2px',
    width: '3px',
    height: '18px',
    background: 'linear-gradient(135deg, #10b981, #34d399)',
    borderRadius: '2px',
    '@media (min-width: 768px)': {
      height: '20px',
    },
  };

  const linkListStyle = {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  };

  const getLinkStyle = (name) => ({
    display: 'block',
    color: hoveredLink === name ? '#10b981' : '#cbd5e1',
    textDecoration: 'none',
    padding: '8px 0',
    fontSize: '14px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
    position: 'relative',
    paddingLeft: hoveredLink === name ? '15px' : '0',
    '@media (min-width: 768px)': {
      padding: '10px 0',
      fontSize: '15px',
    },
  });

  const socialContainerStyle = {
    display: 'flex',
    gap: '12px',
    marginTop: '20px',
    flexWrap: 'wrap',
    '@media (min-width: 480px)': {
      gap: '15px',
    },
  };

  const getSocialStyle = (platform) => ({
    width: '42px',
    height: '42px',
    borderRadius: '10px',
    background: hoveredSocial === platform 
      ? 'linear-gradient(135deg, #10b981, #059669)' 
      : 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: hoveredSocial === platform ? 'white' : '#10b981',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: hoveredSocial === platform ? 'translateY(-3px) scale(1.05)' : 'translateY(0) scale(1)',
    boxShadow: hoveredSocial === platform 
      ? '0 12px 35px rgba(16, 185, 129, 0.4)' 
      : '0 4px 15px rgba(16, 185, 129, 0.2)',
    '@media (min-width: 768px)': {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
    },
  });

  const bottomSectionStyle = {
    borderTop: '1px solid rgba(148, 163, 184, 0.2)',
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '15px',
    textAlign: 'center',
    '@media (min-width: 768px)': {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: '30px',
      gap: '20px',
      textAlign: 'left',
    },
  };

  const copyrightStyle = {
    fontSize: '13px',
    color: '#94a3b8',
    order: '2',
    '@media (min-width: 768px)': {
      fontSize: '14px',
      order: '1',
    },
  };

  const legalLinksStyle = {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    order: '1',
    '@media (min-width: 768px)': {
      gap: '30px',
      justifyContent: 'flex-end',
      order: '2',
    },
  };

  const legalLinkStyle = {
    color: '#cbd5e1',
    textDecoration: 'none',
    fontSize: '13px',
    transition: 'color 0.3s ease',
    '@media (min-width: 768px)': {
      fontSize: '14px',
    },
  };

  return (
    <footer style={footerStyle}>
      <BackgroundParticles />
      
      <div style={containerStyle}>
        <div style={topSectionStyle}>
          {/* Brand Section */}
          <div style={brandSectionStyle}>
            <div style={logoStyle}>
              <div style={logoIconStyle}>
                <FaRocket size={18} />
              </div>
              Frontline Prep
            </div>
            
            <p style={descriptionStyle}>
              Empowering future military leaders through comprehensive guidance and expert teaching. 
              We provide the strategic preparation needed to excel in military careers and serve with distinction.
            </p>

            <div style={statsContainerStyle}>
              <div style={statStyle}>
                <span style={statNumberStyle}>500+</span>
                <span style={statLabelStyle}>Graduates</span>
              </div>
              <div style={statStyle}>
                <span style={statNumberStyle}>95%</span>
                <span style={statLabelStyle}>Success Rate</span>
              </div>
              <div style={statStyle}>
                <span style={statNumberStyle}>10+</span>
                <span style={statLabelStyle}>Years Experience</span>
              </div>
            </div>

            <div style={socialContainerStyle}>
              {[
                { icon: FaFacebookF, platform: 'facebook', url: 'https://facebook.com' },
                { icon: FaTiktok, platform: 'tiktok', url: 'https://tiktok.com' },
                { icon: FaInstagram, platform: 'instagram', url: 'https://instagram.com' },
                { icon: FaYoutube, platform: 'youtube', url: 'https://youtube.com' },
              ].map(({ icon: Icon, platform, url }) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={getSocialStyle(platform)}
                  onMouseEnter={() => setHoveredSocial(platform)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={sectionTitleStyle}>
              <div style={sectionTitleBeforeStyle}></div>
              Quick Links
            </h3>
            <ul style={linkListStyle}>
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Our Courses', href: '/courses' },
                { label: 'Success Stories', href: '/success-stories' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'FAQ', href: '/faq' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={getLinkStyle(link.label)}
                    onMouseEnter={() => setHoveredLink(link.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={bottomSectionStyle}>
          <div style={copyrightStyle}>
            © {new Date().getFullYear()} Frontline Prep. All rights reserved. • Preparing Leaders Since 2014
          </div>
          
          <div style={legalLinksStyle}>
            <a href="/privacy" style={legalLinkStyle}>Privacy Policy</a>
            <a href="/terms" style={legalLinkStyle}>Terms of Service</a>
            <a href="/cookies" style={legalLinkStyle}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;