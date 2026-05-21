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

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [cursorRing, setCursorRing] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);

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
      setTimeout(() => setCursorRing({ x: e.clientX, y: e.clientY }), 80);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navLinks = ['about', 'skills', 'projects', 'experience', 'achievements', 'contact'];

  const skills = [
    { category: 'Languages', icon: '</>', items: ['Java', 'Python', 'JavaScript', 'SQL'], large: true },
    { category: 'Frameworks', icon: '⚡', items: ['React', 'Spring Boot', 'Tailwind CSS'], large: false },
    { category: 'Databases', icon: '🗄', items: ['PostgreSQL', 'MySQL'], large: false },
    { category: 'AI & APIs', icon: '🤖', items: ['Gemini AI', 'USDA API', 'REST APIs'], large: false },
    { category: 'Tools', icon: '🛠', items: ['Git', 'GitHub', 'VS Code', 'IntelliJ', 'Vercel'], large: true },
    { category: 'Human Languages', icon: '🌍', items: ['English', 'Nepali', 'Spanish (basic)'], large: false },
  ];

  const projects = [
    {
      title: 'LifeOS Health',
      subtitle: 'AI-Powered Nutrition Platform',
      desc: 'Full stack platform with Spring Boot REST API, React frontend, and PostgreSQL. Integrates USDA FoodData for 600,000+ foods and Google Gemini AI for personalized health insights.',
      tags: ['Spring Boot', 'React', 'PostgreSQL', 'Gemini AI'],
      link: 'https://github.com/rayamajhianirudra-droid/lifeos-fullstack',
      preview: 'project-preview-lifeos',
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
      subtitle: 'Web Development Agency',
      desc: 'Co-founded a web development agency delivering custom websites and digital solutions. Built and shipped real products for real businesses.',
      tags: ['React', 'Vercel', 'Web Dev'],
      link: 'https://codyza.com',
      preview: 'project-preview-codyza',
    },
  ];

  const achievements = [
    { icon: '🏦', title: 'Investment Banking Analyst', org: 'Laxmi Sunrise Bank', desc: 'Equity analysis and investment reports in Kathmandu.' },
    { icon: '👕', title: 'Founder', org: 'Rastahh Clothing Brand', desc: 'Built and managed a clothing startup from brand to product.' },
    { icon: '🎓', title: '3.7 GPA', org: 'Southwest Minnesota State University', desc: 'OOP (A), Computer Architecture (A), Data Science (A-).' },
    { icon: '🌍', title: 'Nepal to the USA', org: 'International Journey', desc: 'Built a life and career across continents through discipline.' },
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-[#080810] text-[#F1F5F9]">
      <div className="cursor-dot" style={{ left: cursor.x, top: cursor.y }} />
      <div className="cursor-ring" style={{ left: cursorRing.x, top: cursorRing.y }} />
      <div className="dot-grid" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#A855F7] z-[100]" style={{ width: scrollProgress + '%' }} />

      <div className="social-sidebar hidden md:flex">
        <a href="https://linkedin.com/in/anirudra-rayamajhi-bb48b83b4" target="_blank" rel="noreferrer" className="social-link">in</a>
        <a href="https://github.com/rayamajhianirudra-droid" target="_blank" rel="noreferrer" className="social-link">gh</a>
        <a href="mailto:rayamajhi.anirudra@gmail.com" className="social-link">@</a>
        <a href="https://codyza.com" target="_blank" rel="noreferrer" className="social-link">c</a>
      </div>

      <nav className="fixed top-0 w-full z-50 px-8 py-4 flex justify-between items-center backdrop-blur-sm border-b border-white/5">
        <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="text-[#6366F1] font-bold text-xl">AJ</motion.span>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="hidden md:flex gap-6 text-sm">
          {navLinks.map((section) => (
            <a key={section} href={"#" + section} className={activeSection === section ? 'capitalize transition text-white font-semibold' : 'capitalize transition text-gray-400 hover:text-white'}>
              {section}
            </a>
          ))}
        </motion.div>
        <button className="md:hidden flex flex-col gap-1.5 z-50 relative" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="fixed top-0 left-0 w-full h-screen bg-[#080810] z-40 flex flex-col justify-center items-center gap-10">
            {navLinks.map((section) => (
              <a key={section} href={"#" + section} onClick={() => setMenuOpen(false)} className="capitalize text-3xl font-bold text-white hover:text-[#6366F1] transition">{section}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <section className="min-h-screen flex items-center px-8 md:px-24 pt-20 relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col md:flex-row items-center justify-between w-full gap-16">
          <div className="flex-1">
            <motion.div variants={itemVariants} className="badge">
              <span className="badge-dot" />
              CO-FOUNDER OF CODYZA
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black leading-none mb-4">
              Anirudra<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#A855F7]">Rayamajhi</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-[#6366F1] text-lg font-semibold mb-4 h-7">
              {typedText}<span className="animate-pulse">|</span>
            </motion.p>
            <motion.p variants={itemVariants} className="text-gray-400 text-lg max-w-lg mb-8 leading-relaxed">
              Building real products that solve real problems. Nepal to Texas to Minnesota — always moving, always building.
            </motion.p>
            <motion.div variants={itemVariants} className="flex gap-6 mb-10">
              {[{ value: '3+', label: 'Projects' }, { value: '3.7', label: 'GPA' }, { value: '2+', label: 'Companies' }].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-black text-white">{s.value}</div>
                  <div className="text-gray-500 text-xs uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </motion.div>
            <motion.div variants={itemVariants} className="flex gap-4 flex-wrap">
              <a href="#projects" className="bg-[#6366F1] hover:bg-[#5558DD] text-white px-8 py-3 rounded-lg font-semibold transition">View Work</a>
              <a href="#contact" className="border border-white/20 hover:border-white/50 text-white px-8 py-3 rounded-lg font-semibold transition">Contact Me</a>
              <a href="/AJ_Rayamajhi_Resume.pdf" download className="border border-[#6366F1]/50 hover:border-[#6366F1] text-[#6366F1] px-8 py-3 rounded-lg font-semibold transition">Download CV</a>
            </motion.div>
            <motion.div variants={itemVariants} className="mt-16 scroll-indicator">
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

      <section id="about" className="py-32 px-8 md:px-24 relative z-10">
        <div className="relative">
          <span className="section-number">01</span>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.p variants={itemVariants} className="text-[#6366F1] text-sm font-semibold tracking-widest uppercase mb-4">About Me</motion.p>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-black mb-12">
              The Story<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#A855F7]">Behind the Builder.</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <motion.div variants={itemVariants}>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  I am AJ, a Computer Science student at SMSU with a 3.7 GPA, full stack developer, and co-founder of Codyza. I have worked in investment banking in Kathmandu, built AI-powered health platforms, and founded a clothing brand, all before graduation.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  I speak English, Nepali, and basic Spanish. I play chess, basketball, and pool. I lift with a structured plan and explore every city I land in. I am not here to be average.
                </p>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col gap-4">
                {[
                  { flag: '🇳🇵', country: 'Nepal', label: 'Origin', desc: 'Where the drive was born.' },
                  { flag: '🇺🇸', country: 'Texas', label: '2023', desc: 'First steps in America.' },
                  { flag: '🇺🇸', country: 'Minnesota', label: '2024 — Present', desc: 'Building at SMSU and beyond.' },
                ].map((item) => (
                  <div key={item.country} className="bg-[#0F1120] border border-white/5 rounded-2xl p-5 hover:border-[#6366F1]/30 transition flex items-center gap-5">
                    <span className="text-3xl">{item.flag}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-white">{item.country}</span>
                        <span className="text-[#6366F1] text-xs font-semibold">{item.label}</span>
                      </div>
                      <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="py-32 px-8 md:px-24 relative z-10">
        <div className="relative">
          <span className="section-number">02</span>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.p variants={itemVariants} className="text-[#6366F1] text-sm font-semibold tracking-widest uppercase mb-4">Technical Skills</motion.p>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-black mb-12">
              What I<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#A855F7]">Work With.</span>
            </motion.h2>
            <motion.div variants={itemVariants} className="bento-grid">
              {skills.map((skill) => (
                <div key={skill.category} className={`bento-card ${skill.large ? 'large' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="font-bold text-white">{skill.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span key={item} className="bg-[#1E293B] text-gray-400 px-3 py-1.5 rounded-lg text-sm">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="projects" className="py-32 px-8 md:px-24 relative z-10">
        <div className="relative">
          <span className="section-number">03</span>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.p variants={itemVariants} className="text-[#6366F1] text-sm font-semibold tracking-widest uppercase mb-4">My Work</motion.p>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-black mb-12">
              Featured<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#A855F7]">Projects.</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project) => (
                <motion.div key={project.title} variants={itemVariants} className="bg-[#0F1120] border border-white/5 rounded-2xl overflow-hidden hover:border-[#6366F1]/40 transition group">
                  <div className={`project-preview ${project.preview}`}>
                    <span className="text-3xl font-black text-white opacity-20 group-hover:opacity-40 transition">{project.title}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold group-hover:text-[#6366F1] transition">{project.title}</h3>
                      <a href={project.link} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition text-sm">↗</a>
                    </div>
                    <p className="text-[#6366F1] text-xs font-semibold mb-3">{project.subtitle}</p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="bg-[#1E293B] text-gray-400 px-2.5 py-1 rounded-md text-xs">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="experience" className="py-32 px-8 md:px-24 relative z-10">
        <div className="relative">
          <span className="section-number">04</span>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.p variants={itemVariants} className="text-[#6366F1] text-sm font-semibold tracking-widest uppercase mb-4">Background</motion.p>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-black mb-16">
              Experience &<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#A855F7]">Education.</span>
            </motion.h2>
            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#6366F1]/30 to-transparent" />
              <div className="flex flex-col gap-8">
                {[
                  { role: 'Co-Founder', company: 'Codyza', period: '2024 — Present', desc: 'Building a web development agency delivering custom websites and digital solutions.', side: 'left' },
                  { role: 'Founder', company: 'Rastahh Clothing Brand', period: '2024 — 2025', desc: 'Founded and managed a startup clothing brand from branding to customer engagement.', side: 'right' },
                  { role: 'Investment Banking Analyst', company: 'Laxmi Sunrise Bank', period: '2022 — 2023', desc: 'Equity analysis and investment reports for senior analysts in Kathmandu.', side: 'left' },
                  { role: 'B.S. Computer Science', company: 'Southwest Minnesota State University', period: 'Expected May 2027', desc: 'GPA: 3.7. OOP (A), Computer Architecture (A), Data Science (A-).', side: 'right' },
                ].map((item) => (
                  <motion.div key={item.role} variants={itemVariants} className={`md:w-5/12 ${item.side === 'right' ? 'md:ml-auto' : ''}`}>
                    <div className="bg-[#0F1120] border border-white/5 rounded-2xl p-6 hover:border-[#6366F1]/40 transition">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold">{item.role}</h3>
                        <span className="text-gray-500 text-xs">{item.period}</span>
                      </div>
                      <p className="text-[#6366F1] text-sm font-semibold mb-2">{item.company}</p>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="achievements" className="py-32 px-8 md:px-24 relative z-10">
        <div className="relative">
          <span className="section-number">05</span>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.p variants={itemVariants} className="text-[#6366F1] text-sm font-semibold tracking-widest uppercase mb-4">Highlights</motion.p>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-black mb-12">
              Beyond<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#A855F7]">The Code.</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((a) => (
                <motion.div key={a.title} variants={itemVariants} className="bg-[#0F1120] border border-white/5 rounded-2xl p-6 hover:border-[#6366F1]/40 transition flex gap-5">
                  <span className="text-3xl">{a.icon}</span>
                  <div>
                    <h3 className="font-bold text-white mb-1">{a.title}</h3>
                    <p className="text-[#6366F1] text-sm font-semibold mb-2">{a.org}</p>
                    <p className="text-gray-400 text-sm">{a.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-32 px-8 md:px-24 relative z-10">
        <div className="relative">
          <span className="section-number">06</span>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.p variants={itemVariants} className="text-[#6366F1] text-sm font-semibold tracking-widest uppercase mb-4">Get In Touch</motion.p>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-black mb-12">
              Let's Build Something<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#A855F7]">Inevitable.</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <motion.div variants={itemVariants}>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">Open to internships, collaborations, and conversations with people who build real things. Whether you need a portfolio, a business website, or want to collaborate — reach out.</p>
                <div className="flex flex-col gap-4">
                  <a href="mailto:rayamajhi.anirudra@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition">
                    <span className="w-10 h-10 bg-[#0F1120] border border-white/5 rounded-lg flex items-center justify-center text-[#6366F1] font-bold">@</span>
                    rayamajhi.anirudra@gmail.com
                  </a>
                  <a href="https://linkedin.com/in/anirudra-rayamajhi-bb48b83b4" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition">
                    <span className="w-10 h-10 bg-[#0F1120] border border-white/5 rounded-lg flex items-center justify-center text-[#6366F1] font-bold">in</span>
                    LinkedIn
                  </a>
                  <a href="https://github.com/rayamajhianirudra-droid" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition">
                    <span className="w-10 h-10 bg-[#0F1120] border border-white/5 rounded-lg flex items-center justify-center text-[#6366F1] font-bold">gh</span>
                    GitHub
                  </a>
                </div>
              </motion.div>
              <motion.div variants={itemVariants}>
                {formSent ? (
                  <div className="bg-[#0F1120] border border-[#6366F1]/30 rounded-2xl p-8 text-center">
                    <div className="text-4xl mb-4">✅</div>
                    <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400">I will get back to you soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                    <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="contact-input" />
                    <input type="email" placeholder="Your Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required className="contact-input" />
                    <textarea placeholder="Your Message" rows={5} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required className="contact-input resize-none" />
                    <button type="submit" className="bg-[#6366F1] hover:bg-[#5558DD] text-white px-8 py-3 rounded-lg font-semibold transition">Send Message</button>
                  </form>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 px-8 border-t border-white/5 text-center text-gray-500 text-sm relative z-10">
        <p>Built by AJ Rayamajhi — Inevitable.</p>
        <p className="mt-1">© {new Date().getFullYear()} Anirudra Rayamajhi. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;