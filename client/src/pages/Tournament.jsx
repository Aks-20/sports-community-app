    
    import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Trophy, Play, Pause, ArrowRight, MapPin, Star, Zap, Target, TrendingUp } from 'lucide-react';

    
    
    import MatchLiveScore from "../components/Tournaments/MatchLiveScore";
    import TournamentCard from "../components/Tournaments/TournamentCard";
    import TeamCard from "../components/Tournaments/TeamCard";
    import FixtureTable from "../components/Tournaments/FixtureTable";
    import BracketView from "../components/Tournaments/BracketView";

    const SportConnectApp = () => {
  const tournaments = [
    {
      id: 1,
      name: "Summer Football Championship",
      image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400&h=200&fit=crop",
      date: "July 15-30, 2025",
      location: "Mumbai Sports Complex",
      status: "Ongoing",
      participants: 16,
    },
    {
      id: 2,
      name: "Cricket Premier League",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=200&fit=crop",
      date: "August 1-15, 2025",
      location: "Delhi Stadium",
      status: "Upcoming",
      participants: 12,
    },
  ];

  const teams = [
    {
      id: 1,
      name: "Mumbai Warriors",
      logo: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=50&h=50&fit=crop&crop=face",
      league: "Premier Division",
      wins: 8,
      losses: 2,
      winRate: 80,
      rating: 4,
    },
    {
      id: 2,
      name: "Delhi Dynamos",
      logo: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=50&h=50&fit=crop&crop=face",
      league: "Premier Division",
      wins: 6,
      losses: 4,
      winRate: 60,
      rating: 3,
    },
  ];

  const matches = [
    {
      date: "June 22, 2025",
      time: "18:00",
      homeTeam: {
        name: "Mumbai Warriors",
        logo: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=32&h=32&fit=crop&crop=face",
      },
      awayTeam: {
        name: "Delhi Dynamos",
        logo: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=32&h=32&fit=crop&crop=face",
      },
      score: { home: 2, away: 1 },
      status: "Live",
      venue: "Mumbai Stadium",
    },
    {
      date: "June 23, 2025",
      time: "20:00",
      homeTeam: {
        name: "Chennai Lions",
        logo: "https://images.unsplash.com/photo-1527082395-e939b847da0d?w=32&h=32&fit=crop&crop=face",
      },
      awayTeam: {
        name: "Bangalore Bulls",
        logo: "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=32&h=32&fit=crop&crop=face",
      },
      score: null,
      status: "Upcoming",
      venue: "Chennai Arena",
    },
  ];

  const bracket = {
    rounds: [
      {
        name: "Quarter Finals",
        matches: [
          {
            homeTeam: {
              name: "Team A",
              logo: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=24&h=24&fit=crop&crop=face",
            },
            awayTeam: {
              name: "Team B",
              logo: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=24&h=24&fit=crop&crop=face",
            },
            homeScore: 3,
            awayScore: 1,
            winner: "home",
            date: "June 20",
          },
        ],
      },
      {
        name: "Semi Finals",
        matches: [
          {
            homeTeam: {
              name: "Team A",
              logo: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=24&h=24&fit=crop&crop=face",
            },
            awayTeam: {
              name: "Team C",
              logo: "https://images.unsplash.com/photo-1527082395-e939b847da0d?w=24&h=24&fit=crop&crop=face",
            },
            homeScore: null,
            awayScore: null,
            winner: null,
            date: "June 25",
          },
        ],
      },
    ],
  };

  const liveMatch = {
    homeTeam: {
      name: "Mumbai Warriors",
      logo: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=64&h=64&fit=crop&crop=face",
    },
    awayTeam: {
      name: "Delhi Dynamos",
      logo: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=64&h=64&fit=crop&crop=face",
    },
    score: { home: 2, away: 1 },
    isLive: true,
    matchTime: 75,
    competition: "Premier League",
    events: [
      { time: 12, description: "Goal by Mumbai Warriors" },
      { time: 34, description: "Goal by Delhi Dynamos" },
      { time: 68, description: "Goal by Mumbai Warriors" },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4">
            SportConnect
          </h1>
          <p className="text-xl text-gray-600 font-medium">Complete Sports Management Platform</p>
        </header>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            </div>
            Live Match
          </h2>
          <MatchLiveScore match={liveMatch} />
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Trophy className="w-5 h-5 text-blue-600" />
            </div>
            Tournaments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tournaments.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            Teams
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Fixtures</h2>
          <FixtureTable matches={matches} />
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Tournament Bracket</h2>
          <BracketView bracket={bracket} />
        </section>
      </div>
    </div>
  );
};
      

    export default SportConnectApp;
