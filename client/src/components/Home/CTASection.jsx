// components/CTASection.jsx
import React from 'react';

const CTASection = () => {
  return (
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
  );
};

export default CTASection;