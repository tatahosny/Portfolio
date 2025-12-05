import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGithub, FaExternalLinkAlt, FaVideo, FaEnvelope, FaPhone, FaLinkedin,
  FaReact, FaLaravel, FaNodeJs, FaJs, FaHtml5, FaCss3Alt, FaDatabase,
  FaFilm, FaMagic, FaMobile, FaCloud, FaServer, FaCode
} from 'react-icons/fa';
import { 
  SiAdobepremierepro, SiAdobeaftereffects, SiMysql, SiPhp,
  SiTailwindcss, SiGit, SiFigma
} from 'react-icons/si';
import './App.css';

// مكون TypeAnimation البديل
const TypeAnimation = ({ sequence, wrapper = "span", speed = 50, repeat = Infinity, className = "" }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentItem = sequence[currentIndex];
    const shouldDelete = isDeleting;
    
    const tick = () => {
      if (typeof currentItem === 'string') {
        if (shouldDelete) {
          setCurrentText(currentItem.substring(0, currentText.length - 1));
        } else {
          setCurrentText(currentItem.substring(0, currentText.length + 1));
        }

        let delta = 200 - Math.random() * 100;

        if (shouldDelete) {
          delta /= 2;
        }

        if (!shouldDelete && currentText === currentItem) {
          delta = 2000;
          setIsDeleting(true);
        } else if (shouldDelete && currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % sequence.length);
          delta = 500;
        }

        setTimeout(() => tick(), delta);
      } else {
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % sequence.length);
        }, currentItem);
      }
    };

    const timer = setTimeout(() => tick(), speed);

    return () => clearTimeout(timer);
  }, [currentText, currentIndex, isDeleting, sequence, speed]);

  const Wrapper = wrapper;

  return <Wrapper className={className}>{currentText}</Wrapper>;
};

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState('ar');
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuBtnRef = useRef(null);

  // بيانات الترجمة
  const translations = {
    ar: {
      // Navigation
      navHome: "الرئيسية",
      navSkills: "المهارات",
      navProjects: "المشاريع",
      navContact: "اتصل بي",
      
      // Hero Section
      heroBadge: "مطور Full Stack ومصمم فيديو محترف",
      heroGreeting: "مرحباً، أنا",
      heroName: "مصطفى حسني",
      heroDesc: "أبدع في تحويل الأفكار إلى واقع رقمي ملموس. متخصص في تطوير تطبيقات الويب الحديثة وإنتاج محتوى فيديو إبداعي.",
      stat1Label: "مشروع مكتمل",
      stat2Label: "سنوات خبرة",
      stat3Label: "عميل راضي",
      btnProjectsText: "عرض أعمالي",
      btnContactText: "تواصل معي",
      scrollText: "اكتشف المزيد",
      
      // Skills Section
      skillsTitle: "المهارات والتقنيات",
      skillsSubtitle: "مجموعة المهارات التي أتمتع بها لتقديم حلول تقنية متكاملة",
      frontendTitle: "تطوير الواجهات",
      backendTitle: "تطوير الخلفية",
      editingTitle: "مونتاج الفيديو",
      toolsTitle: "الأدوات والتقنيات المساعدة",
      
      // Projects Section
      projectsTitle: "🚀 مشاريعي",
      filterAll: "🏆 الكل",
      filterFullstack: "⚡ Full Stack",
      filterFrontend: "🎨 Frontend",
      filterEditing: "🎬 Video Editing",
      featuredText: "مميز",
      visitProjectText: "Visit Project",
      
      // Projects Data
      project1Title: "موقع ل green shield system",
      project1Desc: "نظام إدارة شامل بتقنيات حديثة وواجهة مستخدم متطورة مع لوحة تحكم تفاعلية",
      project2Title: "منصة خاصة بمستشفى",
      project2Desc: "منصة متطورة لعرض ومشاركة مقاطع الفيديو مع نظام تعليقات وتقييمات",
      project3Title: "فيديو شورت",
      project3Desc: "عمل إعلاني احترافي بمؤثرات بصرية متميزة وتصميم إبداعي مبتكر",
      project4Title: "فيديو علانى احترافى",
      project4Desc: "إنتاج بصري مميز يهدف إلى جذب الجمهور وإبراز هوية العلامة التجارية",
      
      // Contact Section
      contactTitle: "📞 تواصل معي",
      contactHeading: "لنعمل معاً! 🤝",
      contactDesc: "مستعد لمشاريع جديدة ومثيرة. دعنا نناقش فكرتك!",
      contactName: "اسمك الكريم",
      contactEmail: "بريدك الإلكتروني",
      contactMessage: "رسالتك...",
      submitText: "إرسال الرسالة",
      
      // Footer
      footerText: "© 2024 مصطفى حسني. كل الحقوق محفوظة.",
      
      // Loading
      loadingText: "مصطفى حسني"
    },
    en: {
      // Navigation
      navHome: "Home",
      navSkills: "Skills",
      navProjects: "Projects",
      navContact: "Contact",
      
      // Hero Section
      heroBadge: "Full Stack Developer & Professional Video Designer",
      heroGreeting: "Hello, I'm",
      heroName: "Mostafa Hosny",
      heroDesc: "I excel at transforming ideas into tangible digital reality. Specialized in developing modern web applications and producing creative video content.",
      stat1Label: "Completed Projects",
      stat2Label: "Years Experience",
      stat3Label: "Satisfied Clients",
      btnProjectsText: "View My Work",
      btnContactText: "Contact Me",
      scrollText: "Discover More",
      
      // Skills Section
      skillsTitle: "Skills & Technologies",
      skillsSubtitle: "The skill set I possess to deliver integrated technical solutions",
      frontendTitle: "Frontend Development",
      backendTitle: "Backend Development",
      editingTitle: "Video Editing",
      toolsTitle: "Supporting Tools & Technologies",
      
      // Projects Section
      projectsTitle: "🚀 My Projects",
      filterAll: "🏆 All",
      filterFullstack: "⚡ Full Stack",
      filterFrontend: "🎨 Frontend",
      filterEditing: "🎬 Video Editing",
      featuredText: "Featured",
      visitProjectText: "Visit Project",
      
      // Projects Data
      project1Title: "Green Shield System Website",
      project1Desc: "Comprehensive management system with modern technologies and advanced user interface",
      project2Title: "Hospital Platform",
      project2Desc: "Advanced platform for displaying and sharing video clips with comment and rating system",
      project3Title: "Video Short",
      project3Desc: "Professional advertising work with distinguished visual effects and innovative creative design",
      project4Title: "Professional Promotional Video",
      project4Desc: "Distinguished visual production aimed at attracting the audience and highlighting brand identity",
      
      // Contact Section
      contactTitle: "📞 Contact Me",
      contactHeading: "Let's Work Together! 🤝",
      contactDesc: "Ready for new and exciting projects. Let's discuss your idea!",
      contactName: "Your Name",
      contactEmail: "Your Email",
      contactMessage: "Your Message...",
      submitText: "Send Message",
      
      // Footer
      footerText: "© 2024 Mostafa Hosny. All Rights Reserved.",
      
      // Loading
      loadingText: "Mostafa Hosny"
    }
  };

  const t = translations[language];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000);
    window.addEventListener('mousemove', handleMouseMove);

    // Handle navbar visibility on scroll
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsNavVisible(true);
      } else {
        setIsNavVisible(false);
      }

      // Close mobile menu on scroll
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    // Handle click outside to close mobile menu
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) &&
          mobileMenuBtnRef.current && !mobileMenuBtnRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // إغلاق القائمة عند النقر على رابط
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // تبديل حالة القائمة المتنقلة
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // منع تمرير الصفحة عند فتح القائمة
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }

    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMobileMenuOpen]);

  // بيانات المهارات مع الإيقونات
  const skillsData = {
    frontend: [
      { name: "React.js", percentage: 85, icon: <FaReact /> },
      { name: "JavaScript", percentage: 90, icon: <FaJs /> },
      { name: "HTML5/CSS3", percentage: 95, icon: <><FaHtml5 /><FaCss3Alt /></> },
      { name: "Tailwind CSS", percentage: 80, icon: <SiTailwindcss /> }
    ],
    backend: [
      { name: "Laravel", percentage: 75, icon: <FaLaravel /> },
      { name: "Node.js", percentage: 70, icon: <FaNodeJs /> },
      { name: "PHP", percentage: 80, icon: <SiPhp /> },
      { name: "MySQL", percentage: 85, icon: <SiMysql /> }
    ],
    editing: [
      { name: "Premiere Pro", percentage: 88, icon: <SiAdobepremierepro /> },
      { name: "After Effects", percentage: 75, icon: <SiAdobeaftereffects /> },
      { name: "Motion Graphics", percentage: 70, icon: <FaMagic /> }
    ]
  };

  // بيانات المشاريع مع صور حقيقية
  const projectsData = [
    {
      id: 1,
      title: t.project1Title,
      description: t.project1Desc,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop",
      category: "fullstack",
      technologies: ["React", "Laravel", "MySQL", "REST API"],
      live: "https://green-shield-landing.vercel.app/",
      featured: true
    },
    {
      id: 2,
      title: t.project2Title,
      description: t.project2Desc,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      category: "frontend",
      technologies: ["React", "CSS3", "JavaScript", "Firebase"],
      github: "https://tatahosny.github.io/hospital/",
      live: "https://tatahosny.github.io/hospital/",
      featured: true
    },
    {
      id: 5,
      title: t.project2Title,
      description: t.project2Desc,
      image: "https://marketplace.canva.com/vQM4M/MAFeYZvQM4M/1/tl/canva-busy-hospital-corridor-MAFeYZvQM4M.jpg",
      category: "frontend",
      technologies: ["React", "CSS3", "JavaScript", "Firebase"],
      github: "https://tatahosny.github.io/hospital4/",
      live: "https://tatahosny.github.io/hospital4/",
      featured: true
    },
    {
      id: 3,
      title: t.project3Title,
      description: t.project3Desc,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
      category: "editing",
      technologies: ["Premiere Pro", "After Effects", "Motion Graphics"],
      video: "https://drive.google.com/file/d/1XDUUjw_mTlJc_AvmmnW-jD1LVY3Udz4A/view?usp=sharing",
      featured: false
    },
    {
      id: 4,
      title: t.project4Title,
      description: t.project4Desc,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      category: "fullstack",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      video: "https://www.facebook.com/share/v/16S6ByZ5RC/",
      featured: false
    }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);

  // Type animation texts based on language
  const typeTexts = language === 'ar' 
    ? ['مطور Full Stack', 'مطور ويب متكامل', 'مصمم فيديو محترف', 'مبتكر حلول رقمية']
    : ['Full Stack Developer', 'Web Developer', 'Video Designer', 'Digital Solutions Innovator'];

  // Loading Screen
  if (isLoading) {
    return (
      <motion.div 
        className="loading-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="loading-logo"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaCode className="loading-icon" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t.loadingText}
        </motion.h2>
        <motion.div 
          className="loading-bar"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </motion.div>
    );
  }

  return (
    <div className={`App ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Language Switcher */}
      <motion.div 
        className="language-switcher"
        initial={{ opacity: 0, x: language === 'ar' ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button 
          className={`lang-btn ${language === 'ar' ? 'active' : ''}`}
          onClick={() => setLanguage('ar')}
        >
          العربية
        </button>
        <button 
          className={`lang-btn ${language === 'en' ? 'active' : ''}`}
          onClick={() => setLanguage('en')}
        >
          English
        </button>
      </motion.div>

      {/* Animated Background */}
      <div className="animated-bg">
        <div 
          className="cursor-glow"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`
          }}
        />
        <div className="floating-shapes">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`floating-shape shape-${i}`} />
          ))}
        </div>
        <div className="grid-lines"></div>
      </div>

      {/* Navigation */}
      <motion.nav 
        ref={navRef}
        className={`navbar ${isNavVisible ? 'visible' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="nav-container">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaCode className="logo-icon" />
            {t.heroName}
          </motion.div>
          
          {/* Mobile Menu Button */}
          <button 
            ref={mobileMenuBtnRef}
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Desktop Navigation */}
          <div className="nav-links desktop-nav">
            {['navHome', 'navSkills', 'navProjects', 'navContact'].map((link, index) => (
              <motion.a
                key={link}
                href={`#${link}`}
                whileHover={{ 
                  scale: 1.1,
                  color: "#3b82f6"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                {t[link]}
              </motion.a>
            ))}
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                className="mobile-nav-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={toggleMobileMenu}
              >
                <motion.div 
                  className="mobile-nav-links"
                  initial={{ x: language === 'ar' ? '100%' : '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: language === 'ar' ? '100%' : '-100%' }}
                  transition={{ type: "spring", damping: 25 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="mobile-nav-header">
                    <div className="mobile-logo">
                      <FaCode className="logo-icon" />
                      {t.heroName}
                    </div>
                    <button 
                      className="close-menu-btn"
                      onClick={toggleMobileMenu}
                    >
                      <span>×</span>
                    </button>
                  </div>
                  
                  <div className="mobile-nav-content">
                    {['navHome', 'navSkills', 'navProjects', 'navContact'].map((link, index) => (
                      <motion.a
                        key={link}
                        href={`#${link}`}
                        className="mobile-nav-link"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        onClick={handleNavLinkClick}
                        whileTap={{ scale: 0.95 }}
                      >
                        {t[link]}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="navHome" className="hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {t.heroBadge}
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span>{t.heroGreeting}</span>
            <span className="hero-name">{t.heroName}</span>
            <span className="type-text">
              <TypeAnimation
                sequence={typeTexts.flatMap(text => [text, 2000])}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="animated-text"
              />
            </span>
          </motion.h1>
          
          <motion.p 
            className="hero-desc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {t.heroDesc}
          </motion.p>
          
          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="stat">
              <span className="stat-number">20+</span>
              <span className="stat-label">{t.stat1Label}</span>
            </div>
            <div className="stat">
              <span className="stat-number">3+</span>
              <span className="stat-label">{t.stat2Label}</span>
            </div>
            <div className="stat">
              <span className="stat-number">15+</span>
              <span className="stat-label">{t.stat3Label}</span>
            </div>
          </motion.div>

          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.button 
              className="btn primary"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 30px rgba(59, 130, 246, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('navProjects').scrollIntoView({ behavior: 'smooth' })}
            >
              <FaCode className={language === 'ar' ? 'icon-right' : 'icon-left'} />
              {t.btnProjectsText}
            </motion.button>
            <motion.button 
              className="btn secondary"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 30px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('navContact').scrollIntoView({ behavior: 'smooth' })}
            >
              <FaEnvelope className={language === 'ar' ? 'icon-right' : 'icon-left'} />
              {t.btnContactText}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating Tech Icons */}
        <div className="floating-tech">
          <motion.div
            className="tech-icon"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <FaReact />
          </motion.div>
          <motion.div
            className="tech-icon"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            <FaLaravel />
          </motion.div>
          <motion.div
            className="tech-icon"
            animate={{ 
              y: [0, -25, 0],
              rotate: [0, 8, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 2 }}
          >
            <SiAdobepremierepro />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={() => document.getElementById('navSkills').scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="scroll-text">{t.scrollText}</div>
          <div className="scroll-arrow"></div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="navSkills" className="skills">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <FaCode className={language === 'ar' ? 'icon-right' : 'icon-left'} />
          {t.skillsTitle}
        </motion.h2>
        
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          {t.skillsSubtitle}
        </motion.p>
        
        {/* Skills Grid - 2 فوق و1 تحت */}
        <div className="skills-grid-layout">
          <div className="skills-row">
            <motion.div
              className="skills-category"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="category-title">
                <FaReact /> {t.frontendTitle}
              </h3>
              <div className="skills-list">
                {skillsData.frontend.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="skill-item"
                    initial={{ opacity: 0, x: language === 'ar' ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    viewport={{ once: true }}
                  >
                    <div className="skill-header">
                      <div className="skill-info">
                        <span className="skill-icon">{skill.icon}</span>
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <span className="skill-percentage">{skill.percentage}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div 
                        className="skill-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="skills-category"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="category-title">
                <FaServer /> {t.backendTitle}
              </h3>
              <div className="skills-list">
                {skillsData.backend.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="skill-item"
                    initial={{ opacity: 0, x: language === 'ar' ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    viewport={{ once: true }}
                  >
                    <div className="skill-header">
                      <div className="skill-info">
                        <span className="skill-icon">{skill.icon}</span>
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <span className="skill-percentage">{skill.percentage}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div 
                        className="skill-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="skills-row">
            <motion.div
              className="skills-category full-width"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="category-title">
                <FaFilm /> {t.editingTitle}
              </h3>
              <div className="skills-list">
                {skillsData.editing.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="skill-item"
                    initial={{ opacity: 0, x: language === 'ar' ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    viewport={{ once: true }}
                  >
                    <div className="skill-header">
                      <div className="skill-info">
                        <span className="skill-icon">{skill.icon}</span>
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <span className="skill-percentage">{skill.percentage}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div 
                        className="skill-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tools Section */}
        <motion.div 
          className="tools-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="section-title tools-main-title">
            {t.toolsTitle}
          </h3>
          <div className="tools-grid">
            {[
              { icon: <FaCode />, name: "VS Code" },
              { icon: <SiGit />, name: "Git" },
              { icon: <SiFigma />, name: "Figma" },
              { icon: <FaCloud />, name: "Cloud Services" },
              { icon: <FaMobile />, name: "Responsive Design" },
              { icon: <FaDatabase />, name: "Database Design" }
            ].map((tool, index) => (
              <motion.div
                key={tool.name}
                className="tool-item"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: "spring", stiffness: 300, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="tool-icon">{tool.icon}</div>
                <span className="tool-name">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="navProjects" className="projects">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {t.projectsTitle}
        </motion.h2>

        {/* Projects Filter */}
        <motion.div 
          className="projects-filter"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            { key: 'all', text: t.filterAll },
            { key: 'fullstack', text: t.filterFullstack },
            { key: 'frontend', text: t.filterFrontend },
            { key: 'editing', text: t.filterEditing }
          ].map((category) => (
            <motion.button
              key={category.key}
              className={`filter-btn ${activeCategory === category.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.text}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              layout
            >
              {project.featured && (
                <div className="featured-badge">⭐ {t.featuredText}</div>
              )}
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-links">
                    {project.github && (
                      <motion.a 
                        href={project.github}
                        className="project-link"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub />
                      </motion.a>
                    )}
                    {project.live && (
                      <motion.a 
                        href={project.live}
                        className="project-link"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaExternalLinkAlt />
                      </motion.a>
                    )}
                    {project.video && (
                      <motion.a 
                        href={project.video}
                        className="project-link"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaVideo />
                      </motion.a>
                    )}
                  </div>
                  <motion.button 
                    className="visit-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => window.open(project.live || project.video || project.github, '_blank')}
                  >
                    {t.visitProjectText}
                  </motion.button>
                </div>
              </div>
              
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span 
                      key={techIndex} 
                      className="tech-tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: techIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="navContact" className="contact">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {t.contactTitle}
        </motion.h2>
        
        <motion.div 
          className="contact-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="contact-content">
            <motion.div 
              className="contact-info"
              initial={{ opacity: 0, x: language === 'ar' ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h3>{t.contactHeading}</h3>
              <p>{t.contactDesc}</p>
              
              <div className="contact-links">
                <motion.a
                  href="mailto:tatahosny208@gmail.com"
                  className="contact-link"
                  initial={{ opacity: 0, x: language === 'ar' ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.05, x: language === 'ar' ? -10 : 10 }}
                  viewport={{ once: true }}
                >
                  <FaEnvelope className="link-icon" />
                  <span>tatahosny208@gmail.com</span>
                </motion.a>
                
                <motion.a
                  href="tel:+201555973628"
                  className="contact-link"
                  initial={{ opacity: 0, x: language === 'ar' ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.05, x: language === 'ar' ? -10 : 10 }}
                  viewport={{ once: true }}
                >
                  <FaPhone className="link-icon" />
                  <span>+20 1555973628</span>
                </motion.a>
                
                <motion.a
                  href="https://github.com/tatahosny"
                  className="contact-link"
                  initial={{ opacity: 0, x: language === 'ar' ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.05, x: language === 'ar' ? -10 : 10 }}
                  target="_blank"
                  rel="noopener noreferrer"
                  viewport={{ once: true }}
                >
                  <FaGithub className="link-icon" />
                  <span>GitHub</span>
                </motion.a>
                
                <motion.a
                  href="#"
                  className="contact-link"
                  initial={{ opacity: 0, x: language === 'ar' ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                  whileHover={{ scale: 1.05, x: language === 'ar' ? -10 : 10 }}
                  viewport={{ once: true }}
                >
                  <FaLinkedin className="link-icon" />
                  <span>LinkedIn</span>
                </motion.a>
              </div>
            </motion.div>

            <motion.form 
              className="contact-form"
              initial={{ opacity: 0, x: language === 'ar' ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
              onSubmit={(e) => {
                e.preventDefault();
                alert(language === 'ar' ? 'شكراً لتواصلك! سأرد عليك قريباً.' : 'Thank you for contacting me! I will get back to you soon.');
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                viewport={{ once: true }}
              >
                <input type="text" placeholder={t.contactName} required />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                viewport={{ once: true }}
              >
                <input type="email" placeholder={t.contactEmail} required />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                viewport={{ once: true }}
              >
                <textarea placeholder={t.contactMessage} rows="5" required></textarea>
              </motion.div>
              <motion.button 
                type="submit" 
                className="btn primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                viewport={{ once: true }}
              >
                {t.submitText}
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p>{t.footerText}</p>
      </motion.footer>
    </div>
  );
}

export default App;
