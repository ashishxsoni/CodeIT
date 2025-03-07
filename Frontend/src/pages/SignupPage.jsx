import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Header, Footer } from "../components";
import { useSelector } from "react-redux";
import { UserPlus } from "lucide-react";

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [error, setError] = useState("");
  const darkMode = useSelector((state) => state.theme.darkMode);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    
    // Create preview URL for the selected image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("⚠ All fields are required.");
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

    // TODO: Implement backend signup logic
    console.log("Signing up with:", name, email, password, profileImage);
    setError("");
    navigate("/dashboard"); // Redirect after signup
  };

  return (
    <div className={`min-h-screen flex flex-col transition-all ${
      darkMode 
        ? "bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white" 
        : "bg-gradient-to-br from-white via-blue-50 to-indigo-100 text-gray-800"
    }`}>
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6">
        <div className={`w-full max-w-md p-5 rounded-lg shadow-xl relative ${
          darkMode 
            ? "border-2 border-sky-600 bg-slate-800" 
            : "border border-sky-200 bg-white/90 backdrop-blur-sm"
        }`}>
          {/* Profile Picture Preview - Positioned at the top overlapping with the container border */}
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`rounded-full w-20 h-20 overflow-hidden shadow-lg ${
                darkMode 
                  ? "border-2 border-sky-600 bg-slate-700"
                  : "border-2 border-sky-400 bg-blue-50"
              }`}
            >
              {profilePreview ? (
                <img 
                  src={profilePreview} 
                  alt="Profile Preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </motion.div>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className={`text-xl font-bold text-center mt-11 ${
              darkMode ? "text-cyan-400" : "text-cyan-600"
            }`}
          >
            Create Account
          </motion.p>

          {/* Animated Error Message */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-center font-semibold mt-1 text-sm"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="mt-4 flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              className={`w-full px-3 py-2 rounded-md border ${
                darkMode 
                  ? "bg-slate-700 border-slate-600 text-white focus:border-sky-500 placeholder-gray-400" 
                  : "bg-blue-50/80 border-gray-300 focus:border-sky-500 text-gray-800 placeholder-gray-500"
              } focus:outline-none`}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              className={`w-full px-3 py-2 rounded-md border ${
                darkMode 
                  ? "bg-slate-700 border-slate-600 text-white focus:border-sky-500 placeholder-gray-400" 
                  : "bg-blue-50/80 border-gray-300 focus:border-sky-500 text-gray-800 placeholder-gray-500"
              } focus:outline-none`}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
              className={`w-full px-3 py-2 rounded-md border ${
                darkMode 
                  ? "bg-slate-700 border-slate-600 text-white focus:border-sky-500 placeholder-gray-400" 
                  : "bg-blue-50/80 border-gray-300 focus:border-sky-500 text-gray-800 placeholder-gray-500"
              } focus:outline-none`}
              required
            />
            
            <div className="flex flex-col">
              <label className={`text-xs mb-1 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={`w-full px-3 py-1.5 rounded-lg text-sm ${
                  darkMode ? "bg-slate-700 text-gray-300" : "bg-blue-50/80 text-gray-700"
                }`}
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03, boxShadow: "0px 8px 15px rgba(14, 165, 233, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center justify-center px-5 py-2 rounded-lg shadow-md transition-all ${
                darkMode 
                  ? "bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white" 
                  : "bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white"
              }`}
            >
              <UserPlus className="mr-2" size={16} />
              Sign Up
            </motion.button>

            <p className={`text-center text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Already have an account?{" "}
              <span
                className={`cursor-pointer hover:underline ${
                  darkMode ? "text-cyan-400" : "text-cyan-600"
                }`}
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignupPage;