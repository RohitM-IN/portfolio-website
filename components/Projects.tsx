import React from 'react';
import { Project } from '../types';
import { RevealOnScroll } from './RevealOnScroll';

interface ProjectsProps {
    data: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ data }) => {
    return (
        <section>
            <RevealOnScroll>
                <div className="flex items-center gap-2 mb-6 text-gray-900 dark:text-white">
                    <span className="material-symbols-rounded text-primary">rocket_launch</span>
                    <h2 className="text-xl font-display font-bold">Featured Projects</h2>
                </div>
            </RevealOnScroll>
            <div className="space-y-4">
                {data.map((project, index) => (
                    <RevealOnScroll key={index} delay={index * 150}>
                        <div className="glass-card p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-white/10 hover:border-primary/50 dark:hover:border-primary/50 transition duration-500 relative overflow-hidden group">
                             <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 dark:bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition duration-500"></div>
                             <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                                    <a href={project.link} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition text-gray-500 dark:text-gray-300 transform hover:rotate-45 duration-300">
                                        <span className="material-symbols-rounded">open_in_new</span>
                                    </a>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                ))}
            </div>
        </section>
    );
};