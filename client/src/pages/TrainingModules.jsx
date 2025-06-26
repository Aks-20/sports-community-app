import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Target,
  Search,
  Filter,
  ArrowLeft,
  Zap,
  Brain,
  Eye,
  Heart,
  TrendingUp,
  Clock,
  Play,
  CheckCircle,
  Star,
  Award,
  BookOpen,
  Users,
  Calendar,
  BarChart3
} from "lucide-react";

const trainingModules = [
  {
    id: "1",
    title: "First Touch Fundamentals",
    description: "Master the art of receiving and controlling the ball under pressure with perfect first touches.",
    skillLevel: "beginner",
    category: "Technical Skills",
    duration: "25 min",
    progress: 0,
    videoCount: 8,
    isCompleted: false,
    difficulty: 2,
    rating: 4.8,
    enrolled: 1240,
    lastUpdated: "2 days ago"
  },
  {
    id: "2",
    title: "Advanced Dribbling Techniques",
    description: "Learn professional dribbling moves including step-overs, cuts, and skill moves to beat defenders.",
    skillLevel: "advanced",
    category: "Technical Skills",
    duration: "45 min",
    progress: 65,
    videoCount: 12,
    isCompleted: false,
    difficulty: 4,
    rating: 4.9,
    enrolled: 890,
    lastUpdated: "1 week ago"
  },
  {
    id: "3",
    title: "Passing Accuracy Training",
    description: "Improve your short and long passing with precision drills and accuracy challenges.",
    skillLevel: "intermediate",
    category: "Technical Skills",
    duration: "30 min",
    progress: 100,
    videoCount: 10,
    isCompleted: true,
    difficulty: 3,
    rating: 4.7,
    enrolled: 1560,
    lastUpdated: "3 days ago"
  },
  {
    id: "4",
    title: "Positional Awareness",
    description: "Develop game intelligence and learn to read the field like a professional player.",
    skillLevel: "intermediate",
    category: "Tactical Awareness",
    duration: "35 min",
    progress: 20,
    videoCount: 15,
    isCompleted: false,
    difficulty: 3,
    rating: 4.6,
    enrolled: 720,
    lastUpdated: "5 days ago"
  },
  {
    id: "5",
    title: "Goalkeeper Reflexes",
    description: "Specialized training for goalkeepers focusing on reaction time and shot stopping.",
    skillLevel: "beginner",
    category: "Goalkeeper",
    duration: "40 min",
    progress: 45,
    videoCount: 18,
    isCompleted: false,
    difficulty: 3,
    rating: 4.5,
    enrolled: 420,
    lastUpdated: "1 day ago"
  },
  {
    id: "6",
    title: "Sprint & Agility Conditioning",
    description: "Build explosive speed and agility with sport-specific conditioning exercises.",
    skillLevel: "advanced",
    category: "Physical Conditioning",
    duration: "50 min",
    progress: 80,
    videoCount: 20,
    isCompleted: false,
    difficulty: 5,
    rating: 4.8,
    enrolled: 650,
    lastUpdated: "4 days ago"
  },
];

const TrainingModules = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    { id: "all", name: "All Training", icon: Target, color: "bg-gradient-to-r from-blue-500 to-purple-500" },
    { id: "Technical Skills", name: "Technical", icon: Zap, color: "bg-gradient-to-r from-yellow-500 to-orange-500" },
    { id: "Tactical Awareness", name: "Tactical", icon: Brain, color: "bg-gradient-to-r from-green-500 to-teal-500" },
    { id: "Physical Conditioning", name: "Physical", icon: Heart, color: "bg-gradient-to-r from-red-500 to-pink-500" },
    { id: "Goalkeeper", name: "Goalkeeper", icon: Eye, color: "bg-gradient-to-r from-purple-500 to-indigo-500" },
  ];

  const skillLevels = [
    { id: "all", name: "All Levels", color: "bg-gray-100 text-gray-700" },
    { id: "beginner", name: "Beginner", color: "bg-green-100 text-green-700" },
    { id: "intermediate", name: "Intermediate", color: "bg-yellow-100 text-yellow-700" },
    { id: "advanced", name: "Advanced", color: "bg-red-100 text-red-700" },
  ];

  const filteredModules = trainingModules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || module.category === selectedCategory;
    const matchesSkillLevel =
      selectedSkillLevel === "all" || module.skillLevel === selectedSkillLevel;

    return matchesSearch && matchesCategory && matchesSkillLevel;
  });

  const handleStartModule = (moduleId) => {
    console.log(`Starting module ${moduleId}`);
  };

  const getProgressStats = () => {
    const totalModules = trainingModules.length;
    const completedModules = trainingModules.filter((m) => m.isCompleted).length;
    const inProgressModules = trainingModules.filter(
      (m) => m.progress > 0 && !m.isCompleted
    ).length;
    const averageProgress = Math.round(
      trainingModules.reduce((sum, m) => sum + m.progress, 0) / totalModules
    );

    return {
      totalModules,
      completedModules,
      inProgressModules,
      averageProgress,
    };
  };

  const stats = getProgressStats();

  const ModuleCard = ({ module, onStart, className = "" }) => {
    const isHovered = hoveredCard === module.id;
    const skillLevelColor = skillLevels.find(level => level.id === module.skillLevel)?.color || "bg-gray-100 text-gray-700";
    
    return (
      <div 
        className={`group relative rounded-2xl border border-gray-200 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 ${className}`}
        onMouseEnter={() => setHoveredCard(module.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Progress indicator */}
        {module.progress > 0 && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              style={{ width: `${module.progress}%` }}
            />
          </div>
        )}
        
        {/* Completion badge */}
        {module.isCompleted && (
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-green-500 text-white rounded-full p-1.5 shadow-lg">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
        )}

        <div className="relative p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-gray-100 text-gray-700">
                {module.category}
              </span>
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${skillLevelColor}`}>
                {module.skillLevel}
              </span>
            </div>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium text-gray-700">{module.rating}</span>
            </div>
          </div>
          
          {/* Content */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {module.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{module.description}</p>
          
          {/* Metadata */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{module.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <BookOpen className="w-4 h-4" />
              <span>{module.videoCount} videos</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Users className="w-4 h-4" />
              <span>{module.enrolled} enrolled</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{module.lastUpdated}</span>
            </div>
          </div>
          
          {/* Difficulty */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">Difficulty</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i < module.difficulty 
                      ? "bg-gradient-to-r from-blue-500 to-purple-500" 
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Progress */}
          {module.progress > 0 && (
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">Progress</span>
                <span className="text-blue-600 font-semibold">{module.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${module.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="border-t border-gray-100 px-6 py-4 bg-gray-50/50 backdrop-blur-sm">
          <button
            onClick={() => onStart(module.id)}
            className={`w-full inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 h-11 px-6 group-hover:scale-105 ${
              module.progress > 0
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl"
                : "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg hover:shadow-xl"
            }`}
          >
            <Play className="w-4 h-4 mr-2" />
            {module.progress > 0 ? "Continue" : "Start"} Training
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Navigation */}
      <nav className="border-b border-gray-200/50 bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
         
<Link
  to="/"
  className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 h-9 px-3"
>
  <ArrowLeft className="w-4 h-4 mr-2" />
  Back to Home
</Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl text-gray-900">Training Modules</span>
                <p className="text-xs text-gray-500">Professional Soccer Training</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
   <Link
  to="/performance"
  className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 h-9 px-3"
>
  <BarChart3 className="w-4 h-4 mr-2" />
  My Progress
</Link>
           <Link to="/upgrade" className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 h-9 px-4 shadow-lg">
              <Award className="w-4 h-4 mr-2" />
              Upgrade Plan
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Master Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Soccer Skills</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our comprehensive library of soccer training modules designed by professional coaches and former players.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 text-center">{stats.averageProgress}%</div>
            <div className="text-sm text-gray-600 text-center">Average Progress</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 text-center">{stats.completedModules}</div>
            <div className="text-sm text-gray-600 text-center">Completed</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 text-center">{stats.inProgressModules}</div>
            <div className="text-sm text-gray-600 text-center">In Progress</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 text-center">{stats.totalModules}</div>
            <div className="text-sm text-gray-600 text-center">Total Modules</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search training modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 rounded-xl border border-gray-300 bg-gray-50 px-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium bg-white hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </span>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all px-4 py-2 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <category.icon className="w-4 h-4 mr-2" />
                <span className="hidden lg:inline">{category.name}</span>
                <span className="lg:hidden">{category.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>

          {/* Skill Level Filters */}
          <div className="flex flex-wrap gap-3">
            {skillLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedSkillLevel(level.id)}
                className={`inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all px-4 py-2 ${
                  selectedSkillLevel === level.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {level.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredModules.length}</span> of <span className="font-semibold">{trainingModules.length}</span> training modules
          </div>
          {(searchQuery || selectedCategory !== "all" || selectedSkillLevel !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedSkillLevel("all");
              }}
              className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors hover:bg-gray-100 h-9 px-4"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Module Grid */}
        {filteredModules.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredModules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                onStart={handleStartModule}
                className="h-full"
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg">
            <div className="p-16 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No modules found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or filters to find training modules.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedSkillLevel("all");
                }}
                className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 h-11 px-6 shadow-lg"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Recommended Section */}
        {filteredModules.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Recommended <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">For You</span>
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Based on your current progress and skill level, we recommend these modules to help you improve.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainingModules
                .filter((m) => !m.isCompleted && m.progress === 0)
                .slice(0, 3)
                .map((module) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    onStart={handleStartModule}
                    className="border-blue-200 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50"
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingModules;