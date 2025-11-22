// CoursesV3.6.js
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Layers, Youtube, Share2, X, Search } from "lucide-react";

/**
 * CoursesV3.6 - Final Cinematic Edition
 * - Left/right vertical typewriter columns with continuous vertical motion (slow ~25s loop)
 * - Blue-purple gradient glow pulse for letters
 * - Sharp thumbnails with visible "FinsightAI" watermark overlay
 * - Card click opens slide-in detail panel & auto-scrolls to panel top
 *
 * Requirements:
 * - TailwindCSS
 * - framer-motion
 * - lucide-react
 *
 * Paste as src/dashboard/pages/CoursesV3.6.js
 */

/* ----------------- Dummy course data (25 items) ----------------- */
const COURSES = [
  { id: 1, title: "Stock Market for Beginners (Full Course)", category: "Stock Market", duration: "3.0 hrs", level: "Beginner", status: "Available", vid: "DJlC221Alro" },
  { id: 2, title: "Investing Basics: How to Start Investing", category: "Finance", duration: "2.2 hrs", level: "Beginner", status: "Available", vid: "b0_CsTFjtus" },
  { id: 3, title: "Technical Analysis Crash Course", category: "Stock Market", duration: "4.0 hrs", level: "Intermediate", status: "Available", vid: "g4Nqk3xQn4M" },
  { id: 4, title: "Fundamental Analysis: Company Valuation", category: "Finance", duration: "3.5 hrs", level: "Intermediate", status: "Available", vid: "sNp7R7hKp2Q" },
  { id: 5, title: "AI in Finance: Intro & Applications", category: "AI", duration: "2.8 hrs", level: "Intermediate", status: "Available", vid: "-6jCoXVerPk" },
  { id: 6, title: "Machine Learning for Trading", category: "AI", duration: "5.0 hrs", level: "Advanced", status: "Available", vid: "LpU0UDZe_lI" },
  { id: 7, title: "Portfolio Management Essentials", category: "Finance", duration: "2.5 hrs", level: "Intermediate", status: "Available", vid: "Xb1H2o7kLM4" },
  { id: 8, title: "Options Trading Basics", category: "Stock Market", duration: "3.3 hrs", level: "Intermediate", status: "Available", vid: "o8qQn4uGqjk" },
  { id: 9, title: "Algorithmic Trading with Python", category: "AI", duration: "6.0 hrs", level: "Advanced", status: "Available", vid: "A1b2C3d4E5F" },
  { id:10, title: "Risk Management for Traders", category: "Finance", duration: "1.8 hrs", level: "Beginner", status: "Available", vid: "k9mN2x7ZpQw" },
  { id:11, title: "Candlestick Patterns Explained", category: "Stock Market", duration: "1.5 hrs", level: "Beginner", status: "Available", vid: "z2q8r0aLk9s" },
  { id:12, title: "Quantitative Finance Intro", category: "AI", duration: "4.0 hrs", level: "Advanced", status: "Available", vid: "QFv7T9pH2" },
  { id:13, title: "Personal Finance & Budgeting", category: "Finance", duration: "2.0 hrs", level: "Beginner", status: "Available", vid: "Hf3Jk2LmN0" },
  { id:14, title: "Crypto Fundamentals (Beginner)", category: "Finance", duration: "2.5 hrs", level: "Beginner", status: "Available", vid: "bY2c3D4eF5" },
  { id:15, title: "Backtesting Strategies (Hands-on)", category: "AI", duration: "3.8 hrs", level: "Advanced", status: "Available", vid: "Bt7x9zQw1" },
  { id:16, title: "Trading Psychology & Discipline", category: "Finance", duration: "1.7 hrs", level: "Beginner", status: "Available", vid: "Tg5H1k2Lp" },
  { id:17, title: "Excel for Finance & Modeling", category: "Finance", duration: "3.0 hrs", level: "Intermediate", status: "Available", vid: "ExF4M0d9" },
  { id:18, title: "Reinforcement Learning for Trading", category: "AI", duration: "5.5 hrs", level: "Advanced", status: "Coming Soon", vid: "" },
  { id:19, title: "Elliott Wave Theory Simplified", category: "Stock Market", duration: "2.1 hrs", level: "Intermediate", status: "Available", vid: "EW9z7q" },
  { id:20, title: "Derivatives & Hedging Basics", category: "Finance", duration: "2.6 hrs", level: "Intermediate", status: "Available", vid: "Dh7Pq4" },
  { id:21, title: "Data Visualization for Finance", category: "AI", duration: "2.4 hrs", level: "Intermediate", status: "Available", vid: "DVF5x2" },
  { id:22, title: "Fund Manager Insights (Recorded Webinar)", category: "Finance", duration: "1.9 hrs", level: "Advanced", status: "Available", vid: "FMw9V2" },
  { id:23, title: "Practical Algo Strategies with pandas", category: "AI", duration: "4.1 hrs", level: "Advanced", status: "Available", vid: "ALPq1" },
  { id:24, title: "Sector Rotation Strategy Explained", category: "Stock Market", duration: "1.6 hrs", level: "Intermediate", status: "Available", vid: "SR2x3" },
  { id:25, title: "Tax Planning for Investors (Basics)", category: "Finance", duration: "1.4 hrs", level: "Beginner", status: "Available", vid: "TPb1a" },
];

function ytThumb(id) {
  if (!id) return "https://via.placeholder.com/640x360?text=Coming+Soon";
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}
function ytLink(id) {
  if (!id) return "#";
  return `https://www.youtube.com/watch?v=${id}`;
}

/* ---------- VerticalTypewriterMotion - final version ---------- */
/**
 * Renders a vertical column of letters with:
 *  - per-letter typewriter reveal (top→down)
 *  - once full word typed, pause, fade-out, and restart
 *  - the whole column also animates vertically (y array) for continuous movement
 *
 * props:
 * - letters: array of chars (ex: ['F','i',...])
 * - speed: ms per letter in typing
 * - pause: ms pause after full word
 * - delayStart: initial delay before starting typing
 * - direction: 'down' or 'up' (controls vertical motion array)
 * - loopDuration: total seconds for one vertical loop (recommended ~25)
 */
function VerticalTypewriterMotion({
  letters = [],
  speed = 85,
  pause = 900,
  delayStart = 0,
  direction = "down",
  loopDuration = 25,
}) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [typingFlag, setTypingFlag] = useState(0); // used to restart typing cycles

  useEffect(() => {
    let mounted = true;
    let timers = [];

    const runCycle = () => {
      setVisibleCount(0);
      setOpacity(1);
      setTypingFlag((f) => f + 1);

      // typing interval
      let idx = 0;
      const typeInt = setInterval(() => {
        if (!mounted) return clearInterval(typeInt);
        setVisibleCount(idx);
        idx++;
        if (idx >= letters.length) {
          clearInterval(typeInt);
          // pause then fade
          timers.push(
            setTimeout(() => {
              // fade out
              let step = 1;
              const fadeInt = setInterval(() => {
                if (!mounted) return clearInterval(fadeInt);
                step -= 0.08;
                setOpacity(step < 0 ? 0 : step);
                if (step <= 0) {
                  clearInterval(fadeInt);
                  // small delay then restart typing cycle
                  timers.push(
                    setTimeout(() => {
                      if (!mounted) return;
                      setOpacity(1);
                      runCycle();
                    }, 200)
                  );
                }
              }, 45);
            }, pause)
          );
        }
      }, speed);
      timers.push(typeInt);
    };

    timers.push(setTimeout(runCycle, delayStart));

    return () => {
      mounted = false;
      timers.forEach((t) => clearTimeout(t));
    };
    // eslint-disable-next-line
  }, [letters.join("-"), speed, pause, delayStart, typingFlag]);

  // vertical motion array (y values) for continuous loop
  const travel = 260; // px travel up/down
  const yArr = direction === "down" ? [-travel, travel, -travel] : [travel, -travel, travel];

  // letter glow pulse (CSS) implemented via inline style animation name
  return (
    <motion.div
      animate={{ y: yArr }}
      transition={{ duration: loopDuration, repeat: Infinity, ease: "linear" }}
      style={{ opacity: 1 }}
      className="pointer-events-none flex flex-col items-center justify-start select-none"
    >
      <div style={{ opacity }} className="flex flex-col items-center">
        {letters.map((ch, i) => (
          <div
            key={i}
            className="leading-[0.85] text-[64px] font-extrabold bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg,#60a5fa,#8b5cf6)",
              WebkitBackgroundClip: "text",
              filter: "drop-shadow(0 6px 18px rgba(99,102,241,0.08))",
              opacity: i <= visibleCount ? 1 : 0.0,
              transition: "opacity 0.12s linear",
              // glow pulse using CSS animation
              animation: i <= visibleCount ? "fglow 1.8s ease-in-out infinite" : "none",
            }}
          >
            {ch}
          </div>
        ))}
      </div>

      {/* local CSS for glow pulse */}
      <style>{`
        @keyframes fglow {
          0% { text-shadow: 0 0 2px rgba(96,165,250,0.6), 0 0 12px rgba(139,92,246,0.08); transform: translateZ(0); }
          50% { text-shadow: 0 0 6px rgba(96,165,250,0.9), 0 0 26px rgba(139,92,246,0.18); transform: translateY(-2px); }
          100% { text-shadow: 0 0 2px rgba(96,165,250,0.6), 0 0 12px rgba(139,92,246,0.08); transform: translateZ(0); }
        }
      `}</style>
    </motion.div>
  );
}

/* ---------- heading words ---------- */
const HEADING_WORDS = ["FinsightAI", "Learning", "Hub"];
const VERTICAL_WORD = ["F", "i", "n", "s", "i", "g", "h", "t", "A", "i"];

/* ----------------- main component ----------------- */
export default function CoursesV3_6() {
  const [activeTab, setActiveTab] = useState("All");
  const [query, setQuery] = useState("");
  const [openCourse, setOpenCourse] = useState(null);
  const [typed, setTyped] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const panelRef = useRef(null);

  // heading typewriter (word-by-word)
  useEffect(() => {
    let mounted = true;
    setTyped("");
    setWordIndex(0);
    (async () => {
      for (let i = 0; i < HEADING_WORDS.length && mounted; i++) {
        const word = HEADING_WORDS[i];
        let display = "";
        for (let j = 0; j < word.length && mounted; j++) {
          display += word[j];
          setTyped((prev) => (i === 0 ? display : `${HEADING_WORDS.slice(0, i).join(" ")} ${display}`));
          await new Promise((res) => setTimeout(res, 55));
        }
        await new Promise((res) => setTimeout(res, 260));
        setWordIndex(i);
      }
    })();
    return () => (mounted = false);
  }, []);

  const filtered = useMemo(() => {
    let list = COURSES;
    if (activeTab !== "All") {
      if (activeTab === "Upcoming Courses") list = COURSES.filter((c) => c.status === "Coming Soon");
      else list = COURSES.filter((c) => c.category === activeTab);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((c) => c.title.toLowerCase().includes(q) || (c.vid && ytLink(c.vid).toLowerCase().includes(q)));
    }
    return list;
  }, [activeTab, query]);

  // open panel auto-scroll
  useEffect(() => {
    if (openCourse) {
      setTimeout(() => {
        const el = panelRef.current;
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          el.scrollTop = 0;
        } else {
          window.scrollTo({ top: 300, behavior: "smooth" });
        }
      }, 80);
    }
  }, [openCourse]);

  const longDescription = (course) => {
    if (!course) return "";
    const base = `${course.title} — This course covers ${course.category} topics. Designed for ${course.level} learners. It includes practical examples, step-by-step explanations, and hands-on exercises. `;
    let text = "";
    for (let i = 0; i < 50; i++) {
      text += `${i + 1}. ${base} Additional note: practice daily and build mini projects.\n\n`;
    }
    text += `What you'll learn:\n- Core concepts and foundations\n- Practical implementation examples\n- Tips, best practices and pitfalls to avoid\n- Resources and next steps\n\nSyllabus (high-level):\n`;
    for (let s = 1; s <= 12; s++) {
      text += `${s}. Module ${s}: Detailed topic and hands-on exercise.\n`;
    }
    text += `\nInstructor note: Content curated from public YouTube resources and organized for a structured learning path.`;
    return text;
  };

  const openPanel = (course) => setOpenCourse(course);
  const closePanel = () => setOpenCourse(null);
  const similar = (course) => (course ? COURSES.filter((c) => c.id !== course.id && c.category === course.category).slice(0, 3) : []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#071026] via-[#0b1220] to-[#0f1724] text-slate-100 p-6 md:p-10 overflow-hidden">
      {/* LEFT vertical column - top -> bottom motion */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-[160px] flex items-start justify-center z-10">
        <VerticalTypewriterMotion letters={VERTICAL_WORD} speed={85} pause={900} delayStart={120} direction="down" loopDuration={25} />
      </div>

      {/* RIGHT vertical column - bottom -> top motion (mirrored feel) */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[160px] flex items-start justify-center z-10">
        <VerticalTypewriterMotion letters={VERTICAL_WORD} speed={85} pause={900} delayStart={520} direction="up" loopDuration={27} />
      </div>

      {/* soft orbs for cinematic feel */}
      <motion.div animate={{ x: [0, 28, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-28 -top-20 w-64 h-64 bg-gradient-to-tr from-[#1f6feb] to-[#9b5cf6] rounded-full blur-3xl opacity-14" />
      <motion.div animate={{ x: [0, -28, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute right-[-100px] top-44 w-56 h-56 bg-gradient-to-tr from-[#8b5cf6] to-[#3b82f6] rounded-full blur-3xl opacity-12" />

      <div className="max-w-7xl mx-auto relative z-20">
        {/* HERO */}
        <div className="rounded-2xl p-6 md:p-10 bg-gradient-to-r from-[#041224]/30 to-[#07162b]/30 border border-slate-700/30 backdrop-blur-sm">
          <div className="md:flex md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {HEADING_WORDS.map((w, idx) => {
                  const typedSoFar = typed.trim();
                  const parts = typedSoFar.split(" ");
                  const currentPrinted = idx < parts.length ? parts[idx] : idx === wordIndex ? (parts[parts.length - 1] || "") : "";
                  const cls =
                    idx === 0 ? "bg-gradient-to-r from-[#60a5fa] to-[#8b5cf6] bg-clip-text text-transparent" :
                    idx === 1 ? "bg-gradient-to-r from-[#8b5cf6] to-[#60a5fa] bg-clip-text text-transparent" :
                    "bg-gradient-to-r from-[#34d399] to-[#60a5fa] bg-clip-text text-transparent";
                  return <span key={w} className={`inline-block mr-3 ${cls}`}>{currentPrinted || (idx < wordIndex ? w : "")}</span>;
                })}
              </h1>
              <p className="mt-3 text-slate-300 max-w-2xl">Empower your future with AI & Finance — interactive courses, curated YouTube content and practical learning.</p>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center bg-slate-800/50 border border-slate-700 rounded px-3 py-2 gap-2">
                  <Search className="w-4 h-4 text-slate-300" />
                  <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search courses or keywords..." className="bg-transparent outline-none text-slate-200 placeholder:text-slate-400 text-sm w-64" />
                </div>
                <div className="text-xs text-slate-400">Try: "AI", "Stock", "Finance"</div>
              </div>
            </div>

            <div className="mt-6 md:mt-0 flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-slate-400">Total Courses</div>
                <div className="text-2xl font-semibold">{COURSES.length}</div>
              </div>
              <button onClick={() => document.getElementById("courses-grid")?.scrollIntoView({ behavior: "smooth", block: "start" })} className="px-4 py-2 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:from-[#60a5fa] hover:to-[#a78bfa] transition">Explore Courses</button>
            </div>
          </div>
        </div>

        {/* filters */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {["All", "Finance", "AI", "Stock Market", "Upcoming Courses"].map((t) => {
            const active = activeTab === t;
            return (
              <button key={t} onClick={() => setActiveTab(t)} className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all ${active ? "bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white shadow-lg" : "bg-slate-800/50 text-slate-300 hover:bg-slate-800/70"}`}>
                {t}
              </button>
            );
          })}
        </div>

        {/* main layout */}
        <div className="mt-8 flex gap-6">
          {/* grid */}
          <div id="courses-grid" className={`grid ${openCourse ? "lg:grid-cols-2" : "lg:grid-cols-3"} grid-cols-1 gap-5 flex-1 transition-all duration-300`} style={{ filter: openCourse ? "blur(0.6px) saturate(0.98)" : "none" }}>
            {filtered.map((c) => (
              <motion.div layout key={c.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.995 }} onClick={() => openPanel(c)} className="relative rounded-xl bg-gradient-to-br from-[#071026]/45 to-[#071026]/30 border border-slate-700/40 overflow-hidden cursor-pointer">
                <div className="flex items-center gap-3 p-3">
                  <div className="relative w-28 h-20 flex-shrink-0 rounded-md overflow-hidden">
                    <img src={ytThumb(c.vid)} alt={c.title} className="w-full h-full object-cover" />
                    {/* visible watermark overlay (semi-solid) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-[16px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#60a5fa] to-[#8b5cf6]" style={{ opacity: 0.92 }}>
                        FinsightAI
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-white line-clamp-2">{c.title}</h4>
                      <div className="text-xs text-slate-400">{c.duration}</div>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{c.level} • {c.category}</p>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded ${c.status === "Coming Soon" ? "bg-yellow-400 text-slate-900" : "bg-slate-800/40 text-slate-300"}`}>{c.status}</span>
                        <button onClick={(e) => { e.stopPropagation(); navigator.clipboard?.writeText(ytLink(c.vid)); alert("Link copied"); }} className="text-xs text-slate-300 bg-slate-800/40 px-2 py-1 rounded">Copy Link</button>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0b1220] to-[#071026] border border-slate-700 flex items-center justify-center text-xs text-slate-300">{c.id}</div>
                    </div>
                  </div>
                </div>
                <div className={`h-1 ${c.category === "AI" ? "bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6]" : c.category === "Finance" ? "bg-gradient-to-r from-[#f97316] to-[#fb7185]" : "bg-gradient-to-r from-[#60a5fa] to-[#34d399]"} w-full`} />
              </motion.div>
            ))}
            {filtered.length === 0 && <div className="col-span-full text-center text-slate-400 py-10">No courses match your search.</div>}
          </div>

          {/* right panel */}
          <motion.div id="course-detail-panel" ref={panelRef} initial={{ x: 300, opacity: 0 }} animate={openCourse ? { x: 0, opacity: 1 } : { x: 300, opacity: 0 }} transition={{ type: "spring", stiffness: 240, damping: 28 }} className={`w-full lg:w-1/3 bg-slate-900/75 border border-slate-700 rounded-xl p-4 overflow-auto`} style={{ display: openCourse ? "block" : "none", maxHeight: "84vh" }}>
            {openCourse && (
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{openCourse.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{openCourse.level} • {openCourse.category} • {openCourse.duration}</p>
                  </div>
                  <button onClick={closePanel} className="text-slate-300 hover:text-white"><X /></button>
                </div>

                <img src={ytThumb(openCourse.vid)} alt={openCourse.title} className="w-full h-40 object-cover rounded-md mt-4" />

                <div className="mt-4 text-sm text-slate-300 whitespace-pre-line leading-relaxed" style={{ maxHeight: "54vh", overflow: "auto", paddingRight: 8 }}>
                  {longDescription(openCourse)}
                </div>

                <div className="mt-4 flex gap-3">
                  <a href={ytLink(openCourse.vid)} target="_blank" rel="noreferrer" className={`flex-1 py-2 rounded-md text-center font-medium ${openCourse.status === "Coming Soon" ? "bg-slate-700 text-slate-300 cursor-not-allowed" : "bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white"}`}>
                    <Youtube className="inline-block w-4 h-4 mr-2 -mt-0.5" /> Watch Now
                  </a>
                  <button onClick={() => { navigator.clipboard?.writeText(ytLink(openCourse.vid)); alert("Link copied to clipboard"); }} className="px-3 py-2 rounded-md bg-slate-800/60 border border-slate-700 text-slate-300">Share</button>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm text-slate-300 font-semibold mb-2">Similar Courses</h4>
                  <div className="space-y-2">
                    {similar(openCourse).map((s) => (
                      <div key={s.id} className="flex items-center justify-between p-2 bg-slate-800/40 rounded">
                        <div>
                          <div className="text-sm font-medium">{s.title}</div>
                          <div className="text-xs text-slate-400">{s.level} • {s.duration}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <a href={ytLink(s.vid)} target="_blank" rel="noreferrer" className="text-xs bg-blue-600 px-2 py-1 rounded text-white">Open</a>
                        </div>
                      </div>
                    ))}
                    {similar(openCourse).length === 0 && <div className="text-xs text-slate-400">No similar courses found.</div>}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-lg p-6 bg-gradient-to-r from-[#041224]/25 to-[#07162b]/25 border border-slate-700/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Want more courses & community access?</h3>
            <p className="text-slate-300 mt-1">Join the FinsightAI community for updates, resources and live webinars.</p>
          </div>
          <div>
            <button className="px-5 py-2 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:from-[#60a5fa] hover:to-[#a78bfa]">Join Community</button>
          </div>
        </div>
      </div>
    </div>
  );
}
