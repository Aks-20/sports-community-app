// components/CommunitySection.jsx
import React from 'react';
import { Star } from 'lucide-react';

const CommunitySection = () => {
  return (
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
  );
};

export default CommunitySection;