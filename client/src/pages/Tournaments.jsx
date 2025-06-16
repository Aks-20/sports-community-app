import { useState } from "react";
import { motion } from "framer-motion";

// Dummy data for now
const tournamentsData = [
  {
    id: 1,
    name: "Champions League",
    sport: "Football",
    location: "Delhi",
    date: "2025-07-15",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 2,
    name: "Open Badminton Cup",
    sport: "Badminton",
    location: "Mumbai",
    date: "2025-08-10",
    image:
      "https://images.unsplash.com/photo-1574623454405-1ff9c3a0fa0a?auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 3,
    name: "State Basketball League",
    sport: "Basketball",
    location: "Bangalore",
    date: "2025-09-05",
    image:
      "https://images.unsplash.com/photo-1533729029730-807e9b93e9d0?auto=format&fit=crop&w=1470&q=80",
  },
];

function Tournaments() {
  const [filter, setFilter] = useState("");

  const filteredTournaments = filter
    ? tournamentsData.filter((t) =>
        t.sport.toLowerCase().includes(filter.toLowerCase())
      )
    : tournamentsData;

  return (
    <main className="py-16 px-4 md:px-20 bg-gray-50 min-h-screen">
      {/* Page Heading */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-8 text-blue-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Explore Tournaments
      </motion.h1>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
        <input
          type="text"
          placeholder="Search by sport (e.g. Football, Badminton)"
          className="w-full md:w-1/3 px-4 py-2 border rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <button
          onClick={() => setFilter("")}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear Filter
        </button>
      </div>

      {/* Tournaments Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {filteredTournaments.length > 0 ? (
          filteredTournaments.map((t) => (
            <motion.div
              key={t.id}
              className="bg-white shadow rounded overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer"
              whileHover={{ scale: 1.03 }}
            >
              <img src={t.image} alt={t.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">{t.name}</h2>
                <p className="text-gray-600 mb-1">🏅 Sport: {t.sport}</p>
                <p className="text-gray-600 mb-1">📍 Location: {t.location}</p>
                <p className="text-gray-600 mb-2">📅 Date: {t.date}</p>
                <a
                  href={`/tournament/${t.id}`}
                  className="text-blue-600 underline"
                >
                  View Details
                </a>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-600">No tournaments found.</p>
        )}
      </div>
    </main>
  );
}

export default Tournaments;
