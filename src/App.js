import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ajPhoto from './aj.jpg';
import './App.css';

// Typing effect hook
function useTypingEffect(words) {
  const [currentWord, setCurrentWord] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const word = words[currentWord];
      if (!isDeleting) {
        setCurrentText(word.substring(0, currentText.length + 1));
        if (currentText === word) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
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

// Stagger container variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  const typedText = useTypingEffect([
    'Full Stack Developer.',
    'Entrepreneur.',
    'Relentless Builder.',
    'Inevitable.'
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      const sections = ['about', 'projects', 'experience', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#080810] text-[#F1F5F9]">

      {/* Gradient Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#6366F1] to-[#A855F7] z-[100] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 px-8 py-5 flex justify-between items-center backdrop-blur-sm border-b border-white/5">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#6366F1] font-bold text-xl"
        >
          AJ
        </motion.span>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex gap-8 text-sm"
        >
          {['about', 'projects', 'experience', 'contact'].map((section) => (
            
              key={section}
              href={`#${section}`}
              className={`capitalize transition ${
                activeSection === section
                  ? 'text-white font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {section}
            </a>
          ))}
        </motion.div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-8 md:px-24 pt-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="text-[#6366F1] text-sm font-semibold tracking-widest uppercase mb-4">
            {typedText}<span className="animate-pulse">|</span>
          </motion.p>
          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black leading-none mb-6">
            Anirudra<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#A855F7]">Rayamajhi</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-gray-400 text-xl max-w-xl mb-10 leading-relaxed">
            Building real products that solve real problems. Full stack engineer, entrepreneur, and relentless builder.
          </motion.p>
          <motion.div variants={itemVariants} className="flex gap-4">
            <a href="#projects" className="bg-[#6366F1] hover:bg-[#5558DD] text-white px-8 py-3 rounded-lg font-semibold transition">
              View Work
            </a>
            <a href="#contact" className="border border-white/20 hover:border-white/50 text-white px-8 py-3 rounded-lg font-semibold transition">
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="py-32 px-8 md:px-24 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-16 items-center"
        >
          <motion.div variants={itemVariants} className="w-full md:w-1/3">
            <img
              src={ajPhoto}
              alt="AJ Rayamajhi"
              className="rounded-2xl w-full max-w-sm mx-auto object-cover shadow-2xl shadow-[#6366F1]/20"
            />
          </motion.div>
          <div className="w-full md:w-2/3">
            <motion.p variants={itemVariants} className="text-[#6366F1] text-sm font-semibold tracking-widest uppercase mb-4">About Me</motion.p>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black mb-6">
              Nepal → Texas → Minnesota.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#A855F7]">Always Building.</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-400 text-lg leading-relaxed mb-6">
              I'm AJ — a Computer Science student at SMSU with a 3.7 GPA, full stack developer, and co-founder of Codyza. I've worked in investment banking in Kathmandu, built AI-powered health platforms, and founded a clothing brand — all before graduation.
            </motion.p>
            <motion.p variants={itemVariants} className="text-gray-400 text-lg leading-relaxed mb-8">
              I speak English, Nepali, and basic Spanish. I play chess, basketball, and pool. I lift with a structured plan and explore every city I land in. I'm not here to be average.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              {['Java', 'Python', 'React', 'Spring Boot', 'PostgreSQL', 'Gemini AI', 'Git'].map((skill) => (
                <span key={skill} className="bg-[#1E293B] text-[#6366F1] px-4 py-2 rounded-lg text-sm font-semibold">
                  {skill}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-32 px-8 md:px-24 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p variants={itemVariants} className="text-[#6366F1] text-sm font-semibold tracking-widest uppercase mb-4">My Work</motion.p>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black mb-16">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#A855F7]">Projects</span></motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                tag: 'Full Stack · AI',
                title: 'LifeOS Health',
                desc: 'AI-powered nutrition platform with Spring Boot REST API, React frontend, and PostgreSQL. Integrates USDA FoodData for 600,000+ foods and Google Gemini AI for personalized health insights.',
                tags: ['Spring Boot', 'React', 'PostgreSQL', 'Gemini AI', 'USDA API'],
                link: 'https://github.com/rayamajhianirudra-droid/lifeos-fullstack',
                linkText: 'GitHub →'
              },
              {
                tag: 'Desktop App',
                title: 'US Tax Calculator',
                desc: 'Desktop application for calculating US federal and state taxes with real-time bracket computation, deduction analysis, and clean visual breakdowns.',
                tags: ['Java', 'JavaFX', 'OOP'],
                link: 'https://github.com/rayamajhianirudra-droid',
                linkText: 'GitHub →'
              },
              {
                tag: 'Co-Founder',
                title: 'Codyza',
                desc: 'Co-founded a web development agency delivering custom websites and digital solutions for clients. Built and shipped real products for real businesses.',
                tags: ['React', 'Web Dev', 'Entrepreneurship'],
                link: 'https://codyza.com',
                linkText: 'Live →'
              },
            ].map((project) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className="bg-[#0F1120] border border-white/5 rounded-2xl p-8 hover:border-[#6366F1]/50 transition group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[#6366F1] text-xs font-semibold tracking-widest uppercase">{project.tag}</span>
                  <a href={project.link} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition text-sm">{project.linkText}</a>
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#6366F1] transition">{project.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="bg-[#1E293B] text-gray-400 px-3 py-1 rounded-md text-xs">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-32 px-8 md:px-24 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p variants={itemVariants} className="text-[#6366F1] text-sm font-semibold tracking-widest uppercase mb-4">Background</motion.p>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black mb-16">Experience & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#A855F7]">Education</span></motion.h2>
          <div className="flex flex-col gap-6">
            {[
              { role: 'Co-Founder', company: 'Codyza', period: '2024 – Present', desc: 'Building a web development agency delivering custom websites and digital solutions.' },
              { role: 'Founder', company: 'Rastahh Clothing Brand', period: '2024 – 2025', desc: 'Founded and managed a startup clothing brand — branding, product development, and customer engagement.' },
              { role: 'Investment Banking Analyst', company: 'Laxmi Sunrise Bank', period: '2022 – 2023', desc: 'Performed fundamental and technical analysis of equities; prepared investment reports for senior analysts.' },
              { role: 'B.S. Computer Science', company: 'Southwest Minnesota State University', period: 'Expected May 2027', desc: 'GPA: 3.7 CS Core. Relevant coursework: OOP (A), Computer Architecture (A), Data Science (A-).' },
            ].map((item) => (
              <motion.div
                key={item.role}
                variants={itemVariants}
                className="bg-[#0F1120] border border-white/5 rounded-2xl p-8 hover:border-[#6366F1]/50 transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{item.role}</h3>
                  <span className="text-gray-500 text-sm">{item.period}</span>
                </div>
                <p className="text-[#6366F1] text-sm font-semibold mb-3">{item.company}</p>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-8 md:px-24 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.p variants={itemVariants} className="text-[#6366F1] text-sm font-semibold tracking-widest uppercase mb-4">Get In Touch</motion.p>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black mb-6">
            Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#A855F7]">Inevitable.</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-400 text-lg mb-10">
            Open to internships, collaborations, and conversations with people who build real things.
          </motion.p>
          <motion.div variants={itemVariants} className="flex justify-center gap-4 flex-wrap">
            <a href="mailto:rayamajhi.anirudra@gmail.com" className="bg-[#6366F1] hover:bg-[#5558DD] text-white px-8 py-3 rounded-lg font-semibold transition">
              Email Me
            </a>
            <a href="https://linkedin.com/in/anirudra-rayamajhi-bb48b83b4" target="_blank" rel="noreferrer" className="border border-white/20 hover:border-white/50 text-white px-8 py-3 rounded-lg font-semibold transition">
              LinkedIn
            </a>
            <a href="https://github.com/rayamajhianirudra-droid" target="_blank" rel="noreferrer" className="border border-white/20 hover:border-white/50 text-white px-8 py-3 rounded-lg font-semibold transition">
              GitHub
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-white/5 text-center text-gray-500 text-sm relative z-10">
        Built by AJ Rayamajhi — Inevitable.
      </footer>

    </div>
  );
}

export default App;