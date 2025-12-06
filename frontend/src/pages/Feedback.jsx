// frontend/src/pages/Feedback.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, ArrowLeft } from "lucide-react";
import emailjs from '@emailjs/browser'; 

// --- 1. IMPORT IDs from the new config file
// IMPORTANT: Adjust the extension here to match what you saved: 
// Use '../config.js' if you created a .js file, or '../config.ts' if you kept the .ts file.
import { EMAILJS_CONFIG } from "../config.js"; 


export default function Feedback() {
  const [feedbackText, setFeedbackText] = useState("");
  const [userName, setUserName] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackText.trim() || !userName.trim()) {
      setMessage("Please enter both your name and feedback.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    const templateParams = {
      user_agri: userName, 
      feedback_content: feedbackText, 
    };

    try {
      // 2. USE THE IMPORTED IDs HERE
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.USER_ID
      );

      if (response.status === 200) {
        setMessage("Success: Your feedback has been sent directly to the author!");
        setFeedbackText(""); 
        setUserName(""); 
      } else {
        throw new Error(`EmailJS failed with status: ${response.status}`);
      }

    } catch (error) {
      console.error("Feedback submission error:", error);
      setMessage("Error: Failed to send feedback. Please check your network and EmailJS configuration.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-golden-yellow/20 bg-lime-300 via-background to-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md animate-fade-in text-lime-950">
        
        {/* Header remains the same */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-8 group hover:scale-105 transition-transform duration-300"
          >
            <div className="p-3 bg-forest-green/10 group-hover:bg-forest-green/20 transition-colors duration-300 rounded-lg">
              <MessageSquare className="w-8 h-8 text-forest-green" />
            </div>
            <span className="font-bold text-2xl text-forest-green">Feedback</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground animate-slide-in-left">
            We'd Love to Hear From You
          </h1>
          <p className="text-muted-foreground mt-2 animate-slide-in-right">
            Send your thoughts, suggestions, or bug reports directly to the author.
          </p>
        </div>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl p-8 border border-border shadow-lg hover:shadow-xl transition-shadow duration-300 space-y-6">
            
            {/* NEW: Name Input Field */}
            <div className="space-y-2 animate-fade-in">
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-foreground"
              >
                Your Name (Required for From Name)
              </label>
              <input
                id="userName"
                name="userName"
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-green-100 focus:outline-none focus:ring-2 focus:ring-forest-green/50 focus:border-transparent transition-all duration-300"
                placeholder="Enter your name"
              />
            </div>
            
            {/* Feedback Textarea */}
            <div className="space-y-2 animate-fade-in">
              <label
                htmlFor="feedback"
                className="block text-sm font-medium text-foreground"
              >
                What feedback do you have for the AgriSense app?
              </label>
              <textarea
                id="feedback"
                name="feedback"
                required
                rows={6}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-green-100 focus:outline-none focus:ring-2 focus:ring-forest-green/50 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Share your thoughts here..."
              />
            </div>

            {/* Status Message */}
            {message && (
                <p className={`text-center font-medium ${message.startsWith('Success') ? 'text-forest-green' : 'text-red-500'}`}>
                    {message}
                </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || feedbackText.trim().length === 0 || userName.trim().length === 0}
              className="w-full py-3 bg-blue-200 text-black font-semibold rounded-lg hover:bg-lime/90 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg animate-fade-in"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 text-black border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sending Feedback...
                </>
              ) : (
                "Send Feedback"
              )}
            </button>
          </div>

          {/* Back to Home Link */}
          <p className="text-center text-foreground">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-green-950 hover:text-forest-green/90 font-semibold transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}