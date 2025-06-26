import {
  Target,
  ArrowLeft,
  Users,
  Trophy,
  MessageCircle,
  Sparkles,
  Calendar,
  Bell
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Community = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    { 
      icon: MessageCircle, 
      title: "Chat with teammates", 
      description: "Real-time messaging with your training partners",
      color: "blue",
      delay: 0
    },
    { 
      icon: Trophy, 
      title: "Challenge friends", 
      description: "Create and participate in friendly competitions",
      color: "yellow",
      delay: 100
    },
    { 
      icon: Users, 
      title: "Join training groups", 
      description: "Find and connect with like-minded athletes",
      color: "green",
      delay: 200
    },
    { 
      icon: Target, 
      title: "Share your progress", 
      description: "Celebrate achievements with your community",
      color: "purple",
      delay: 300
    },
  ];

  const upcomingFeatures = [
    { icon: Calendar, text: "Training Schedules", status: "In Development" },
    { icon: Bell, text: "Achievement Notifications", status: "Planned" },
    { icon: Sparkles, text: "Skill Matching", status: "Research Phase" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.history.back()}
              className="group inline-flex items-center h-10 px-4 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-slate-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Community
              </span>
            </div>
          </div>
      <Link to="/module">
          <button
            className="inline-flex items-center h-10 px-4 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
          >
            Training
          </button>
      </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className={`relative container mx-auto px-4 py-20 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-md">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          🚧 Coming Soon!
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
          Community Features
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          We're crafting an extraordinary space where athletes, coaches, and enthusiasts unite to push boundaries and achieve greatness together.
        </p>
        
        {/* Stats Preview */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {[
            { number: "10K+", label: "Expected Users" },
            { number: "50+", label: "Training Programs" },
            { number: "24/7", label: "Community Support" }
          ].map(({ number, label }, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">{number}</div>
              <div className="text-sm text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="relative container mx-auto px-4 pb-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">What's Coming</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map(({ icon: Icon, title, description, color, delay }, i) => (
            <div
              key={i}
              className={`group relative p-6 border border-slate-200 rounded-2xl bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${delay}ms` }}
              onMouseEnter={() => setActiveCard(i)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 ${
                  color === 'blue' ? 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' :
                  color === 'yellow' ? 'bg-yellow-100 text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white' :
                  color === 'green' ? 'bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white' :
                  'bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 text-slate-800 group-hover:text-slate-900">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed group-hover:text-slate-700">{description}</p>
                </div>
              </div>
              
              {/* Hover Effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${
                color === 'blue' ? 'from-blue-400 to-blue-600' :
                color === 'yellow' ? 'from-yellow-400 to-yellow-600' :
                color === 'green' ? 'from-green-400 to-green-600' :
                'from-purple-400 to-purple-600'
              }`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="relative container mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">Development Roadmap</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {upcomingFeatures.map(({ icon: Icon, text, status }, i) => (
            <div key={i} className="text-center p-6 bg-white/50 rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-slate-600" />
              </div>
              <h3 className="font-medium text-slate-800 mb-2">{text}</h3>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                status === 'In Development' ? 'bg-blue-100 text-blue-800' :
                status === 'Planned' ? 'bg-yellow-100 text-yellow-800' :
                'bg-slate-100 text-slate-600'
              }`}>
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
            Start Your Training Journey Today
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
            While we're building these amazing community features, you can already begin your personal growth journey with our comprehensive training programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => alert('Training page would open here')}
              className="group inline-flex items-center justify-center rounded-lg text-base font-semibold bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 shadow-lg"
            >
              <span>Go to Training</span>
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center rounded-lg text-base font-medium bg-white/20 text-white hover:bg-white/30 px-8 py-3 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 backdrop-blur-sm"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Community;