import { CheckCircle, Users, Leaf, Zap, Droplet, Microscope, Github, Linkedin, Mail, FileText } from "lucide-react";
import { Link } from "react-router-dom"; 

// Define team members data
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
    linkedin: "https://www.linkedin.com/in/shishir-r-kulal",
    email: "shishirkulal1234@gmail.com",
    photo: "shishir.jpg", 
  },
  {
    name: "Swasthik Rai",
    github: "https://github.com/swasthik01",
    linkedin: "https://www.linkedin.com/in/swasthik-rai",
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
  return (
    <div className="min-h-screen bg-blend-soft-light bg-lime-950">
      
      {/* Hero Section (Unchanged) */}
      <section className="py-20 px-4 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl text-white font-bold text-foreground mb-6">
            About AGRISENSE
          </h1>
          <p className="text-xl text-white text-muted-foreground leading-relaxed">
            Empowering farmers with AI-driven insights for better soil health, optimized fertilizer use, and disease prevention.
          </p>
        </div>
      </section>

      {/* Mission Section (HOVER ADDED: transform, shadow) */}
      <section className="py-16 bg-white text-lime-950 border-y border-border px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: "Our Mission",
                description:
                  "To revolutionize agriculture by providing farmers with easy-to-use tools for soil analysis and disease detection, enabling smarter decisions about fertilizer use and crop health.",
                color: "forest-green",
              },
              {
                icon: Zap,
                title: "Our Vision",
                description:
                  "A future where every farmer has access to intelligent agricultural tools that help maximize yields while reducing costs and environmental impact.",
                color: "earth-brown",
              },
              {
                icon: Users,
                title: "Our Impact",
                description:
                  "Supporting sustainable farming practices that improve soil quality, reduce fertilizer waste, and protect crops from disease.",
                color: "golden-yellow",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl animate-fade-in" 
                  style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                >
                  <div className={`p-4 bg-${item.color}/10 rounded-lg w-fit mx-auto mb-4`}>
                    <Icon className={`w-8 h-8 text-${item.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Features (HOVER ADDED: transform, shadow) */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl text-white font-bold text-foreground mb-12 text-center animate-fade-in">
            What AGRISENSE Offers
          </h2>

          <div className="space-y-8 text-lime-950">
            {[
              {
                icon: Droplet,
                title: "Soil Analysis & Fertilizer Recommendations",
                description:
                  "Input your soil's NPK (nitrogen, phosphorus, potassium) values and pH level. Get customized fertilizer recommendations based on your crop type and soil conditions.",
                features: [
                  "Easy-to-use slider inputs for soil parameters",
                  "Real-time soil health scoring",
                  "Crop-specific fertilizer recommendations",
                  "Precise dosage and timing guidance",
                  "Cost-effective nutrient management",
                ],
              },
              {
                icon: Microscope,
                title: "Plant Disease Detection",
                description:
                  "Upload images of your plants to detect diseases early. Get identification, severity assessment, treatment options, and prevention strategies.",
                features: [
                  "Quick disease identification from plant images",
                  "Severity level assessment",
                  "Detailed treatment recommendations",
                  "Prevention strategies for future protection",
                  "Early intervention to save crops",
                ],
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  // HOVER added here
                  className="bg-white rounded-xl p-8 border border-border transition-all duration-300 transform hover:scale-[1.01] hover:shadow-2xl animate-fade-in"
                  style={{ animationDelay: `${(index + 1) * 0.15}s` }}
                >
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-forest-green/10 rounded-lg flex-shrink-0">
                      <Icon className="w-8 h-8 text-forest-green" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-foreground mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.features.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-3 text-foreground text-sm"
                          >
                            <div className="w-2 h-2 bg-forest-green rounded-full"></div>
                            {item}
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

      {/* Key Benefits (HOVER ADDED: shadow, border color) */}
      <section className="py-20 px-4 bg-white border-y border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl text-lime-950 font-bold text-foreground mb-12 text-center animate-fade-in">
            Why Choose AGRISENSE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lime-950">
            {[
              {
                title: "Increase Your Yields",
                description:
                  "Optimize fertilizer use based on actual soil conditions to maximize crop productivity",
              },
              {
                title: "Save Money",
                description:
                  "Reduce unnecessary fertilizer spending with precise, data-driven recommendations",
              },
              {
                title: "Prevent Crop Loss",
                description:
                  "Detect plant diseases early and act quickly to protect your harvest",
              },
              {
                title: "Improve Soil Health",
                description:
                  "Learn how to maintain and improve soil quality for long-term sustainability",
              },
              {
                title: "Protect the Environment",
                description:
                  "Use fertilizers responsibly to reduce runoff and environmental impact",
              },
              {
                title: "Simple and Easy",
                description:
                  "User-friendly interface designed for farmers of all technical backgrounds",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                // HOVER added here
                className="p-6 bg-white rounded-lg border border-border hover:border-forest-green/50 hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px] animate-fade-in"
                style={{ animationDelay: `${(index + 1) * 0.08}s` }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-forest-green flex-shrink-0 mt-1" />
                  <h3 className="font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works (HOVER ADDED: shadow, border color) */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl text-white font-bold text-foreground mb-12 text-center animate-fade-in">
            How to Get Started
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-lime-950">
            {[
              {
                step: "1",
                title: "Enter Soil Data",
                description:
                  "Input your soil's NPK values and pH level using simple sliders. Select your crop type.",
              },
              {
                step: "2",
                title: "Get Recommendations",
                description:
                  "Receive customized fertilizer recommendations with specific dosages and application timing.",
              },
              {
                step: "3",
                title: "Monitor Plant Health",
                description:
                  "Upload plant images anytime to detect diseases early and get treatment advice.",
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="relative animate-fade-in"
                style={{ animationDelay: `${(index + 1) * 0.15}s` }}
              >
                <div 
                  // HOVER added here
                  className="bg-white rounded-2xl p-8 border-2 border-forest-green/10 h-full hover:shadow-2xl hover:border-forest-green/70 transition-all duration-300 transform hover:translate-y-[-4px]"
                >
                  <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-r from-forest-green to-fresh-green text-white rounded-xl flex items-center justify-center font-black text-lg shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mt-4 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section (MODIFIED: Button already has a hover effect) */}
      <section className="py-16 px-4 bg-gradient-to-r from-forest-green to-earth-brown animate-fade-in">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Optimize Your Farm?
          </h2>
          <p className="text-white/90 mb-8">
            Start analyzing your soil and getting AI-powered fertilizer recommendations today
          </p>
          <Link 
            to="/analyze" 
            className="inline-block px-8 py-4 text-lime-950 bg-white text-forest-green font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Team Section (HOVER ADDED: shadow, scale) */}
      <section className="py-20 px-4 bg-white text-lime-950 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center animate-fade-in">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                // HOVER added here
                className="bg-gray-50 rounded-xl p-6 text-center border border-border shadow-md transition-all duration-300 transform hover:shadow-xl hover:scale-[1.03] animate-fade-in"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                {/* Photo Placeholder */}
                <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-lg font-bold text-gray-500 overflow-hidden border-4 border-white shadow-inner">
                  {member.name.split(' ').map(n => n[0]).join('')} 
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {member.name}
                </h3>
                
                {/* Social Links (Individual icon hovers are preserved from the last code) */}
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

      {/* Project Report / Detailed Overview (HOVER ADDED: Link transformation) */}
      <section className="py-16 px-4 bg-lime-950 text-white">
        <div className="max-w-4xl mx-auto border-t border-white/20 pt-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-1">Detailed Overview of the Project</h3>
              <p className="text-white/70">Access comprehensive documentation and technical insights.</p>
            </div>
            <Link
              to="/report.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              // HOVER added here
              className="inline-flex items-center gap-3 px-6 py-3 bg-white text-forest-green font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
            >
              <FileText className="w-5 h-5" />
              View Project Report
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}