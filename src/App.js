import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ajPhoto from './aj.jpg';
import './App.css';

function useTypingEffect(words, typingSpeed = 80, deletingSpeed = 40, pauseTime = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;
    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), typingSpeed);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), deletingSpeed);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return displayed;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function GithubIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const projects = [
  {
    title: 'Foresight',
    subtitle: '🏆 3rd Place — Southwest MN Hacks 2026',
    desc: 'AI workforce readiness platform built at the Google Cloud Hackathon. Owned entire backend: FastAPI, Supabase, Gemini AI integration, and risk scoring logic.',
    tags: ['Python', 'FastAPI', 'Supabase', 'Gemini AI', 'Vercel'],
    link: 'https://skillspulse-backend.vercel.app',
    preview: 'project-preview-foresight',
  },
  {
    title: 'LifeOS Health',
    subtitle: 'Full Stack Nutrition Platform',
    desc: 'Deployed platform with Spring Boot REST API, React frontend, and PostgreSQL. Integrates USDA FoodData for 600,000+ foods and Google Gemini AI.',
    tags: ['Spring Boot', 'React', 'PostgreSQL', 'Gemini AI'],
    link: 'https://lifeoshealth.com',
    preview: 'project-preview-lifeos',
  },
  {
    title: 'NepalDisaster.com',
    subtitle: 'Civic Emergency Platform',
    desc: 'Live bilingual flood emergency site for the 2026 Nepal floods. Auto-updating district alert map, missing-persons registry with photo uploads.',
    tags: ['React', 'Open-Meteo', 'DHM', 'Vercel'],
    link: 'https://nepaldisaster.com',
    preview: 'project-preview-nepal',
  },
  {
    title: 'US Tax Calculator',
    subtitle: 'Desktop Application',
    desc: 'Java desktop app for calculating federal and state taxes with real-time bracket computation and deduction analysis.',
    tags: ['Java', 'JavaFX', 'OOP'],
    link: 'https://github.com/rayamajhianirudra-droid',
    preview: 'project-preview-tax',
  },
  {
    title: 'Codyza',
    subtitle: 'Student Dev Community & Agency',
    desc: 'Co-founded a student developer organization at SMSU. Built and launched NepalDisaster.com. Recognized by Student Senate.',
    tags: ['React', 'Vercel', 'Leadership'],
    link: 'https://codyza.com',
    preview: 'project-preview-codyza',
  },
];

const achievements = [
  {
    icon: '🏆',
    title: '3rd Place — SW MN Hacks 2026',
    org: 'Google Cloud Hackathon (12 Teams)',
    desc: 'Built Foresight with a team of 4. Owned the entire backend and database layer.',
  },
  {
    icon: '🏦',
    title: 'Investment Banking Analyst',
    org: 'Laxmi Sunrise Bank',
    desc: 'Equity analysis and investment reports in Kathmandu, Nepal.',
  },
  {
    icon: '🚨',
    title: 'DAT Duty Officer',
    org: 'American Red Cross, MN & Dakotas',
    desc: 'On-call disaster responder coordinating shelter and financial assistance.',
  },
  {
    icon: '🎓',
    title: '3.7 GPA — CS Core',
    org: 'Southwest Minnesota State University',
    desc: 'OOP (A), Computer Architecture (A), Data Science (A-). Minor in Data Science.',
  },
];

const journey = [
  { flag: 'https://flagcdn.com/w40/np.png', country: 'Nepal', label: 'Origin' },
  { flag: 'https://flagcdn.com/w40/us.png', country: 'Texas', label: '2021' },
  { flag: 'https://flagcdn.com/w40/us.png', country: 'Minnesota', label: '2024 — Present' },
];

const experience = [
  {
    role: 'Co-Founder',
    company: 'Codyza',
    period: '2026 — Present',
    desc: 'Co-founded student dev community at SMSU. Built and launched NepalDisaster.com. Recognized by Student Senate.',
    side: 'left',
  },
  {
    role: 'DAT Duty Officer',
    company: 'American Red Cross, MN & Dakotas',
    period: '2026 — Present',
    desc: 'On-call disaster responder coordinating shelter, financial assistance, and damage assessment.',
    side: 'right',
  },
  {
    role: 'Direct Support Professional II',
    company: 'Sevita / Genesis Crisis Home',
    period: '2024 — Present',
    desc: 'Promoted from DSP to DSP II. Daily care, medication management, and crisis de-escalation.',
    side: 'left',
  },
  {
    role: 'Investment Banking Analyst',
    company: 'Laxmi Sunrise Bank',
    period: '2022 — 2023',
    desc: 'Equity analysis and investment reports for senior analysts in Kathmandu, Nepal.',
    side: 'right',
  },
  {
    role: 'B.S. Computer Science',
    company: 'Southwest Minnesota State University',
    period: 'Expected May 2027',
    desc: 'GPA: 3.7 CS Core. Minor: Data Science. OOP (A), Computer Architecture (A), Data Science (A-).',
    side: 'left',
  },
];

const typingWords = [
  'Full Stack Developer.',
  'Java · Spring Boot · React.',
  'AI-Powered Apps.',
  '3 Live Deployed Products.',
  'Available Summer 2027.',
];

const navLinks = ['skills', 'projects', 'experience', 'achievements', 'about', 'contact'];

export default function App() {
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const typedText = useTypingEffect(typingWords);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = navLinks.map((id) => document.getElementById(id)).filter(Boolean);
      let current = '';
      for (const sec of sections) {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="font-sans text-[#1E293B] bg-[#FAFAFB] min-h-screen">
      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur shadow-sm border-b border-black/5' : 'bg-transparent'
        }`}
      >
        <div className="px-5 md:px-8 py-3 md:py-4 flex items-center justify-between max-w-7xl mx-auto">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-bold text-lg tracking-tight text-[#0F172A] hover:text-[#1E40AF] transition"
          >
            AJ<span className="text-[#1E40AF]">.</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-sm font-medium capitalize transition ${
                  activeSection === id ? 'text-[#1E40AF]' : 'text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                {id}
              </button>
            ))}
            <a
              href="mailto:rayamajhianirudra@gmail.com"
              className="bg-[#1E40AF] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e3a8a] transition"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#1E293B] p-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-black/5 px-5 pb-4"
            >
              {navLinks.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="block w-full text-left py-2.5 text-sm font-medium capitalize text-[#64748B] hover:text-[#1E293B] transition"
                >
                  {id}
                </button>
              ))}
              <a
                href="mailto:rayamajhianirudra@gmail.com"
                className="mt-2 block text-center bg-[#1E40AF] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1e3a8a] transition"
              >
                Hire Me
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* SOCIAL SIDEBAR */}
      <div className="hidden md:flex fixed left-4 lg:left-6 bottom-0 z-40 flex-col items-center gap-4">
        <a
          href="https://github.com/rayamajhianirudra-droid"
          target="_blank"
          rel="noreferrer"
          className="text-[#64748B] hover:text-[#1E40AF] transition"
        >
          <GithubIcon size={18} />
        </a>
        <a
          href="https://linkedin.com/in/ajrayamajhi"
          target="_blank"
          rel="noreferrer"
          className="text-[#64748B] hover:text-[#1E40AF] transition"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a
          href="mailto:rayamajhianirudra@gmail.com"
          className="text-[#64748B] hover:text-[#1E40AF] transition"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-10 7L2 7" />
          </svg>
        </a>
        <div className="w-px h-16 bg-[#CBD5E1] mt-2" />
      </div>

      {/* ── HERO ── */}
      <section className="pt-20 pb-12 px-5 md:px-16 lg:px-24 min-h-screen flex items-center">
        <motion.div
          className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text */}
          <motion.div variants={itemVariants} className="flex-1 order-2 md:order-1">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#1E40AF] animate-pulse" />
              <span className="text-xs font-semibold tracking-widest text-[#1E40AF] uppercase">
                FULL STACK DEVELOPER · OPEN TO INTERNSHIPS
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0F172A] leading-tight mb-4"
            >
              Hi, I'm{' '}
              <span className="text-[#1E40AF]">AJ</span>
              <br />
              Rayamajhi
            </motion.h1>

            <motion.div variants={itemVariants} className="text-xl md:text-2xl font-medium text-[#64748B] mb-4 h-8">
              <span className="text-[#1E40AF]">{typedText}</span>
              <span className="animate-pulse">|</span>
            </motion.div>

            <motion.p variants={itemVariants} className="text-[#64748B] max-w-lg mb-6 leading-relaxed">
              CS Junior at SMSU building AI-powered full-stack apps — Spring Boot, React, PostgreSQL, deployed and used by real people.
            </motion.p>

            {/* Tech pills */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-6">
              {['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Python', 'Gemini AI'].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-[#1E40AF]/8 text-[#1E40AF] rounded-full text-xs font-semibold border border-[#1E40AF]/20"
                >
                  {t}
                </span>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="flex gap-4 md:gap-8 mb-6">
              {[
                { value: '3', label: 'Live Apps' },
                { value: '3rd', label: 'Hackathon Place' },
                { value: '3.7', label: 'CS GPA' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-extrabold text-[#0F172A]">{s.value}</div>
                  <div className="text-xs text-[#94A3B8] font-medium">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollTo('projects')}
                className="bg-[#1E40AF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1e3a8a] transition text-sm"
              >
                View Projects →
              </button>

              <div className="flex items-center gap-1">
                <a
                  href="/AJ_Rayamajhi_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="border border-[#1E40AF]/40 hover:border-[#1E40AF] text-[#1E40AF] px-6 py-3 rounded-l-lg font-semibold transition text-sm"
                >
                  View Resume ↗
                </a>
                <a
                  href="/AJ_Rayamajhi_Resume.pdf"
                  download
                  title="Download PDF"
                  className="border border-[#1E40AF]/40 hover:border-[#1E40AF] hover:bg-[#1E40AF]/5 text-[#1E40AF] px-3 py-3 rounded-r-lg font-semibold transition text-sm border-l-0"
                >
                  ↓
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Photo */}
          <motion.div
            variants={itemVariants}
            className="order-1 md:order-2 w-40 h-52 md:w-52 md:h-64 mx-auto md:mx-0 flex-shrink-0"
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-[#1E40AF]/10 rounded-2xl translate-x-2 translate-y-2" />
              <img
                src={ajPhoto}
                alt="AJ Rayamajhi"
                className="relative w-full h-full object-cover rounded-2xl border-2 border-white shadow-xl"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-16 md:py-24 px-5 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold tracking-widest text-[#1E40AF]/60 uppercase">01</span>
              <div className="h-px flex-1 bg-[#E2E8F0]" />
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-12">
              Technical{' '}
              <span className="text-[#1E40AF]">Skills.</span>
            </motion.h2>

            <div className="overflow-x-auto">
              <div style={{ minWidth: '300px' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      category: 'Backend',
                      icon: '⚙️',
                      skills: ['Java', 'Spring Boot', 'Python', 'FastAPI', 'REST APIs', 'JPA/Hibernate'],
                    },
                    {
                      category: 'Frontend',
                      icon: '🎨',
                      skills: ['React', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Responsive Design'],
                    },
                    {
                      category: 'Database & Cloud',
                      icon: '🗄️',
                      skills: ['PostgreSQL', 'Supabase', 'MySQL', 'Vercel', 'Railway', 'AWS basics'],
                    },
                    {
                      category: 'AI & Tools',
                      icon: '🤖',
                      skills: ['Gemini AI', 'Google Cloud', 'Git', 'Maven', 'IntelliJ', 'VS Code'],
                    },
                  ].map((group) => (
                    <motion.div
                      key={group.category}
                      variants={itemVariants}
                      className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:border-[#1E40AF]/30 hover:shadow-md transition"
                    >
                      <div className="text-2xl mb-3">{group.icon}</div>
                      <h3 className="font-bold text-[#0F172A] mb-3 text-sm uppercase tracking-wide">
                        {group.category}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {group.skills.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-1 bg-[#F1F5F9] text-[#475569] rounded text-xs font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-16 md:py-24 px-5 md:px-16 lg:px-24 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold tracking-widest text-[#1E40AF]/60 uppercase">02</span>
              <div className="h-px flex-1 bg-[#E2E8F0]" />
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-12">
              Projects{' '}
              <span className="text-[#1E40AF]">& Work.</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p, i) => (
                <motion.div
                  key={p.title}
                  variants={itemVariants}
                  className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:border-[#1E40AF]/30 hover:shadow-md transition flex flex-col"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-[#0F172A] text-lg">{p.title}</h3>
                      <p className="text-xs text-[#1E40AF] font-semibold mt-0.5">{p.subtitle}</p>
                    </div>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#94A3B8] hover:text-[#1E40AF] transition flex-shrink-0 ml-2"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </div>
                  <p className="text-sm text-[#64748B] leading-relaxed mb-4 flex-1">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 bg-[#EFF6FF] text-[#1E40AF] rounded text-xs font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="py-16 md:py-24 px-5 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold tracking-widest text-[#1E40AF]/60 uppercase">03</span>
              <div className="h-px flex-1 bg-[#E2E8F0]" />
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-12">
              Experience{' '}
              <span className="text-[#1E40AF]">& Education.</span>
            </motion.h2>

            {/* Desktop timeline */}
            <div className="hidden md:block relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#E2E8F0] -translate-x-1/2" />
              <div className="space-y-8">
                {experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className={`flex ${exp.side === 'right' ? 'flex-row-reverse' : 'flex-row'} items-center gap-6`}
                  >
                    <div className={`flex-1 ${exp.side === 'right' ? 'text-left pl-6' : 'text-right pr-6'}`}>
                      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:border-[#1E40AF]/30 hover:shadow-md transition inline-block text-left w-full">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-bold text-[#0F172A]">{exp.role}</h3>
                          <span className="text-xs text-[#94A3B8] font-medium ml-3 flex-shrink-0">{exp.period}</span>
                        </div>
                        <p className="text-xs font-semibold text-[#1E40AF] mb-2">{exp.company}</p>
                        <p className="text-sm text-[#64748B] leading-relaxed">{exp.desc}</p>
                      </div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-[#1E40AF] border-2 border-white shadow flex-shrink-0 z-10" />
                    <div className="flex-1" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile timeline — single column with left border */}
            <div className="md:hidden space-y-4">
              {experience.map((exp, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm border-l-4 border-l-[#1E40AF]"
                >
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-[#0F172A] text-sm">{exp.role}</h3>
                    <span className="text-xs text-[#94A3B8] font-medium ml-2 flex-shrink-0">{exp.period}</span>
                  </div>
                  <p className="text-xs font-semibold text-[#1E40AF] mb-2">{exp.company}</p>
                  <p className="text-sm text-[#64748B] leading-relaxed">{exp.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" className="py-16 md:py-24 px-5 md:px-16 lg:px-24 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold tracking-widest text-[#1E40AF]/60 uppercase">04</span>
              <div className="h-px flex-1 bg-[#E2E8F0]" />
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-12">
              Achievements{' '}
              <span className="text-[#1E40AF]">& Awards.</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((a) => (
                <motion.div
                  key={a.title}
                  variants={itemVariants}
                  className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:border-[#1E40AF]/30 hover:shadow-md transition flex gap-4"
                >
                  <div className="text-3xl flex-shrink-0">{a.icon}</div>
                  <div>
                    <h3 className="font-bold text-[#0F172A] mb-0.5">{a.title}</h3>
                    <p className="text-xs font-semibold text-[#1E40AF] mb-2">{a.org}</p>
                    <p className="text-sm text-[#64748B] leading-relaxed">{a.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-16 md:py-24 px-5 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold tracking-widest text-[#1E40AF]/60 uppercase">05</span>
              <div className="h-px flex-1 bg-[#E2E8F0]" />
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-12">
              What I Bring{' '}
              <span className="text-[#1E40AF]">/ To Your Team.</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              {/* Left: Bio */}
              <motion.div variants={itemVariants} className="flex flex-col justify-center">
                <p className="text-[#475569] leading-relaxed text-base md:text-lg">
                  CS Junior at SMSU (3.7 GPA, May 2027). I ship full-stack products end-to-end: Java Spring Boot APIs, React frontends, PostgreSQL databases, and Gemini AI integrations — all in production. I have built under real pressure: a hackathon win, a live disaster response platform, and a deployed health app used by real users.
                </p>
                <div className="mt-6 flex gap-3">
                  <a
                    href="https://github.com/rayamajhianirudra-droid"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold text-[#64748B] hover:text-[#1E40AF] transition"
                  >
                    <GithubIcon size={16} /> GitHub
                  </a>
                  <span className="text-[#CBD5E1]">·</span>
                  <a
                    href="https://linkedin.com/in/ajrayamajhi"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-[#64748B] hover:text-[#1E40AF] transition"
                  >
                    LinkedIn
                  </a>
                  <span className="text-[#CBD5E1]">·</span>
                  <a
                    href="mailto:rayamajhianirudra@gmail.com"
                    className="text-sm font-semibold text-[#64748B] hover:text-[#1E40AF] transition"
                  >
                    Email
                  </a>
                </div>
              </motion.div>

              {/* Right: Value cards */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: '🚀',
                    title: 'Ships to Production',
                    desc: '3 live apps deployed on Vercel and custom domains. Not just GitHub repos.',
                  },
                  {
                    icon: '🤖',
                    title: 'AI Integration',
                    desc: 'Gemini AI in production (LifeOS Health + Foresight). Experience with agentic API patterns.',
                  },
                  {
                    icon: '🔧',
                    title: 'Full Stack Depth',
                    desc: 'Spring Boot + React + PostgreSQL. Backend APIs, frontend UX, and database design.',
                  },
                  {
                    icon: '⚡',
                    title: 'Proven Under Pressure',
                    desc: '3rd place at Google Cloud Hackathon. Built a working product in hours with a team of 4.',
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="bg-white border border-slate-100 rounded-xl p-4 hover:border-[#1E40AF]/30 transition shadow-sm flex gap-3"
                  >
                    <span className="text-xl flex-shrink-0">{card.icon}</span>
                    <div>
                      <h4 className="font-bold text-[#0F172A] text-sm mb-1">{card.title}</h4>
                      <p className="text-xs text-[#64748B] leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Journey badges */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide mr-1">Journey:</span>
              {journey.map((j) => (
                <div
                  key={j.label}
                  className="flex items-center gap-1.5 bg-white border border-slate-100 rounded-full px-3 py-1.5 shadow-sm"
                >
                  <img src={j.flag} alt={j.country} className="w-4 h-3 object-cover rounded-sm" />
                  <span className="text-xs font-medium text-[#475569]">{j.country}</span>
                  <span className="text-xs text-[#94A3B8]">{j.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-16 md:py-24 px-5 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold tracking-widest text-[#1E40AF]/60 uppercase">06</span>
              <div className="h-px flex-1 bg-[#E2E8F0]" />
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
              Let's{' '}
              <span className="text-[#1E40AF]">Connect.</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-[#64748B] mb-10 max-w-lg">
              Open to Summer 2027 internships, part-time roles, and interesting projects. Reach out anytime.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-6 md:p-10"
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center">
                <div className="flex-1 w-full">
                  <div className="space-y-4">
                    {[
                      {
                        icon: (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="m22 7-10 7L2 7" />
                          </svg>
                        ),
                        label: 'Email',
                        value: 'rayamajhianirudra@gmail.com',
                        href: 'mailto:rayamajhianirudra@gmail.com',
                      },
                      {
                        icon: (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        ),
                        label: 'LinkedIn',
                        value: 'linkedin.com/in/ajrayamajhi',
                        href: 'https://linkedin.com/in/ajrayamajhi',
                      },
                      {
                        icon: <GithubIcon size={18} />,
                        label: 'GitHub',
                        value: 'github.com/rayamajhianirudra-droid',
                        href: 'https://github.com/rayamajhianirudra-droid',
                      },
                    ].map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noreferrer"
                        className="flex items-center gap-3 text-[#1E40AF] hover:text-[#1e3a8a] transition group w-full"
                      >
                        <span className="p-2 bg-white rounded-lg border border-[#BFDBFE] group-hover:border-[#1E40AF]/30 transition flex-shrink-0">
                          {item.icon}
                        </span>
                        <div>
                          <div className="text-xs text-[#64748B] font-medium">{item.label}</div>
                          <div className="text-sm font-semibold break-all">{item.value}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex-shrink-0 w-full md:w-auto text-center md:text-left">
                  <div className="text-5xl font-extrabold text-[#1E40AF]/10 leading-none mb-2">2027</div>
                  <p className="text-sm text-[#1E40AF] font-semibold">Available for</p>
                  <p className="text-sm text-[#1E40AF] font-semibold">Summer Internships</p>
                  <div className="mt-4">
                    <a
                      href="mailto:rayamajhianirudra@gmail.com"
                      className="inline-block bg-[#1E40AF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1e3a8a] transition text-sm"
                    >
                      Send a Message →
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-5 border-t border-[#E2E8F0] text-center">
        <p className="text-sm text-[#94A3B8]">
          Built by{' '}
          <span className="text-[#1E40AF] font-semibold">AJ Rayamajhi</span>
          {' '}· React + Tailwind · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}