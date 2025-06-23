import {
  Target,
  ArrowLeft,
  Users,
  Trophy,
  MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const Community = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/10 to-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="inline-flex items-center h-9 px-3 rounded-md text-sm font-medium transition-colors ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-accent hover:text-accent-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">Community</span>
            </div>
          </div>
          <Link
            to="/training"
            className="inline-flex items-center h-9 px-3 rounded-md text-sm font-medium transition-colors ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-accent hover:text-accent-foreground"
          >
            Training
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold mb-4 animate-pulse">
          🚧 Coming Soon!
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Community Features</h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-xl mx-auto">
          We're creating a vibrant space for players and coaches to connect, grow, and thrive together.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="container mx-auto px-4 pb-16 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
        {[
          { icon: MessageCircle, text: "Chat with teammates" },
          { icon: Trophy, text: "Challenge friends" },
          { icon: Users, text: "Join training groups" },
          { icon: Target, text: "Share your progress" },
        ].map(({ icon: Icon, text }, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 border border-border/40 rounded-lg bg-card shadow-sm hover:shadow-md transition"
          >
            <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center rounded-full">
              <Icon className="w-5 h-5" />
            </div>
            <span className="font-medium text-sm sm:text-base">{text}</span>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-primary text-primary-foreground py-10">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Start Your Training Today</h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Don’t wait for the community to launch — begin your personal progress journey right now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              to="/training"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-background text-primary hover:bg-muted border border-border px-5 py-2 transition-colors"
            >
              Go to Training
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-muted text-muted-foreground hover:bg-muted/70 px-5 py-2 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
