import React, { useState, useEffect } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts";
import { User, Download, RotateCcw, Plus, Trash2, Edit3, Trophy, Target, Zap } from "lucide-react";

const defaultSkills = [
  { skill: 'Speed', value: 5, category: 'Physical', icon: '⚡' },
  { skill: 'Stamina', value: 5, category: 'Physical', icon: '🏃' },
  { skill: 'Strength', value: 5, category: 'Physical', icon: '💪' },
  { skill: 'Agility', value: 5, category: 'Physical', icon: '🤸' },
  { skill: 'Dribbling', value: 5, category: 'Technical', icon: '⚽' },
  { skill: 'Passing', value: 5, category: 'Technical', icon: '🎯' },
  { skill: 'Shooting', value: 5, category: 'Technical', icon: '🥅' },
  { skill: 'Game IQ', value: 5, category: 'Mental', icon: '🧠' },
  { skill: 'Teamwork', value: 5, category: 'Mental', icon: '🤝' },
];

const presetPlayers = [
  {
    name: "Striker",
    skills: [
      { skill: 'Speed', value: 8, category: 'Physical', icon: '⚡' },
      { skill: 'Stamina', value: 6, category: 'Physical', icon: '🏃' },
      { skill: 'Strength', value: 7, category: 'Physical', icon: '💪' },
      { skill: 'Agility', value: 8, category: 'Physical', icon: '🤸' },
      { skill: 'Dribbling', value: 7, category: 'Technical', icon: '⚽' },
      { skill: 'Passing', value: 5, category: 'Technical', icon: '🎯' },
      { skill: 'Shooting', value: 9, category: 'Technical', icon: '🥅' },
      { skill: 'Game IQ', value: 7, category: 'Mental', icon: '🧠' },
      { skill: 'Teamwork', value: 6, category: 'Mental', icon: '🤝' },
    ]
  },
  {
    name: "Midfielder",
    skills: [
      { skill: 'Speed', value: 6, category: 'Physical', icon: '⚡' },
      { skill: 'Stamina', value: 9, category: 'Physical', icon: '🏃' },
      { skill: 'Strength', value: 6, category: 'Physical', icon: '💪' },
      { skill: 'Agility', value: 7, category: 'Physical', icon: '🤸' },
      { skill: 'Dribbling', value: 8, category: 'Technical', icon: '⚽' },
      { skill: 'Passing', value: 9, category: 'Technical', icon: '🎯' },
      { skill: 'Shooting', value: 6, category: 'Technical', icon: '🥅' },
      { skill: 'Game IQ', value: 9, category: 'Mental', icon: '🧠' },
      { skill: 'Teamwork', value: 9, category: 'Mental', icon: '🤝' },
    ]
  },
  {
    name: "Defender",
    skills: [
      { skill: 'Speed', value: 6, category: 'Physical', icon: '⚡' },
      { skill: 'Stamina', value: 8, category: 'Physical', icon: '🏃' },
      { skill: 'Strength', value: 9, category: 'Physical', icon: '💪' },
      { skill: 'Agility', value: 6, category: 'Physical', icon: '🤸' },
      { skill: 'Dribbling', value: 4, category: 'Technical', icon: '⚽' },
      { skill: 'Passing', value: 7, category: 'Technical', icon: '🎯' },
      { skill: 'Shooting', value: 3, category: 'Technical', icon: '🥅' },
      { skill: 'Game IQ', value: 8, category: 'Mental', icon: '🧠' },
      { skill: 'Teamwork', value: 9, category: 'Mental', icon: '🤝' },
    ]
  }
];

const EnhancedPlayerRadarChart = () => {
  const [formData, setFormData] = useState(defaultSkills);
  const [playerName, setPlayerName] = useState("Custom Player");
  const [selectedPreset, setSelectedPreset] = useState("");
  const [newSkillName, setNewSkillName] = useState("");
  const [editingSkill, setEditingSkill] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);

  const handleChange = (index, newValue) => {
    const updatedData = [...formData];
    updatedData[index].value = Number(newValue);
    setFormData(updatedData);
    setAnimationKey(prev => prev + 1);
  };

  const handlePresetChange = (presetName) => {
    if (presetName === "") {
      setFormData(defaultSkills);
      setPlayerName("Custom Player");
    } else {
      const preset = presetPlayers.find(p => p.name === presetName);
      if (preset) {
        setFormData(preset.skills);
        setPlayerName(preset.name);
      }
    }
    setSelectedPreset(presetName);
    setAnimationKey(prev => prev + 1);
  };

  const addSkill = () => {
    if (newSkillName.trim()) {
      const newSkill = {
        skill: newSkillName,
        value: 5,
        category: 'Custom',
        icon: '⭐'
      };
      setFormData([...formData, newSkill]);
      setNewSkillName("");
      setAnimationKey(prev => prev + 1);
    }
  };

  const removeSkill = (index) => {
    const updatedData = formData.filter((_, i) => i !== index);
    setFormData(updatedData);
    setAnimationKey(prev => prev + 1);
  };

  const editSkillName = (index, newName) => {
    const updatedData = [...formData];
    updatedData[index].skill = newName;
    setFormData(updatedData);
    setEditingSkill(null);
  };

  const resetAll = () => {
    setFormData(defaultSkills);
    setPlayerName("Custom Player");
    setSelectedPreset("");
    setAnimationKey(prev => prev + 1);
  };

  const downloadChart = () => {
    const chartData = {
      playerName,
      skills: formData,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(chartData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${playerName.replace(/\s+/g, '_')}_radar_chart.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getOverallRating = () => {
    const total = formData.reduce((sum, skill) => sum + skill.value, 0);
    return Math.round((total / formData.length) * 10) / 10;
  };

  const getCategoryColors = (category) => {
    const colors = {
      'Physical': '#FF6B6B',
      'Technical': '#4ECDC4',
      'Mental': '#45B7D1',
      'Custom': '#96CEB4'
    };
    return colors[category] || '#8884d8';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <Trophy className="text-yellow-500" />
            Player Performance Radar
            <Target className="text-green-500" />
          </h1>
          <p className="text-lg text-gray-600">Analyze and visualize player skills across multiple dimensions</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <User className="text-blue-500" />
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="text-xl font-semibold bg-transparent border-b-2 border-blue-200 focus:border-blue-500 outline-none px-2 py-1"
                placeholder="Player Name"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedPreset}
                onChange={(e) => handlePresetChange(e.target.value)}
                className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Custom Player</option>
                {presetPlayers.map(player => (
                  <option key={player.name} value={player.name}>{player.name}</option>
                ))}
              </select>
              
              <button
                onClick={resetAll}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <RotateCcw size={16} />
                Reset
              </button>
              
              <button
                onClick={downloadChart}
                className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
              >
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          {/* Overall Rating */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Overall Rating</h3>
                <p className="text-sm opacity-90">Average across all skills</p>
              </div>
              <div className="text-4xl font-bold">
                {getOverallRating()}/100
              </div>
            </div>
          </div>

          {/* Add New Skill */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="Add new skill..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            />
            <button
              onClick={addSkill}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <Plus size={16} />
              Add
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Skills Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className="text-yellow-500" />
                Skills Configuration
              </h3>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {formData.map((item, index) => (
                  <div key={`${item.skill}-${index}`} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.icon}</span>
                        {editingSkill === index ? (
                          <input
                            type="text"
                            value={item.skill}
                            onChange={(e) => editSkillName(index, e.target.value)}
                            onBlur={() => setEditingSkill(null)}
                            onKeyPress={(e) => e.key === 'Enter' && setEditingSkill(null)}
                            className="font-medium bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                            autoFocus
                          />
                        ) : (
                          <span
                            className="font-medium cursor-pointer hover:text-blue-600"
                            onClick={() => setEditingSkill(index)}
                          >
                            {item.skill}
                          </span>
                        )}
                        <span
                          className="text-xs px-2 py-1 rounded-full text-white font-medium"
                          style={{ backgroundColor: getCategoryColors(item.category) }}
                        >
                          {item.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold min-w-8 text-center">
                          {item.value}
                        </span>
                        <button
                          onClick={() => removeSkill(index)}
                          className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={item.value}
                      onChange={(e) => handleChange(index, e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none slider cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, ${getCategoryColors(item.category)} 0%, ${getCategoryColors(item.category)} ${item.value * 10}%, #e5e7eb ${item.value * 10}%, #e5e7eb 100%)`
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chart Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold mb-6 text-center">
                {playerName} - Performance Radar
              </h3>
              
              <div className="relative">
                <ResponsiveContainer width="100%" height={600}>
                  <RadarChart
                    key={animationKey}
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    data={formData}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <PolarGrid 
                      gridType="polygon"
                      radialLines={true}
                      stroke="#e5e7eb"
                      strokeWidth={1}
                    />
                    <PolarAngleAxis 
                      dataKey="skill" 
                      tick={{ fontSize: 12, fontWeight: 'bold' }}
                      className="text-gray-700"
                    />
                    <PolarRadiusAxis 
                      angle={90}
                      domain={[0, 10]}
                      tick={{ fontSize: 10 }}
                      tickCount={6}
                      stroke="#9ca3af"
                    />
                    <Radar
                      name={playerName}
                      dataKey="value"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
                
                {/* Performance Insights */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Physical', 'Technical', 'Mental', 'Custom'].map(category => {
                    const categorySkills = formData.filter(skill => skill.category === category);
                    if (categorySkills.length === 0) return null;
                    
                    const avgScore = categorySkills.reduce((sum, skill) => sum + skill.value, 0) / categorySkills.length;
                    
                    return (
                      <div key={category} className="text-center p-3 rounded-lg bg-gray-50">
                        <div 
                          className="text-2xl font-bold mb-1"
                          style={{ color: getCategoryColors(category) }}
                        >
                          {avgScore.toFixed(1)}
                        </div>
                        <div className="text-sm text-gray-600">{category}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default EnhancedPlayerRadarChart;