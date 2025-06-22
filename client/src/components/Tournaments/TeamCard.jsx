


import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Trophy, Play, Pause, ArrowRight, MapPin, Star, Zap, Target, TrendingUp } from 'lucide-react';

const TeamCard = ({ team }) => {
  const [isHovered, setIsHovered] = useState(false);
  const winRate = team?.winRate ?? 0;
  const rating = team?.rating ?? 0;
  const isTopTeam = winRate >= 75;

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 p-6 border border-gray-100 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Top performance indicator */}
      {isTopTeam && (
        <div className="absolute -top-2 -right-2 w-16 h-16">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse" />
          <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
        </div>
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-3 border-gradient-to-r from-blue-400 to-purple-500 shadow-lg">
                <img 
                  src={team?.logo || '/default-logo.png'}
                  alt={team?.name || 'Team'}
                  className="w-full h-full object-cover"
                />
              </div>
              {isTopTeam && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Star className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            
            <div className="ml-4">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {team?.name || 'Unnamed Team'}
              </h3>
              <p className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {team?.league || 'Unknown League'}
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end mb-2">
              <div className="bg-green-100 rounded-lg px-3 py-1 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm font-bold text-green-700">{team?.wins ?? 0}W</span>
              </div>
            </div>
            <div className="bg-red-100 rounded-lg px-3 py-1 flex items-center justify-center">
              <span className="text-sm font-bold text-red-700">{team?.losses ?? 0}L</span>
            </div>
          </div>
        </div>

        {/* Win Rate Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Win Rate</span>
            <span className="text-sm font-bold text-green-600">{winRate}%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000 rounded-full relative"
              style={{ width: isHovered ? `${winRate}%` : '0%' }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
            </div>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Team Rating</span>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 transition-all duration-300 ${
                  star <= rating 
                    ? 'text-yellow-400 fill-current transform scale-110' 
                    : 'text-gray-300 hover:text-yellow-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Performance indicators */}
        <div className="mt-4 flex justify-between text-xs">
          <div className="flex items-center text-gray-500">
            <Target className="w-3 h-3 mr-1" />
            <span>Performance</span>
          </div>
          <div className={`font-semibold ${winRate >= 75 ? 'text-green-600' : winRate >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
            {winRate >= 75 ? 'Excellent' : winRate >= 50 ? 'Good' : 'Needs Improvement'}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TeamCard;