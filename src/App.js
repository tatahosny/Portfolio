import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGithub, FaExternalLinkAlt, FaEnvelope, FaPhone, FaLinkedin,
  FaReact, FaLaravel, FaNodeJs, FaJs, FaHtml5, FaCss3Alt, FaDatabase,
  FaCode, FaRobot, FaNetworkWired, FaServer, FaCloud, FaBootstrap, FaPhp,
  FaWifi, FaMicrochip, FaShieldAlt, FaDesktop, FaProjectDiagram, FaCogs,
  FaMicrosoft, FaLock, FaCog, FaFileAlt, FaFacebook
} from 'react-icons/fa';
import { 
  SiNextdotjs, SiTailwindcss, SiMysql, SiFirebase,
  SiTypescript, SiCisco, SiArduino, SiLinux, SiVuedotjs
} from 'react-icons/si';
import './App.css';

// مكون TypeAnimation البديل المعدل
const TypeAnimation = ({ sequence, wrapper = "span", speed = 50, repeat = Infinity, className = "" }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const currentItem = sequence[currentIndex];
    
    const timeout = setTimeout(() => {
      if (typeof currentItem === 'string') {
        if (isDeleting) {
          if (currentText.length > 0) {
            setCurrentText(currentText.substring(0, currentText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % sequence.length);
          }
        } else {
          if (currentText.length < currentItem.length) {
            setCurrentText(currentItem.substring(0, currentText.length + 1));
          } else {
            setIsPaused(true);
            setTimeout(() => {
              setIsPaused(false);
              setIsDeleting(true);
            }, 1500);
          }
        }
      } else {
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % sequence.length);
        }, currentItem);
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, isPaused, sequence, speed]);

  const Wrapper = wrapper;

  return (
    <Wrapper className={`type-animation-text ${className}`}>
      {currentText}
      <span className="type-cursor">|</span>
    </Wrapper>
  );
};

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState('en');
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuBtnRef = useRef(null);

  // بيانات الترجمة
  const translations = {
    en: {
      // Navigation
      navHome: "Home",
      navSkills: "Skills",
      navProjects: "Projects",
      navContact: "Contact",
      
      // Hero Section
      heroBadge: "Full Stack Developer & IoT Engineer",
      heroGreeting: "Hello, I'm",
      heroName: "Mostafa hosny",
      heroDesc: "Full Stack Web Developer with expertise in IoT systems, Robotics, and Network Security. Passionate about creating innovative technological solutions.",
      stat1Label: "Completed Projects",
      stat2Label: "Years Experience",
      stat3Label: "Satisfied Clients",
      btnProjectsText: "View My Work",
      btnContactText: "Contact Me",
      scrollText: "Discover More",
      
      // Skills Section
      skillsTitle: "Skills & Technologies",
      skillsSubtitle: "My technical expertise across various domains",
      webDevTitle: "Web Development",
      iotTitle: "IoT & Robotics",
      networkingTitle: "Networking & Security",
      otherSkillsTitle: "Other Skills",
      
      // Projects Section
      projectsTitle: "🚀 My Projects",
      filterAll: "🏆 All",
      filterWeb: "🌐 Web Development",
      filterIoT: "🤖 IoT Projects",
      featuredText: "Featured",
      visitProjectText: "View Project",
      viewOnFacebook: "View on Facebook",
      viewIoTProjects: "View IoT Projects",
      allWebProjects: "All Web Projects",
      viewLiveDemo: "View Live Demo",
      
      // Projects Data
      project1Title: "Green Shield System",
      project1Desc: "Agricultural robot control system with real-time data analysis, AI integration, and remote monitoring using Next.js and Laravel",
      project2Title: "Track View - Railway Inspection",
      project2Desc: "Railway track inspection system with defect detection, location tracking, and multi-device control using Bootstrap and Laravel",
      project3Title: "clinic Management System",
      project3Desc: "Comprehensive clinic system with patient records, appointment booking, and clinic management using Bootstrap and Laravel",
      project4Title: "Smart Vending Machine",
      project4Desc: "IoT-based vending machine with online payment integration and remote product selection using Laravel and IoT technologies",
      
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
    },
    ar: {
      // Navigation
      navHome: "الرئيسية",
      navSkills: "المهارات",
      navProjects: "المشاريع",
      navContact: "اتصل بي",
      
      // Hero Section
      heroBadge: "مطور Full Stack ومهندس أنظمة IoT",
      heroGreeting: "مرحباً، أنا",
      heroName: "مصطفى حسنى",
      heroDesc: "مطور ويب متكامل مع خبرة في أنظمة IoT والروبوتات وأمن الشبكات. متخصص في تحويل الأفكار إلى حلول تكنولوجية مبتكرة.",
      stat1Label: "مشروع مكتمل",
      stat2Label: "سنوات خبرة",
      stat3Label: "عميل راضي",
      btnProjectsText: "عرض أعمالي",
      btnContactText: "تواصل معي",
      scrollText: "اكتشف المزيد",
      
      // Skills Section
      skillsTitle: "المهارات والتقنيات",
      skillsSubtitle: "خبراتي التقنية عبر مختلف المجالات",
      webDevTitle: "تطوير الويب",
      iotTitle: "أنظمة IoT والروبوتات",
      networkingTitle: "الشبكات والأمن",
      otherSkillsTitle: "مهارات أخرى",
      
      // Projects Section
      projectsTitle: "🚀 مشاريعي",
      filterAll: "🏆 الكل",
      filterWeb: "🌐 تطوير الويب",
      filterIoT: "🤖 مشاريع IoT",
      featuredText: "مميز",
      visitProjectText: "عرض المشروع",
      viewOnFacebook: "عرض على فيسبوك",
      viewIoTProjects: "عرض مشاريع IoT",
      allWebProjects: "جميع مشاريع الويب",
      viewLiveDemo: "عرض تجريبي",
      
      // Projects Data
      project1Title: "نظام Green Shield",
      project1Desc: "نظام تحكم في الروبوت الزراعي مع تحليل البيانات في الوقت الحقيقي وتكامل الذكاء الاصطناعي والمراقبة عن بُعد باستخدام Next.js و Laravel",
      project2Title: "Track View - فحص السكك الحديدية",
      project2Desc: "نظام فحص مسارات السكك الحديدية مع اكتشاف الأعطال وتتبع الموقع والتحكم في أجهزة متعددة باستخدام Bootstrap و Laravel",
      project3Title: "نظام إدارة العيادة",
      project3Desc: "نظام متكامل للغيادة مع سجلات المرضى وحجز المواعيد وإدارة العيادات باستخدام Bootstrap و Laravel",
      project4Title: "ماكينة البيع الذكية",
      project4Desc: "ماكينة بيع تعمل بنظام IoT مع تكامل الدفع الإلكتروني واختيار المنتجات عن بُعد باستخدام Laravel وتقنيات IoT",
      
      // Contact Section
      contactTitle: "📞 تواصل معي",
      contactHeading: "لنعمل معاً! 🤝",
      contactDesc: "مستعد لمشاريع جديدة ومثيرة. دعنا نناقش فكرتك!",
      contactName: "اسمك الكريم",
      contactEmail: "بريدك الإلكتروني",
      contactMessage: "رسالتك...",
      submitText: "إرسال الرسالة",
      
      // Footer
      footerText: "© 2024 مصطفى حسنى. كل الحقوق محفوظة.",
      
      // Loading
      loadingText: "مصطفى حسنى"
    }
  };

  const t = translations[language];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ 
        x: e.clientX, 
        y: e.clientY 
      });
    };
    
    const loadTimer = setTimeout(() => setIsLoading(false), 2000);
    window.addEventListener('mousemove', handleMouseMove);

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsNavVisible(true);
      } else {
        setIsNavVisible(false);
      }

      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

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
      clearTimeout(loadTimer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

  // بيانات المهارات المعدلة - باستخدام أيقونات صحيحة متوفرة
  const skillsData = {
    webDev: [
      { name: "Next.js", percentage: 85, icon: <SiNextdotjs /> },
      { name: "React.js", percentage: 90, icon: <FaReact /> },
      { name: "Vue.js", percentage: 80, icon: <SiVuedotjs /> },
      { name: "TypeScript", percentage: 80, icon: <SiTypescript /> },
      { name: "Tailwind CSS", percentage: 95, icon: <SiTailwindcss /> },
      { name: "Laravel", percentage: 85, icon: <FaLaravel /> },
      { name: "PHP Native", percentage: 90, icon: <FaPhp /> },
      { name: "Bootstrap", percentage: 95, icon: <FaBootstrap /> },
      { name: "MySQL", percentage: 88, icon: <SiMysql /> }
    ],
    iot: [
      { name: "IoT Systems", percentage: 90, icon: <FaWifi /> },
      { name: "Arduino", percentage: 95, icon: <SiArduino /> },
      { name: "Robotics", percentage: 85, icon: <FaRobot /> },
      { name: "Sensor Networks", percentage: 88, icon: <FaMicrochip /> },
      { name: "API Integration", percentage: 90, icon: <FaServer /> }
    ],
    networking: [
      { name: "Network Security", percentage: 85, icon: <SiCisco /> },
      { name: "Linux Systems", percentage: 80, icon: <SiLinux /> },
      { name: "Firebase", percentage: 85, icon: <SiFirebase /> },
      { name: "Cloud Services", percentage: 75, icon: <FaCloud /> }
    ]
  };

  // رابط صفحة Facebook لمشاريع IoT
  const iotFacebookPage = "https://www.facebook.com/profile.php?id=61579024912287";

  // بيانات المشاريع المعدلة - كلها ويب مع إضافة زر زيارة صفحة IoT للـ IoT Projects
  const projectsData = [
    {
      id: 1,
      title: t.project1Title,
      description: t.project1Desc,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop&q=80",
      category: "web",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Laravel", "AI/ML", "IoT Integration"],
      live: "https://green-shield-landing.vercel.app/",
      facebook: "https://www.facebook.com/profile.php?id=61561629719585",
      iotFacebook: iotFacebookPage,
      featured: true
    },
    // {
    //   id: 2,
    //   title: t.project2Title,
    //   description: t.project2Desc,
    //   image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=500&fit=crop&q=80",
    //   category: "web",
    //   technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Laravel", "AI/ML", "IoT Integration"],
    //   live: "https://green-shield-landing.vercel.app/",
    //   facebook: "https://www.facebook.com/profile.php?id=61561629719585",
    //   iotFacebook: iotFacebookPage,
    //   featured: false
    // },
    {
      id: 3,
      title: t.project3Title,
      description: t.project3Desc,
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=500&fit=crop&q=80",
      category: "web",
      technologies: ["Bootstrap", "Laravel", "MySQL", "Patient Records", "Appointment System"],
      live: "https://dryasmin.wuaze.com/?i=1",
      facebook: "",
      featured: false
    },
    {
      id: 4,
      title: t.project4Title,
      description: t.project4Desc,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop&q=80",
      category: "web",
      technologies: ["Laravel", "Payment Gateway", "IoT Integration", "Real-time Control", "Bootstrap"],
      live: "https://tatahosny.github.io/payment/",
      facebook: "",
      iotFacebook: iotFacebookPage,
      featured: false
    }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projectsData 
    : activeCategory === 'iot'
    ? projectsData.filter(project => project.iotFacebook) // عرض مشاريع IoT فقط
    : projectsData.filter(project => project.category === activeCategory);

  // Type animation texts based on language
  const typeTexts = language === 'ar' 
    ? ['مطور Full Stack', 'مهندس IoT', 'متخصص في الشبكات', 'مبرمج روبوتات']
    : ['Full Stack Developer', 'IoT Engineer', 'Network Specialist', 'Robotics Programmer'];

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
        <div className="loading-bar-container">
          <motion.div 
            className="loading-bar"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </div>
      </motion.div>
    );
  }

  // دالة للتعامل مع فتح صفحة IoT
  const handleOpenIotPage = (e) => {
    e.preventDefault();
    window.open(iotFacebookPage, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`App ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Language Switcher - ثابت في الزاوية */}
      <motion.div 
        className="language-switcher-fixed"
        initial={{ opacity: 0, x: language === 'ar' ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button 
          className={`lang-btn ${language === 'ar' ? 'active' : ''}`}
          onClick={() => setLanguage('ar')}
          aria-label="Switch to Arabic"
        >
          العربية
        </button>
        <button 
          className={`lang-btn ${language === 'en' ? 'active' : ''}`}
          onClick={() => setLanguage('en')}
          aria-label="Switch to English"
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
          {[...Array(4)].map((_, i) => (
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaCode className="logo-icon" />
          </motion.div>
          
          {/* Mobile Menu Button */}
          <button 
            ref={mobileMenuBtnRef}
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                onClick={() => {
                  const element = document.getElementById(link);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
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
                    </div>
                    <button 
                      className="close-menu-btn"
                      onClick={toggleMobileMenu}
                      aria-label="Close menu"
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
                        onClick={() => {
                          handleNavLinkClick();
                          const element = document.getElementById(link);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {t[link]}
                      </motion.a>
                    ))}
                    
                    {/* Language switcher in mobile menu */}
                    <div className="mobile-language-switcher">
                      <button 
                        className={`mobile-lang-btn ${language === 'ar' ? 'active' : ''}`}
                        onClick={() => setLanguage('ar')}
                      >
                        العربية
                      </button>
                      <button 
                        className={`mobile-lang-btn ${language === 'en' ? 'active' : ''}`}
                        onClick={() => setLanguage('en')}
                      >
                        English
                      </button>
                    </div>
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
            <span className="hero-greeting">{t.heroGreeting}</span>
            <span className="hero-name">{t.heroName}</span>
            <div className="type-animation-wrapper">
              <TypeAnimation
                sequence={typeTexts.flatMap(text => [text, 1500])}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="type-text"
              />
            </div>
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
              <span className="stat-number">15+</span>
              <span className="stat-label">{t.stat1Label}</span>
            </div>
            <div className="stat">
              <span className="stat-number">2+</span>
              <span className="stat-label">{t.stat2Label}</span>
            </div>
            <div className="stat">
              <span className="stat-number">12+</span>
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
              onClick={() => document.getElementById('navProjects')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="View projects"
            >
              {language === 'ar' ? (
                <>
                  {t.btnProjectsText}
                  <FaCode className="icon-right" />
                </>
              ) : (
                <>
                  <FaCode className="icon-left" />
                  {t.btnProjectsText}
                </>
              )}
            </motion.button>
            <motion.button 
              className="btn secondary"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 30px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('navContact')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Contact me"
            >
              {language === 'ar' ? (
                <>
                  {t.btnContactText}
                  <FaEnvelope className="icon-right" />
                </>
              ) : (
                <>
                  <FaEnvelope className="icon-left" />
                  {t.btnContactText}
                </>
              )}
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
            aria-hidden="true"
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
            aria-hidden="true"
          >
            <SiNextdotjs />
          </motion.div>
          <motion.div
            className="tech-icon"
            animate={{ 
              y: [0, -25, 0],
              rotate: [0, 8, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 2 }}
            aria-hidden="true"
          >
            <SiArduino />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={() => document.getElementById('navSkills')?.scrollIntoView({ behavior: 'smooth' })}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && document.getElementById('navSkills')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Scroll to skills section"
        >
          <div className="scroll-text">{t.scrollText}</div>
          <div className="scroll-arrow"></div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="navSkills" className="skills">
        <div className="section-wrapper">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {t.skillsTitle}
          </motion.h2>
          
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {t.skillsSubtitle}
          </motion.p>
          
          {/* Skills Cards */}
          <div className="skills-container">
            <div className="skills-cards-grid">
              {/* Web Development Card */}
              <motion.div
                className="skill-category-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="skill-card-header">
                  <FaCode className="category-card-icon" />
                  <h3 className="category-card-title">{t.webDevTitle}</h3>
                </div>
                <div className="skills-list-card">
                  {skillsData.webDev.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="skill-item-card"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <div className="skill-info-card">
                        <span className="skill-icon-card" aria-hidden="true">{skill.icon}</span>
                        <span className="skill-name-card">{skill.name}</span>
                        <span className="skill-percentage-card">{skill.percentage}%</span>
                      </div>
                      <div className="skill-bar-card">
                        <motion.div 
                          className="skill-progress-card"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.05 }}
                          viewport={{ once: true, amount: 0.3 }}
                          aria-label={`${skill.name} skill level: ${skill.percentage}%`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* IoT & Robotics Card */}
              <motion.div
                className="skill-category-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="skill-card-header">
                  <FaRobot className="category-card-icon" />
                  <h3 className="category-card-title">{t.iotTitle}</h3>
                </div>
                <div className="skills-list-card">
                  {skillsData.iot.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="skill-item-card"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <div className="skill-info-card">
                        <span className="skill-icon-card" aria-hidden="true">{skill.icon}</span>
                        <span className="skill-name-card">{skill.name}</span>
                        <span className="skill-percentage-card">{skill.percentage}%</span>
                      </div>
                      <div className="skill-bar-card">
                        <motion.div 
                          className="skill-progress-card"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.05 }}
                          viewport={{ once: true, amount: 0.3 }}
                          aria-label={`${skill.name} skill level: ${skill.percentage}%`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Networking & Security Card */}
              <motion.div
                className="skill-category-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="skill-card-header">
                  <FaNetworkWired className="category-card-icon" />
                  <h3 className="category-card-title">{t.networkingTitle}</h3>
                </div>
                <div className="skills-list-card">
                  {skillsData.networking.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="skill-item-card"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <div className="skill-info-card">
                        <span className="skill-icon-card" aria-hidden="true">{skill.icon}</span>
                        <span className="skill-name-card">{skill.name}</span>
                        <span className="skill-percentage-card">{skill.percentage}%</span>
                      </div>
                      <div className="skill-bar-card">
                        <motion.div 
                          className="skill-progress-card"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.05 }}
                          viewport={{ once: true, amount: 0.3 }}
                          aria-label={`${skill.name} skill level: ${skill.percentage}%`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Other Skills */}
            <motion.div 
              className="other-skills-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="other-skills-title">{t.otherSkillsTitle}</h3>
              <div className="other-skills-grid">
                {[
                  { name: "Microsoft Office", level: "Expert", icon: <FaMicrosoft /> },
                  { name: "Problem Solving", level: "Advanced", icon: <FaCogs /> },
                  { name: "Team Collaboration", level: "Advanced", icon: <FaProjectDiagram /> },
                  { name: "Fast Learning", level: "Advanced", icon: <FaLock /> },
                  { name: "Project Management", level: "Intermediate", icon: <FaDesktop /> },
                  { name: "Technical Documentation", level: "Intermediate", icon: <FaFileAlt /> }
                ].map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="other-skill-item-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    transition={{ type: "spring", stiffness: 300, delay: index * 0.1 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <div className="other-skill-icon-card">{skill.icon}</div>
                    <div className="other-skill-info-card">
                      <div className="other-skill-name-card">{skill.name}</div>
                      <div className="other-skill-level-card">{skill.level}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="navProjects" className="projects">
        <div className="section-wrapper">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {t.projectsTitle}
          </motion.h2>

          {/* Projects Filter */}
          <motion.div 
            className="projects-filter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            role="tablist"
            aria-label="Project categories"
          >
            {[
              { key: 'all', text: t.filterAll },
              { key: 'web', text: t.filterWeb },
              { key: 'iot', text: t.filterIoT }
            ].map((category) => (
              <motion.button
                key={category.key}
                className={`filter-btn ${activeCategory === category.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                role="tab"
                aria-selected={activeCategory === category.key}
                aria-controls="projects-grid"
              >
                {category.text}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="projects-grid" id="projects-grid" role="tabpanel">
            {activeCategory === 'iot' ? (
              // عرض صفحة IoT كاملة
              <div className="iot-page-section">
                <div className="iot-header">
                  <FaRobot className="iot-icon" />
                  <h2>{language === 'ar' ? 'مشاريع IoT' : 'IoT Projects'}</h2>
                  <p>{language === 'ar' 
                    ? 'جميع مشاريع IoT متاحة على صفحة الفيسبوك الرسمية'
                    : 'All IoT projects are available on the official Facebook page'
                  }</p>
                </div>
                
                <div className="iot-content">
                  <div className="iot-info-card">
                    <div className="iot-info-header">
                      <h3>Facebook Page</h3>
                      <FaFacebook className="facebook-icon" />
                    </div>
                    <p className="iot-description">
                      {language === 'ar'
                        ? 'زور صفحة الفيسبوك الرسمية لمشاريع IoT لمشاهدة جميع المشاريع والعروض التوضيحية'
                        : 'Visit the official Facebook page for IoT projects to see all projects and demos'
                      }
                    </p>
                    
                    <div className="iot-buttons">
                      <motion.button 
                        className="iot-primary-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(iotFacebookPage, '_blank')}
                      >
                        <FaFacebook className="btn-icon" />
                        {language === 'ar' ? 'زيارة صفحة IoT' : 'Visit IoT Page'}
                      </motion.button>
                      
                      <motion.button 
                        className="iot-secondary-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveCategory('web')}
                      >
                        {language === 'ar' ? 'عرض مشاريع الويب' : 'View Web Projects'}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // عرض مشاريع الويب العادية
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="project-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                  layout
                >
                  {project.featured && (
                    <div className="featured-badge" aria-label="Featured project">
                      ⭐ {t.featuredText}
                    </div>
                  )}
                  <div className="project-image">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      loading="lazy"
                    />
                    <div className="project-overlay">
                      <div className="project-links">
                        {project.live && (
                          <motion.a 
                            href={project.live}
                            className="project-link"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${project.title} live site`}
                          >
                            <FaExternalLinkAlt />
                          </motion.a>
                        )}
                        {project.facebook && (
                          <motion.a 
                            href={project.facebook}
                            className="project-link"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.title} on Facebook`}
                          >
                            <FaFacebook />
                          </motion.a>
                        )}
                        {project.iotFacebook && (
                          <motion.a 
                            href={project.iotFacebook}
                            className="project-link iot-link"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View IoT projects on Facebook`}
                            title={t.viewIoTProjects}
                          >
                            <FaRobot />
                          </motion.a>
                        )}
                      </div>
                      <div className="project-buttons">
                        {project.live && (
                          <motion.button 
                            className="visit-btn"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => window.open(project.live, '_blank')}
                            aria-label={`Visit ${project.title}`}
                          >
                            {t.viewLiveDemo}
                          </motion.button>
                        )}
                        {project.facebook && (
                          <motion.button 
                            className="facebook-btn"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => window.open(project.facebook, '_blank')}
                            aria-label={`View ${project.title} on Facebook`}
                          >
                            {t.viewOnFacebook}
                          </motion.button>
                        )}
                        {project.iotFacebook && (
                          <motion.button 
                            className="iot-btn"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => window.open(project.iotFacebook, '_blank')}
                            aria-label={t.viewIoTProjects}
                          >
                            {t.viewIoTProjects}
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tech" role="list">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span 
                          key={techIndex} 
                          className="tech-tag"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIndex * 0.1 }}
                          viewport={{ once: true, amount: 0.3 }}
                          role="listitem"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="navContact" className="contact">
        <div className="section-wrapper">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {t.contactTitle}
          </motion.h2>
          
          <motion.div 
            className="contact-container"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="contact-content">
              <motion.div 
                className="contact-info"
                initial={{ opacity: 0, x: language === 'ar' ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
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
                    viewport={{ once: true, amount: 0.3 }}
                    aria-label="Send email"
                  >
                    <FaEnvelope className="link-icon" />
                    <span>tatahosny208@gmail</span>
                  </motion.a>
                  
                  <motion.a
                    href="tel:+201234567890"
                    className="contact-link"
                    initial={{ opacity: 0, x: language === 'ar' ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.05, x: language === 'ar' ? -10 : 10 }}
                    viewport={{ once: true, amount: 0.3 }}
                    aria-label="Call phone number"
                  >
                    <FaPhone className="link-icon" />
                    <span>+20 1555973628</span>
                  </motion.a>
                  
                  <motion.a
                    href={iotFacebookPage}
                    className="contact-link"
                    initial={{ opacity: 0, x: language === 'ar' ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                    whileHover={{ scale: 1.05, x: language === 'ar' ? -10 : 10 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    viewport={{ once: true, amount: 0.3 }}
                    aria-label="Visit Facebook IoT page"
                  >
                    <FaFacebook className="link-icon" />
                    <span>{language === 'ar' ? 'صفحة مشاريع IoT' : 'IoT Projects Page'}</span>
                  </motion.a>
                </div>
              </motion.div>

              <motion.form 
                className="contact-form"
                initial={{ opacity: 0, x: language === 'ar' ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const data = Object.fromEntries(formData);
                  
                  alert(language === 'ar' 
                    ? 'شكراً لتواصلك! سأرد عليك قريباً.' 
                    : 'Thank you for contacting me! I will get back to you soon.'
                  );
                  
                  e.target.reset();
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <input 
                    type="text" 
                    name="name"
                    placeholder={t.contactName} 
                    required 
                    aria-label="Your name"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <input 
                    type="email" 
                    name="email"
                    placeholder={t.contactEmail} 
                    required 
                    aria-label="Your email"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <textarea 
                    name="message"
                    placeholder={t.contactMessage} 
                    rows="5" 
                    required
                    aria-label="Your message"
                  ></textarea>
                </motion.div>
                <motion.button 
                  type="submit" 
                  className="btn primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                  aria-label="Send message"
                >
                  {t.submitText}
                </motion.button>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="section-wrapper">
          <p>{t.footerText}</p>
          <div className="footer-links">
            <a href={iotFacebookPage} target="_blank" rel="noopener noreferrer">
              <FaFacebook /> {language === 'ar' ? 'مشاريع IoT' : 'IoT Projects'}
            </a>
            <a href="mailto:tatahosny208@gmail.com">
              <FaEnvelope /> {language === 'ar' ? 'بريد إلكتروني' : 'Email'}
            </a>
            <a href="tel:+201555973628">
              <FaPhone /> {language === 'ar' ? 'هاتف' : 'Phone'}
            </a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;