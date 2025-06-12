"use client";
import Head from "next/head";
import { useState, useEffect } from "react";
import AnimatedNetBackground from "./components/AnimatedNetBackground";
import Header from "./components/Header";
import HomeSection from "./components/HomeSection";
import WorkSection from "./components/WorkSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  
  // Smooth scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(id);
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'work', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
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
    <div className="relative min-h-screen overflow-hidden">
      <Header scrollToSection={scrollToSection} activeSection={activeSection} />
      <AnimatedNetBackground />
      <HomeSection scrollToSection={scrollToSection} />
      <WorkSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}