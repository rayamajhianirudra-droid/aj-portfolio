import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ajPhoto from './aj.jpg';
import './App.css';

function useTypingEffect(words) {
  const [currentWord, setCurrentWord] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const word = words[currentWord];
      if (!isDeleting) {
        setCurrentText(word.substring(0, currentText.length + 1));
        if (currentText === word) setTimeout(() => setIsDeleting(true), 1500);
      } else {
        setCurrentText(word.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWord((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWord, words]);
  return currentText;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const GithubIcon = ({ size = 18, color = '#64748B' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: -500, y: -500 });
  const [spotlight, setSpotlight] = useState({ x: -500, y: -500 });

  const typedText = useTypingEffect([
    'Full Stack Developer.',
    'Entrepreneur.',
    'Relentless Builder.',
    'Co-Founder @ Codyza.',
    'Inevitable.'
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalHeight) * 100);
      const sections = ['about', 'skills', 'projects', 'experience', 'achievements', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) { setActiveSection(section); break; }
        }
      }
    };
    const handleMouseMove = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
      setTimeout(() => setSpotlight({ x: e.clientX, y: e.clientY }), 40);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navLinks = ['about', 'skills', 'projects', 'experience', 'achievements', 'contact'];

  const projects = [
    {
      title: 'Foresight',
      subtitle: '🏆 3rd Place — Southwest MN Hacks 2026',
      desc: 'AI workforce readiness platform that scores skill gaps and quantifies financial risk from employee data. Built the full backend, API, and Supabase database layer. Out of 12 teams.',
      tags: ['Python', 'FastAPI', 'Supabase', 'Gemini AI', 'Vercel'],
      link: 'https://skillspulse-backend.vercel.app',
      preview: 'project-preview-foresight',
    },
    {
      title: 'LifeOS Health',
      subtitle: 'Full Stack Nutrition Platform',
      desc: 'Deployed platform with Spring Boot REST API, React frontend, and PostgreSQL. Integrates USDA FoodData for 600,000+ foods and Google Gemini AI for personalized health insights.',
      tags: ['Spring Boot', 'React', 'PostgreSQL', 'Gemini AI'],
      link: 'https://lifeoshealth.com',
      preview: 'project-preview-lifeos',
    },
    {
      title: 'NepalDisaster.com',
      subtitle: 'Civic Emergency Platform',
      desc: 'Live bilingual flood emergency site for the 2026 Nepal floods. Auto-updating district alert map, 5-day forecasts, missing-persons registry with photo uploads, and rescue registry.',
      tags: ['React', 'Open-Meteo', 'DHM', 'Vercel'],
      link: 'https://nepaldisaster.com',
      preview: 'project-preview-nepal',
    },
    {
      title: 'US Tax Calculator',
      subtitle: 'Desktop Application',
      desc: 'Java desktop app for calculating federal and state taxes with real-time bracket computation, deduction analysis, and clean visual breakdowns.',
      tags: ['Java', 'JavaFX', 'OOP'],
      link: 'https://github.com/rayamajhianirudra-droid',
      preview: 'project-preview-tax',
    },
    {
      title: 'Codyza',
      subtitle: 'Student Dev Community & Agency',
      desc: 'Co-founded a student developer organization open to all majors at SMSU. Built and launched NepalDisaster.com. Authored the club constitution and got it recognized by Student Senate.',
      tags: ['React', 'Vercel', 'Leadership'],
      link: 'https://codyza.com',
      preview: 'project-preview-codyza',
    },
  ];

  const achievements = [
    { icon: '🏆', title: '3rd Place — SW MN Hacks 2026', org: 'Google Cloud Hackathon (12 Teams)', desc: 'Built Foresight, an AI workforce intelligence platform, with a team of 4. Owned the entire backend and database layer.' },
    { icon: '🏦', title: 'Investment Banking Analyst', org: 'Laxmi Sunrise Bank', desc: 'Equity analysis and investment reports in Kathmandu, Nepal.' },
    { icon: '🚨', title: 'DAT Duty Officer', org: 'American Red Cross, MN & Dakotas', desc: 'On-call disaster responder coordinating shelter and financial assistance for affected families.' },
    { icon: '🎓', title: '3.7 GPA — CS Core', org: 'Southwest Minnesota State University', desc: 'OOP (A), Computer Architecture (A), Data Science (A-). Minor in Data Science.' },
  ];

  const journey = [
    { flag: 'https://flagcdn.com/w40/np.png', country: 'Nepal', label: 'Origin', desc: 'Where the drive was born.' },
    { flag: 'https://flagcdn.com/w40/us.png', country: 'Texas', label: '2021', desc: 'First steps in America.' },
    { flag: 'https://flagcdn.com/w40/us.png', country: 'Minnesota', label: '2024 — Present', desc: 'Building at SMSU and beyond.' },
  ];

  const experience = [
    { role: 'Co-Founder', company: 'Codyza', period: '2026 — Present', desc: 'Co-founded a student developer community at SMSU. Built and launched NepalDisaster.com. Got Codyza recognized as an official student organization by Student Senate.', side: 'left' },
    { role: 'DAT Duty Officer & Sheltering Associate', company: 'American Red Cross, MN & Dakotas', period: '2026 — Present', desc: 'On-call disaster responder coordinating shelter, financial assistance, and damage assessment for affected families.', side: 'right' },
    { role: 'Direct Support Professional II', company: 'Sevita / Genesis Crisis Home', period: '2024 — Present', desc: 'Promoted from DSP to DSP II. Daily care, medication management, and crisis de-escalation for individuals with disabilities.', side: 'left' },
    { role: 'Investment Banking Analyst', company: 'Laxmi Sunrise Bank', period: '2022 — 2023', desc: 'Equity analysis and investment reports for senior analysts in Kathmandu, Nepal.', side: 'right' },
    { role: 'B.S. Computer Science', company: 'Southwest Minnesota State University', period: 'Expected May 2027', desc: 'GPA: 3.7 CS Core. Minor: Data Science. OOP (A), Computer Architecture (A), Data Science (A-).', side: 'left' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFB] text-[#1E293B]">
      <div className="cursor-spotlight" style={{ left: spotlight.x, top: spotlight.y }} />
      <div className="cursor-dot" style={{ left: cursor.x, top: cursor.y }} />
      <div className="dot-grid" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Scroll progress bar — emerald */}
      <div className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#1E40AF] to-[#1e3a8a] z-[100]" style={{ width: scrollProgress + '%' }} />

      {/* Social sidebar */}
      <div className="social-sidebar hidden md:flex">
        <a href="https://linkedin.com/in/anirudra-rayamajhi-bb48b83b4" target="_blank" rel="noreferrer" className="social-link">in</a>
        <a href="https://github.com/rayamajhianirudra-droid" target="_blank" rel="noreferrer" className="social-link"><GithubIcon size={16} color="#64748B" /></a>
        <a href="mailto:rayamajhi.anirudra@gmail.com" className="social-link">@</a>
        <a href="https://codyza.com" target="_blank" rel="noreferrer" className="social-link">c</a>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 px-8 py-4 flex justify-between items-center backdrop-blur-sm border-b border-black/5 bg-white/80">
        <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="text-[#1E40AF] font-bold text-xl">AJ</motion.span>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="hidden md:flex gap-6 text-sm">
          {navLinks.map((section) => (
            <a key={section} href={"#" + section} className={activeSection === section ? 'capitalize transition text-[#1E40AF] font-semibold' : 'capitalize transition text-slate-500 hover:text-[#1E293B]'}>
              {section}
            </a>
          ))}
        </motion.div>
        <button className="md:hidden flex flex-col gap-1.5 z-50 relative" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-6 h-0.5 bg-[#1E293B] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#1E293B] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#1E293B] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="fixed top-0 left-0 w-full h-screen bg-white z-40 flex flex-col justify-center items-center gap-10">
            {navLinks.map((section) => (
              <a key={section} href={"#" + section} onClick={() => setMenuOpen(false)} className="capitalize text-3xl font-bold text-[#1E293B] hover:text-[#1E40AF] transition">{section}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="min-h-screen flex items-start px-8 md:px-24 pt-32 pb-8 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col md:flex-row items-start justify-between w-full gap-12">
          <div className="flex-1">
            <motion.div variants={itemVariants} className="badge">
              <span className="badge-dot" />
              CO-FOUNDER OF CODYZA
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-6xl md:text-7xl font-black leading-none mb-4 text-[#0F172A]">
              Anirudra<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E40AF] to-[#1e3a8a]">Rayamajhi</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-[#1E40AF] text-lg font-semibold mb-4 h-7">
              {typedText}<span className="animate-pulse">|</span>
            </motion.p>
            <motion.p variants={itemVariants} className="text-slate-500 text-lg max-w-lg mb-6 leading-relaxed">
              Building real products that solve real problems. Nepal to Texas to Minnesota — always moving, always building.
            </motion.p>
            <motion.div variants={itemVariants} className="flex gap-6 mb-8">
              {[{ value: '5+', label: 'Projects' }, { value: '3.7', label: 'GPA' }, { value: '3rd', label: 'Hackathon' }].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-black text-[#0F172A]">{s.value}</div>
                  <div className="text-slate-400 text-xs uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </motion.div>
            <motion.div variants={itemVariants} className="flex gap-4 flex-wrap">
              <a href="#projects" className="bg-[#1E40AF] hover:bg-[#1e3a8a] text-white px-8 py-3 rounded-lg font-semibold transition">View Work</a>
              <a href="#contact" className="border border-slate-300 hover:border-[#1E40AF] text-[#1E293B] px-8 py-3 rounded-lg font-semibold transition">Contact Me</a>
              <a href="/AJ_Rayamajhi_Resume.pdf" download className="border border-[#1E40AF]/40 hover:border-[#1E40AF] text-[#1E40AF] px-8 py-3 rounded-lg font-semibold transition">Download CV</a>
            </motion.div>
            <motion.div variants={itemVariants} className="mt-12 scroll-indicator">
              <div className="scroll-line" />
              <span>scroll</span>
            </motion.div>
          </div>
          <motion.div variants={itemVariants} className="flex-shrink-0">
            <div className="photo-wrapper">
              <div className="photo-ring" />
              <div className="photo-inner">
                <img src={ajPhoto} alt="AJ Rayamajhi" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-8 md:px-24 relative z-10">
        <div className="relative">
          <span className="section-number">01</span>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.p variants={itemVariants} className="text-[#1E40AF] text-sm font-semibold tracking-widest uppercase mb-4">About Me</motion.p>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black mb-10 text-[#0F172A]">
              The Story<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E40AF] to-[#1e3a8a]">Behind the Builder.</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <motion.div variants={itemVariants}>
                <p className="text-slate-500 text-lg leading-relaxed mb-6">
                  I am AJ, a Computer Science student at SMSU with a 3.7 GPA, full stack developer, and co-founder of Codyza. I have worked in investment banking in Kathmandu, built AI-powered health platforms, and founded a clothing brand, all before graduation.
                </p>
                <p className="text-slate-500 text-lg leading-relaxed">
                  I speak English, Nepali, and basic Spanish. I play chess, basketball, and pool. I lift with a structured plan and explore every city I land in. I am not here to be average.
                </p>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col gap-4">
                {journey.map((item) => (
                  <div key={item.country} className="bg-white rounded-2xl p-5 transition flex items-center gap-5 border border-slate-100 hover:border-[#1E40AF]/40 shadow-sm" style={{ borderLeft: '3px solid #1E40AF' }}>
                    <div className="country-badge">
                      <img src={item.flag} alt={item.country} style={{ width: '28px', height: 'auto', borderRadius: '3px' }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#0F172A]">{item.country}</span>
                        <span className="text-[#1E40AF] text-xs font-semibold">{item.label}</span>
                      </div>
                      <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 px-8 md:px-24 relative z-10">
        <div className="relative">
          <span className="section-number">02</span>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.p variants={itemVariants} className="text-[#1E40AF] text-sm font-semibold tracking-widest uppercase mb-4">Technical Skills</motion.p>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black mb-10 text-[#0F172A]">
              What I<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E40AF] to-[#1e3a8a]">Work With.</span>
            </motion.h2>
            <motion.div variants={itemVariants}>
              <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
                <defs>
                  <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#1E40AF" stopOpacity="0"/>
                  </radialGradient>
                  <radialGradient id="nodeGlow2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0"/>
                  </radialGradient>
                </defs>
                <line x1="400" y1="250" x2="160" y2="100" stroke="#1E40AF" strokeWidth="1" strokeOpacity="0.3"/>
                <line x1="400" y1="250" x2="640" y2="100" stroke="#1e3a8a" strokeWidth="1" strokeOpacity="0.3"/>
                <line x1="400" y1="250" x2="100" y2="300" stroke="#1E40AF" strokeWidth="1" strokeOpacity="0.3"/>
                <line x1="400" y1="250" x2="700" y2="300" stroke="#1e3a8a" strokeWidth="1" strokeOpacity="0.3"/>
                <line x1="400" y1="250" x2="220" y2="430" stroke="#1E40AF" strokeWidth="1" strokeOpacity="0.3"/>
                <line x1="400" y1="250" x2="580" y2="430" stroke="#1e3a8a" strokeWidth="1" strokeOpacity="0.3"/>
                <line x1="160" y1="100" x2="80" y2="40" stroke="#1E40AF" strokeWidth="0.5" strokeOpacity="0.2"/>
                <line x1="160" y1="100" x2="120" y2="170" stroke="#1E40AF" strokeWidth="0.5" strokeOpacity="0.2"/>
                <line x1="160" y1="100" x2="220" y2="50" stroke="#1E40AF" strokeWidth="0.5" strokeOpacity="0.2"/>
                <line x1="640" y1="100" x2="700" y2="40" stroke="#1e3a8a" strokeWidth="0.5" strokeOpacity="0.2"/>
                <line x1="640" y1="100" x2="680" y2="170" stroke="#1e3a8a" strokeWidth="0.5" strokeOpacity="0.2"/>
                <line x1="640" y1="100" x2="580" y2="50" stroke="#1e3a8a" strokeWidth="0.5" strokeOpacity="0.2"/>
                <line x1="100" y1="300" x2="40" y2="260" stroke="#1E40AF" strokeWidth="0.5" strokeOpacity="0.2"/>
                <line x1="100" y1="300" x2="50" y2="350" stroke="#1E40AF" strokeWidth="0.5" strokeOpacity="0.2"/>
                <line x1="700" y1="300" x2="760" y2="260" stroke="#1e3a8a" strokeWidth="0.5" strokeOpacity="0.2"/>
                <line x1="700" y1="300" x2="750" y2="350" stroke="#1e3a8a" strokeWidth="0.5" strokeOpacity="0.2"/>
                <line x1="580" y1="430" x2="640" y2="470" stroke="#1e3a8a" strokeWidth="0.5" strokeOpacity="0.2"/>
                <line x1="580" y1="430" x2="620" y2="390" stroke="#1e3a8a" strokeWidth="0.5" strokeOpacity="0.2"/>
                <circle cx="400" cy="250" r="40" fill="url(#nodeGlow)"/>
                <circle cx="400" cy="250" r="18" fill="white" stroke="#1E40AF" strokeWidth="1.5"/>
                <text x="400" y="246" textAnchor="middle" fontSize="9" fill="#1e3a8a" fontWeight="700">AJ</text>
                <text x="400" y="258" textAnchor="middle" fontSize="7" fill="#1E40AF">SKILLS</text>
                <circle cx="160" cy="100" r="30" fill="url(#nodeGlow)"/>
                <circle cx="160" cy="100" r="14" fill="white" stroke="#1E40AF" strokeWidth="1.5"/>
                <text x="160" y="104" textAnchor="middle" fontSize="8" fill="#1e3a8a" fontWeight="700">LANG</text>
                <text x="160" y="125" textAnchor="middle" fontSize="9" fill="#64748B">Languages</text>
                <circle cx="640" cy="100" r="30" fill="url(#nodeGlow2)"/>
                <circle cx="640" cy="100" r="14" fill="white" stroke="#1e3a8a" strokeWidth="1.5"/>
                <text x="640" y="104" textAnchor="middle" fontSize="8" fill="#1e3a8a" fontWeight="700">FW</text>
                <text x="640" y="125" textAnchor="middle" fontSize="9" fill="#64748B">Frameworks</text>
                <circle cx="100" cy="300" r="30" fill="url(#nodeGlow)"/>
                <circle cx="100" cy="300" r="14" fill="white" stroke="#1E40AF" strokeWidth="1.5"/>
                <text x="100" y="304" textAnchor="middle" fontSize="8" fill="#1e3a8a" fontWeight="700">DB</text>
                <text x="100" y="325" textAnchor="middle" fontSize="9" fill="#64748B">Databases</text>
                <circle cx="700" cy="300" r="30" fill="url(#nodeGlow2)"/>
                <circle cx="700" cy="300" r="14" fill="white" stroke="#1e3a8a" strokeWidth="1.5"/>
                <text x="700" y="304" textAnchor="middle" fontSize="8" fill="#1e3a8a" fontWeight="700">AI</text>
                <text x="700" y="325" textAnchor="middle" fontSize="9" fill="#64748B">AI & APIs</text>
                <circle cx="220" cy="430" r="30" fill="url(#nodeGlow)"/>
                <circle cx="220" cy="430" r="14" fill="white" stroke="#1E40AF" strokeWidth="1.5"/>
                <text x="220" y="434" textAnchor="middle" fontSize="8" fill="#1e3a8a" fontWeight="700">TOOLS</text>
                <text x="220" y="455" textAnchor="middle" fontSize="9" fill="#64748B">Tools</text>
                <circle cx="580" cy="430" r="30" fill="url(#nodeGlow2)"/>
                <circle cx="580" cy="430" r="14" fill="white" stroke="#1e3a8a" strokeWidth="1.5"/>
                <text x="580" y="434" textAnchor="middle" fontSize="8" fill="#1e3a8a" fontWeight="700">LANG</text>
                <text x="580" y="455" textAnchor="middle" fontSize="9" fill="#64748B">Human Lang</text>
                <circle cx="80" cy="40" r="6" fill="#1E40AF" fillOpacity="0.7"/>
                <text x="80" y="32" textAnchor="middle" fontSize="8" fill="#475569">Java</text>
                <circle cx="220" cy="50" r="6" fill="#1E40AF" fillOpacity="0.7"/>
                <text x="220" y="42" textAnchor="middle" fontSize="8" fill="#475569">Python</text>
                <circle cx="120" cy="170" r="6" fill="#1E40AF" fillOpacity="0.7"/>
                <text x="100" y="185" textAnchor="middle" fontSize="8" fill="#475569">JavaScript</text>
                <circle cx="700" cy="40" r="6" fill="#1e3a8a" fillOpacity="0.7"/>
                <text x="700" y="32" textAnchor="middle" fontSize="8" fill="#475569">React</text>
                <circle cx="580" cy="50" r="6" fill="#1e3a8a" fillOpacity="0.7"/>
                <text x="580" y="42" textAnchor="middle" fontSize="8" fill="#475569">Spring Boot</text>
                <circle cx="680" cy="170" r="6" fill="#1e3a8a" fillOpacity="0.7"/>
                <text x="700" y="185" textAnchor="middle" fontSize="8" fill="#475569">FastAPI</text>
                <circle cx="40" cy="260" r="6" fill="#1E40AF" fillOpacity="0.7"/>
                <text x="40" y="252" textAnchor="middle" fontSize="8" fill="#475569">PostgreSQL</text>
                <circle cx="50" cy="350" r="6" fill="#1E40AF" fillOpacity="0.7"/>
                <text x="50" y="342" textAnchor="middle" fontSize="8" fill="#475569">Supabase</text>
                <circle cx="760" cy="260" r="6" fill="#1e3a8a" fillOpacity="0.7"/>
                <text x="760" y="252" textAnchor="middle" fontSize="8" fill="#475569">Gemini AI</text>
                <circle cx="750" cy="350" r="6" fill="#1e3a8a" fillOpacity="0.7"/>
                <text x="755" y="342" textAnchor="middle" fontSize="8" fill="#475569">REST APIs</text>
                <circle cx="640" cy="470" r="6" fill="#1e3a8a" fillOpacity="0.7"/>
                <text x="640" y="488" textAnchor="middle" fontSize="8" fill="#475569">Nepali</text>
                <circle cx="620" cy="390" r="6" fill="#1e3a8a" fillOpacity="0.7"/>
                <text x="640" y="388" textAnchor="middle" fontSize="8" fill="#475569">English</text>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-8 md:px-24 relative z-10">
        <div className="relative">
          <span className="section-number">03</span>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.p variants={itemVariants} className="text-[#1E40AF] text-sm font-semibold tracking-widest uppercase mb-4">My Work</motion.p>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black mb-10 text-[#0F172A]">
              Featured<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E40AF] to-[#1e3a8a]">Projects.</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project) => (
                <motion.div key={project.title} variants={itemVariants} className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-[#1E40AF]/40 transition group shadow-sm hover:shadow-md">
                  <div className={`project-preview ${project.preview}`}>
                    <span className="text-3xl font-black text-white opacity-20 group-hover:opacity-40 transition">{project.title}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#1E40AF] transition">{project.title}</h3>
                      <a href={project.link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#1E40AF] transition text-sm">↗</a>
                    </div>
                    <p className="text-[#1E40AF] text-xs font-semibold mb-3">{project.subtitle}</p>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{project.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="bg-slate-50 text-slate-500 border border-slate-100 px-2.5 py-1 rounded-md text-xs">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-24 px-8 md:px-24 relative z-10">
        <div className="relative">
          <span className="section-number">04</span>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.p variants={itemVariants} className="text-[#1E40AF] text-sm font-semibold tracking-widest uppercase mb-4">Background</motion.p>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black mb-14 text-[#0F172A]">
              Experience &<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E40AF] to-[#1e3a8a]">Education.</span>
            </motion.h2>
            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px]" style={{background: 'linear-gradient(to bottom, transparent, #1E40AF, #1e3a8a, #1E40AF, transparent)'}} />
              <div className="flex flex-col gap-8">
                {experience.map((item) => (
                  <motion.div key={item.role} initial={{ opacity: 0, x: item.side === 'left' ? -60 : 60, rotate: item.side === 'left' ? -2 : 2 }} whileInView={{ opacity: 1, x: 0, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: 'easeOut' }} className={`md:w-5/12 relative ${item.side === 'right' ? 'md:ml-auto' : ''}`}>
                    <div className="hidden md:block absolute top-6 w-3 h-3 rounded-full bg-[#1E40AF] shadow-[0_0_12px_rgba(30,64,175,0.6)]" style={{ [item.side === 'left' ? 'right' : 'left']: '-2.2rem' }} />
                    <div className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-[#1E40AF]/40 transition shadow-sm" style={{ borderLeft: item.side === 'left' ? '3px solid #1E40AF' : undefined, borderRight: item.side === 'right' ? '3px solid #1e3a8a' : undefined }}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-[#0F172A]">{item.role}</h3>
                        <span className="text-slate-400 text-xs">{item.period}</span>
                      </div>
                      <p className="text-[#1E40AF] text-sm font-semibold mb-2">{item.company}</p>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements */}
      <section id="achievements" className="py-24 px-8 md:px-24 relative z-10">
        <div className="relative">
          <span className="section-number">05</span>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.p variants={itemVariants} className="text-[#1E40AF] text-sm font-semibold tracking-widest uppercase mb-4">Highlights</motion.p>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black mb-10 text-[#0F172A]">
              Beyond<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E40AF] to-[#1e3a8a]">The Code.</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((a) => (
                <motion.div key={a.title} variants={itemVariants} className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-[#1E40AF]/40 transition flex gap-5 shadow-sm">
                  <span className="text-3xl">{a.icon}</span>
                  <div>
                    <h3 className="font-bold text-[#0F172A] mb-1">{a.title}</h3>
                    <p className="text-[#1E40AF] text-sm font-semibold mb-2">{a.org}</p>
                    <p className="text-slate-500 text-sm">{a.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-8 md:px-24 relative z-10">
        <div className="relative">
          <span className="section-number">06</span>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.p variants={itemVariants} className="text-[#1E40AF] text-sm font-semibold tracking-widest uppercase mb-4">Get In Touch</motion.p>
            <motion.div variants={itemVariants} className="relative rounded-3xl overflow-hidden p-10" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="aurora-blob aurora-blob-1" />
                <div className="aurora-blob aurora-blob-2" />
                <div className="aurora-blob aurora-blob-3" />
              </div>
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: 'rgba(30,64,175,0.08)', border: '1px solid rgba(30,64,175,0.2)' }}>
                  <div className="badge-dot" />
                  <span className="text-[#1e3a8a] text-xs font-bold tracking-widest uppercase">Available for opportunities</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-4 text-[#0F172A]">
                  Let's Build Something<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E40AF] to-[#1e3a8a]">Inevitable.</span>
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed mb-10">
                  Open to collaborations and conversations with people who build real things. Whether you need a portfolio, a business website, or want to collaborate — reach out.
                </p>
                <div className="flex flex-col gap-3">
                  <a href="mailto:rayamajhi.anirudra@gmail.com" className="contact-card">
                    <div className="contact-card-glow contact-card-glow-green" />
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(30,64,175,0.1)', border: '1px solid rgba(30,64,175,0.3)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E40AF" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-[#0F172A] font-bold text-sm">Email Me</div>
                      <div className="text-slate-400 text-xs">rayamajhi.anirudra@gmail.com</div>
                    </div>
                    <span className="contact-card-arrow">↗</span>
                  </a>
                  <a href="https://linkedin.com/in/anirudra-rayamajhi-bb48b83b4" target="_blank" rel="noreferrer" className="contact-card">
                    <div className="contact-card-glow contact-card-glow-indigo" />
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(30,64,175,0.08)', border: '1px solid rgba(30,64,175,0.2)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#1E40AF"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-[#0F172A] font-bold text-sm">LinkedIn</div>
                      <div className="text-slate-400 text-xs">Anirudra Rayamajhi</div>
                    </div>
                    <span className="contact-card-arrow">↗</span>
                  </a>
                  <a href="https://github.com/rayamajhianirudra-droid" target="_blank" rel="noreferrer" className="contact-card">
                    <div className="contact-card-glow contact-card-glow-white" />
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(30,64,175,0.08)', border: '1px solid rgba(30,64,175,0.2)' }}>
                      <GithubIcon size={20} color="#1E40AF" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[#0F172A] font-bold text-sm">GitHub</div>
                      <div className="text-slate-400 text-xs">rayamajhianirudra-droid</div>
                    </div>
                    <span className="contact-card-arrow">↗</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 px-8 border-t border-slate-100 text-center text-slate-400 text-sm relative z-10">
        <p>Built by AJ Rayamajhi — Inevitable.</p>
        <p className="mt-1">© {new Date().getFullYear()} Anirudra Rayamajhi. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;