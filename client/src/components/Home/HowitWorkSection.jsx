// components/HowItWorksSection.jsx
import React from 'react';
import { Users, MapPin, TrendingUp, ArrowRight } from 'lucide-react';

const HowItWorksSection = () => {
  return (
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
  );
};

export default HowItWorksSection;