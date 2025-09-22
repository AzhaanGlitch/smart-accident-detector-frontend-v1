import React, { useState, createContext, useContext } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import Team from "./pages/Team";

// Theme Context
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`App ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
        <BrowserRouter>
          <div className="app-container">
            <Sidebar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/features" element={<Features />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;