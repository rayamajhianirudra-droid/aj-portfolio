import React from 'react';
import { motion } from 'framer-motion';
import ajPhoto from './aj.jpg';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-[#080810] text-[#F1F5F9]">

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 px-8 py-5 flex justify-between items-center backdrop-blur-sm border-b border-white/5">
        <span className="text-[#6366F1] font-bold text-xl">AJ</span>
        <div className="flex gap-8 text-sm text-gray-400">
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#projects" className="hover:text-white transition">Projects</a>
          <a href="#experience" className="hover:text-white transition">Experience</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-8 md:px-24 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#6366F1] text-sm font-semibold tracking-widest uppercase mb-4">Full Stack Developer</p>
          <h1 className="text-6xl md:text-8xl font-black leading-none mb-6">
            Anirudra<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#A855F7]">Rayamajhi</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-xl mb-10 leading-relaxed">
            Building real products that solve real problems. Full stack engineer, entrepreneur, and relentless builder.
          </p>
          <div className="flex gap-4">
            <a href="#projects" className="bg-[#6366F1] hover:bg-[#5558DD] text-white px-8 py-3 rounded-lg font-semibold transition">
              View Work
            </a>
            <a href="#contact" className="border border-white/20 hover:border-white/50 text-white px-8 py-3 rounded-lg font-semibold transition">
              Contact Me
            </a>
          </div>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="py-32 px-8 md:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-16 items-center"
        >
          <div className="w-full md:w-1/3">
            <img
              src={ajPhoto}
              alt="AJ Rayamajhi"
              className="rounded-2xl w-full max-w-sm mx-auto object-cover shadow-2xl shadow-[#6366F1]/20"
            />
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-[#6366F1] text-sm font-semibold tracking-widest uppercase mb-4">About Me</p>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Nepal → Texas → Minnesota.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#A855F7]">Always Building.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              I'm AJ — a Computer Science student at SMSU with a 3.7 GPA, full stack developer, and co-founder of Codyza. I've worked in investment banking in Kathmandu, built AI-powered health platforms, and founded a clothing brand — all before graduation.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              I speak English, Nepali, and basic Spanish. I play chess, basketball, and pool. I lift with a structured plan and explore every city I land in. I'm not here to be average.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Java', 'Python', 'React', 'Spring Boot', 'PostgreSQL', 'Gemini AI', 'Git'].map((skill) => (
                <span key={skill} className="bg-[#1E293B] text-[#6366F1] px-4 py-2 rounded-lg text-sm font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-32 px-8 md:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-[#6366F1] text-sm font-semibold tracking-widest uppercase mb-4">My Work</p>
          <h2 className="text-4xl md:text-5xl font-black mb-16">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#A855F7]">Projects</span></h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* LifeOS */}
            <div className="bg-[#0F1120] border border-white/5 rounded-2xl p-8 hover:border-[#6366F1]/50 transition group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[#6366F1] text-xs font-semibold tracking-widest uppercase">Full Stack · AI</span>
                <a href="https://github.com/rayamajhianirudra-droid/lifeos-fullstack" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition text-sm">GitHub →</a>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-[#6366F1] transition">LifeOS Health</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">AI-powered nutrition platform with Spring Boot REST API, React frontend, and PostgreSQL. Integrates USDA FoodData for 600,000+ foods and Google Gemini AI for personalized health insights.</p>
              <div className="flex flex-wrap gap-2">
                {['Spring Boot', 'React', 'PostgreSQL', 'Gemini AI', 'USDA API'].map(tag => (
                  <span key={tag} className="bg-[#1E293B] text-gray-400 px-3 py-1 rounded-md text-xs">{tag}</span>
                ))}
              </div>
            </div>

            {/* Tax Calculator */}
            <div className="bg-[#0F1120] border border-white/5 rounded-2xl p-8 hover:border-[#6366F1]/50 transition group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[#6366F1] text-xs font-semibold tracking-widest uppercase">Desktop App</span>
                <a href="https://github.com/rayamajhianirudra-droid" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition text-sm">GitHub →</a>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-[#6366F1] transition">US Tax Calculator</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">Desktop application for calculating US federal and state taxes with real-time bracket computation, deduction analysis, and clean visual breakdowns.</p>
              <div className="flex flex-wrap gap-2">
                {['Java', 'JavaFX', 'OOP'].map(tag => (
                  <span key={tag} className="bg-[#1E293B] text-gray-400 px-3 py-1 rounded-md text-xs">{tag}</span>
                ))}
              </div>
            </div>

            {/* Codyza */}
            <div className="bg-[#0F1120] border border-white/5 rounded-2xl p-8 hover:border-[#6366F1]/50 transition group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[#6366F1] text-xs font-semibold tracking-widest uppercase">Co-Founder</span>
                <a href="https://codyza.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition text-sm">Live →</a>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-[#6366F1] transition">Codyza</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">Co-founded a web development agency delivering custom websites and digital solutions for clients. Built and shipped real products for real businesses.</p>
              <div className="flex flex-wrap gap-2">
                {['React', 'Web Dev', 'Entrepreneurship'].map(tag => (
                  <span key={tag} className="bg-[#1E293B] text-gray-400 px-3 py-1 rounded-md text-xs">{tag}</span>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-32 px-8 md:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-[#6366F1] text-sm font-semibold tracking-widest uppercase mb-4">Background</p>
          <h2 className="text-4xl md:text-5xl font-black mb-16">Experience & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#A855F7]">Education</span></h2>

          <div className="flex flex-col gap-6">
            {[
              { role: 'Co-Founder', company: 'Codyza', period: '2024 – Present', desc: 'Building a web development agency delivering custom websites and digital solutions.' },
              { role: 'Founder', company: 'Rastahh Clothing Brand', period: '2024 – 2025', desc: 'Founded and managed a startup clothing brand — branding, product development, and customer engagement.' },
              { role: 'Investment Banking Analyst', company: 'Laxmi Sunrise Bank', period: '2022 – 2023', desc: 'Performed fundamental and technical analysis of equities; prepared investment reports for senior analysts.' },
              { role: 'B.S. Computer Science', company: 'Southwest Minnesota State University', period: 'Expected May 2027', desc: 'GPA: 3.7 CS Core. Relevant coursework: OOP (A), Computer Architecture (A), Data Science (A-).' },
            ].map((item) => (
              <div key={item.role} className="bg-[#0F1120] border border-white/5 rounded-2xl p-8 hover:border-[#6366F1]/50 transition">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{item.role}</h3>
                  <span className="text-gray-500 text-sm">{item.period}</span>
                </div>
                <p className="text-[#6366F1] text-sm font-semibold mb-3">{item.company}</p>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-8 md:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-[#6366F1] text-sm font-semibold tracking-widest uppercase mb-4">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-black mb-6">Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#A855F7]">Inevitable.</span></h2>
          <p className="text-gray-400 text-lg mb-10">Open to internships, collaborations, and conversations with people who build real things.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="mailto:rayamajhi.anirudra@gmail.com" className="bg-[#6366F1] hover:bg-[#5558DD] text-white px-8 py-3 rounded-lg font-semibold transition">
              Email Me
            </a>
            <a href="https://linkedin.com/in/anirudra-rayamajhi-bb48b83b4" target="_blank" rel="noreferrer" className="border border-white/20 hover:border-white/50 text-white px-8 py-3 rounded-lg font-semibold transition">
              LinkedIn
            </a>
            <a href="https://github.com/rayamajhianirudra-droid" target="_blank" rel="noreferrer" className="border border-white/20 hover:border-white/50 text-white px-8 py-3 rounded-lg font-semibold transition">
              GitHub
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-white/5 text-center text-gray-500 text-sm">
        Built by AJ Rayamajhi — Inevitable.
      </footer>

    </div>
  );
}

export default App;