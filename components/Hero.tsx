import React, { useEffect, useState } from 'react';
import { Profile } from '../types';
import { RevealOnScroll } from './RevealOnScroll';

interface HeroProps {
    data: Profile;
    onOpenAbout: () => void;
}

// Component to handle number counting animation
const Counter: React.FC<{ end: string, duration?: number }> = ({ end, duration = 800 }) => {
    const [count, setCount] = useState(0);
    
    // Parse the number and suffix from string like "5+" or "8+"
    const numericValue = parseInt(end.replace(/\D/g, '')) || 0;
    const suffix = end.replace(/[0-9]/g, '');

    useEffect(() => {
        let startTime: number | null = null;
        let animationFrameId: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = currentTime - startTime;
            const percentage = Math.min(progress / duration, 1);
            
            // EaseOutExpo function for smooth deceleration
            const ease = (x: number) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
            
            setCount(Math.floor(ease(percentage) * numericValue));

            if (progress < duration) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setCount(numericValue);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [numericValue, duration]);

    return <span>{count}{suffix}</span>;
};

export const Hero: React.FC<HeroProps> = ({ data, onOpenAbout }) => {

    console.log("Note: To render Open To Opportunities Badge add ?oto=true");
    return (
        <section className="relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                <div className="relative group shrink-0">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-white dark:border-gray-800 shadow-xl">
                        <img
                            alt={data.name}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
                            src={data.avatar}
                        />
                    </div>
                </div>
                <div className="text-center sm:text-left flex-1">
                    <div style={{ display: data.openToWork ? null : "none" }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium mb-4 shadow-sm hover:shadow-md transition-all cursor-default">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Open to Opportunities
                    </div>
                    
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                        <span className="text-2xl animate-wave origin-bottom-right inline-block">👋</span>
                        <span className="font-display text-lg font-bold text-primary tracking-wide uppercase">Hello, I Am</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                        {data.name}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 font-medium">
                        {data.role}
                    </p>
                    <button 
                        onClick={onOpenAbout}
                        className="group bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-primary/20 flex items-center justify-center sm:justify-start gap-2 mx-auto sm:mx-0 active:scale-95"
                    >
                        <span className="material-symbols-rounded text-sm group-hover:rotate-12 transition-transform">auto_awesome</span>
                        About Me
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-12 border-t border-b border-gray-200 dark:border-white/10 py-6">
                {data.stats.map((stat, index) => (
                    <div key={index} className={`text-center ${index === 1 ? 'border-l border-r border-gray-200 dark:border-white/10' : ''}`}>
                        <div className="text-2xl sm:text-3xl font-bold font-display text-gray-900 dark:text-white">
                            <Counter end={stat.value} />
                        </div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};