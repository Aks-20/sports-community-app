import { useState } from "react";

function Signup() {
  const [isLogin, setIsLogin] = useState(false);

  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {isLogin ? "Login" : "Signup"}
      </h1>

      {/* Email/Password form (optional) */}
      <form className="space-y-4 mb-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>

      <div className="text-center mb-4">OR</div>

      {/* Google Sign-In placeholder */}
      <button
        onClick={() => alert("Google Auth logic here")}
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >
        Continue with Google
      </button>

      <p className="text-center mt-4">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={toggleMode}
          className="text-blue-600 underline ml-1"
        >
          {isLogin ? "Signup" : "Login"}
        </button>
      </p>
    </main>
  );
}

export default Signup;
