import React, { useState, useEffect } from "react";
import {
  Users,
  MapPin,
  Calendar,
  TrendingUp,
  Trophy,
  Target,
  Star,
  Play,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

const SportsLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Users,
      title: "Connect with Players",
      description: "Find and connect with local players who share your passion for sports",
      color: "bg-blue-500",
    },
    {
      icon: MapPin,
      title: "Discover Grounds",
      description: "Locate available sports grounds and facilities in your area",
      color: "bg-green-500",
    },
    {
      icon: Calendar,
      title: "Schedule Matches",
      description: "Organize and schedule matches with integrated calendar system",
      color: "bg-purple-500",
    },
    {
      icon: TrendingUp,
      title: "Track Performance",
      description: "Monitor your progress with detailed stats and analytics",
      color: "bg-orange-500",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Players" },
    { number: "500+", label: "Sports Grounds" },
    { number: "2K+", label: "Teams Formed" },
    { number: "15K+", label: "Matches Played" },
  ];

  const problems = [
    "No dedicated platform for local sports community",
    "Difficulty finding players for matches",
    "Struggle to locate available grounds",
    "Talented players remain undiscovered",
    "No efficient performance tracking system",
  ];

  const solutions = [
    "Unified sports community platform",
    "Smart player matching system",
    "Real-time ground availability",
    "Talent showcase and discovery",
    "Comprehensive performance analytics",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SportConnect
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-blue-600 transition-colors">
              How It Works
            </a>
            <a href="#community" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Community
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Contact
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 text-sm font-medium rounded-md hover:bg-slate-100">
              Sign In
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
              Get Started
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-4">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-sm font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium">
                How It Works
              </a>
              <a href="#community" className="text-sm font-medium">
                Community
              </a>
              <a href="#contact" className="text-sm font-medium">
                Contact
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <button className="px-4 py-2 text-sm font-medium rounded-md hover:bg-slate-100">
                  Sign In
                </button>
                <button className="px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  Get Started
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  🏆 Connect • Play • Excel
                </span>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Your Local{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Sports Community
                  </span>{" "}
                  Awaits
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Connect with players, discover grounds, organize matches, and track your performance. Join the
                  ultimate platform for local sports enthusiasts.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-medium rounded-md flex items-center">
                  <Play className="mr-2 h-5 w-5" />
                  Start Playing Now
                </button>
                <button className="px-8 py-4 border border-gray-300 text-lg font-medium rounded-md">
                  Watch Demo
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-blue-600">{stat.number}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8">
                <img
                  src="https://via.placeholder.com/500x400"
                  alt="Sports Community Dashboard"
                  width={500}
                  height={400}
                  className="rounded-lg"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl transform rotate-3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Solving Real Sports Community Challenges</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand the struggles of local sports enthusiasts and provide comprehensive solutions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="border border-red-200 bg-red-50/50 rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-red-700 flex items-center text-xl font-semibold">
                  <Target className="mr-2 h-5 w-5" />
                  Current Challenges
                </h3>
              </div>
              <div className="px-6 pb-6">
                <ul className="space-y-3">
                  {problems.map((problem, index) => (
                    <li key={index} className="flex items-start">
                      <X className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border border-green-200 bg-green-50/50 rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-green-700 flex items-center text-xl font-semibold">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Our Solutions
                </h3>
              </div>
              <div className="px-6 pb-6">
                <ul className="space-y-3">
                  {solutions.map((solution, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Everything You Need in One Platform</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive features designed to enhance your sports experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg border transition-all duration-300 hover:shadow-lg cursor-pointer p-6 ${
                  activeFeature === index ? "ring-2 ring-blue-500 shadow-lg" : ""
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="text-center">
                  <div
                    className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How SportConnect Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Get started in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "Sign up and create your sports profile with your interests, skill level, and location",
                icon: Users,
              },
              {
                step: "02",
                title: "Connect & Discover",
                description: "Find players, teams, and grounds in your area. Join existing teams or create your own",
                icon: MapPin,
              },
              {
                step: "03",
                title: "Play & Track",
                description: "Schedule matches, play games, and track your performance with detailed analytics",
                icon: TrendingUp,
              },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                {index < 2 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 h-6 w-6 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Join Our Growing Community</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Thousands of players are already connecting, playing, and improving their game
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                quote: "Finally found a platform where I can easily find basketball players in my area!",
                author: "Sarah M.",
                sport: "Basketball Player",
              },
              {
                quote: "The performance tracking feature helped me improve my game significantly.",
                author: "Mike R.",
                sport: "Football Player",
              },
              {
                quote: "Great for organizing tournaments and connecting with the local sports community.",
                author: "Alex K.",
                sport: "Tennis Coach",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm opacity-75">{testimonial.sport}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Transform Your Sports Experience?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of players who are already connecting and playing through SportConnect
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-sm"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-md hover:from-blue-700 hover:to-purple-700">
                Get Early Access
              </button>
            </div>

            <p className="text-sm text-gray-500">
              No spam, unsubscribe at any time. Get notified when we launch in your area.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">SportConnect</span>
              </div>
              <p className="text-slate-400 mb-4">Connecting local sports communities worldwide.</p>
              <div className="flex space-x-4">
                {/* Social media icons would go here */}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mobile App
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Press
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">© {new Date().getFullYear()} SportConnect. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SportsLandingPage;