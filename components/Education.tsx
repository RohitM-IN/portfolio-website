import React from 'react';
import { Education as EducationType } from '../types';
import { RevealOnScroll } from './RevealOnScroll';

interface EducationProps {
    data: EducationType[];
}

export const Education: React.FC<EducationProps> = ({ data }) => {
    return (
        <section>
            <RevealOnScroll>
                <div className="flex items-center gap-2 mb-6 text-gray-900 dark:text-white">
                    <span className="material-symbols-rounded text-primary">school</span>
                    <h2 className="text-xl font-display font-bold">Education</h2>
                </div>
            </RevealOnScroll>
            <div className="space-y-4">
                {data.map((edu, index) => (
                    <RevealOnScroll key={index} delay={index * 100}>
                        <div className="glass-card p-5 rounded-xl border border-gray-200 dark:border-white/5 flex flex-col sm:flex-row justify-between gap-4 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-white dark:hover:bg-white/5 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group cursor-default">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded bg-gray-200 dark:bg-gray-800 group-hover:bg-primary/10 group-hover:text-primary flex items-center justify-center text-gray-600 dark:text-gray-400 font-bold text-xs transition-colors duration-300">
                                    {edu.logoText}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">{edu.school}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{edu.degree}</p>
                                </div>
                            </div>
                            <div className="text-right sm:text-right text-xs font-mono text-gray-500 dark:text-gray-400">
                                {edu.period}
                            </div>
                        </div>
                    </RevealOnScroll>
                ))}
            </div>
        </section>
    );
};