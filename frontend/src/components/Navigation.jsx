import { Link } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react"; // Removed Settings, Sun, Moon icons
import { useState } from "react";
import { useSettings } from '../context/SettingsContext';
import { translations } from '../data/translations';
import SettingsModal from './SettingsModal'; 

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false); 
    
    // Theme and toggleTheme are now only used INSIDE the SettingsModal, 
    // but we still need the language for translation.
    const { language } = useSettings(); 
    const t = translations[language].navbar;
    
    const toggleMenu = () => setIsOpen(!isOpen);

    // Nav Links: Note that the "Settings" button is now handled as a final action link
    // and is translated.
    const navLinks = [
        { href: "/", label: t.home }, 
        { href: "/about", label: t.about },
        { href: "/feedback", label: t.feedback || "Feedback" }, 
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-sm z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center gap-3 group animate-fade-in hover:opacity-80 transition-opacity duration-300"
                        >
                            <div className="relative">
                                <div className="p-2.5 bg-gradient-to-br from-forest-green to-fresh-green rounded-xl group-hover:shadow-lg transition-all duration-300 group-hover:scale-110 transform">
                                    <Leaf className="w-6 h-6 text-white" strokeWidth={2.5} /> 
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-golden-yellow rounded-full animate-pulse"></div>
                            </div>
                            <div className="flex flex-col -gap-1">
                                <span className="font-extrabold text-yellow-300">
                                    AGRISENSE
                                </span>
                                <span className="text-xs text-amber-600 font-semibold tracking-widest -mt-1">
                                    SOIL EXPERT
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation & Settings Control */}
                        <div className="hidden text-white md:flex items-center gap-8">
                            {/* Nav Links */}
                            {navLinks.map((link, index) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className="text-green-300 hover:text-white transition-all duration-300 font-semibold text-sm hover:underline hover:underline-offset-4"
                                    style={{
                                        animation: `slideInRight 0.6s ease-out ${index * 0.1}s both`,
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            
                            {/* 🚨 MODIFIED: Settings Button is now a standard text link */}
                            <button
                                onClick={() => setIsSettingsOpen(true)}
                                title={t.settings || "Settings"}
                                className="text-green-300 hover:text-white transition-all duration-300 font-semibold text-sm hover:underline hover:underline-offset-4"
                            >
                                {t.settings || "Settings"}
                            </button>
                            {/* 🚨 REMOVED: Dark/Light Mode Toggle Button */}
                        </div>

                        {/* Mobile Menu Button (Includes Settings Button on mobile) */}
                        <div className="md:hidden flex items-center gap-2">
                            {/* 🚨 MODIFIED: Mobile Settings Button no longer shows the Settings icon, 
                                but the menu toggle button is still necessary. We'll reuse the 
                                generic menu icon for both actions for simplicity. */}
                            
                            {/* Mobile Menu Toggle (remains as the main toggle) */}
                            <button
                                onClick={toggleMenu}
                                className="text-green-300 p-2 hover:bg-secondary/20 rounded-lg transition-all duration-300"
                            >
                                {isOpen ? (
                                    <X className="w-6 h-6 animate-fade-in" />
                                ) : (
                                    <Menu className="w-6 h-6 animate-fade-in" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isOpen && (
                        <div className="md:hidden border-t border-border py-4 space-y-2 animate-fade-in">
                            {/* Nav Links */}
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className="block px-4 py-2 text-green-500 hover:bg-white rounded-lg transition-all duration-300 font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            
                            {/* 🚨 MODIFIED: Mobile Settings Link (Text Only) */}
                            <button
                                onClick={() => { setIsSettingsOpen(true); setIsOpen(false); }}
                                className="w-full text-left px-4 py-2 text-green-500 hover:bg-white rounded-lg transition-all duration-300 font-medium"
                            >
                                {t.settings || "Settings"}
                            </button>

                            {/* 🚨 REMOVED: Mobile Theme Toggle Button */}
                        </div>
                    )}
                </div>
            </nav>

            {/* Render the Settings Modal */}
            <SettingsModal 
                isOpen={isSettingsOpen} 
                onClose={() => setIsSettingsOpen(false)} 
            />
        </>
    );
}