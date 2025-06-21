// components/ProblemSolutionSection.jsx
import React from 'react';
import { Target, CheckCircle, X } from 'lucide-react';

const ProblemSolutionSection = ({ problems, solutions }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Solving Real Sports Community Challenges</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We understand the struggles of local sports enthusiasts and provide comprehensive solutions.
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
                {problems.map((problem) => (
                  <li key={problem.id} className="flex items-start">
                    <X className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{problem.description}</span>
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
                {solutions.map((solution) => (
                  <li key={solution.id} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{solution.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Example arrays
const problems = [
  {
    id: 1,
    description: "Difficulty in finding local players to join or form a team."
  },
  {
    id: 2,
    description: "Struggling to find available sports grounds and facilities."
  },
  {
    id: 3,
    description: "Challenges in organizing and scheduling matches with teams."
  },
  {
    id: 4,
    description: "Lack of tools to monitor and improve personal or team performance."
  },
];

const solutions = [
  {
    id: 1,
    description: "Easily find and connect with local players who share your passion for sports."
  },
  {
    id: 2,
    description: "Locate and book sports grounds and facilities in your area with ease."
  },
  {
    id: 3,
    description: "Organize and schedule matches seamlessly with our integrated calendar system."
  },
  {
    id: 4,
    description: "Monitor your progress with detailed stats and analytics to improve your game."
  },
];

export default ProblemSolutionSection;
