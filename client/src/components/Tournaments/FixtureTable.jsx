import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Trophy, Play, Pause, ArrowRight, MapPin, Star, Zap, Target, TrendingUp } from 'lucide-react';

const FixtureTable = ({ matches }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Live':
        return 'bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse';
      case 'Completed':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'Upcoming':
        return 'bg-gradient-to-r from-blue-500 to-purple-500 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          Fixture Schedule
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Date & Time</th>
              <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Teams</th>
              <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Score</th>
              <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Venue</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {(matches && matches.length > 0) ? (
              matches.map((match, index) => (
                <tr key={match.id || index} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group">
                  <td className="px-8 py-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors duration-300">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{match.date}</div>
                        <div className="text-sm text-gray-500 font-medium">{match.time}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-between max-w-sm">
                      <div className="flex items-center">
                        <img className="h-10 w-10 rounded-xl shadow-md mr-3" src={match.homeTeam.logo} alt={match.homeTeam.name} />
                        <span className="text-sm font-bold text-gray-900">{match.homeTeam.name}</span>
                      </div>
                      <div className="mx-4 px-3 py-1 bg-gray-100 rounded-lg">
                        <span className="text-gray-600 font-bold text-sm">VS</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-bold text-gray-900">{match.awayTeam.name}</span>
                        <img className="h-10 w-10 rounded-xl shadow-md ml-3" src={match.awayTeam.logo} alt={match.awayTeam.name} />
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-8 py-6">
                    <div className="text-lg font-bold text-gray-900 bg-gray-50 rounded-lg px-4 py-2 text-center min-w-16">
                      {(match.score?.home != null && match.score?.away != null)
                        ? `${match.score.home} - ${match.score.away}`
                        : '- : -'}
                    </div>
                  </td>
                  
                  <td className="px-8 py-6">
                    <span className={`inline-flex px-4 py-2 text-sm font-bold rounded-xl shadow-md ${getStatusColor(match.status)}`}>
                      {match.status === 'Live' && <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />}
                      {match.status}
                    </span>
                  </td>
                  
                  <td className="px-8 py-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="font-medium">{match.venue}</span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-12">
                  <div className="text-gray-400">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No matches scheduled</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default FixtureTable;