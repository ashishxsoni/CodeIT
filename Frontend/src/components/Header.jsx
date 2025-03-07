import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogIn } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import ThemeButton from "./ThemeButton";
import ProfilePanel from "./ProfilePanel";
import { toggleProfilePanel } from "../redux/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = true; 
  const { isProfilePanelOpen } = useSelector((state) => state.auth);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Header Container */}
      <header className={`flex justify-between items-center p-4 shadow-md border-b transition-all 
          ${darkMode 
            ? "bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 border-gray-900 text-white" 
            : "bg-gradient-to-br from-white via-blue-50 to-indigo-100 border-gray-200 text-gray-800"}`}>
        
        {/* Left Side - Logo */}
        <NavLink to="/" className="flex items-center">
          <motion.img
            src="./Logo/3.png"
            alt="Logo"
            className="h-10 drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </NavLink>

        {/* Right Side - Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeButton />
          <NavLink
            to="/join"
            className={`flex items-center px-4 py-2 rounded-lg shadow-md transition-all 
              ${darkMode 
                ? "bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white" 
                : "bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"}`}
          >
            Join
          </NavLink>
          <NavLink
            to="/host"
            className={`flex items-center px-4 py-2 rounded-lg shadow-md transition-all 
              ${darkMode 
                ? "bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white" 
                : "bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white"}`}
          >
            Host
          </NavLink>

          {/* Profile Icon (Only when logged in) */}
          {isAuthenticated && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => dispatch(toggleProfilePanel())}
              className={`p-3 rounded-full transition-all shadow-lg 
                ${darkMode 
                  ? "bg-slate-800 hover:bg-slate-700" 
                  : "bg-white hover:bg-gray-100"}`}
            >
              <User size={22} className={`${darkMode ? "text-cyan-400" : "text-cyan-600"}`} />
            </motion.button>
          )}

          {/* Login Button (Only when logged out) */}
          {!isAuthenticated && (
            <NavLink
              to="/login"
              className={`p-3 rounded-full transition-all shadow-md 
                ${darkMode 
                  ? "bg-slate-800 hover:bg-slate-700 text-cyan-400" 
                  : "bg-white hover:bg-gray-100 text-cyan-600"}`}
            >
              <LogIn size={22} />
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 rounded-lg shadow-md transition-all 
            ${darkMode 
              ? "bg-slate-800 hover:bg-slate-700" 
              : "bg-white hover:bg-gray-100"}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`md:hidden flex flex-col items-center space-y-4 p-4 shadow-md transition-all 
              ${darkMode 
                ? "bg-slate-900 text-white" 
                : "bg-white text-gray-800"}`}
          >
            <ThemeButton />
            <NavLink
              to="/join"
              className={`w-full text-center py-2 rounded-lg transition-all 
                ${darkMode 
                  ? "bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white" 
                  : "bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Join
            </NavLink>
            <NavLink
              to="/host"
              className={`w-full text-center py-2 rounded-lg transition-all 
                ${darkMode 
                  ? "bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white" 
                  : "bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Host
            </NavLink>

            {/* Profile or Login */}
            {isAuthenticated ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  dispatch(toggleProfilePanel());
                  setIsMenuOpen(false);
                }}
                className={`p-3 rounded-full transition-all shadow-lg 
                  ${darkMode 
                    ? "bg-slate-800 hover:bg-slate-700" 
                    : "bg-white hover:bg-gray-100"}`}
              >
                <User size={22} className={`${darkMode ? "text-cyan-400" : "text-cyan-600"}`} />
              </motion.button>
            ) : (
              <NavLink
                to="/login"
                className={`w-full text-center py-2 rounded-lg transition-all 
                  ${darkMode 
                    ? "bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white" 
                    : "bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Log In
              </NavLink>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Panel */}
      <AnimatePresence>{isProfilePanelOpen && <ProfilePanel />}</AnimatePresence>
    </>
  );
};

export default Header;