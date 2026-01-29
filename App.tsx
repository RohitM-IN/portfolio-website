import React, { useState, useEffect } from 'react';
import { PortfolioData } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Competencies } from './components/Competencies';
import { Experience } from './components/Experience';
import { TechStack } from './components/TechStack';
import { Education } from './components/Education';
import { Projects } from './components/Projects';
import { Footer } from './components/Footer';
import { Drawer } from './components/Drawer';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  useEffect(() => {
    // Initial theme check
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // Fetch data dynamically to avoid module resolution issues with JSON
    fetch('./data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: PortfolioData) => {
        const searchParams = new URLSearchParams(window.location.search);

        // Check for 'oto' query param to override openToWork status
        // ?oto=true -> Open to work
        // ?oto=false -> Not open to work
        const otoParam = searchParams.get('oto');
        if (otoParam !== null) {
          data.profile.openToWork = otoParam === 'true';
        }

        // Check for 'hidden' query param to override project visibility
        // Default behavior: Projects with "hidden": true are not shown.
        // Override: ?hidden=false will show ALL projects, including hidden ones.
        const showAllProjects = searchParams.get('hidden') === 'false';

        if (!showAllProjects) {
          data.projects = data.projects.filter(project => !project.hidden);
        }

        setPortfolioData(data);
      })
      .catch((error) => console.error("Failed to load portfolio data:", error));
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setDarkMode(true);
    }
  };

  if (!portfolioData) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-light dark:bg-background-dark transition-colors duration-300">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} titleName={portfolioData.profile.name} />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-24 sm:py-32 space-y-20">
        <Hero 
            data={portfolioData.profile} 
            onOpenAbout={() => setIsAboutOpen(true)}
        />
        <Competencies data={portfolioData.competencies} />
        <Experience data={portfolioData.experience} />
        <TechStack data={portfolioData.techStack} />
        <Education data={portfolioData.education} />
        <Projects data={portfolioData.projects} />
        <Footer socials={portfolioData.socials} name={portfolioData.profile.name} />
      </main>

      {/* About Me Drawer */}
      <Drawer 
        isOpen={isAboutOpen} 
        onClose={() => setIsAboutOpen(false)} 
        title="About Me"
      >
        {portfolioData.profile.about && portfolioData.profile.about.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
        ))}
        {!portfolioData.profile.about && <p>{portfolioData.profile.bio}</p>}
      </Drawer>
    </>
  );
}

export default App;