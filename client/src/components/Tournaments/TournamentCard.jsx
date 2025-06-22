import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Trophy, Play, Pause, ArrowRight, MapPin, Star, Zap, Target, TrendingUp } from 'lucide-react';

// Enhanced Tournament Card
const TournamentCard = ({ tournament }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Live':
      case 'Ongoing':
        return 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse';
      case 'Upcoming':
        return 'bg-gradient-to-r from-blue-500 to-purple-500';
      case 'Completed':
        return 'bg-gradient-to-r from-green-500 to-emerald-500';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
      
      <div className="relative h-56 overflow-hidden">
        <img 
          src={tournament.image}
          alt={tournament.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Status badge */}
        <div className={`absolute top-4 right-4 ${getStatusColor(tournament.status)} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm`}>
          {tournament.status === 'Live' || tournament.status === 'Ongoing' ? (
            <div className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
              {tournament.status}
            </div>
          ) : tournament.status}
        </div>

        {/* Participants badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
          <Users className="w-4 h-4 mr-1" />
          {tournament.participants}
        </div>
      </div>

      <div className="relative p-6 z-20">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
          {tournament.name}
        </h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <span className="font-medium">{tournament.date}</span>
          </div>
          
          <div className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <MapPin className="w-4 h-4 text-purple-600" />
            </div>
            <span className="font-medium">{tournament.location}</span>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center group-hover:shadow-lg transform hover:scale-105">
          View Tournament
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};
export default TournamentCard;