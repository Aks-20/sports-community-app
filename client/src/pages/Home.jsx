import { motion } from "framer-motion";

function Home() {
  return (
    <main className="flex flex-col">

      {/* Hero Section with background image */}
      <section
        className="relative bg-cover bg-center h-[80vh] flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Animated Hero Content */}
        <motion.div
          className="relative z-10 text-white p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Join the Ultimate Sports Community
          </h1>
          <motion.p
            className="text-lg md:text-xl mb-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Compete in tournaments, connect with athletes, and level up with AI skill checks.
          </motion.p>
          <motion.div
            className="space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <a
              href="/profile"
              className="inline-block bg-blue-600 px-6 py-3 rounded hover:bg-blue-700"
            >
              Join Now
            </a>
            <a
              href="/tournaments"
              className="inline-block bg-green-600 px-6 py-3 rounded hover:bg-green-700"
            >
              View Tournaments
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section with hover animations */}
      <section className="py-16 px-4 md:px-20 bg-gray-100 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-blue-600"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          What We Offer
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Tournaments",
              desc: "Join and organize local and global tournaments for your favorite sports.",
              link: "/tournaments",
              linkText: "Explore Tournaments",
            },
            {
              title: "AI Skill Check",
              desc: "Get personalized AI-based skill analysis and level up your performance.",
              link: "/skill-check",
              linkText: "Try Skill Check",
            },
            {
              title: "Community",
              desc: "Connect with like-minded players, form teams, and grow together.",
              link: "/profile",
              linkText: "Meet the Community",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-white shadow-lg rounded p-6 cursor-pointer hover:scale-105 transform transition duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="mb-4">{feature.desc}</p>
              <a href={feature.link} className="text-blue-600 underline">
                {feature.linkText}
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section with fade */}
      <section className="py-16 px-4 md:px-20 bg-white text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-blue-600"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          What Players Say
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              quote:
                "This platform helped me find tournaments near me and improve my game with AI tips!",
              name: "— Alex, Football Player",
            },
            {
              quote:
                "I love the community feature. It’s easy to connect and form local teams.",
              name: "— Priya, Badminton Enthusiast",
            },
          ].map((t, idx) => (
            <motion.div
              key={idx}
              className="border rounded p-6 shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <p className="italic mb-4">"{t.quote}"</p>
              <h4 className="font-bold">{t.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-6">
        <p>&copy; {new Date().getFullYear()} Sports Community. All rights reserved.</p>
      </footer>
    </main>
  );
}

export default Home;
