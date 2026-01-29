import React, { useEffect } from 'react';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children }) => {
    // Prevent scrolling when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm transition-opacity cursor-pointer" 
                onClick={onClose}
            />
            
            {/* Drawer Content */}
            <div className="relative w-full max-w-md h-full bg-white/90 dark:bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl border-l border-gray-200 dark:border-white/10 p-6 sm:p-8 overflow-y-auto animate-slide-in-right">
                <div className="flex items-center justify-between mb-8 sticky top-0 bg-inherit pt-2 pb-4 z-10">
                    <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">{title}</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition text-gray-500 dark:text-gray-400"
                        aria-label="Close"
                    >
                        <span className="material-symbols-rounded">close</span>
                    </button>
                </div>
                <div className="text-gray-600 dark:text-gray-300 space-y-4 leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
};
