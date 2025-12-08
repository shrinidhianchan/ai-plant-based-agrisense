// src/pages/Analyze.jsx
import { useState, useRef } from "react";
import {
  AlertCircle,
  CheckCircle,
  Camera,
  Droplet,
  Microscope,
  Zap,
  Leaf,
  Activity,
} from "lucide-react";

// --- Translation Data ---
const translations = {
  en: {
    header_title: "SOIL & DISEASE ANALYSIS",
    header_subtitle: "Get AI-powered recommendations based on soil nutrients and plant health",
    soil_title: "Soil Analysis",
    select_crop: "🌾 Select Crop Type",
    choose_crop: "Choose a crop...",
    nitrogen: "🔴 Nitrogen (N):",
    phosphorus: "🟡 Phosphorus (P):",
    potassium: "🟢 Potassium (K):",
    ph: "🌡️ Soil pH:",
    moisture: "💧 Moisture:",
    organic_matter: "🍂 Organic Matter:",
    analyze_soil_btn: "Analyze Soil Health",
    analyzing_soil: "Analyzing Soil...",
    disease_title: "Disease Detection",
    disease_subtitle: "Upload a plant image to detect diseases early and get treatment recommendations.",
    drop_or_click: "Drop plant image or click to upload",
    image_formats: "Supports JPG, PNG, and other image formats",
    detect_disease_btn: "Detect Disease",
    detecting: "Detecting...",
    clear: "Clear",
    analysis_complete: "✅ Analysis Complete",
    soil_health_score: "Soil Health Score",
    recommendations_title: "Fertilizer Recommendations",
    optimal_soil: "✅ Soil parameters are optimal. Maintain current practices.",
    analysis_again: "Analyze Again",
    input_placeholder: "Enter soil parameters and click",
    input_call_to_action: '"Analyze Soil Health"',
    disease_severity: "🔴 Severity:",
    disease_confidence: "🎯 Confidence:",
    treatment_options: "Treatment Options",
    prevention_strategies: "Prevention Strategies",
    expert_advice: "💡 Expert Advice",
    recommended_action: "Recommended Action",
    frequency_recommended: "Immediate application recommended.",
    error_select_crop: "Please select a crop type",
    error_invalid_image: "Please select a valid image file",
    error_upload_image: "Please upload a plant image for disease detection",
    error_soil_fail: "Soil Analysis failed: ",
    error_disease_fail: "Disease analysis failed: ",
    error_backend_run: ". Ensure backend is running.",
  },
  hi: { // Hindi (Devanagari script)
    header_title: "मिट्टी और रोग विश्लेषण",
    header_subtitle: "मिट्टी के पोषक तत्वों और पौधों के स्वास्थ्य के आधार पर AI-संचालित सिफारिशें प्राप्त करें",
    soil_title: "मिट्टी का विश्लेषण",
    select_crop: "🌾 फसल का प्रकार चुनें",
    choose_crop: "एक फसल चुनें...",
    nitrogen: "🔴 नाइट्रोजन (N):",
    phosphorus: "🟡 फास्फोरस (P):",
    potassium: "🟢 पोटेशियम (K):",
    ph: "🌡️ मिट्टी का pH:",
    moisture: "💧 नमी:",
    organic_matter: "🍂 जैविक पदार्थ:",
    analyze_soil_btn: "मिट्टी के स्वास्थ्य का विश्लेषण करें",
    analyzing_soil: "मिट्टी का विश्लेषण हो रहा है...",
    disease_title: "रोग पहचान",
    disease_subtitle: "जल्दी रोग का पता लगाने और उपचार की सिफारिशें प्राप्त करने के लिए पौधे की एक तस्वीर अपलोड करें।",
    drop_or_click: "पौधे की तस्वीर डालें या अपलोड करने के लिए क्लिक करें",
    image_formats: "JPG, PNG, और अन्य छवि प्रारूपों का समर्थन करता है",
    detect_disease_btn: "रोग का पता लगाएं",
    detecting: "पता लगाया जा रहा है...",
    clear: "साफ़ करें",
    analysis_complete: "✅ विश्लेषण पूरा हुआ",
    soil_health_score: "मिट्टी के स्वास्थ्य का स्कोर",
    recommendations_title: "उर्वरक सिफारिशें",
    optimal_soil: "✅ मिट्टी के पैरामीटर इष्टतम हैं। वर्तमान प्रथाओं को बनाए रखें।",
    analysis_again: "फिर से विश्लेषण करें",
    input_placeholder: "मिट्टी के पैरामीटर दर्ज करें और क्लिक करें",
    input_call_to_action: '"मिट्टी के स्वास्थ्य का विश्लेषण करें"',
    disease_severity: "🔴 गंभीरता:",
    disease_confidence: "🎯 आत्मविश्वास:",
    treatment_options: "उपचार के विकल्प",
    prevention_strategies: "रोकथाम की रणनीतियाँ",
    expert_advice: "💡 विशेषज्ञ सलाह",
    recommended_action: "अनुशंसित कार्रवाई",
    frequency_recommended: "तत्काल आवेदन की सिफारिश की जाती है।",
    error_select_crop: "कृपया फसल का प्रकार चुनें",
    error_invalid_image: "कृपया एक मान्य छवि फ़ाइल चुनें",
    error_upload_image: "रोग का पता लगाने के लिए कृपया पौधे की एक तस्वीर अपलोड करें",
    error_soil_fail: "मिट्टी का विश्लेषण विफल रहा: ",
    error_disease_fail: "रोग का विश्लेषण विफल रहा: ",
    error_backend_run: ". सुनिश्चित करें कि बैकएंड चल रहा है।",
  },
  kn: { // Kannada (Kannada script)
    header_title: "ಮಣ್ಣು ಮತ್ತು ರೋಗ ವಿಶ್ಲೇಷಣೆ",
    header_subtitle: "ಮಣ್ಣಿನ ಪೋಷಕಾಂಶಗಳು ಮತ್ತು ಸಸ್ಯದ ಆರೋಗ್ಯದ ಆಧಾರದ ಮೇಲೆ AI-ಚಾಲಿತ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ",
    soil_title: "ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ",
    select_crop: "🌾 ಬೆಳೆಯ ಪ್ರಕಾರವನ್ನು ಆರಿಸಿ",
    choose_crop: "ಒಂದು ಬೆಳೆ ಆರಿಸಿ...",
    nitrogen: "🔴 ಸಾರಜನಕ (N):",
    phosphorus: "🟡 ರಂಜಕ (P):",
    potassium: "🟢 ಪೊಟ್ಯಾಸಿಯಮ್ (K):",
    ph: "🌡️ ಮಣ್ಣಿನ pH:",
    moisture: "💧 ತೇವಾಂಶ:",
    organic_matter: "🍂 ಸಾವಯವ ವಸ್ತು:",
    analyze_soil_btn: "ಮಣ್ಣಿನ ಆರೋಗ್ಯವನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
    analyzing_soil: "ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ ಆಗುತ್ತಿದೆ...",
    disease_title: "ರೋಗ ಪತ್ತೆ",
    disease_subtitle: "ರೋಗಗಳನ್ನು ಮುಂಚಿತವಾಗಿ ಪತ್ತೆಹಚ್ಚಲು ಮತ್ತು ಚಿಕಿತ್ಸೆಯ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಲು ಸಸ್ಯದ ಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ.",
    drop_or_click: "ಸಸ್ಯದ ಚಿತ್ರವನ್ನು ಹಾಕಿ ಅಥವಾ ಅಪ್ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ",
    image_formats: "JPG, PNG, ಮತ್ತು ಇತರ ಚಿತ್ರ ಸ್ವರೂಪಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ",
    detect_disease_btn: "ರೋಗವನ್ನು ಪತ್ತೆಹಚ್ಚಿ",
    detecting: "ಪತ್ತೆಹಚ್ಚಲಾಗುತ್ತಿದೆ...",
    clear: "ತೆರವುಗೊಳಿಸಿ",
    analysis_complete: "✅ ವಿಶ್ಲೇಷಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ",
    soil_health_score: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಸ್ಕೋರ್",
    recommendations_title: "ಗೊಬ್ಬರ ಶಿಫಾರಸುಗಳು",
    optimal_soil: "✅ ಮಣ್ಣಿನ ನಿಯತಾಂಕಗಳು ಸೂಕ್ತವಾಗಿವೆ. ಪ್ರಸ್ತುತ ಪದ್ಧತಿಗಳನ್ನು ಮುಂದುವರಿಸಿ.",
    analysis_again: "ಮತ್ತೆ ವಿಶ್ಲೇಷಿಸಿ",
    input_placeholder: "ಮಣ್ಣಿನ ನಿಯತಾಂಕಗಳನ್ನು ನಮೂದಿಸಿ ಮತ್ತು ಕ್ಲಿಕ್ ಮಾಡಿ",
    input_call_to_action: '"ಮಣ್ಣಿನ ಆರೋಗ್ಯವನ್ನು ವಿಶ್ಲೇಷಿಸಿ"',
    disease_severity: "🔴 ತೀವ್ರತೆ:",
    disease_confidence: "🎯 ವಿಶ್ವಾಸ:",
    treatment_options: "ಚಿಕಿತ್ಸೆಯ ಆಯ್ಕೆಗಳು",
    prevention_strategies: "ತಡೆಗಟ್ಟುವಿಕೆ ತಂತ್ರಗಳು",
    expert_advice: "💡 ತಜ್ಞರ ಸಲಹೆ",
    recommended_action: "ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮ",
    frequency_recommended: "ತಕ್ಷಣದ ಅನ್ವಯವನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ.",
    error_select_crop: "ದಯವಿಟ್ಟು ಬೆಳೆಯ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    error_invalid_image: "ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಚಿತ್ರ ಫೈಲ್ ಅನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    error_upload_image: "ರೋಗ ಪತ್ತೆಗಾಗಿ ದಯವಿಟ್ಟು ಸಸ್ಯದ ಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ",
    error_soil_fail: "ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ ವಿಫಲವಾಗಿದೆ: ",
    error_disease_fail: "ರೋಗ ವಿಶ್ಲೇಷಣೆ ವಿಫಲವಾಗಿದೆ: ",
    error_backend_run: ". ಬ್ಯಾಕೆಂಡ್ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದೆಯೆ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
  },
};

// Simple Translation Hook/Function
const useTranslation = (lang) => (key) => {
  // Fallback: Use selected language -> Fallback to English -> Fallback to error message
  return translations[lang]?.[key] || translations['en'][key] || `MISSING_KEY:${key}`;
};


// --- Backend API Endpoints ---
const BASE_API_URL = "http://127.0.0.1:8000";
const SOIL_API_URL = `${BASE_API_URL}/api/analyze/soil`;
const DISEASE_API_URL = `${BASE_API_URL}/api/analyze/disease`;

/**
 * Improved fetch utility with Timeout and reduced Retries.
 */
const fetchWithTimeout = async (url, options, timeout = 15000, maxRetries = 1) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const config = { ...options, signal: controller.signal };

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, config);
      clearTimeout(id);
      
      if (response.ok) {
        return response;
      }
      
      // Handle 429 (Too Many Requests) specifically
      if (response.status === 429 && attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        continue;
      }
      
      // Read error details if available
      const errorText = await response.text().catch(() => response.statusText);
      let errorMessage = `HTTP Error ${response.status}`;
      try {
           const jsonError = JSON.parse(errorText);
           if (jsonError.detail) errorMessage += `: ${jsonError.detail}`;
      } catch (e) {
           errorMessage += `: ${errorText}`;
      }
      
      throw new Error(errorMessage);

    } catch (error) {
      if (attempt === maxRetries) {
        clearTimeout(id);
        if (error.name === 'AbortError') {
              throw new Error("Request timed out. The server is taking too long to respond.");
        }
        throw error;
      }
    }
  }
};

// --- Component Logic and Definitions ---

const CROP_TYPES = [
  "Cotton", "Ginger", "Gram", "Grapes", "Groundnut", "Jowar", 
  "Maize", "Masoor", "Moong", "Rice", "Soybean", "Sugarcane", 
  "Tur", "Turmeric", "Urad", "Wheat",
];

const SOIL_HEALTH_RANGES = {
    nitrogen: { low: 30, moderate: 60 },
    phosphorus: { low: 20, moderate: 50 },
    potassium: { low: 30, moderate: 60 },
    ph: { acidic: 6.0, alkaline: 7.5 },
    moisture: { dry: 20, wet: 40 },
    organicMatter: { low: 2.0, good: 4.0 },
};

const getRangeStatus = (value, ranges) => {
    if (value < ranges.low) return "Low";
    if (value < ranges.moderate) return "Moderate";
    return "High";
}

const getPhStatus = (ph) => {
    if (ph < 6) return "Acidic";
    if (ph < 7.5) return "Neutral";
    return "Alkaline";
}

const getMoistureStatus = (moisture) => {
    if (moisture < 20) return "Dry";
    if (moisture < 40) return "Optimal";
    return "Wet";
}

const getOrganicMatterStatus = (om) => {
    if (om < 2) return "Low";
    if (om < 4) return "Good";
    return "High";
}

export default function Analyze() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [cropType, setCropType] = useState("Rice");
  const [diseaseFile, setDiseaseFile] = useState(null);
  const [diseasePreview, setDiseasePreview] = useState(null);
  const [language, setLanguage] = useState("hi"); // Updated default language to Hindi
  const t = useTranslation(language); // Translation helper
  const fileInputRef = useRef(null);

  const [inputs, setInputs] = useState({
    nitrogen: 50,
    phosphorus: 40,
    potassium: 35,
    ph: 6.8,
    moisture: 28,
    organicMatter: 3.2,
  });

  const handleDiseaseFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        setError(t("error_invalid_image"));
        return;
      }
      setDiseaseFile(selectedFile);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setDiseasePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDiseaseDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      const input = fileInputRef.current;
      if (input) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(droppedFile);
        input.files = dataTransfer.files;
        handleDiseaseFileChange({ target: input });
      }
    }
  };

  const handleDiseaseDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleInputChange = (field, value) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setInputs((prev) => ({
        ...prev,
        [field]: numValue,
      }));
    }
  };

  const handleAnalyze = async () => {
    if (!cropType) {
      setError(t("error_select_crop"));
      return;
    }
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    const payload = {
      plant_species: cropType,
      N: inputs.nitrogen,
      P: inputs.phosphorus,
      K: inputs.potassium,
      pH: inputs.ph,
    };

    try {
      const response = await fetchWithTimeout(SOIL_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const resultData = await response.json();
      
      if (!resultData || typeof resultData.recommended_fertilizer === 'undefined' || typeof resultData.soil_improvement_focus === 'undefined') {
        throw new Error("Backend returned invalid soil analysis data structure.");
      }

      const mockScore = (inputs.nitrogen > 30 && inputs.phosphorus > 20 && inputs.potassium > 30) ? 85 : 65;
      const status = mockScore > 80 ? "Excellent" : mockScore > 60 ? "Good" : "Fair";
      const statusColor = mockScore > 80 ? "text-green-600" : mockScore > 60 ? "text-yellow-600" : "text-orange-600";
      
      const recParts = resultData.recommended_fertilizer.match(/(.*)\((.*)\)/);
      const fertilizerName = recParts ? recParts[1].trim() : resultData.recommended_fertilizer;
      const quantity = recParts ? recParts[2] : "See advice below";

      setResult({
        type: "soil",
        soilHealth: {
            score: mockScore,
            status: status,
            statusColor: statusColor,
            issues: [
              `Prediction: ${resultData.recommended_fertilizer}`,
              `Focus: ${resultData.soil_improvement_focus}`
            ]
        },
        recommendations: [
          {
            fertilizer: fertilizerName,
            quantity: quantity,
            timing: resultData.soil_improvement_focus, 
          }
        ],
        cropType: cropType,
        soilData: inputs, 
      });

    } catch (err) {
      console.error("Soil Analysis Error:", err);
      setError(`${t("error_soil_fail")}${err.message}.${t("error_backend_run")}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeDisease = async () => {
    if (!diseaseFile) {
      setError(t("error_upload_image"));
      return;
    }
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", diseaseFile);
    
    try {
      const response = await fetchWithTimeout(DISEASE_API_URL, {
        method: 'POST',
        body: formData
      });
      
      const resultData = await response.json();

      if (!resultData || typeof resultData.detected_issue === 'undefined') {
        throw new Error("Backend returned invalid disease analysis data structure.");
      }
      
      const confidence = parseFloat(resultData.confidence_score);
      const severity = confidence > 85 ? "High" : confidence > 60 ? "Moderate" : "Low";
      
      // Provide English advice regardless of UI language for consistency in the API simulation
      const combinedAdviceEnglish = `The model detected ${resultData.detected_issue} with a confidence of ${confidence.toFixed(1)}%. Immediate application of the recommended treatment is advised to prevent spread.`;
      
      // Add language-specific prevention strategies
      let preventionStrategies;
      if (language === 'hi') {
        preventionStrategies = [
          "पौधों के चारों ओर उचित वायु संचार सुनिश्चित करें।",
          "दिन के देर से ओवरहेड पानी देने से बचें।",
          "संक्रमित पौधों के मलबे को तुरंत हटा दें और नष्ट कर दें।"
        ];
      } else if (language === 'kn') {
         preventionStrategies = [
          "ಸಸ್ಯಗಳ ಸುತ್ತಲೂ ಸರಿಯಾದ ಗಾಳಿಯ ಸಂಚಾರವನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
          "ದಿನದ ತಡವಾಗಿ ತಲೆಯ ಮೇಲೆ ನೀರು ಹಾಕುವುದು ತಪ್ಪಿಸಿ.",
          "ಸೋಂಕಿತ ಸಸ್ಯಗಳ ಅವಶೇಷಗಳನ್ನು ತಕ್ಷಣ ತೆಗೆದುಹಾಕಿ ಮತ್ತು ನಾಶಮಾಡಿ."
        ];
      } else { // default to English
        preventionStrategies = [
          "Ensure proper air circulation around plants.",
          "Avoid overhead watering late in the day.",
          "Remove and destroy infected plant debris promptly."
        ];
      }
      
      setResult({
        type: "disease",
        diseaseDetected: true,
        diseaseName: resultData.detected_issue,
        severity: severity,
        confidence: `${confidence.toFixed(1)}%`,
        treatment: [
          {
            name: t("recommended_action"),
            product: resultData.treatment,
            frequency: t("frequency_recommended"),
          }
        ],
        prevention: preventionStrategies,
        combinedAdvice: combinedAdviceEnglish, // Keeping API advice in English for simplicity
      });

    } catch (err) {
      console.error("Disease Analysis Error:", err);
      setError(`${t("error_disease_fail")}${err.message}.${t("error_backend_run")}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearAll = () => {
    setDiseaseFile(null);
    setDiseasePreview(null);
    setResult(null);
    setError(null);
    setCropType("Rice"); 
    setInputs({
      nitrogen: 50,
      phosphorus: 40,
      potassium: 35,
      ph: 6.8,
      moisture: 28,
      organicMatter: 3.2,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-golden-yellow/30 via-fresh-green/10 to-background py-12 px-4 bg-lime-950">
      <style>{`
        /* Custom scrollbar and range slider styling (omitted for brevity) */
      `}</style>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-white flex justify-between items-start">
            <div>
              <h1 className="text-5xl lg:text-6xl font-black bg-clip-text text-transparent leading-tight text-white">
                {t("header_title")}
              </h1>
              <p className="text-lg text-white/80 mt-2 font-medium">
                {t("header_subtitle")}
              </p>
            </div>
            
            {/* Language Selector */}
            <div className="space-y-1 mt-2">
                <label htmlFor="language-select" className="block text-xs font-bold text-white/70">
                    Language
                </label>
                <select
                    id="language-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="px-3 py-2 rounded-lg border-2 border-lime-700/30 bg-lime-100 text-lime-950 focus:outline-none focus:ring-2 focus:ring-lime-700/50"
                >
                    <option value="en">English</option>
                    <option value="hi">Hindi (हिंदी)</option>
                    <option value="kn">Kannada (ಕನ್ನಡ)</option>
                </select>
            </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Inputs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Soil Analysis Card */}
            <div className="bg-lime-100  text-lime-950 rounded-2xl p-8 border-2 border-lime-700/20 shadow-xl space-y-6 animate-slide-in-left">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-lime-800 to-lime-600 rounded-lg">
                  <Droplet className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-lime-950">
                  {t("soil_title")}
                </h3>
              </div>

              {/* Crop Type Dropdown */}
              <div className="space-y-2 animate-fade-in">
                <label className="block text-sm font-bold text-lime-950">
                  {t("select_crop")}
                </label>
                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-lime-700/30 bg-white focus:outline-none focus:ring-2 focus:ring-lime-700/50 focus:border-lime-700 transition-all font-medium text-lime-950"
                >
                  <option value="">{t("choose_crop")}</option>
                  {CROP_TYPES.map((crop) => (
                    <option key={crop} value={crop}>
                      {crop}
                    </option>
                  ))}
                </select>
              </div>

              {/* Nitrogen */}
              <div className="space-y-3 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-lime-950">
                    {t("nitrogen")} {inputs.nitrogen.toFixed(1)} mg/kg
                  </label>
                  <span className="text-xs font-bold px-3 py-1 bg-red-100 text-red-700 rounded-full">
                    {getRangeStatus(inputs.nitrogen, SOIL_HEALTH_RANGES.nitrogen)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={inputs.nitrogen}
                  onChange={(e) => handleInputChange("nitrogen", e.target.value)}
                  className="w-full h-3 bg-gradient-to-r from-red-300 to-red-500 rounded-lg"
                />
              </div>

              {/* Phosphorus */}
              <div className="space-y-3 animate-fade-in" style={{ animationDelay: "0.15s" }}>
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-lime-950">
                    {t("phosphorus")} {inputs.phosphorus.toFixed(1)} mg/kg
                  </label>
                  <span className="text-xs font-bold px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                    {getRangeStatus(inputs.phosphorus, SOIL_HEALTH_RANGES.phosphorus)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={inputs.phosphorus}
                  onChange={(e) => handleInputChange("phosphorus", e.target.value)}
                  className="w-full h-3 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-lg"
                />
              </div>

              {/* Potassium */}
              <div className="space-y-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-lime-950">
                    {t("potassium")} {inputs.potassium.toFixed(1)} mg/kg
                  </label>
                  <span className="text-xs font-bold px-3 py-1 bg-green-100 text-green-700 rounded-full">
                    {getRangeStatus(inputs.potassium, SOIL_HEALTH_RANGES.potassium)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={inputs.potassium}
                  onChange={(e) => handleInputChange("potassium", e.target.value)}
                  className="w-full h-3 bg-gradient-to-r from-green-300 to-green-500 rounded-lg"
                />
              </div>

              {/* pH */}
              <div className="space-y-3 animate-fade-in" style={{ animationDelay: "0.25s" }}>
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-lime-950">
                    {t("ph")} {inputs.ph.toFixed(1)}
                  </label>
                  <span className="text-xs font-bold px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {getPhStatus(inputs.ph)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="14"
                  step="0.1"
                  value={inputs.ph}
                  onChange={(e) => handleInputChange("ph", e.target.value)}
                  className="w-full h-3 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded-lg"
                />
              </div>

              {/* Moisture */}
              <div className="space-y-3 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-lime-950">
                    {t("moisture")} {inputs.moisture.toFixed(1)}%
                  </label>
                  <span className="text-xs font-bold px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full">
                    {getMoistureStatus(inputs.moisture)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={inputs.moisture}
                  onChange={(e) => handleInputChange("moisture", e.target.value)}
                  className="w-full h-3 bg-gradient-to-r from-orange-300 to-cyan-500 rounded-lg"
                />
              </div>

              {/* Organic Matter */}
              <div className="space-y-3 animate-fade-in" style={{ animationDelay: "0.35s" }}>
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-lime-950">
                    {t("organic_matter")} {inputs.organicMatter.toFixed(1)}%
                  </label>
                  <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-700 rounded-full">
                    {getOrganicMatterStatus(inputs.organicMatter)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={inputs.organicMatter}
                  onChange={(e) => handleInputChange("organicMatter", e.target.value)}
                  className="w-full h-3 bg-gradient-to-r from-amber-300 to-amber-600 rounded-lg"
                />
              </div>

              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-100 border-2 border-red-300 rounded-lg animate-fade-in text-lime-950">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-red-700 text-sm font-bold">{error}</span>
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full px-6 py-4 bg-lime-950 text-white font-bold rounded-lg hover:shadow-2xl disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] text-lg active:scale-100"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {t("analyzing_soil")}
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 text-white" />
                    {t("analyze_soil_btn")}
                  </>
                )}
              </button>
            </div>

            {/* Disease Detection Section */}
            <div className="bg-lime-100 rounded-2xl p-8 border-2 border-orange-300/30 shadow-lg space-y-6 animate-slide-in-left">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-lime-950 to-lime-600 rounded-lg">
                  <Microscope className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-lime-950">
                  {t("disease_title")}
                </h3>
              </div>

              <p className="text-lime-800 font-medium">
                {t("disease_subtitle")}
              </p>

              {!diseasePreview ? (
                <div
                  onDrop={handleDiseaseDrop}
                  onDragOver={handleDiseaseDragOver}
                  className="border-3 border-dashed border-orange-400/50 rounded-xl p-8 text-center hover:border-orange-400/80 hover:bg-orange-50 transition-all cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="w-10 h-10 text-lime-950 mx-auto mb-3 animate-pulse" />
                  <p className="text-sm font-bold text-lime-950 mb-1">{t("drop_or_click")}</p>
                  <p className="text-xs text-lime-700">{t("image_formats")}</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleDiseaseFileChange}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden border-2 border-orange-300/50">
                    <img src={diseasePreview} alt="Plant Preview" className="w-full h-64 object-cover" />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleAnalyzeDisease}
                      disabled={isAnalyzing}
                      className="flex-1 py-3 bg-lime-950 text-white font-bold rounded-lg hover:shadow-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] text-base active:scale-100"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          {t("detecting")}
                        </>
                      ) : (
                        <>
                          <Microscope className="w-5 h-5" />
                          {t("detect_disease_btn")}
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setDiseaseFile(null);
                        setDiseasePreview(null);
                        setError(null);
                      }}
                      className="px-4 py-3 border-2 border-lime-950 text-lime-700 font-bold rounded-lg hover:bg-orange-50 transition active:scale-95"
                    >
                      {t("clear")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Soil Health Dashboard & Results */}
          <div className="animate-slide-in-right">
            {result ? (
              <div className="bg-lime-100 rounded-2xl p-8 border-2 border-lime-700/20 shadow-2xl max-h-[800px] overflow-y-auto space-y-6 sticky top-8">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-100 to-green-50 border-2 border-green-300 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 animate-pulse" />
                  <span className="text-green-700 font-bold">{t("analysis_complete")}</span>
                </div>

                {result.type === "soil" && (
                  <>
                    {/* Soil Health Dashboard */}
                    <div>
                      <h3 className="text-lg font-black text-lime-950 mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-lime-950" />
                        {t("soil_health_score")}
                      </h3>
                      <div className="p-6 bg-gradient-to-br from-lime-50 to-lime-100 border-2 border-lime-700/30 rounded-lg text-center">
                        <div className={`text-5xl font-black mb-2 ${result.soilHealth.statusColor}`}>
                          {result.soilHealth.score}%
                        </div>
                        <p className={`text-2xl font-bold ${result.soilHealth.statusColor}`}>
                          {result.soilHealth.status}
                        </p>
                        {result.soilHealth.issues.length > 0 && (
                          <div className="mt-4 space-y-2 text-left">
                            {result.soilHealth.issues.map((issue, idx) => (
                              <p key={idx} className="text-sm text-orange-600 font-medium">
                                {issue}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h3 className="text-lg font-black text-lime-950 mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-lime-950" />
                        {t("recommendations_title")}
                      </h3>
                      <div className="space-y-3">
                        {result.recommendations.length > 0 ? (
                          result.recommendations.map((rec, idx) => (
                            <div
                              key={idx}
                              className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-golden-yellow rounded-lg border-orange-400"
                            >
                              <p className="font-bold text-sm mb-2 text-lime-950">
                                {rec.fertilizer}
                              </p>
                              <div className="space-y-1 text-xs text-lime-800 font-medium">
                                <p>📊 {rec.quantity}</p>
                                <p>⏰ {rec.timing}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-green-600 font-medium">
                            {t("optimal_soil")}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {result.type === "disease" && (
                  <>
                    <div className="p-4 bg-gradient-to-r from-orange-100 to-pink-100 border-2 border-orange-400 rounded-lg">
                      <p className="font-bold text-orange-900 text-lg">{result.diseaseName}</p>
                      <p className="text-sm text-orange-800 mt-2 flex gap-4">
                        <span>{t("disease_severity")} <strong>{result.severity}</strong></span>
                        <span>{t("disease_confidence")} <strong>{result.confidence}</strong></span>
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold text-lime-950 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-orange-600" />
                        {t("treatment_options")}
                      </h3>
                      <div className="space-y-3">
                        {result.treatment.map((item, idx) => (
                          <div key={idx} className="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-lg">
                            <p className="font-bold text-emerald-900">{item.name}</p>
                            <p className="text-sm text-emerald-700 mt-1">📦 {item.product}</p>
                            <p className="text-sm text-emerald-700 mt-1">⏱️ {item.frequency}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-lime-950 mb-3 flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-green-600" />
                        {t("prevention_strategies")}
                      </h3>
                      <ul className="space-y-2 list-inside">
                        {result.prevention.map((strategy, idx) => (
                          <li key={idx} className="flex items-start gap-3 p-2">
                            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-lime-950 text-sm">{strategy}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
                      <h3 className="font-bold text-blue-900 mb-2">{t("expert_advice")}</h3>
                      <p className="text-sm text-blue-800">
                        {result.combinedAdvice}
                      </p>
                    </div>
                  </>
                )}

                <button
                  onClick={clearAll}
                  className="w-full px-4 py-3 border-2 bg-lime-950 text-white font-bold rounded-lg hover:opacity-90 transition active:scale-95"
                >
                  {t("analysis_again")}
                </button>
              </div>
            ) : (
              <div className="bg-lime-950 rounded-2xl p-8 border-2 border-lime-700/20 h-full flex items-center justify-center min-h-96 sticky top-8">
                <div className="text-center">
                  <Activity className="w-12 h-12 text-green-400 mx-auto mb-4 animate-pulse" />
                  <p className="font-bold text-white/80">
                    {t("input_placeholder")}<br />
                    <span className="text-white">{t("input_call_to_action")}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}