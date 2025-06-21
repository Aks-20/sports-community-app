// components/FeaturesSection.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FeaturesSection = ({ features }) => {
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
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
            <Link to={feature.link} key={index}>
              <div
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;