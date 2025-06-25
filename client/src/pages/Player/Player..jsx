
import React, { useState, useEffect } from 'react';
import { 
  Trophy, Target, TrendingUp, Calendar, Clock, 
  Users, Award, Activity, BarChart3, Star,
  Play, Pause, Plus, CheckCircle, User,
  Zap, Heart, Timer, Medal, Settings
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts';
import { Link } from 'react-router-dom';

const PlayerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [trainingSession, setTrainingSession] = useState(null);
  const [weeklyGoals, setWeeklyGoals] = useState([
    { id: 1, title: 'Complete 5 training sessions', progress: 80, completed: 4, total: 5 },
    { id: 2, title: 'Improve shooting accuracy by 5%', progress: 60, current: 73, target: 77 },
    { id: 3, title: 'Run 20km total distance', progress: 75, current: 15, target: 20 }
  ]);

  // Mock data - in real app, this would come from API
  const playerStats = {
    name: "Alex Johnson",
    level: "Intermediate",
    primarySport: "Basketball",
    totalHours: 245,
    streak: 12,
    rank: 15,
    points: 3250
  };

  const performanceData = [
    { date: 'Mon', shooting: 65, defense: 72, fitness: 78, overall: 72 },
    { date: 'Tue', shooting: 68, defense: 75, fitness: 80, overall: 74 },
    { date: 'Wed', shooting: 72, defense: 78, fitness: 82, overall: 77 },
    { date: 'Thu', shooting: 70, defense: 80, fitness: 84, overall: 78 },
    { date: 'Fri', shooting: 75, defense: 82, fitness: 86, overall: 81 },
    { date: 'Sat', shooting: 73, defense: 84, fitness: 88, overall: 82 },
    { date: 'Sun', shooting: 77, defense: 85, fitness: 90, overall: 84 }
  ];

  const skillBreakdown = [
    { name: 'Shooting', value: 77, color: '#8b5cf6' },
    { name: 'Defense', value: 85, color: '#06b6d4' },
    { name: 'Fitness', value: 90, color: '#10b981' },
    { name: 'Teamwork', value: 82, color: '#f59e0b' }
  ];

  const recentActivities = [
    { id: 1, type: 'training', title: 'Completed Shooting Drills', time: '2 hours ago', points: 50 },
    { id: 2, type: 'achievement', title: 'Unlocked Defense Master Badge', time: '1 day ago', points: 100 },
    { id: 3, type: 'training', title: 'Fitness Circuit Training', time: '2 days ago', points: 75 },
    { id: 4, type: 'community', title: 'Joined Basketball Fundamentals Group', time: '3 days ago', points: 25 }
  ];

  const upcomingTraining = [
    { id: 1, title: 'Advanced Shooting Techniques', time: 'Today 6:00 PM', duration: '60 min', type: 'skill' },
    { id: 2, title: 'Team Scrimmage', time: 'Tomorrow 7:00 PM', duration: '90 min', type: 'game' },
    { id: 3, title: 'Cardio & Conditioning', time: 'Wed 5:30 PM', duration: '45 min', type: 'fitness' }
  ];

  const startTraining = (session) => {
    setTrainingSession({ ...session, startTime: Date.now(), elapsed: 0 });
  };

  const stopTraining = () => {
    setTrainingSession(null);
  };

  useEffect(() => {
    let interval;
    if (trainingSession) {
      interval = setInterval(() => {
        setTrainingSession(prev => ({
          ...prev,
          elapsed: Math.floor((Date.now() - prev.startTime) / 1000)
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [trainingSession]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color = "text-blue-600" }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <Icon className={`w-12 h-12 ${color}`} />
      </div>
    </div>
  );

  const GoalCard = ({ goal }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-900">{goal.title}</h4>
        <span className="text-sm font-semibold text-blue-600">{goal.progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${goal.progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600">
        {goal.completed ? `${goal.completed}/${goal.total} completed` : `${goal.current}/${goal.target}`}
      </p>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const getIcon = () => {
      switch(activity.type) {
        case 'training': return <Play className="w-4 h-4" />;
        case 'achievement': return <Award className="w-4 h-4" />;
        case 'community': return <Users className="w-4 h-4" />;
        default: return <Activity className="w-4 h-4" />;
      }
    };

    const getColor = () => {
      switch(activity.type) {
        case 'training': return 'text-blue-600 bg-blue-100';
        case 'achievement': return 'text-yellow-600 bg-yellow-100';
        case 'community': return 'text-green-600 bg-green-100';
        default: return 'text-gray-600 bg-gray-100';
      }
    };

    return (
      <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div className={`p-2 rounded-full ${getColor()}`}>
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-900">{activity.title}</p>
          <p className="text-sm text-gray-500">{activity.time}</p>
        </div>
        <span className="text-sm font-semibold text-blue-600">+{activity.points} pts</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{playerStats.name}</h1>
                <p className="text-sm text-gray-600">{playerStats.level} • {playerStats.primarySport}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-gray-900">{playerStats.streak} day streak</span>
              </div> 
              <Link to="/settings" className="flex items-center space-x-2"  >
                <Settings className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900" />
              </Link>
            

            </div>
          </div>
        </div>
      </div>

      {/* Training Session Timer */}
      {trainingSession && (
        <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span className="font-semibold">{trainingSession.title}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Timer className="w-4 h-4" />
                <span className="font-mono text-lg">{formatTime(trainingSession.elapsed)}</span>
              </div>
            </div>
            <button 
              onClick={stopTraining}
              className="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Pause className="w-4 h-4 inline mr-2" />
              End Session
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'training', label: 'Training', icon: Target },
            { id: 'progress', label: 'Progress', icon: TrendingUp },
            { id: 'community', label: 'Community', icon: Users }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                icon={Clock} 
                title="Training Hours" 
                value={playerStats.totalHours}
                subtitle="This month: 45hrs"
                color="text-blue-600"
              />
              <StatCard 
                icon={Trophy} 
                title="Community Rank" 
                value={`#${playerStats.rank}`}
                subtitle="Top 5% globally"
                color="text-yellow-600"
              />
              <StatCard 
                icon={Star} 
                title="Total Points" 
                value={playerStats.points.toLocaleString()}
                subtitle="+250 this week"
                color="text-purple-600"
              />
              <StatCard 
                icon={Heart} 
                title="Streak Days" 
                value={playerStats.streak}
                subtitle="Personal best: 28"
                color="text-red-600"
              />
            </div>

            {/* Performance Chart */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="overall" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 4 }} />
                  <Line type="monotone" dataKey="shooting" stroke="#06b6d4" strokeWidth={2} />
                  <Line type="monotone" dataKey="defense" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="fitness" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Skills Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Skill Breakdown</h3>
                <div className="space-y-4">
                  {skillBreakdown.map((skill) => (
                    <div key={skill.name} className="flex items-center justify-between">
                      <span className="font-medium text-gray-700">{skill.name}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 rounded-full h-3">
                          <div 
                            className="h-3 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${skill.value}%`,
                              backgroundColor: skill.color
                            }}
                          ></div>
                        </div>
                        <span className="font-bold text-gray-900 w-8">{skill.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Goals</h3>
                <div className="space-y-4">
                  {weeklyGoals.map((goal) => (
                    <GoalCard key={goal.id} goal={goal} />
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-2">
                {recentActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'training' && (
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-bold mb-2">Start Quick Training</h3>
                <p className="text-blue-100 mb-4">15-minute skill builder</p>
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  <Play className="w-4 h-4 inline mr-2" />
                  Start Now
                </button>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-bold mb-2">Join Group Session</h3>
                <p className="text-purple-100 mb-4">3 players online now</p>
                <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  <Users className="w-4 h-4 inline mr-2" />
                  Join Group
                </button>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                <h3 className="text-lg font-bold mb-2">Custom Workout</h3>
                <p className="text-green-100 mb-4">Build your own routine</p>
                <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  <Plus className="w-4 h-4 inline mr-2" />
                  Create
                </button>
              </div>
            </div>

            {/* Upcoming Training */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Upcoming Training Sessions</h3>
              <div className="space-y-4">
                {upcomingTraining.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${
                        session.type === 'skill' ? 'bg-blue-100 text-blue-600' :
                        session.type === 'game' ? 'bg-green-100 text-green-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {session.type === 'skill' ? <Target className="w-5 h-5" /> :
                         session.type === 'game' ? <Users className="w-5 h-5" /> :
                         <Activity className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{session.title}</h4>
                        <p className="text-sm text-gray-600">{session.time} • {session.duration}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => startTraining(session)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Play className="w-4 h-4 inline mr-2" />
                      Start
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Training Modules */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Available Training Modules</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Shooting Fundamentals', progress: 85, lessons: 12, duration: '4 hours' },
                  { title: 'Defensive Strategies', progress: 60, lessons: 8, duration: '3 hours' },
                  { title: 'Fitness & Conditioning', progress: 45, lessons: 15, duration: '6 hours' },
                  { title: 'Team Communication', progress: 90, lessons: 6, duration: '2 hours' },
                  { title: 'Mental Game', progress: 30, lessons: 10, duration: '5 hours' },
                  { title: 'Advanced Techniques', progress: 0, lessons: 20, duration: '8 hours' }
                ].map((module, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-gray-900 mb-2">{module.title}</h4>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{module.lessons} lessons</span>
                        <span>{module.duration}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-600">{module.progress}% complete</span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Leaderboard</h3>
              <div className="space-y-3">
                {[
                  { rank: 1, name: 'Sarah Chen', points: 4250, change: '+2', avatar: '👩' },
                  { rank: 2, name: 'Mike Rodriguez', points: 4100, change: '-1', avatar: '👨' },
                  { rank: 3, name: 'Emma Wilson', points: 3980, change: '+1', avatar: '👱‍♀️' },
                  { rank: 4, name: 'You (Alex Johnson)', points: 3250, change: '+3', avatar: '🏀', isUser: true },
                  { rank: 5, name: 'David Kim', points: 3120, change: '-2', avatar: '👨‍💻' }
                ].map((player, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                    player.isUser ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        player.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                        player.rank === 2 ? 'bg-gray-100 text-gray-800' :
                        player.rank === 3 ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {player.rank}
                      </div>
                      <span className="text-2xl">{player.avatar}</span>
                      <div>
                        <p className={`font-medium ${player.isUser ? 'text-blue-900' : 'text-gray-900'}`}>
                          {player.name}
                        </p>
                        <p className="text-sm text-gray-600">{player.points.toLocaleString()} points</p>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-1 ${
                      player.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <span className="text-sm font-medium">{player.change}</span>
                      {player.change.startsWith('+') ? 
                        <TrendingUp className="w-4 h-4" /> : 
                        <TrendingUp className="w-4 h-4 rotate-180" />
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Training Challenges */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Active Challenges</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: '30-Day Shooting Challenge',
                    description: 'Improve shooting accuracy by 10%',
                    participants: 156,
                    timeLeft: '12 days left',
                    progress: 65,
                    reward: '500 points'
                  },
                  {
                    title: 'Team Spirit Week',
                    description: 'Complete 5 team training sessions',
                    participants: 89,
                    timeLeft: '3 days left',
                    progress: 80,
                    reward: 'Team Player Badge'
                  },
                  {
                    title: 'Fitness Marathon',
                    description: 'Log 20 hours of fitness training',
                    participants: 234,
                    timeLeft: '18 days left',
                    progress: 45,
                    reward: 'Endurance Master Badge'
                  },
                  {
                    title: 'Skill Master Challenge',
                    description: 'Complete 3 advanced skill modules',
                    participants: 67,
                    timeLeft: '25 days left',
                    progress: 33,
                    reward: '1000 points'
                  }
                ].map((challenge, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{challenge.title}</h4>
                        <p className="text-sm text-gray-600">{challenge.description}</p>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {challenge.participants} joined
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{challenge.timeLeft}</span>
                        <span className="font-medium text-gray-900">{challenge.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${challenge.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-green-600 font-medium">🏆 {challenge.reward}</span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Community Activity */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Community Feed</h3>
              <div className="space-y-4">
                {[
                  {
                    user: 'Sarah Chen',
                    action: 'completed the Advanced Shooting module',
                    time: '2 hours ago',
                    likes: 12,
                    avatar: '👩'
                  },
                  {
                    user: 'Mike Rodriguez',
                    action: 'achieved a new personal best in fitness training',
                    time: '4 hours ago',
                    likes: 8,
                    avatar: '👨'
                  },
                  {
                    user: 'Emma Wilson',
                    action: 'unlocked the Defense Master badge',
                    time: '1 day ago',
                    likes: 15,
                    avatar: '👱‍♀️'
                  },
                  {
                    user: 'Local Training Group',
                    action: 'scheduled a group training session for tomorrow',
                    time: '1 day ago',
                    likes: 6,
                    avatar: '👥'
                  }
                ].map((post, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-2xl">{post.avatar}</span>
                    <div className="flex-1">
                      <p className="text-gray-900">
                        <span className="font-medium">{post.user}</span> {post.action}
                      </p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500">{post.time}</span>
                        <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-red-600">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerDashboard;