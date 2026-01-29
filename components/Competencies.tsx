import React from 'react';
import { Competency } from '../types';
import { RevealOnScroll } from './RevealOnScroll';

interface CompetenciesProps {
    data: Competency[];
}

export const Competencies: React.FC<CompetenciesProps> = ({ data }) => {
    // Helper to map color strings to tailwind classes dynamically
    const colorMap: Record<string, { bg: string, text: string }> = {
        blue: { bg: 'bg-blue-500/10', text: 'text-blue-500 group-hover:bg-blue-500' },
        purple: { bg: 'bg-purple-500/10', text: 'text-purple-500 group-hover:bg-purple-500' },
        green: { bg: 'bg-green-500/10', text: 'text-green-500 group-hover:bg-green-500' },
        orange: { bg: 'bg-orange-500/10', text: 'text-orange-500 group-hover:bg-orange-500' },
    };

    return (
        <section>
            <RevealOnScroll>
                <div className="flex items-center gap-2 mb-6 text-gray-900 dark:text-white">
                    <span className="material-symbols-rounded text-primary">psychology</span>
                    <h2 className="text-xl font-display font-bold">Core Competencies</h2>
                </div>
            </RevealOnScroll>
            <div className="grid sm:grid-cols-2 gap-4">
                {data.map((item, index) => {
                    const colors = colorMap[item.color] || colorMap['blue'];
                    return (
                        <RevealOnScroll key={index} delay={index * 100}>
                            <div className="glass-card p-5 rounded-xl hover:bg-white dark:hover:bg-white/5 transition duration-300 border border-transparent hover:border-primary/20 group h-full">
                                <div className="flex items-start gap-4">
                                    <div className={`p-2 rounded-lg ${colors.bg} ${colors.text} group-hover:text-white transition-colors duration-300`}>
                                        <span className="material-symbols-rounded">{item.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{item.title}</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    );
                })}
            </div>
        </section>
    );
};