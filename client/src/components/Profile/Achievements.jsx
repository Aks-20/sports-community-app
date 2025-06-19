import { motion } from "framer-motion";

// ✅ Make sure this array is inside this file:
const achievements = [
  {
    id: 1,
    title: "First Tournament",
    description: "Completed your first tournament!",
    icon: "🏅",
  },
  {
    id: 2,
    title: "5 Wins Milestone",
    description: "Achieved 5 match wins.",
    icon: "🥇",
  },
  {
    id: 3,
    title: "MVP Award",
    description: "Voted MVP in a tournament.",
    icon: "🏆",
  },
  {
    id: 4,
    title: "Top Scorer",
    description: "Scored 50+ goals.",
    icon: "⚽",
  },
];

function Achievements() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-300 to-gray-400 py-16 px-4 md:px-20">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-12 text-yellow-800"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Your Achievements
      </motion.h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievements.map((achieve, idx) => (
          <motion.div
            key={achieve.id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer text-center"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
          >
            <div className="text-6xl mb-4">{achieve.icon}</div>
            <h2 className="text-2xl font-bold mb-2">{achieve.title}</h2>
            <p className="text-gray-600">{achieve.description}</p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}

export default Achievements;
