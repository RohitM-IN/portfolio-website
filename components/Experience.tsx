import React from 'react';
import { Experience as ExperienceType, Role } from '../types';
import { RevealOnScroll } from './RevealOnScroll';

interface ExperienceProps {
    data: ExperienceType[];
}

export const Experience: React.FC<ExperienceProps> = ({ data }) => {
    const getBgColor = (colorName: string) => {
        switch(colorName) {
            case 'gray-900': return 'bg-gray-900';
            case 'gray-800': return 'bg-gray-800';
            case 'gray-700': return 'bg-gray-700';
            default: return 'bg-gray-900';
        }
    }

    const parseDate = (dateStr: string) => {
        if (!dateStr) return new Date();
        const cleanStr = dateStr.trim();
        if (cleanStr.toLowerCase() === 'present') return new Date();
        return new Date(cleanStr);
    }

    const calculateMonths = (start: Date, end: Date) => {
        const monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        return monthsDiff + 1; // Inclusive of start month
    }

    const formatDuration = (totalMonths: number) => {
        if (totalMonths < 1) return "";
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;
        
        let durationStr = "";
        if (years > 0) durationStr += `${years} yr${years > 1 ? 's' : ''} `;
        if (months > 0) durationStr += `${months} mo${months > 1 ? 's' : ''}`;
        
        return durationStr.trim() || "1 mo";
    }

    const getRoleDuration = (period: string) => {
        const parts = period.split(' - ');
        if (parts.length < 2) return "";
        const start = parseDate(parts[0]);
        const end = parseDate(parts[1]);
        const months = calculateMonths(start, end);
        return formatDuration(months);
    }

    const getCompanyDuration = (roles: Role[]) => {
        if (roles.length === 0) return "";
        
        // Extract all dates
        const periods = roles.map(r => r.period.split(' - '));
        const startDates = periods.map(p => parseDate(p[0]));
        const endDates = periods.map(p => parseDate(p[1]));
        
        // Find min start and max end
        const minStart = new Date(Math.min(...startDates.map(d => d.getTime())));
        const maxEnd = new Date(Math.max(...endDates.map(d => d.getTime())));
        
        const months = calculateMonths(minStart, maxEnd);
        return formatDuration(months);
    }

    return (
        <section>
            <RevealOnScroll>
                <div className="flex items-center gap-2 mb-8 text-gray-900 dark:text-white">
                    <span className="material-symbols-rounded text-primary">work_history</span>
                    <h2 className="text-xl font-display font-bold">Experience</h2>
                </div>
            </RevealOnScroll>
            
            <div className="space-y-6">
                {data.map((companyGroup, index) => {
                    const totalDuration = getCompanyDuration(companyGroup.roles);
                    
                    return (
                        <RevealOnScroll key={index} delay={index * 100}>
                            <div className="glass-card rounded-xl p-6 sm:p-8 hover:shadow-glow hover:shadow-primary/5 transition-all duration-300">
                                <div className="flex flex-col">
                                    {/* Company Header Row */}
                                    <div className="flex gap-6 sm:gap-8">
                                        {/* Left Column: Logo & Connector Line */}
                                        <div className="flex flex-col items-center shrink-0 w-12">
                                            <div className={`w-12 h-12 shrink-0 rounded-lg ${getBgColor(companyGroup.color)} flex items-center justify-center text-white font-bold text-sm border border-gray-700 shadow-md z-10`}>
                                                {companyGroup.logoText}
                                            </div>
                                            {/* Line connecting header to roles area */}
                                            {companyGroup.roles.length > 0 && (
                                                <div className="w-0.5 bg-gray-200 dark:bg-gray-800 grow"></div>
                                            )}
                                        </div>
                                        
                                        {/* Right Column: Company Info */}
                                        <div className="pb-6 pt-1">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                                                {companyGroup.company}
                                            </h3>
                                            {/* Duration Subtitle */}
                                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                {companyGroup.employmentType && <span>{companyGroup.employmentType} • </span>}
                                                <span className="text-gray-700 dark:text-gray-300">{totalDuration}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Roles List */}
                                    <div className="flex flex-col">
                                        {companyGroup.roles.map((role, roleIndex) => (
                                            <div key={roleIndex} className="flex gap-6 sm:gap-8 group">
                                                {/* Left Column: Timeline Line & Dot */}
                                                <div className="flex flex-col items-center shrink-0 w-12 relative">
                                                    {/* Continuous Line Background */}
                                                    <div className="absolute top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800"></div> 
                                                    
                                                    {/* Dot - Margin top aligns it visually with the text title baseline */}
                                                    <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-[#0f0f0f] z-10 mt-1.5 group-hover:bg-primary group-hover:scale-125 transition-all duration-300"></div>
                                                </div>

                                                {/* Right Column: Role Details */}
                                                <div className="pb-8 last:pb-0 flex-1">
                                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4 mb-2">
                                                        <h4 className="text-base font-semibold text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors duration-300">
                                                            {role.title}
                                                        </h4>
                                                        <span className="text-xs font-mono text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                            {role.period} <span className="mx-1">•</span> {getRoleDuration(role.period)}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                                                        {role.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
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