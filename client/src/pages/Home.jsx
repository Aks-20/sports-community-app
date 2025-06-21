import Header from '../components/Home/Header';
import HeroSection from '../components/Home/HeroSection';
import ProblemSolutionSection from '../components/Home/ProblemSolutionSection';
import FeaturesSection from '../components/Home/FeaturesSection';
import HowItWorksSection from '../components/Home/HowitWorkSection'; // Corrected import name
import CommunitySection from '../components/Home/CommunitySection';
import CTASection from '../components/Home/CTASection';
import Footer from '../components/Home/Footer';
import { Users, MapPin, Calendar, TrendingUp } from 'lucide-react';

// Define or import stats, problems, and solutions
const stats = [
  { id: 1, number: "10,000+", label: "Active Users" },
  { id: 2, number: "500+", label: "Sports Grounds" },
  { id: 3, number: "1,000+", label: "Matches Scheduled" },
  { id: 4, number: "50,000+", label: "Connections Made" },
];
 // Example: Define your stats here or import them
const problems = [
  {
    id: 1,
    title: "Finding Players",
    description: "Difficulty in finding local players to join or form a team."
  },
  {
    id: 2,
    title: "Locating Grounds",
    description: "Struggling to find available sports grounds and facilities."
  },
  {
    id: 3,
    title: "Scheduling Matches",
    description: "Challenges in organizing and scheduling matches with teams."
  },
  {
    id: 4,
    title: "Tracking Performance",
    description: "Lack of tools to monitor and improve personal or team performance."
  },
];
 // Example: Define your problems here or import them
const solutions = [
  {
    id: 1,
    title: "Connect with Players",
    description: "Easily find and connect with local players who share your passion for sports."
  },
  {
    id: 2,
    title: "Discover Grounds",
    description: "Locate and book sports grounds and facilities in your area with ease."
  },
  {
    id: 3,
    title: "Schedule Matches",
    description: "Organize and schedule matches seamlessly with our integrated calendar system."
  },
  {
    id: 4,
    title: "Track Performance",
    description: "Monitor your progress with detailed stats and analytics to improve your game."
  },
];
 // Example: Define your solutions here or import them

const SportsLandingPage = () => {

  const features = [
    {
      icon: Users,
      title: "Connect with Players",
      description: "Find and connect with local players who share your passion for sports",
      color: "bg-blue-500",
      link: "/connect",
    },
    {
      icon: MapPin,
      title: "Discover Grounds",
      description: "Locate available sports grounds and facilities in your area",
      color: "bg-green-500",
      link: "/ground",
    },
    {
      icon: Calendar,
      title: "Schedule Matches",
      description: "Organize and schedule matches with integrated calendar system",
      color: "bg-purple-500",
      link: "/schedule",
    },
    {
      icon: TrendingUp,
      title: "Track Performance",
      description: "Monitor your progress with detailed stats and analytics",
      color: "bg-orange-500",
      link: "/performance",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <HeroSection stats={stats} />
      <ProblemSolutionSection problems={problems} solutions={solutions} />
      <FeaturesSection features={features} />
      <HowItWorksSection />
      <CommunitySection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default SportsLandingPage;
