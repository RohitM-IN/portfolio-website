import React from 'react';
import { TechItem } from '../types';
import { RevealOnScroll } from './RevealOnScroll';

interface TechStackProps {
    data: TechItem[];
}

export const TechStack: React.FC<TechStackProps> = ({ data }) => {
    return (
        <section>
            <RevealOnScroll>
                <div className="flex items-center gap-2 mb-6 text-gray-900 dark:text-white">
                    <span className="material-symbols-rounded text-primary">terminal</span>
                    <h2 className="text-xl font-display font-bold">Tech Stack</h2>
                </div>
            </RevealOnScroll>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {data.map((tech, index) => (
                    <RevealOnScroll key={index} delay={index * 50}>
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:border-primary dark:hover:border-primary hover:bg-white dark:hover:bg-white/10 transition duration-300 cursor-default group">
                            {tech.iconUrl ? (
                                <img alt={tech.name} className="w-5 h-5 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" src={tech.iconUrl} />
                            ) : (
                                <span className="material-symbols-rounded text-base text-gray-500 group-hover:text-primary transition-colors">{tech.icon}</span>
                            )}
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tech.name}</span>
                        </div>
                    </RevealOnScroll>
                ))}
            </div>
        </section>
    );
};