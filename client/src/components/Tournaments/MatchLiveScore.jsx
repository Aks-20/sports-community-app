
import React, { useState, useEffect } from 'react';

import { Calendar, Clock, Users, Trophy, Play, Pause, ArrowRight, MapPin, Star, Zap, Target, TrendingUp } from 'lucide-react';

const MatchLiveScore = ({ match }) => {
  const [isLive, setIsLive] = useState(match?.isLive || false);
  const [currentTime, setCurrentTime] = useState(match?.matchTime ?? 0);

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [isLive]);

  const renderMatchTime = () => {
    if (!Number.isFinite(currentTime)) return 'TBD';
    const minutes = Math.floor(currentTime / 60);
    const extra = currentTime % 60;
    return `${minutes}'${extra > 0 ? ` + ${extra}'` : ''}`;
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-300" />
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/5 rounded-full animate-pulse delay-700" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-8">
        <div className="flex items-center">
          {isLive ? (
            <div className="flex items-center bg-red-500/30 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse mr-3"></div>
              <span className="text-sm font-bold tracking-wider">LIVE MATCH</span>
            </div>
          ) : (
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-bold tracking-wider">FULL TIME</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
          <Clock className="w-5 h-5 mr-2" />
          <span className="font-bold text-lg">{renderMatchTime()}</span>
        </div>
      </div>

      {/* Match Info */}
      <div className="relative z-10 flex items-center justify-between mb-8">
        {/* Home Team */}
        <div className="text-center flex-1">
          <div className="relative inline-block mb-4">
            <img
              src={match?.homeTeam?.logo}
              alt={match?.homeTeam?.name || 'Home Team'}
              className="w-20 h-20 mx-auto rounded-2xl border-4 border-white/50 shadow-2xl"
            />
          </div>
          <h3 className="font-bold text-xl mb-2">{match?.homeTeam?.name || 'Home'}</h3>
        </div>

        {/* Score */}
        <div className="text-center mx-8 bg-white/20 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
          <div className="text-6xl font-black mb-2 tracking-tight">
            <span className="text-shadow-lg">{match?.score?.home ?? 0}</span>
            <span className="mx-4 text-white/70">-</span>
            <span className="text-shadow-lg">{match?.score?.away ?? 0}</span>
          </div>
          <div className="text-sm font-bold text-white/90 uppercase tracking-wider">
            {match?.competition || 'Match'}
          </div>
        </div>

        {/* Away Team */}
        <div className="text-center flex-1">
          <div className="relative inline-block mb-4">
            <img
              src={match?.awayTeam?.logo}
              alt={match?.awayTeam?.name || 'Away Team'}
              className="w-20 h-20 mx-auto rounded-2xl border-4 border-white/50 shadow-2xl"
            />
          </div>
          <h3 className="font-bold text-xl mb-2">{match?.awayTeam?.name || 'Away'}</h3>
        </div>
      </div>

      {/* Events */}
      {match?.events?.length > 0 && (
        <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
          <h4 className="font-bold text-lg mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-300" />
            Recent Events
          </h4>
          <div className="space-y-3">
            {match.events.slice(-3).map((event, index) => (
              <div key={event.id || index} className="flex items-center bg-white/10 rounded-xl p-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                  <span className="font-bold text-sm">{event.time}'</span>
                </div>
                <span className="font-medium">{event.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="relative z-10 flex justify-center">
        <button
          onClick={() => setIsLive(!isLive)}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-3 rounded-2xl font-bold transition-all duration-300 flex items-center shadow-xl hover:shadow-2xl transform hover:scale-105"
        >
          {isLive ? <Pause className="w-5 h-5 mr-3" /> : <Play className="w-5 h-5 mr-3" />}
          {isLive ? 'Pause Updates' : 'Resume Updates'}
        </button>
      </div>
    </div>
  );
};
export default MatchLiveScore;