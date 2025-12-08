import { CheckCircle, Users, Leaf, Zap, Droplet, Microscope, Github, Linkedin, Mail, FileText } from "lucide-react";
import { Link } from "react-router-dom"; 
// Import Context Hooks and Translation Data
import { useSettings } from '../context/SettingsContext';
import { translations } from '../data/translations'; 

// Define team members data (kept outside the component as it's static)
const teamMembers = [
    {
        name: "Shrinidhi Anchan",
        github: "https://github.com/shrinidhianchan",
        linkedin: "https://www.linkedin.com/in/shrinidhi-anchan",
        email: "nidhianchan4@gmail.com",
        photo: "shrinidhi.jpg", 
    },
    {
        name: "Shishir R Kulal",
        github: "https://github.com/shishir-sh26",
        linkedin: "https://www.linkedin.com/in/shishir-r-kulal-4757a9296",
        email: "shishirkulal1234@gmail.com",
        photo: "shishir.jpg", 
    },
    {
        name: "Swasthik Rai",
        github: "https://github.com/swasthik01",
        linkedin: "https://www.linkedin.com/in/swasthik-rai-3b5629250",
        email: "swsthikrai6344@gmail.com",
        photo: "swasthik.jpg", 
    },
    {
        name: "Saket",
        github: "",
        linkedin: "",
        email: "",
        photo: "saket.jpg", 
    },
];

export default function About() {
    // Access the current language from context
    const { language } = useSettings();
    // Get the correct set of translations for the about page
    const t = translations[language]?.about || translations.en.about; 

    // Define Mission/Vision items using translation keys
    const missionVisionItems = [
        {
            icon: Leaf,
            titleKey: "missionTitle",
            descriptionKey: "missionDesc",
            // Restoring original custom color class names
            color: "lime-600", // Using a standard lime shade as a placeholder for 'forest-green' if it's a custom color
            bgColor: "lime-950", 
            iconColor: "lime-600",
        },
        {
            icon: Zap,
            titleKey: "visionTitle",
            descriptionKey: "visionDesc",
            // Restoring original custom color class names
            color: "yellow-600", // Using a standard yellow shade as a placeholder for 'earth-brown' or 'golden-yellow'
            bgColor: "lime-950", 
            iconColor: "yellow-600",
        },
        {
            icon: Users,
            titleKey: "impactTitle",
            descriptionKey: "impactDesc",
            // Restoring original custom color class names
            color: "green-600", // Using a standard green shade as a placeholder for 'golden-yellow'
            bgColor: "lime-950", 
            iconColor: "green-600",
        },
    ];

    // Define Core Features items using translation keys
    const coreFeatures = [
        {
            icon: Droplet,
            titleKey: "feature1Title",
            descriptionKey: "feature1Desc",
            featuresKeys: [
                "feature1Bullet1",
                "feature1Bullet2",
                "feature1Bullet3",
                "feature1Bullet4",
                "feature1Bullet5",
            ],
        },
        {
            icon: Microscope,
            titleKey: "feature2Title",
            descriptionKey: "feature2Desc",
            featuresKeys: [
                "feature2Bullet1",
                "feature2Bullet2",
                "feature2Bullet3",
                "feature2Bullet4",
                "feature2Bullet5",
            ],
        },
    ];

    // Define Key Benefits items using translation keys
    const keyBenefits = [
        { titleKey: "benefit1Title", descriptionKey: "benefit1Desc" },
        { titleKey: "benefit2Title", descriptionKey: "benefit2Desc" },
        { titleKey: "benefit3Title", descriptionKey: "benefit3Desc" },
        { titleKey: "benefit4Title", descriptionKey: "benefit4Desc" },
        { titleKey: "benefit5Title", descriptionKey: "benefit5Desc" },
        { titleKey: "benefit6Title", descriptionKey: "benefit6Desc" },
    ];

    // Define How It Works items using translation keys
    const howItWorks = [
        { step: "1", titleKey: "howToStep1Title", descriptionKey: "howToStep1Desc" },
        { step: "2", titleKey: "howToStep2Title", descriptionKey: "howToStep2Desc" },
        { step: "3", titleKey: "howToStep3Title", descriptionKey: "howToStep3Desc" },
    ];


    return (
        // Restored original background color
        <div className="min-h-screen bg-blend-soft-light bg-lime-950">
            
            {/* Hero Section */}
            <section className="py-20 px-4 animate-fade-in">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl text-white font-bold text-foreground mb-6">
                        {t.heroTitle}
                    </h1>
                    <p className="text-xl text-white text-muted-foreground leading-relaxed">
                        {t.heroSubtitle}
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            {/* Restored original background/text colors */}
            <section className="py-16 bg-white text-lime-950 border-y border-border px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {missionVisionItems.map((item, index) => {
                            const Icon = item.icon;
                            // NOTE: Since your original code used custom colors like 'forest-green', 'earth-brown', and 'golden-yellow' which aren't standard Tailwind classes, I'm using the original classes from your first snippet, but they might rely on your Tailwind config.
                            return (
                                <div
                                    key={index}
                                    className="text-center p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl animate-fade-in" 
                                    style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                                >
                                    {/* Using original custom color classes for background and icon */}
                                    <div className={`p-4 bg-${item.color}/10 rounded-lg w-fit mx-auto mb-4`}>
                                        <Icon className={`w-8 h-8 text-${item.color}`} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">
                                        {t[item.titleKey]}
                                    </h3>
                                    <p className="text-muted-foreground">{t[item.descriptionKey]}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Core Features */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl text-white font-bold text-foreground mb-12 text-center animate-fade-in">
                        {t.featuresSectionTitle}
                    </h2>

                    <div className="space-y-8 text-lime-950">
                        {coreFeatures.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    // Restored original background/text colors
                                    className="bg-white text-lime-950 rounded-xl p-8 border border-border transition-all duration-300 transform hover:scale-[1.01] hover:shadow-2xl animate-fade-in"
                                    style={{ animationDelay: `${(index + 1) * 0.15}s` }}
                                >
                                    <div className="flex items-start gap-6">
                                        {/* Using original custom color classes for background and icon */}
                                        <div className="p-4 bg-forest-green/10 rounded-lg flex-shrink-0">
                                            <Icon className="w-8 h-8 text-forest-green" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-semibold text-foreground mb-3">
                                                {t[feature.titleKey]}
                                            </h3>
                                            <p className="text-muted-foreground mb-4">
                                                {t[feature.descriptionKey]}
                                            </p>
                                            <ul className="space-y-2">
                                                {feature.featuresKeys.map((key, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-center gap-3 text-foreground text-sm"
                                                    >
                                                        {/* Using original custom color class for bullet point */}
                                                        <div className="w-2 h-2 bg-forest-green rounded-full"></div>
                                                        {t[key]}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Key Benefits */}
            {/* Restored original background/text colors */}
            <section className="py-20 px-4 bg-white border-y border-border">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl text-lime-950 font-bold text-foreground mb-12 text-center animate-fade-in">
                        {t.benefitsSectionTitle}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lime-950">
                        {keyBenefits.map((benefit, index) => (
                            <div
                                key={index}
                                // Restored original background color
                                className="p-6 bg-white rounded-lg border border-border hover:border-forest-green/50 hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px] animate-fade-in"
                                style={{ animationDelay: `${(index + 1) * 0.08}s` }}
                            >
                                <div className="flex items-start gap-3 mb-3">
                                    {/* Using original custom color class for icon */}
                                    <CheckCircle className="w-5 h-5 text-forest-green flex-shrink-0 mt-1" />
                                    <h3 className="font-semibold text-foreground">
                                        {t[benefit.titleKey]}
                                    </h3>
                                </div>
                                <p className="text-muted-foreground text-sm">
                                    {t[benefit.descriptionKey]}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl text-white font-bold text-foreground mb-12 text-center animate-fade-in">
                        {t.howToSectionTitle}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-lime-950">
                        {howItWorks.map((item, index) => (
                            <div
                                key={item.step}
                                className=" text-black relative animate-fade-in"
                                style={{ animationDelay: `${(index + 1) * 0.15}s` }}
                            >
                                <div 
                                    // Restored original background/border colors
                                    className="bg-white rounded-2xl p-8 border-2 border-forest-green/10 h-full hover:shadow-2xl hover:border-forest-green/70 transition-all duration-300 transform hover:translate-y-[-4px]"
                                >
                                    {/* Restored original step number styling */}
                                    <div className="absolute -top-6 left-8 w-12 h-12 bg-white -to-r from-forest-green to-fresh-green text-red rounded-xl flex items-center justify-center font-black text-lg shadow-lg">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mt-4 mb-3">
                                        {t[item.titleKey]}
                                    </h3> 
                                    <p className="text-muted-foreground leading-relaxed font-medium">
                                        {t[item.descriptionKey]}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            {/* Restored original gradient colors */}
            <section className="py-16 px-4 bg-gradient-to-r from-forest-green to-earth-brown animate-fade-in">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        {t.ctaTitle}
                    </h2>
                    <p className="text-white/90 mb-8">
                        {t.ctaSubtitle}
                    </p>
                    <Link 
                        to="/analyze" 
                        // Restored original button text/background colors
                        className="inline-block px-8 py-4 text-lime-950 bg-white text-forest-green font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
                    >
                        {t.ctaButton}
                    </Link>
                </div>
            </section>

            {/* Team Section */}
            {/* Restored original background/text colors */}
            <section className="py-20 px-4 bg-white text-lime-950 border-y border-border">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-foreground mb-12 text-center animate-fade-in">
                        {t.teamSectionTitle}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                // Restored original background/border colors
                                className="bg-gray-50 rounded-xl p-6 text-center border border-border shadow-md transition-all duration-300 transform hover:shadow-xl hover:scale-[1.03] animate-fade-in"
                                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                            >
                                {/* Photo Placeholder */}
                                <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-lg font-bold text-gray-500 overflow-hidden border-4 border-white shadow-inner">
                                    {member.name.split(' ').map(n => n[0]).join('')} 
                                </div>

                                <h3 className="text-xl font-semibold text-foreground mb-2">
                                    {member.name}
                                {/* ERROR FIXED HERE: Changed </b> to </h3> */}
                                </h3>
                                
                                {/* Social Links */}
                                <div className="flex justify-center space-x-4 mt-4">
                                    {member.github && (
                                        <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800 transition-colors duration-200">
                                            <Github className="w-6 h-6" />
                                        </a>
                                    )}
                                    {member.linkedin && (
                                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors duration-200">
                                            <Linkedin className="w-6 h-6" />
                                        </a>
                                    )}
                                    {member.email && (
                                        <a href={`mailto:${member.email}`} className="text-gray-500 hover:text-red-500 transition-colors duration-200">
                                            <Mail className="w-6 h-6" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Report / Detailed Overview */}
            {/* Restored original background color */}
            <section className="py-16 px-4 bg-lime-950 text-white">
                <div className="max-w-4xl mx-auto border-t border-white/20 pt-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h3 className="text-2xl font-bold mb-1">{t.reportTitle}</h3>
                            <p className="text-white/70">{t.reportSubtitle}</p>
                        </div>
                        
                        {/* Option 1: Using <a> tag pointing to the public folder */}
                        <a
                            // Assumes the file is renamed to 'project-report.pdf' and placed in the 'public' folder.
                            href="/project-report.pdf" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
                        >
                            <FileText className="w-5 h-5" />
                            {t.reportButton}
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}