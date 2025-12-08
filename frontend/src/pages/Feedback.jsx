// frontend/src/pages/Feedback.jsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, ArrowLeft } from "lucide-react";
import emailjs from '@emailjs/browser'; 

// CRITICAL FIX: Replaced 'require' (CommonJS) with 'import' (ES Module).
import { EMAILJS_CONFIG } from '../config.js';


// --- Translation Data ---
const translations = {
  en: {
    header_title: "We'd Love to Hear From You",
    header_subtitle: "Send your thoughts, suggestions, or bug reports directly to the author.",
    label_name: "Your Name (Required for From Name)",
    placeholder_name: "Enter your name",
    label_feedback: "What feedback do you have for the AgriSense app?",
    placeholder_feedback: "Share your thoughts here...",
    sending_feedback: "Sending Feedback...",
    send_button: "Send Feedback",
    back_home: "Back to Home",
    error_empty: "Error: Please enter both your name and feedback.", // Added "Error:" prefix
    success: "Success: Your feedback has been sent directly to the author!", // Added "Success:" prefix
    error_fail: "Error: Failed to send feedback. Please check your network and EmailJS configuration.",
    feedback_link: "Feedback"
  },
  hi: { // Hindi
    header_title: "हम आपसे सुनना चाहेंगे",
    header_subtitle: "अपने विचार, सुझाव, या बग रिपोर्ट सीधे लेखक को भेजें।",
    label_name: "आपका नाम (प्रेषक के नाम के लिए आवश्यक)",
    placeholder_name: "अपना नाम दर्ज करें",
    label_feedback: "AgriSense ऐप के लिए आपके पास क्या प्रतिक्रिया है?",
    placeholder_feedback: "अपने विचार यहां साझा करें...",
    sending_feedback: "प्रतिक्रिया भेजी जा रही है...",
    send_button: "प्रतिक्रिया भेजें",
    back_home: "होम पर वापस जाएं",
    error_empty: "त्रुटि: कृपया अपना नाम और प्रतिक्रिया दोनों दर्ज करें।",
    success: "सफलता: आपकी प्रतिक्रिया सीधे लेखक को भेज दी गई है!",
    error_fail: "त्रुटि: प्रतिक्रिया भेजने में विफल रहा। कृपया अपना नेटवर्क और EmailJS कॉन्फ़ಿಗरेशन जांचें।",
    feedback_link: "प्रतिक्रिया"
  },
  kn: { // Kannada
    header_title: "ನಿಮ್ಮಿಂದ ಕೇಳಲು ನಾವು ಇಷ್ಟಪಡುತ್ತೇವೆ",
    header_subtitle: "ನಿಮ್ಮ ಆಲೋಚನೆಗಳು, ಸಲಹೆಗಳು ಅಥವಾ ದೋಷ ವರದಿಗಳನ್ನು ನೇರವಾಗಿ ಲೇಖಕರಿಗೆ ಕಳುಹಿಸಿ.",
    label_name: "ನಿಮ್ಮ ಹೆಸರು (ಇವರಿಂದ ಹೆಸರುಗಾಗಿ ಅಗತ್ಯವಿದೆ)",
    placeholder_name: "ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    label_feedback: "AgriSense ಅಪ್ಲಿಕೇಶನ್‌ಗೆ ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆ ಏನು?",
    placeholder_feedback: "ನಿಮ್ಮ ಆಲೋಚನೆಗಳನ್ನು ಇಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ...",
    sending_feedback: "ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...",
    send_button: "ಪ್ರತಿಕ್ರಿಯೆ ಕಳುಹಿಸಿ",
    back_home: "ಮನೆಗೆ ಹಿಂತಿರುಗಿ",
    error_empty: "ದೋಷ: ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರು ಮತ್ತು ಪ್ರತಿಕ್ರಿಯೆ ಎರಡನ್ನೂ ನಮೂದಿಸಿ.",
    success: "ಯಶಸ್ಸು: ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಲೇಖಕರಿಗೆ ನೇರವಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ!",
    error_fail: "ದೋಷ: ಪ್ರತಿಕ್ರಿಯೆ ಕಳುಹಿಸಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ನೆಟ್‌ವರ್ಕ್ ಮತ್ತು EmailJS ಕಾನ್ಫಿಗರೇಶನ್ ಪರಿಶೀಲಿಸಿ.",
    feedback_link: "ಪ್ರತಿಕ್ರಿಯೆ"
  }
};

// Simple Translation Hook/Function
const useTranslation = (lang) => (key) => {
  // Fallback: Use selected language -> Fallback to English -> Fallback to error message
  return translations[lang]?.[key] || translations['en'][key] || `MISSING_KEY:${key}`;
};


export default function Feedback() {
    const [feedbackText, setFeedbackText] = useState("");
    const [userName, setUserName] = useState(""); 
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(""); 
    
    // MODIFICATION 1: Use sessionStorage to persist language selection
    const [language, setLanguage] = useState(sessionStorage.getItem('agrisense-lang') || "en"); 
    const t = useTranslation(language);

    // Persist language change
    useEffect(() => {
        sessionStorage.setItem('agrisense-lang', language);
    }, [language]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!feedbackText.trim() || !userName.trim()) {
            // MODIFICATION 2: Use "Error: " prefix for consistent color styling
            setMessage(t("error_empty"));
            return;
        }

        setIsLoading(true);
        setMessage(t("sending_feedback")); // Show sending status

        // Destructure for cleaner access
        const { SERVICE_ID, TEMPLATE_ID, USER_ID } = EMAILJS_CONFIG;

        const templateParams = {
            user_agri: userName.trim(), // Trim user name
            feedback_content: feedbackText.trim(), // Trim feedback content
        };

        try {
            // Using the imported IDs from EMAILJS_CONFIG
            const response = await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                templateParams,
                USER_ID
            );

            if (response.status === 200) {
                setMessage(t("success"));
                setFeedbackText(""); 
                setUserName(""); 
            } else {
                throw new Error(`EmailJS failed with status: ${response.status}`);
            }

        } catch (error) {
            console.error("Feedback submission error:", error);
            setMessage(t("error_fail"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-golden-yellow/20 bg-lime-300 via-background to-background flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md animate-fade-in text-lime-950">
                
                {/* Header */}
                <div className="text-center mb-8">
                    
                    {/* Language Selector (LOCAL IMPLEMENTATION) */}
                    <div className="flex justify-end mb-4">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="px-3 py-2 rounded-lg border-2 border-lime-700/30 bg-lime-100 text-lime-950 text-sm focus:outline-none focus:ring-2 focus:ring-lime-700/50"
                        >
                            <option value="en">English</option>
                            <option value="hi">Hindi (हिंदी)</option>
                            <option value="kn">Kannada (ಕನ್ನಡ)</option>
                        </select>
                    </div>

                    {/* Feedback Link/Icon */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 mb-8 group hover:scale-105 transition-transform duration-300"
                    >
                        <div className="p-3 bg-lime-700/10 group-hover:bg-lime-700/20 transition-colors duration-300 rounded-lg">
                            <MessageSquare className="w-8 h-8 text-lime-700" />
                        </div>
                        <span className="font-bold text-2xl text-lime-700">{t("feedback_link")}</span>
                    </Link>
                    
                    {/* Title and Subtitle */}
                    <h1 className="text-3xl font-bold text-foreground animate-slide-in-left">
                        {t("header_title")}
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lime-800 animate-slide-in-right">
                        {t("header_subtitle")}
                    </p>
                </div>

                {/* Feedback Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white rounded-xl p-8 border border-border shadow-lg hover:shadow-xl transition-shadow duration-300 space-y-6">
                        
                        {/* Name Input Field */}
                        <div className="space-y-2 animate-fade-in">
                            <label
                                htmlFor="userName"
                                className="block text-sm font-medium text-foreground text-lime-950"
                            >
                                {t("label_name")}
                            </label>
                            <input
                                id="userName"
                                name="userName"
                                type="text"
                                required
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-border bg-green-100 focus:outline-none focus:ring-2 focus:ring-lime-700/50 focus:border-transparent transition-all duration-300 text-lime-950"
                                placeholder={t("placeholder_name")}
                            />
                        </div>
                        
                        {/* Feedback Textarea */}
                        <div className="space-y-2 animate-fade-in">
                            <label
                                htmlFor="feedback"
                                className="block text-sm font-medium text-foreground text-lime-950"
                            >
                                {t("label_feedback")}
                            </label>
                            <textarea
                                id="feedback"
                                name="feedback"
                                required
                                rows={6}
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-border bg-green-100 focus:outline-none focus:ring-2 focus:ring-lime-700/50 focus:border-transparent transition-all duration-300 resize-none text-lime-950"
                                placeholder={t("placeholder_feedback")}
                            />
                        </div>

                        {/* Status Message */}
                        {message && (
                            // MODIFICATION 3: Simplified message color logic to use string inclusion
                            <p className={`text-center font-medium ${message.includes('Success') || message.includes('ಸಫಲತೆ') || message.includes('सफलता') ? 'text-green-700' : 'text-red-500'}`}>
                                {message}
                            </p>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || feedbackText.trim().length === 0 || userName.trim().length === 0}
                            className="w-full py-3 bg-lime-700 text-white font-semibold rounded-lg hover:bg-lime-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg animate-fade-in"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 text-white border-white/30 border-t-white rounded-full animate-spin"></div>
                                    {t("sending_feedback")}
                                </>
                            ) : (
                                t("send_button")
                            )}
                        </button>
                    </div>

                    {/* Back to Home Link */}
                    <p className="text-center text-foreground">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-1 text-lime-950 hover:text-lime-700 font-semibold transition-colors duration-300"
                        >
                            <ArrowLeft className="w-4 h-4" /> {t("back_home")}
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}