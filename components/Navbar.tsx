import React from 'react';

interface NavbarProps {
    darkMode: boolean;
    toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleTheme }) => {
    return (
        <nav className="fixed top-0 w-full z-50 glass-card border-b border-gray-200 dark:border-white/5 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <span className="font-display font-bold text-lg tracking-tight text-gray-900 dark:text-white">
                    RM<span className="text-primary">.</span>
                </span>
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition text-gray-600 dark:text-gray-300"
                        aria-label="Toggle Dark Mode"
                    >
                        <span className="material-symbols-rounded text-xl block">
                            {darkMode ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>
                </div>
            </div>
        </nav>
    );
};