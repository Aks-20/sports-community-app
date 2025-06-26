import React, { useState, useEffect } from 'react';
import {
  Check,
  X,
  Crown,
  Zap,
  Shield,
  Users,
  Target,
  TrendingUp,
  Star,
  Sparkles,
  ArrowRight,
  Gift,
  Clock,
  Infinity
} from 'lucide-react';

const UpgradePlan = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      icon: Target,
      color: 'slate',
      description: 'Perfect for getting started',
      monthlyPrice: 0,
      yearlyPrice: 0,
      yearlyDiscount: 0,
      popular: false,
      features: [
        { name: 'Basic training programs', included: true },
        { name: 'Progress tracking', included: true },
        { name: 'Community access', included: true },
        { name: 'Mobile app', included: true },
        { name: 'Email support', included: true },
        { name: 'Advanced analytics', included: false },
        { name: 'Personal coaching', included: false },
        { name: 'Custom workouts', included: false },
        { name: 'Priority support', included: false },
        { name: 'Unlimited everything', included: false }
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      icon: Zap,
      color: 'blue',
      description: 'Most popular choice for serious athletes',
      monthlyPrice: 19,
      yearlyPrice: 190,
      yearlyDiscount: 20,
      popular: true,
      features: [
        { name: 'Everything in Basic', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Custom workouts', included: true },
        { name: 'Video tutorials', included: true },
        { name: 'Priority support', included: true },
        { name: 'Nutrition tracking', included: true },
        { name: 'Personal coaching', included: false },
        { name: 'Team management', included: false },
        { name: 'API access', included: false },
        { name: 'White-label options', included: false }
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: Crown,
      color: 'purple',
      description: 'Ultimate experience for professionals',
      monthlyPrice: 49,
      yearlyPrice: 490,
      yearlyDiscount: 20,
      popular: false,
      features: [
        { name: 'Everything in Pro', included: true },
        { name: 'Personal coaching', included: true },
        { name: 'Team management', included: true },
        { name: 'Advanced integrations', included: true },
        { name: '24/7 phone support', included: true },
        { name: 'Custom branding', included: true },
        { name: 'API access', included: true },
        { name: 'White-label options', included: true },
        { name: 'Dedicated account manager', included: true },
        { name: 'Unlimited everything', included: true }
      ]
    }
  ];

  const getColorClasses = (color, type = 'bg') => {
    const colors = {
      slate: {
        bg: 'bg-slate-500',
        text: 'text-slate-600',
        border: 'border-slate-200',
        gradient: 'from-slate-500 to-slate-600',
        light: 'bg-slate-50',
        accent: 'bg-slate-100'
      },
      blue: {
        bg: 'bg-blue-500',
        text: 'text-blue-600',
        border: 'border-blue-200',
        gradient: 'from-blue-500 to-blue-600',
        light: 'bg-blue-50',
        accent: 'bg-blue-100'
      },
      purple: {
        bg: 'bg-purple-500',
        text: 'text-purple-600',
        border: 'border-purple-200',
        gradient: 'from-purple-500 to-purple-600',
        light: 'bg-purple-50',
        accent: 'bg-purple-100'
      }
    };
    return colors[color][type] || '';
  };

  const calculateSavings = (plan) => {
    if (plan.yearlyPrice === 0) return 0;
    const monthlyTotal = plan.monthlyPrice * 12;
    return monthlyTotal - plan.yearlyPrice;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className={`container mx-auto px-4 py-16 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Upgrade Your Training
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
            Choose Your Plan
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Unlock your potential with our comprehensive training programs designed for every level of athlete.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative w-16 h-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                billingCycle === 'yearly' ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-slate-200'
              }`}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-0'
              }`}></div>
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-slate-900' : 'text-slate-500'}`}>
                Yearly
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const isSelected = selectedPlan === plan.id;
              const isHovered = hoveredPlan === plan.id;
              const currentPrice = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
              const savings = calculateSavings(plan);

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl transition-all duration-500 transform hover:-translate-y-2 ${
                    plan.popular 
                      ? 'ring-2 ring-blue-500 ring-offset-4 ring-offset-transparent' 
                      : ''
                  } ${isSelected ? 'scale-105' : ''} ${isHovered ? 'shadow-2xl' : 'shadow-lg'}`}
                  onMouseEnter={() => setHoveredPlan(plan.id)}
                  onMouseLeave={() => setHoveredPlan(null)}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                        <Star className="w-4 h-4 fill-current" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className={`relative p-8 rounded-3xl bg-white/80 backdrop-blur-sm border-2 transition-all duration-300 ${
                    plan.popular ? 'border-blue-200' : 'border-slate-200'
                  } ${isHovered ? 'bg-white' : ''}`}>
                    
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${getColorClasses(plan.color, 'light')}`}>
                        <Icon className={`w-8 h-8 ${getColorClasses(plan.color, 'text')}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                      <p className="text-slate-600 text-sm">{plan.description}</p>
                    </div>

                    {/* Pricing */}
                    <div className="text-center mb-8">
                      <div className="flex items-end justify-center gap-2 mb-2">
                        <span className="text-4xl font-black text-slate-900">
                          ${currentPrice}
                        </span>
                        {currentPrice > 0 && (
                          <span className="text-slate-500 text-lg mb-1">
                            /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                          </span>
                        )}
                      </div>
                      
                      {billingCycle === 'yearly' && savings > 0 && (
                        <div className="flex items-center justify-center gap-2 text-green-600 text-sm font-medium">
                          <Gift className="w-4 h-4" />
                          Save ${savings}/year
                        </div>
                      )}
                      
                      {currentPrice === 0 && (
                        <div className="text-slate-500 text-sm">Forever free</div>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            feature.included 
                              ? `${getColorClasses(plan.color, 'light')} ${getColorClasses(plan.color, 'text')}` 
                              : 'bg-slate-100 text-slate-400'
                          }`}>
                            {feature.included ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <X className="w-3 h-3" />
                            )}
                          </div>
                          <span className={`text-sm ${feature.included ? 'text-slate-700' : 'text-slate-400'}`}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        plan.popular
                          ? `bg-gradient-to-r ${getColorClasses(plan.color, 'gradient')} text-white hover:shadow-lg focus:ring-blue-500`
                          : `border-2 ${getColorClasses(plan.color, 'border')} ${getColorClasses(plan.color, 'text')} hover:${getColorClasses(plan.color, 'light')} focus:ring-slate-500`
                      }`}
                    >
                      {plan.monthlyPrice === 0 ? 'Start Free' : 'Get Started'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features Comparison */}
        <div className="container mx-auto px-4 pb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-slate-200">
            <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">
              Why Choose Our Platform?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: TrendingUp,
                  title: 'Track Progress',
                  description: 'Monitor your improvement with detailed analytics and insights'
                },
                {
                  icon: Users,
                  title: 'Community Support',
                  description: 'Connect with athletes and coaches from around the world'
                },
                {
                  icon: Shield,
                  title: 'Secure & Private',
                  description: 'Your data is protected with enterprise-grade security'
                },
                {
                  icon: Clock,
                  title: '24/7 Access',
                  description: 'Train anytime, anywhere with our mobile and web platforms'
                }
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="text-center p-6 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 text-sm">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
              Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: 'Can I change my plan anytime?',
                  answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.'
                },
                {
                  question: 'Is there a free trial?',
                  answer: 'The Basic plan is free forever. Pro and Premium plans offer a 14-day free trial.'
                },
                {
                  question: 'What payment methods do you accept?',
                  answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'
                },
                {
                  question: 'Do you offer refunds?',
                  answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans.'
                }
              ].map((faq, i) => (
                <div key={i} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-2">{faq.question}</h3>
                  <p className="text-slate-600 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Transform Your Training?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of athletes who have already upgraded their performance with our platform.
            </p>
            <button className="group inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
              Start Your Journey
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
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

export default UpgradePlan;