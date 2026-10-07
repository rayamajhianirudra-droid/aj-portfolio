import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ajPhoto from './aj.jpg';
import './App.css';

/* ─── Typing effect hook ─────────────────────────────────────────────────── */
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
    } else {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return displayed;
}

/* ─── Animation variants ─────────────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

/* ─── Icons ──────────────────────────────────────────────────────────────── */
function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
function LinkedInIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function EmailIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 7L2 7" />
    </svg>
  );
}
function ExternalIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const projects = [
  {
    title: 'Foresight',
    badge: '🏆 3rd Place — SW MN Hacks 2026',
    desc: 'AI workforce readiness platform built at Google Cloud Hackathon. Owned full backend: FastAPI, Supabase, Gemini AI integration, and risk-scoring logic.',
    tags: ['Python', 'FastAPI', 'Supabase', 'Gemini AI', 'Vercel'],
    link: 'https://skillspulse-backend.vercel.app',
  },
  {
    title: 'LifeOS Health',
    badge: 'Live · lifeoshealth.com',
    desc: 'Full-stack nutrition platform with Spring Boot REST API, React frontend, PostgreSQL, and USDA FoodData (600K+ foods). Gemini AI meal analysis in production.',
    tags: ['Spring Boot', 'React', 'PostgreSQL', 'Gemini AI', 'Railway'],
    link: 'https://lifeoshealth.com',
  },
  {
    title: 'NepalDisaster.com',
    badge: 'Live · nepaldisaster.com',
    desc: 'Bilingual emergency platform for the 2026 Nepal floods. Real-time district alert map, missing-persons registry with photo uploads.',
    tags: ['React', 'Open-Meteo API', 'Vercel'],
    link: 'https://nepaldisaster.com',
  },
  {
    title: 'US Tax Calculator',
    badge: 'Desktop App · Java',
    desc: 'JavaFX desktop app for federal and state tax calculation with real-time bracket computation and deduction analysis.',
    tags: ['Java', 'JavaFX', 'OOP'],
    link: 'https://github.com/rayamajhianirudra-droid',
  },
  {
    title: 'Codyza',
    badge: 'Co-Founder · SMSU',
    desc: 'Student developer organization at SMSU. Co-founded, President. Built and launched NepalDisaster.com. Recognized by SMSU Student Senate.',
    tags: ['Leadership', 'React', 'Vercel'],
    link: 'https://codyza.com',
  },
];

const skills = [
  {
    category: 'Backend',
    icon: '⚙️',
    items: ['Java', 'Spring Boot', 'Python', 'FastAPI', 'REST APIs', 'JPA / Hibernate'],
  },
  {
    category: 'Frontend',
    icon: '🖥️',
    items: ['React', 'JavaScript', 'HTML / CSS', 'Tailwind CSS', 'Responsive Design'],
  },
  {
    category: 'Database & Cloud',
    icon: '🗄️',
    items: ['PostgreSQL', 'Supabase', 'MySQL', 'Vercel', 'Railway', 'AWS (basics)'],
  },
  {
    category: 'AI & Tools',
    icon: '🤖',
    items: ['Gemini AI', 'Google Cloud', 'Git', 'Maven', 'IntelliJ IDEA', 'VS Code'],
  },
];

const experience = [
  {
    role: 'Co-Founder & President',
    company: 'Codyza · SMSU',
    period: '2026 – Present',
    desc: 'Founded and lead student developer organization. Built NepalDisaster.com with the team. Recognized by SMSU Student Senate.',
  },
  {
    role: 'DAT Duty Officer',
    company: 'American Red Cross, MN & Dakotas',
    period: '2026 – Present',
    desc: 'On-call disaster responder coordinating shelter, financial assistance, and damage assessment.',
  },
  {
    role: 'Direct Support Professional II',
    company: 'Sevita / Genesis Crisis Home',
    period: '2024 – Present',
    desc: 'Promoted from DSP to DSP II. Daily care coordination, medication management, and crisis de-escalation.',
  },
  {
    role: 'Investment Banking Analyst',
    company: 'Laxmi Sunrise Bank · Kathmandu, Nepal',
    period: '2022 – 2023',
    desc: 'Equity analysis and investment reports for senior analysts.',
  },
  {
    role: 'B.S. Computer Science',
    company: 'Southwest Minnesota State University',
    period: 'Expected May 2027',
    desc: 'GPA 3.7 (CS Core). Minor: Data Science. OOP (A), Computer Architecture (A), Data Science (A-).',
  },
];

const achievements = [
  {
    icon: '🏆',
    title: '3rd Place — SW MN Hacks 2026',
    org: 'Google Cloud Hackathon · 12 Teams',
    desc: 'Built Foresight with a team of 4. Owned the entire backend and database layer.',
  },
  {
    icon: '🏦',
    title: 'Investment Banking Analyst',
    org: 'Laxmi Sunrise Bank',
    desc: 'Professional financial analysis experience before pursuing CS full-time.',
  },
  {
    icon: '🚨',
    title: 'DAT Duty Officer',
    org: 'American Red Cross, MN & Dakotas',
    desc: 'On-call disaster responder coordinating emergency shelter and assistance.',
  },
  {
    icon: '🎓',
    title: '3.7 GPA · CS Core',
    org: 'Southwest Minnesota State University',
    desc: 'OOP (A), Computer Architecture (A), Data Science (A-). Minor in Data Science.',
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

/* ─── App ────────────────────────────────────────────────────────────────── */
export default function App() {
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const typedText = useTypingEffect(typingWords);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = navLinks.map((id) => document.getElementById(id)).filter(Boolean);
      let current = '';
      for (const sec of sections) {
        if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="font-sans text-[#1E293B] bg-[#FAFAFB] min-h-screen">

      {/* ── NAV ── */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-black/5' : 'bg-transparent'
        }`}
      >
        <div className="px-5 md:px-8 py-3 md:py-4 flex items-center justify-between max-w-6xl mx-auto">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-bold text-lg tracking-tight text-[#0F172A] hover:text-[#1E40AF] transition"
            aria-label="Scroll to top"
          >
            AJ<span className="text-[#1E40AF]">.</span>
          </button>

          {/* Desktop */}
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
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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

      {/* ── SOCIAL SIDEBAR (desktop only) ── */}
      <div className="hidden lg:flex fixed left-5 bottom-0 z-40 flex-col items-center gap-4 pb-0">
        <a href="https://github.com/rayamajhianirudra-droid" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-[#94A3B8] hover:text-[#1E40AF] transition p-1">
          <GithubIcon size={17} />
        </a>
        <a href="https://linkedin.com/in/ajrayamajhi" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-[#94A3B8] hover:text-[#1E40AF] transition p-1">
          <LinkedInIcon size={17} />
        </a>
        <a href="mailto:rayamajhianirudra@gmail.com" aria-label="Email" className="text-[#94A3B8] hover:text-[#1E40AF] transition p-1">
          <EmailIcon size={17} />
        </a>
        <div className="w-px h-14 bg-[#CBD5E1] mt-1" />
      </div>

      {/* ── HERO ── */}
      <section className="pt-24 pb-14 px-5 md:px-10 lg:px-20">
        <motion.div
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-14"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text */}
          <motion.div variants={itemVariants} className="flex-1 order-2 md:order-1 min-w-0">

            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E40AF] animate-pulse" aria-hidden="true" />
              <span className="text-xs font-bold tracking-widest text-[#1E40AF] uppercase">
                Full Stack Developer · Open to Internships
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] leading-tight mb-3"
            >
              Hi, I'm <span className="text-[#1E40AF]">AJ</span>
              <br />Rayamajhi
            </motion.h1>

            {/* Typing */}
            <motion.div variants={itemVariants} className="text-lg md:text-xl font-medium text-[#64748B] mb-3 h-7" aria-live="polite">
              <span className="text-[#1E40AF]">{typedText}</span>
              <span className="animate-pulse ml-0.5" aria-hidden="true">|</span>
            </motion.div>

            {/* Subtext */}
            <motion.p variants={itemVariants} className="text-[#64748B] max-w-md mb-5 leading-relaxed text-sm md:text-base">
              CS Junior at SMSU — building AI-powered full-stack apps with Spring Boot, React, and PostgreSQL. 3 live products, 1 hackathon win.
            </motion.p>

            {/* Tech pills */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-1.5 mb-5">
              {['Java', 'Spring Boot', 'React', 'Python', 'PostgreSQL', 'Gemini AI'].map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 bg-[#EFF6FF] text-[#1E40AF] rounded-md text-xs font-semibold border border-[#BFDBFE]"
                >
                  {t}
                </span>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="flex gap-6 mb-6">
              {[
                { value: '3', label: 'Live Apps' },
                { value: '3rd', label: 'Hackathon' },
                { value: '3.7', label: 'CS GPA' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-xl font-extrabold text-[#0F172A]">{s.value}</div>
                  <div className="text-xs text-[#94A3B8] font-medium">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollTo('projects')}
                className="bg-[#1E40AF] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#1e3a8a] transition text-sm"
              >
                View Projects →
              </button>

              {/* Resume split button */}
              <div className="flex items-center" role="group" aria-label="Resume options">
                <a
                  href="/AJ_Rayamajhi_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="border border-[#1E40AF]/40 hover:border-[#1E40AF] hover:bg-[#EFF6FF] text-[#1E40AF] px-4 py-2.5 rounded-l-lg font-semibold transition text-sm"
                >
                  View Resume ↗
                </a>
                <a
                  href="/AJ_Rayamajhi_Resume.pdf"
                  download="AJ_Rayamajhi_Resume.pdf"
                  aria-label="Download resume PDF"
                  className="border border-[#1E40AF]/40 border-l-[#1E40AF]/20 hover:border-[#1E40AF] hover:bg-[#EFF6FF] text-[#1E40AF] px-3 py-2.5 rounded-r-lg font-semibold transition text-sm"
                  style={{ borderLeftWidth: '1px' }}
                >
                  ↓
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Photo */}
          <motion.div
            variants={itemVariants}
            className="order-1 md:order-2 flex-shrink-0"
          >
            <div className="relative w-36 h-44 sm:w-44 sm:h-56 md:w-48 md:h-60 lg:w-56 lg:h-72">
              <div className="absolute inset-0 bg-[#1E40AF]/10 rounded-2xl translate-x-2 translate-y-2" aria-hidden="true" />
              <img
                src={ajPhoto}
                alt="AJ Rayamajhi — Full Stack Developer"
                className="relative w-full h-full object-cover object-top rounded-2xl border-2 border-white shadow-lg"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-12 md:py-16 px-5 md:px-10 lg:px-20" style={{ scrollMarginTop: '64px' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={containerVariants}>
            <SectionLabel number="01" />
            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-extrabold text-[#0F172A] mb-7">
              Technical <span className="text-[#1E40AF]">Skills</span>
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {skills.map((group) => (
                <motion.div
                  key={group.category}
                  variants={itemVariants}
                  className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:border-[#1E40AF]/25 hover:shadow-md transition"
                >
                  <div className="text-xl mb-2" aria-hidden="true">{group.icon}</div>
                  <h3 className="font-bold text-[#0F172A] mb-3 text-xs uppercase tracking-wide">{group.category}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-[#F1F5F9] text-[#475569] rounded text-xs font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-12 md:py-16 px-5 md:px-10 lg:px-20 bg-[#F8FAFF]" style={{ scrollMarginTop: '64px' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={containerVariants}>
            <SectionLabel number="02" />
            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-extrabold text-[#0F172A] mb-7">
              Projects <span className="text-[#1E40AF]">&amp; Work</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((p) => (
                <motion.article
                  key={p.title}
                  variants={itemVariants}
                  className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-[#1E40AF]/25 hover:shadow-md transition flex flex-col"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="min-w-0 pr-2">
                      <h3 className="font-bold text-[#0F172A] text-base leading-snug">{p.title}</h3>
                      <p className="text-xs text-[#1E40AF] font-semibold mt-0.5">{p.badge}</p>
                    </div>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${p.title}`}
                      className="text-[#94A3B8] hover:text-[#1E40AF] transition flex-shrink-0 p-1 -m-1"
                    >
                      <ExternalIcon />
                    </a>
                  </div>
                  <p className="text-sm text-[#64748B] leading-relaxed mb-4 flex-1">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {p.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-[#EFF6FF] text-[#1E40AF] rounded text-xs font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="py-12 md:py-16 px-5 md:px-10 lg:px-20" style={{ scrollMarginTop: '64px' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={containerVariants}>
            <SectionLabel number="03" />
            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-extrabold text-[#0F172A] mb-7">
              Experience <span className="text-[#1E40AF]">&amp; Education</span>
            </motion.h2>

            <div className="space-y-3">
              {experience.map((exp, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-white border border-slate-100 rounded-xl p-4 md:p-5 shadow-sm hover:border-[#1E40AF]/25 hover:shadow-md transition border-l-4 border-l-[#1E40AF]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                    <h3 className="font-bold text-[#0F172A] text-sm md:text-base">{exp.role}</h3>
                    <span className="text-xs text-[#94A3B8] font-medium flex-shrink-0">{exp.period}</span>
                  </div>
                  <p className="text-xs font-semibold text-[#1E40AF] mb-1.5">{exp.company}</p>
                  <p className="text-sm text-[#64748B] leading-relaxed">{exp.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" className="py-12 md:py-16 px-5 md:px-10 lg:px-20 bg-[#F8FAFF]" style={{ scrollMarginTop: '64px' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={containerVariants}>
            <SectionLabel number="04" />
            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-extrabold text-[#0F172A] mb-7">
              Achievements <span className="text-[#1E40AF]">&amp; Leadership</span>
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((a) => (
                <motion.div
                  key={a.title}
                  variants={itemVariants}
                  className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:border-[#1E40AF]/25 hover:shadow-md transition flex gap-3"
                >
                  <span className="text-2xl flex-shrink-0" aria-hidden="true">{a.icon}</span>
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-sm mb-0.5">{a.title}</h3>
                    <p className="text-xs font-semibold text-[#1E40AF] mb-1.5">{a.org}</p>
                    <p className="text-sm text-[#64748B] leading-relaxed">{a.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-12 md:py-16 px-5 md:px-10 lg:px-20" style={{ scrollMarginTop: '64px' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={containerVariants}>
            <SectionLabel number="05" />
            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-extrabold text-[#0F172A] mb-7">
              What I Bring <span className="text-[#1E40AF]">to Your Team</span>
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Bio */}
              <motion.div variants={itemVariants}>
                <p className="text-[#475569] leading-relaxed text-sm md:text-base mb-5">
                  CS Junior at SMSU (3.7 GPA, May 2027). I build and ship full-stack products end-to-end — Spring Boot APIs, React frontends, PostgreSQL databases, and Gemini AI integrations, all in production. I have delivered under real pressure: a hackathon win, a live disaster response platform active during the 2026 Nepal floods, and a deployed health app with real users.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="https://github.com/rayamajhianirudra-droid" target="_blank" rel="noreferrer" aria-label="GitHub profile" className="flex items-center gap-1.5 text-sm font-medium text-[#64748B] hover:text-[#1E40AF] transition">
                    <GithubIcon size={15} /> GitHub
                  </a>
                  <a href="https://linkedin.com/in/ajrayamajhi" target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="flex items-center gap-1.5 text-sm font-medium text-[#64748B] hover:text-[#1E40AF] transition">
                    <LinkedInIcon size={15} /> LinkedIn
                  </a>
                  <a href="mailto:rayamajhianirudra@gmail.com" aria-label="Send email" className="flex items-center gap-1.5 text-sm font-medium text-[#64748B] hover:text-[#1E40AF] transition">
                    <EmailIcon size={15} /> Email
                  </a>
                </div>
              </motion.div>

              {/* Value cards */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: '🚀', title: 'Ships to Production', desc: '3 live apps on real domains — not just repos.' },
                  { icon: '🤖', title: 'AI Integration', desc: 'Gemini AI in production across 2 apps. Agentic API patterns.' },
                  { icon: '🔧', title: 'Full Stack Depth', desc: 'Spring Boot + React + PostgreSQL, backend to frontend.' },
                  { icon: '⚡', title: 'Proven Under Pressure', desc: '3rd place, Google Cloud Hackathon. Working product in hours.' },
                ].map((card) => (
                  <div key={card.title} className="bg-white border border-slate-100 rounded-xl p-4 hover:border-[#1E40AF]/25 transition shadow-sm flex gap-3">
                    <span className="text-lg flex-shrink-0" aria-hidden="true">{card.icon}</span>
                    <div>
                      <h4 className="font-bold text-[#0F172A] text-xs mb-1">{card.title}</h4>
                      <p className="text-xs text-[#64748B] leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Journey */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">Journey:</span>
              {[
                { flag: 'https://flagcdn.com/w40/np.png', country: 'Nepal', label: 'Origin' },
                { flag: 'https://flagcdn.com/w40/us.png', country: 'Texas', label: '2021' },
                { flag: 'https://flagcdn.com/w40/us.png', country: 'Minnesota', label: '2024–Present' },
              ].map((j) => (
                <div key={j.label} className="flex items-center gap-1.5 bg-white border border-slate-100 rounded-full px-3 py-1 shadow-sm">
                  <img src={j.flag} alt={j.country} className="w-4 h-3 object-cover rounded-sm" width="16" height="12" />
                  <span className="text-xs font-medium text-[#475569]">{j.country}</span>
                  <span className="text-xs text-[#94A3B8]">{j.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-12 md:py-16 px-5 md:px-10 lg:px-20 bg-[#F8FAFF]" style={{ scrollMarginTop: '64px' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={containerVariants}>
            <SectionLabel number="06" />
            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-extrabold text-[#0F172A] mb-2">
              Let's <span className="text-[#1E40AF]">Connect</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-[#64748B] mb-7 text-sm md:text-base max-w-md">
              Open to Summer 2027 internships, part-time roles, and interesting projects.
            </motion.p>

            <motion.div variants={itemVariants} className="bg-white border border-[#BFDBFE] rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="flex-1 space-y-4 w-full">
                  {[
                    { icon: <EmailIcon size={17} />, label: 'Email', value: 'rayamajhianirudra@gmail.com', href: 'mailto:rayamajhianirudra@gmail.com' },
                    { icon: <LinkedInIcon size={17} />, label: 'LinkedIn', value: 'linkedin.com/in/ajrayamajhi', href: 'https://linkedin.com/in/ajrayamajhi' },
                    { icon: <GithubIcon size={17} />, label: 'GitHub', value: 'github.com/rayamajhianirudra-droid', href: 'https://github.com/rayamajhianirudra-droid' },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noreferrer"
                      className="flex items-center gap-3 text-[#1E40AF] hover:text-[#1e3a8a] transition group"
                    >
                      <span className="p-2 bg-[#EFF6FF] rounded-lg border border-[#BFDBFE] group-hover:border-[#1E40AF]/40 transition flex-shrink-0">
                        {item.icon}
                      </span>
                      <div>
                        <div className="text-xs text-[#64748B] font-medium">{item.label}</div>
                        <div className="text-sm font-semibold break-all">{item.value}</div>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="flex-shrink-0 text-center md:text-left">
                  <div className="text-5xl font-extrabold text-[#1E40AF]/10 leading-none mb-1" aria-hidden="true">2027</div>
                  <p className="text-sm text-[#1E40AF] font-semibold">Available for</p>
                  <p className="text-sm text-[#1E40AF] font-semibold mb-4">Summer Internships</p>
                  <a
                    href="mailto:rayamajhianirudra@gmail.com"
                    className="inline-block bg-[#1E40AF] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#1e3a8a] transition text-sm"
                  >
                    Send a Message →
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-6 px-5 border-t border-[#E2E8F0] text-center">
        <p className="text-xs text-[#94A3B8]">
          Built by <span className="text-[#1E40AF] font-semibold">AJ Rayamajhi</span> · React + Tailwind · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

/* ─── SectionLabel helper ────────────────────────────────────────────────── */
function SectionLabel({ number }) {
  return (
    <motion.div variants={itemVariants} className="flex items-center gap-3 mb-2">
      <span className="text-xs font-bold tracking-widest text-[#1E40AF]/50 uppercase" aria-hidden="true">{number}</span>
      <div className="h-px flex-1 bg-[#E2E8F0]" aria-hidden="true" />
    </motion.div>
  );
}
