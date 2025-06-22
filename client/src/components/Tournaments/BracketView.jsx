
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Trophy, Play, Pause, ArrowRight, MapPin, Star, Zap, Target, TrendingUp } from 'lucide-react';

const BracketView = ({ bracket }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center mb-8">
        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mr-4">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Tournament Bracket</h2>
      </div>
      
      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-12 min-w-max">
          {bracket?.rounds?.length > 0 ? (
            bracket.rounds.map((round, roundIndex) => (
              <div key={roundIndex} className="flex flex-col space-y-6">
                <div className="text-center mb-6">
                  <h3 className="font-bold text-lg text-gray-800 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-2xl">
                    {round.name}
                  </h3>
                </div>
                
                {round.matches.map((match, matchIndex) => (
                  <div key={match.id || matchIndex} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 min-w-80 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                    <div className="space-y-3">
                      {/* Home Team */}
                      <div className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                        match.winner === 'home' 
                          ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 shadow-md' 
                          : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="flex items-center">
                          <img 
                            src={match.homeTeam?.logo} 
                            alt={match.homeTeam?.name || 'Home Team'} 
                            className="w-8 h-8 rounded-xl mr-3 shadow-sm" 
                          />
                          <span className="font-bold text-gray-800">{match.homeTeam?.name || 'TBD'}</span>
                          {match.winner === 'home' && <Trophy className="w-4 h-4 text-yellow-500 ml-2" />}
                        </div>
                        <span className="font-black text-xl text-gray-800">
                          {match.homeScore != null ? match.homeScore : '-'}
                        </span>
                      </div>
                      
                      {/* Away Team */}
                      <div className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                        match.winner === 'away' 
                          ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 shadow-md' 
                          : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="flex items-center">
                          <img 
                            src={match.awayTeam?.logo} 
                            alt={match.awayTeam?.name || 'Away Team'} 
                            className="w-8 h-8 rounded-xl mr-3 shadow-sm" 
                          />
                          <span className="font-bold text-gray-800">{match.awayTeam?.name || 'TBD'}</span>
                          {match.winner === 'away' && <Trophy className="w-4 h-4 text-yellow-500 ml-2" />}
                        </div>
                        <span className="font-black text-xl text-gray-800">
                          {match.awayScore != null ? match.awayScore : '-'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-center mt-4 bg-white rounded-xl px-4 py-2">
                      <span className="text-sm font-medium text-gray-600 flex items-center justify-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {match.date || 'Date TBD'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">No bracket data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default BracketView;