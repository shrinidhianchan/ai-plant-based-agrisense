import { Link } from "react-router-dom";
import { Leaf, Droplets, Sprout, Zap } from "lucide-react";
// 1. Import Context Hooks and Data
import { useSettings } from '../context/SettingsContext';
import { translations } from '../data/translations'; 

export default function Home() {
  // 2. Access the current language from context
  const { language } = useSettings();
  // 3. Get the correct set of translations for the home page
  const t = translations[language]?.home || translations.en.home; 

  return (
    // 4. Add Dark Mode classes to the outer container
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <section className="relative text-white py-0 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://cdn.builder.io/api/v1/image/assets%2F8850bf8b823c4ea4a6f504b532f33e33%2Fbdaa6d872c314b2b83e6073a40f12393?format=webp&width=800')",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* 🚨 MOBILE FIX: Reduced py-20 to py-12 on mobile and added min-h-[60vh]
           to ensure the content is pushed down enough to be visible on small screens
           below the navigation bar. */}
        <div className="relative container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12 md:py-20 min-h-[60vh] md:min-h-0">
          <div>
            {/* 5. Use translation for the Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 text-white drop-shadow-lg">
              {t.title}
            </h1>
            {/* 6. Use translation for the Subtitle */}
            <p className="text-lg sm:text-xl text-white mb-6 md:mb-8 drop-shadow-md font-medium">
              {t.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/analyze"
                className="px-8 py-4 bg-agri-gold text-agri-dark font-bold rounded-lg hover:bg-opacity-90 transition-colors text-center shadow-lg"
              >
                {t.analyzeButton} {/* 7. Use translation */}
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors text-center"
              >
                {t.learnMoreButton} {/* 8. Use translation */}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Dark Mode and Translation for the 'Why Choose' Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-lime-950 dark:text-agri-gold text-center mb-12">
            {t.sectionTitle1}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1: Soil Analysis */}
            <div className="p-6 bg-agri-light bg-opacity-20 dark:bg-gray-700/50 rounded-lg border-l-4 border-agri-gold">
              <Droplets className="w-12 h-12 text-lime-950 dark:text-agri-gold mb-4" />
              <h3 className="text-xl font-bold text-agri-dark dark:text-white mb-2">
                {t.feature1Title}
              </h3>
              <p className="text-agri-sage dark:text-gray-300">
                {t.feature1Desc}
              </p>
            </div>

            {/* Feature 2: Smart Recommendations */}
            <div className="p-6 bg-agri-light bg-opacity-20 dark:bg-gray-700/50 rounded-lg border-l-4 border-agri-gold">
              <Sprout className="w-12 h-12 text-agri-sage dark:text-agri-gold mb-4" />
              <h3 className="text-xl font-bold text-agri-dark dark:text-white mb-2">
                {t.feature2Title}
              </h3>
              <p className="text-agri-sage dark:text-gray-300">
                {t.feature2Desc}
              </p>
            </div>

            {/* Feature 3: Cost Efficient */}
            <div className="p-6 bg-agri-light bg-opacity-20 dark:bg-gray-700/50 rounded-lg border-l-4 border-agri-gold">
              <Zap className="w-12 h-12 text-agri-sage dark:text-agri-gold mb-4" />
              <h3 className="text-xl font-bold text-agri-dark dark:text-white mb-2">
                {t.feature3Title || "Cost Efficient"} {/* Placeholder if not translated yet */}
              </h3>
              <p className="text-agri-sage dark:text-gray-300">
                {t.feature3Desc || "Optimize fertilizer usage to reduce costs and increase crop productivity"}
              </p>
            </div>

            {/* Feature 4: Sustainable */}
            <div className="p-6 bg-agri-light bg-opacity-20 dark:bg-gray-700/50 rounded-lg border-l-4 border-agri-gold">
              <Leaf className="w-12 h-12 text-agri-sage dark:text-agri-gold mb-4" />
              <h3 className="text-xl font-bold text-agri-dark dark:text-white mb-2">
                {t.feature4Title || "Sustainable"}
              </h3>
              <p className="text-agri-sage dark:text-gray-300">
                {t.feature4Desc || "Protect soil health and environment through data-driven farming practices"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Dark Mode and Translation for 'How It Works' Section */}
      <section className="py-16 px-4 bg-agri-dark dark:bg-gray-950 text-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            {t.sectionTitle2 || "How It Works"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-agri-gold text-agri-dark rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">{t.step1Title || "Take a Photo"}</h3>
              <p className="text-agri-light dark:text-gray-400">
                {t.step1Desc || "Capture a clear image of your soil or upload from your device"}
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-agri-gold text-agri-dark rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">{t.step2Title || "Get Analysis"}</h3>
              <p className="text-agri-light dark:text-gray-400">
                {t.step2Desc || "Our AI analyzes soil properties and nutrient levels instantly"}
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-agri-gold text-agri-dark rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">{t.step3Title || "Get Recommendations"}</h3>
              <p className="text-agri-light dark:text-gray-400">
                {t.step3Desc || "Receive personalized fertilizer and care recommendations"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Dark Mode and Translation for CTA Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl text-black dark:text-white font-bold mb-6">
            {t.ctaTitle || "Ready to Transform Your Farm?"}
          </h2>
          <p className="text-lg text-agri-sage dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {t.ctaSubtitle || "Start analyzing your soil today and get expert recommendations for better crop yields and sustainable farming practices."}
          </p>
          <Link
            to="/signup"
            // Adjust CTA button colors for Dark Mode contrast
            className="inline-block px-8 py-4 bg-agri-gold dark:bg-agri-light dark:text-lime-950 text-lime-950 font-bold rounded-lg hover:bg-agri-light transition-colors"
          >
            {t.ctaButton || "Get Started Free"}
          </Link>
        </div>
      </section>
    </div>
  );
}