// components/HeroSection.jsx
import React from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = ({ stats }) => {
  return (
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
              <Link 
                to="/register" 
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-medium rounded-md flex items-center justify-center"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Playing Now
              </Link>
              <Link 
                to="/demo" 
                className="px-8 py-4 border border-gray-300 text-lg font-medium rounded-md text-center"
              >
                Watch Demo
              </Link>
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
  );
};

export default HeroSection;