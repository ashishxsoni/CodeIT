import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Header, Footer } from "../components";
import { useSelector } from "react-redux";
import { LogIn } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const darkMode = useSelector((state) => state.theme.darkMode);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("⚠ Email and Password are required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("⚠ Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("⚠ Password must be at least 6 characters long.");
      return;
    }

    // TODO: Implement backend authentication logic
    console.log("Logging in with:", email, password);
    setError("");
    navigate("/dashboard"); // Redirect after login
  };

  return (
    <div className={`min-h-screen flex flex-col transition-all ${
      darkMode 
        ? "bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white" 
        : "bg-gradient-to-br from-white via-blue-50 to-indigo-100 text-gray-800"
    }`}>
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className={`w-full max-w-md p-6 rounded-lg shadow-xl ${
          darkMode 
            ? "border-2 border-cyan-600 bg-slate-800" 
            : "border border-sky-200 bg-white/90 backdrop-blur-sm"
        }`}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <img 
              src="/Logo/3.png" 
              alt="Logo" 
              className="h-16 drop-shadow-lg"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className={`text-2xl font-bold text-center ${
              darkMode ? "text-cyan-400" : "text-cyan-600"
            }`}
          >
            Login to Your Account
          </motion.p>

          {/* Animated Error Message */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-center font-semibold mt-2"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col space-y-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (email.trim() && password.trim()) setError("");
              }}
              className={`w-full px-4 py-3 rounded-md border ${
                darkMode 
                  ? "bg-slate-700 border-slate-600 text-white focus:border-cyan-500 placeholder-gray-400" 
                  : "bg-blue-50/80 border-gray-300 focus:border-cyan-500 text-gray-800 placeholder-gray-500"
              } focus:outline-none`}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (email.trim() && password.trim()) setError("");
              }}
              className={`w-full px-4 py-3 rounded-md border ${
                darkMode 
                  ? "bg-slate-700 border-slate-600 text-white focus:border-cyan-500 placeholder-gray-400" 
                  : "bg-blue-50/80 border-gray-300 focus:border-cyan-500 text-gray-800 placeholder-gray-500"
              } focus:outline-none`}
              required
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(6, 182, 212, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center justify-center px-6 py-3 rounded-lg shadow-md transition-all ${
                darkMode 
                  ? "bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white" 
                  : "bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
              }`}
            >
              <LogIn className="mr-2" size={20} />
              Login
            </motion.button>

            <p className={`text-center ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Don't have an account?{" "}
              <span
                className={`cursor-pointer hover:underline ${
                  darkMode ? "text-cyan-400" : "text-cyan-600"
                }`}
                onClick={() => navigate("/signup")}
              >
                Sign up
              </span>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;