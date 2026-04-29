import { useEffect, useRef } from "react";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";

export default function Portfolio({ startAnimation }) {
  const glowRef = useRef(null);
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const handleMouse = (e) => {
      // Langsung update DOM — tanpa setState, tanpa re-render
      glow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div
      className="min-h-screen text-white overflow-x-hidden"
      style={{
        backgroundColor: "#080808",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      {/* Cursor Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-0"
        style={{
          left: 0,
          top: 0,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(250, 204, 21, 0.15) 0%, transparent 70%)",
          transform: "translate(-200px, -200px)", // default sebelum mouse masuk
          willChange: "transform",
          transition: "transform 0.1s linear",
        }}
      />

      <Navbar scrollTo={scrollTo} />
      <Hero scrollTo={scrollTo} startAnimation={startAnimation} />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
