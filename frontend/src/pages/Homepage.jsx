import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Menu, X, Check, Users, Target, Award, Zap, Shield, TrendingUp, Send, ChevronRight, Sparkles, Rocket, BarChart, Globe, Code, Database, Lock, Cloud } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function CorporateWebsite() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [stats, setStats] = useState({ users: 0, projects: 0, countries: 0, satisfaction: 0 });

  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const statsSection = document.getElementById('stats');
      if (statsSection && !statsAnimated) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setStatsAnimated(true);
          animateStats();
        }
      }
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    const interval = setInterval(() => {
      setActiveTimeline((prev) => (prev + 1) % 4);
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [statsAnimated]);

  const animateStats = () => {
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        users: Math.floor(100000 * progress),
        projects: Math.floor(500000 * progress),
        countries: Math.floor(50 * progress),
        satisfaction: Math.floor(99 * progress)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setStats({ users: 100000, projects: 500000, countries: 50, satisfaction: 99 });
      }
    }, increment);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const features = [
    {
      icon: <Users size={40} />,
      title: 'Team Management',
      description: 'Seamlessly manage your team with intuitive tools and real-time collaboration features.',
      color: '#3b82f6',
      particles: ['👥', '🤝', '💼']
    },
    {
      icon: <Zap size={40} />,
      title: 'Lightning Fast',
      description: 'Automate repetitive tasks and accelerate your project delivery with smart workflows.',
      color: '#f59e0b',
      particles: ['⚡', '🚀', '⭐']
    },
    {
      icon: <Shield size={40} />,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance with industry standards to keep your data safe.',
      color: '#10b981',
      particles: ['🔒', '🛡️', '🔐']
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Analytics & Insights',
      description: 'Make data-driven decisions with powerful analytics and customizable dashboards.',
      color: '#8b5cf6',
      particles: ['📊', '📈', '💡']
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      color: '#3b82f6'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      color: '#8b5cf6'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      color: '#ec4899'
    },
    {
      name: 'David Park',
      role: 'Head of Engineering',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      color: '#10b981'
    }
  ];

  const timeline = [
    { 
      year: '2019', 
      event: 'Company Founded', 
      description: 'Started with a vision to transform workplace collaboration',
      icon: <Rocket size={24} />
    },
    { 
      year: '2020', 
      event: '10K Users', 
      description: 'Reached our first major milestone with enterprise clients',
      icon: <Users size={24} />
    },
    { 
      year: '2022', 
      event: 'Series B Funding', 
      description: 'Raised $50M to expand globally',
      icon: <TrendingUp size={24} />
    },
    { 
      year: '2024', 
      event: 'Industry Leader', 
      description: 'Named #1 workflow platform by TechCrunch',
      icon: <Award size={24} />
    }
  ];

  const floatingIcons = [
    { Icon: Code, delay: 0, duration: 15 },
    { Icon: Database, delay: 2, duration: 18 },
    { Icon: Cloud, delay: 4, duration: 20 },
    { Icon: Lock, delay: 1, duration: 16 },
    { Icon: Globe, delay: 3, duration: 17 },
    { Icon: BarChart, delay: 5, duration: 19 }
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    },
    cursor: {
      position: 'fixed',
      width: '40px',
      height: '40px',
      border: '2px solid #3b82f6',
      borderRadius: '50%',
      pointerEvents: 'none',
      left: mousePosition.x - 20,
      top: mousePosition.y - 20,
      transition: 'all 0.15s ease',
      zIndex: 9999,
      mixBlendMode: 'difference'
    },
    cursorDot: {
      position: 'fixed',
      width: '8px',
      height: '8px',
      background: '#3b82f6',
      borderRadius: '50%',
      pointerEvents: 'none',
      left: mousePosition.x - 4,
      top: mousePosition.y - 4,
      zIndex: 9999,
      mixBlendMode: 'difference'
    },
    header: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(59, 130, 246, 0.2)' : 'none',
      transition: 'all 0.3s ease',
      padding: '1rem 2rem',
      boxShadow: scrolled ? '0 4px 30px rgba(59, 130, 246, 0.1)' : 'none'
    },
    headerContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      position: 'relative',
      cursor: 'pointer'
    },
    nav: {
      display: 'flex',
      gap: '3rem',
      alignItems: 'center'
    },
    navLink: {
      color: '#cbd5e1',
      cursor: 'pointer',
      transition: 'all 0.3s',
      fontSize: '1rem',
      fontWeight: '500',
      position: 'relative',
      padding: '0.5rem 0'
    },
    hero: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      paddingTop: '6rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    heroContent: {
      maxWidth: '900px',
      zIndex: 1,
      position: 'relative'
    },
    heroTitle: {
      fontSize: 'clamp(3rem, 8vw, 6rem)',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em'
    },
    gradient: {
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundSize: '200% 200%',
      animation: 'gradient 4s ease infinite'
    },
    heroSubtitle: {
      fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
      color: '#94a3b8',
      marginBottom: '3rem',
      lineHeight: 1.7
    },
    buttonGroup: {
      display: 'flex',
      gap: '1.5rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: '4rem'
    },
    button: {
      padding: '1.2rem 3rem',
      fontSize: '1.1rem',
      borderRadius: '50px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s',
      border: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.75rem',
      position: 'relative',
      overflow: 'hidden'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      color: 'white',
      boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)'
    },
    secondaryButton: {
      background: 'transparent',
      border: '2px solid #3b82f6',
      color: '#3b82f6'
    },
    section: {
      padding: '8rem 2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      position: 'relative'
    },
    sectionTitle: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: 'bold',
      marginBottom: '4rem',
      textAlign: 'center',
      letterSpacing: '-0.02em'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '3rem',
      marginBottom: '6rem'
    },
    statCard: {
      textAlign: 'center',
      padding: '2rem',
      background: 'rgba(59, 130, 246, 0.05)',
      borderRadius: '20px',
      border: '1px solid rgba(59, 130, 246, 0.2)',
      transition: 'all 0.3s'
    },
    statNumber: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.5rem'
    },
    statLabel: {
      color: '#94a3b8',
      fontSize: '1.1rem'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2.5rem'
    },
    featureCard: {
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
      backdropFilter: 'blur(10px)',
      padding: '3rem',
      borderRadius: '30px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    },
    featureIcon: {
      width: '80px',
      height: '80px',
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '2rem',
      transition: 'all 0.4s',
      position: 'relative'
    },
    featureTitle: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      marginBottom: '1rem'
    },
    featureDescription: {
      color: '#94a3b8',
      lineHeight: 1.7,
      fontSize: '1.05rem'
    },
    teamGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '3rem'
    },
    teamCard: {
      background: 'rgba(255, 255, 255, 0.03)',
      borderRadius: '30px',
      padding: '2.5rem',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.4s',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    },
    teamAvatar: {
      width: '140px',
      height: '140px',
      borderRadius: '50%',
      margin: '0 auto 1.5rem',
      border: '4px solid',
      transition: 'all 0.4s'
    },
    timeline: {
      position: 'relative',
      maxWidth: '900px',
      margin: '0 auto'
    },
    timelineItem: {
      display: 'flex',
      gap: '2rem',
      marginBottom: '4rem',
      position: 'relative',
      alignItems: 'flex-start',
      transition: 'all 0.4s',
      padding: '2rem',
      borderRadius: '20px',
      background: 'rgba(255, 255, 255, 0.02)'
    },
    timelineIconWrapper: {
      minWidth: '80px',
      height: '80px',
      borderRadius: '20px',
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.4s'
    },
    contactForm: {
      maxWidth: '700px',
      margin: '0 auto',
      background: 'rgba(59, 130, 246, 0.05)',
      padding: '4rem',
      borderRadius: '30px',
      border: '1px solid rgba(59, 130, 246, 0.2)',
      position: 'relative',
      overflow: 'hidden'
    },
    input: {
      width: '100%',
      padding: '1.25rem',
      marginBottom: '1.5rem',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '15px',
      color: 'white',
      fontSize: '1.05rem',
      outline: 'none',
      transition: 'all 0.3s',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '1.25rem',
      marginBottom: '1.5rem',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '15px',
      color: 'white',
      fontSize: '1.05rem',
      outline: 'none',
      minHeight: '180px',
      resize: 'vertical',
      fontFamily: 'inherit',
      boxSizing: 'border-box',
      transition: 'all 0.3s'
    },
    contactInfo: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '2rem',
      marginTop: '5rem'
    },
    contactCard: {
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
      padding: '2.5rem',
      borderRadius: '25px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1.5rem',
      transition: 'all 0.3s',
      cursor: 'pointer'
    },
    footer: {
      background: 'rgba(0, 0, 0, 0.5)',
      borderTop: '1px solid rgba(59, 130, 246, 0.2)',
      padding: '3rem 2rem',
      textAlign: 'center',
      color: '#94a3b8'
    },
    successMessage: {
      background: 'linear-gradient(135deg, #10b981, #059669)',
      padding: '1.25rem',
      borderRadius: '15px',
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      animation: 'slideIn 0.4s ease'
    },
    mobileMenuBtn: {
      display: 'none',
      background: 'none',
      border: 'none',
      color: 'white',
      cursor: 'pointer'
    },
    mobileMenu: {
      position: 'fixed',
      top: 0,
      right: isMenuOpen ? 0 : '-100%',
      width: '80%',
      maxWidth: '350px',
      height: '100vh',
      background: 'rgba(10, 10, 10, 0.98)',
      backdropFilter: 'blur(20px)',
      zIndex: 2000,
      transition: 'right 0.3s ease',
      padding: '2rem',
      borderLeft: '1px solid rgba(59, 130, 246, 0.2)'
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      zIndex: 1500,
      display: isMenuOpen ? 'block' : 'none',
      backdropFilter: 'blur(5px)'
    },
    floatingIcon: {
      position: 'absolute',
      opacity: 0.1,
      pointerEvents: 'none'
    }
  };

  const renderHome = () => (
    <>
      <section style={styles.hero} ref={heroRef}>
        {floatingIcons.map((item, index) => (
          <div
            key={index}
            className="floating-icon"
            style={{
              ...styles.floatingIcon,
              left: `${10 + index * 15}%`,
              top: `${20 + (index % 3) * 25}%`,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`
            }}
          >
            <item.Icon size={48} color="#3b82f6" />
          </div>
        ))}

        <div style={styles.heroContent}>
          <div style={{marginBottom: '2rem'}}>
            <Sparkles size={48} color="#3b82f6" style={{display: 'inline-block', animation: 'pulse 2s ease infinite'}} />
          </div>
          <h1 style={styles.heroTitle}>
            Transform Your <br/><span style={styles.gradient}>Workflow</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Experience the future of project management with AI-powered automation, real-time collaboration, and enterprise-grade security trusted by 100,000+ teams worldwide.
          </p>
          <div style={styles.buttonGroup}>
            <Link to="/login" style={{ textDecoration: "none" }}>
                <button
                style={{ ...styles.button, ...styles.primaryButton }}
                className="btn-primary"
                >
                Get Started Free <ChevronRight size={24} className="btn-arrow" />
                </button>
            </Link>
            </div>
        </div>
      </section>

      <section id="stats" style={{...styles.section, paddingTop: '4rem'}}>
        <div style={styles.statsGrid}>
          <div style={styles.statCard} className="stat-card">
            <div style={styles.statNumber}>{stats.users.toLocaleString()}+</div>
            <div style={styles.statLabel}>Active Users</div>
          </div>
          <div style={styles.statCard} className="stat-card">
            <div style={styles.statNumber}>{stats.projects.toLocaleString()}+</div>
            <div style={styles.statLabel}>Projects Completed</div>
          </div>
          <div style={styles.statCard} className="stat-card">
            <div style={styles.statNumber}>{stats.countries}+</div>
            <div style={styles.statLabel}>Countries</div>
          </div>
          <div style={styles.statCard} className="stat-card">
            <div style={styles.statNumber}>{stats.satisfaction}%</div>
            <div style={styles.statLabel}>Satisfaction Rate</div>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>
          Powerful <span style={styles.gradient}>Features</span>
        </h2>
        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              style={styles.featureCard} 
              className="feature-card"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div style={{...styles.featureIcon, borderColor: feature.color}} className="feature-icon">
                {feature.icon}
              </div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDescription}>{feature.description}</p>
              
              {hoveredFeature === index && (
                <div style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
                  {feature.particles.map((emoji, i) => (
                    <span
                      key={i}
                      className="particle"
                      style={{
                        position: 'absolute',
                        left: `${20 + i * 30}%`,
                        top: '50%',
                        fontSize: '2rem',
                        animation: `float 2s ease infinite ${i * 0.3}s`
                      }}
                    >
                      {emoji}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );

  const renderAbout = () => (
    <>
      <section style={{...styles.section, paddingTop: '10rem'}}>
        <h1 style={styles.sectionTitle}>
          About <span style={styles.gradient}>Our Journey</span>
        </h1>
        <div style={{maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '6rem'}}>
          <p style={{fontSize: '1.35rem', color: '#94a3b8', lineHeight: 1.8}}>
            We are on a mission to revolutionize how teams work together. Founded in 2019, we have grown from a small startup to serving over 100,000 teams across 50 countries, transforming the way modern businesses collaborate.
          </p>
        </div>

        <h3 style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '4rem', textAlign: 'center'}}>
          Our <span style={styles.gradient}>Timeline</span>
        </h3>
        <div style={styles.timeline}>
          {timeline.map((item, index) => (
            <div 
              key={index} 
              style={{
                ...styles.timelineItem,
                background: activeTimeline === index ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                border: activeTimeline === index ? '2px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                transform: activeTimeline === index ? 'scale(1.02)' : 'scale(1)'
              }}
              className="timeline-item"
            >
              <div style={{
                ...styles.timelineIconWrapper,
                transform: activeTimeline === index ? 'rotate(360deg) scale(1.1)' : 'rotate(0deg) scale(1)'
              }}>
                {item.icon}
              </div>
              <div style={{flex: 1}}>
                <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '0.5rem'}}>{item.year}</div>
                <h4 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.75rem'}}>{item.event}</h4>
                <p style={{color: '#94a3b8', fontSize: '1.1rem'}}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h3 style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '4rem', textAlign: 'center'}}>
          Meet Our <span style={styles.gradient}>Leadership</span>
        </h3>
        <div style={styles.teamGrid}>
          {team.map((member, index) => (
            <div key={index} style={styles.teamCard} className="team-card">
              <img 
                src={member.image} 
                alt={member.name} 
                style={{...styles.teamAvatar, borderColor: member.color}}
                className="team-avatar"
              />
              <h4 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>{member.name}</h4>
              <p style={{color: member.color, fontSize: '1.1rem', fontWeight: '500'}}>{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );

  const renderContact = () => (
    <section style={{...styles.section, paddingTop: '10rem'}}>
      <h1 style={styles.sectionTitle}>
        Get In <span style={styles.gradient}>Touch</span>
      </h1>

      <div style={styles.contactForm}>
        {formSubmitted && (
          <div style={styles.successMessage}>
            <Check size={28} />
            <span style={{fontSize: '1.1rem', fontWeight: '500'}}>Thank you! We will get back to you soon.</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleFormChange}
            style={styles.input}
            className="input-field"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleFormChange}
            style={styles.input}
            className="input-field"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            value={formData.phone}
            onChange={handleFormChange}
            style={styles.input}
            className="input-field"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleFormChange}
            style={styles.textarea}
            className="input-field"
            required
          />
          <button 
            type="submit" 
            style={{...styles.button, ...styles.primaryButton, width: '100%', justifyContent: 'center'}}
            className="btn-primary"
          >
            <Send size={24} /> Send Message
          </button>
        </form>
      </div>

      <div style={styles.contactInfo}>
        <div style={styles.contactCard} className="contact-card">
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Mail size={28} />
          </div>
          <div>
            <h4 style={{fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>Email Us</h4>
            <p style={{color: '#94a3b8', fontSize: '1.05rem'}}>hello@workflow.com</p>
          </div>
        </div>

        <div style={styles.contactCard} className="contact-card">
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Phone size={28} />
          </div>
          <div>
            <h4 style={{fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>Call Us</h4>
            <p style={{color: '#94a3b8', fontSize: '1.05rem'}}>+1 (555) 123-4567</p>
          </div>
        </div>

        <div style={styles.contactCard} className="contact-card">
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #ec4899, #f59e0b)',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <MapPin size={28} />
          </div>
          <div>
            <h4 style={{fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>Visit Us</h4>
            <p style={{color: '#94a3b8', fontSize: '1.05rem'}}>123 Business St, SF, CA 94102</p>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .floating-icon {
          animation: float ease-in-out infinite;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 50px rgba(59, 130, 246, 0.4);
        }

        .btn-secondary:hover {
          background: rgba(59, 130, 246, 0.1);
          transform: translateY(-3px);
        }

        .btn-arrow {
          transition: transform 0.3s;
        }

        .btn-primary:hover .btn-arrow {
          transform: translateX(5px);
        }

        .stat-card:hover {
          transform: translateY(-10px);
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 15px 40px rgba(59, 130, 246, 0.2);
        }

        .feature-card:hover {
          transform: translateY(-10px);
          border-color: rgba(59, 130, 246, 0.3);
          box-shadow: 0 20px 60px rgba(59, 130, 246, 0.2);
        }

        .feature-icon {
          color: white;
        }

        .feature-card:hover .feature-icon {
          transform: rotate(360deg) scale(1.1);
        }

        .team-card:hover {
          transform: translateY(-15px);
          border-color: rgba(59, 130, 246, 0.3);
          box-shadow: 0 20px 50px rgba(59, 130, 246, 0.2);
        }

        .team-avatar {
          transition: all 0.4s;
        }

        .team-card:hover .team-avatar {
          transform: scale(1.1);
        }

        .contact-card:hover {
          transform: translateY(-5px);
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15));
          border-color: rgba(59, 130, 246, 0.3);
        }

        .input-field:focus,
        .input-field:hover {
          border-color: rgba(59, 130, 246, 0.5);
          background: rgba(255, 255, 255, 0.08);
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }

          .mobile-menu-btn {
            display: block !important;
          }
        }

        @media (min-width: 769px) {
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>

      {/* Custom Cursor */}
      <div style={styles.cursor}></div>
      <div style={styles.cursorDot}></div>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo} onClick={() => navigateTo('home')}>
            WorkFlow
          </div>
          
          <nav style={styles.nav} className="desktop-nav">
            {['home', 'about', 'contact'].map((page) => (
              <div
                key={page}
                style={{
                  ...styles.navLink,
                  color: currentPage === page ? '#3b82f6' : '#cbd5e1'
                }}
                onClick={() => navigateTo(page)}
                onMouseEnter={(e) => e.target.style.color = '#3b82f6'}
                onMouseLeave={(e) => e.target.style.color = currentPage === page ? '#3b82f6' : '#cbd5e1'}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </div>
            ))}
          </nav>

          <button 
            style={styles.mobileMenuBtn} 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div style={styles.overlay} onClick={() => setIsMenuOpen(false)}></div>

      {/* Mobile Menu */}
      <div style={styles.mobileMenu}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem'}}>
          <div style={styles.logo}>WorkFlow</div>
          <button 
            style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer'}}
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={28} />
          </button>
        </div>
        <nav style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
          {['home', 'about', 'contact'].map((page) => (
            <div
              key={page}
              style={{
                fontSize: '1.5rem',
                color: currentPage === page ? '#3b82f6' : '#cbd5e1',
                cursor: 'pointer',
                fontWeight: '600'
              }}
              onClick={() => navigateTo(page)}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </div>
          ))}
        </nav>
      </div>

      {/* Page Content */}
      <main>
        {currentPage === 'home' && renderHome()}
        {currentPage === 'about' && renderAbout()}
        {currentPage === 'contact' && renderContact()}
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={{fontSize: '1.1rem'}}>© 2024 WorkFlow. All rights reserved.</p>
        <p style={{marginTop: '1rem', fontSize: '0.95rem'}}>Built with passion by our amazing team</p>
      </footer>
    </div>
  );
}
