import React, { useState } from 'react';
import { 
  FaFacebookF, 
  FaTiktok, 
  FaInstagram, 
  FaYoutube,
  FaRocket
} from 'react-icons/fa';

const Footer = () => {
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);

  // Animated background particles
  const BackgroundParticles = () => (
    <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-0.5 bg-gradient-to-br from-emerald-500 to-emerald-400 rounded-full opacity-30"
          style={{
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

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-slate-200 py-16 px-5 overflow-hidden font-sans">
      <BackgroundParticles />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand Section */}
          <div className="md:col-span-2 max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/40 animate-pulse-glow">
                <FaRocket size={18} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-br from-emerald-500 to-emerald-400 bg-clip-text text-transparent">
                Frontline Prep
              </span>
            </div>
            
            <p className="text-slate-300 text-base leading-relaxed mb-8">
              Empowering future military leaders through comprehensive guidance and expert teaching. 
              We provide the strategic preparation needed to excel in military careers and serve with distinction.
            </p>

            <div className="grid grid-cols-3 gap-5 mb-8">
              <div className="text-center p-5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 backdrop-blur-sm">
                <span className="text-emerald-500 text-xl font-bold block">500+</span>
                <span className="text-slate-400 text-xs uppercase tracking-wider">Graduates</span>
              </div>
              <div className="text-center p-5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 backdrop-blur-sm">
                <span className="text-emerald-500 text-xl font-bold block">95%</span>
                <span className="text-slate-400 text-xs uppercase tracking-wider">Success Rate</span>
              </div>
              <div className="text-center p-5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 backdrop-blur-sm">
                <span className="text-emerald-500 text-xl font-bold block">10+</span>
                <span className="text-slate-400 text-xs uppercase tracking-wider">Years Experience</span>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
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
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer
                    ${hoveredSocial === platform 
                      ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white -translate-y-1 scale-105 shadow-lg shadow-emerald-500/40' 
                      : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 shadow-md shadow-emerald-500/20'}`}
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
            <h3 className="text-lg font-semibold text-slate-100 mb-5 pl-3 relative">
              <div className="absolute left-0 top-1 w-1 h-5 bg-gradient-to-br from-emerald-500 to-emerald-400 rounded"></div>
              Quick Links
            </h3>
            <ul className="list-none p-0 m-0">
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
                    className={`block py-2 text-slate-300 text-sm transition-all duration-300 ease-in-out border-b border-slate-400/10
                      ${hoveredLink === link.label ? 'text-emerald-500 pl-3' : 'pl-0'}`}
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
        <div className="pt-8 border-t border-slate-400/20 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="text-slate-400 text-sm order-2 md:order-1">
            © {new Date().getFullYear()} Frontline Prep. All rights reserved. • Preparing Leaders Since 2014
          </div>
          
          <div className="flex gap-6 flex-wrap justify-center order-1 md:order-2">
            <a href="/privacy" className="text-slate-300 text-sm hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-slate-300 text-sm hover:text-emerald-400 transition-colors">Terms of Service</a>
            <a href="/cookies" className="text-slate-300 text-sm hover:text-emerald-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;