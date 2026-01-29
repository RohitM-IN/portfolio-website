import React from 'react';
import { Social } from '../types';

interface FooterProps {
    socials: Social[];
    name: string;
}

export const Footer: React.FC<FooterProps> = ({ socials, name }) => {
    return (
        <section className="pt-12 pb-8 border-t border-gray-200 dark:border-white/5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-rounded text-primary text-xl">link</span>
                    <h2 className="text-lg font-display font-bold text-gray-900 dark:text-white">Connect With Me</h2>
                </div>
                <div className="flex gap-4">
                    {socials.map((social, index) => (
                        <a
                            key={index}
                            href={social.link}
                            target={social.target ? social.target : '_self'}
                            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition"
                        >
                            {social.svgIcon ? (
                                <svg
                                    className="w-4 h-4 fill-gray-600 dark:fill-gray-400 group-hover:fill-primary transition-colors"
                                    viewBox="0 0 24 24"
                                >
                                    <path d={social.svgIcon}></path>
                                </svg>
                            ) : (
                                <span className="material-symbols-rounded text-lg text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors">
                                    {social.icon}
                                </span>
                            )}
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{social.name}</span>
                        </a>
                    ))}
                </div>
            </div>
            <div className="mt-8 text-center sm:text-left text-xs text-gray-500 dark:text-gray-500">
                © {new Date().getFullYear()} {name}.
            </div>
        </section>
    );
};