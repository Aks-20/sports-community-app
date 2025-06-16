import { useState } from "react";
import { motion } from "framer-motion";

function SkillCheck() {
  const [matchesPlayed, setMatchesPlayed] = useState("");
  const [wins, setWins] = useState("");
  const [goals, setGoals] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple logic for demo:
    const winRate = (wins / matchesPlayed) * 100;

    let skillLevel = "Beginner";
    if (winRate > 70 || goals > 100) {
      skillLevel = "Pro";
    } else if (winRate > 40 || goals > 50) {
      skillLevel = "Intermediate";
    }

    setResult(skillLevel);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center px-4">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-blue-700 mb-6"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Check Your Skill Level
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md space-y-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <label className="block">
          <span className="text-gray-700">Matches Played</span>
          <input
            type="number"
            min="1"
            required
            value={matchesPlayed}
            onChange={(e) => setMatchesPlayed(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Wins</span>
          <input
            type="number"
            min="0"
            required
            value={wins}
            onChange={(e) => setWins(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Goals Scored</span>
          <input
            type="number"
            min="0"
            required
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Check Skill
        </button>
      </motion.form>

      {result && (
        <motion.div
          className="mt-8 p-6 bg-green-100 border border-green-400 text-green-700 rounded shadow text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg font-semibold">🎉 Your Skill Level:</p>
          <p className="text-3xl font-bold mt-2">{result}</p>
        </motion.div>
      )}
    </main>
  );
}

export default SkillCheck;
