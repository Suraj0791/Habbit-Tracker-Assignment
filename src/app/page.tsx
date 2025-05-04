"use client";
import type React from "react";
import { useState, useEffect, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// NOTE: make sure you install the lucide-react package using the following command: "npm install lucide-react@0.263.1 --legacy-peer-deps"
import {
  Bell,
  BarChart2,
  Settings,
  LogOut,
  User,
  Moon,
  Droplet,
  Clock,
  Trophy,
  X,
  Plus,
  Check,
  Sun,
  Star,
  Calendar,
} from "lucide-react";

// Type definition for Notification
type Notification = {
  message: string;
  type: "success" | "error" | "info";
};

// Mock data
const initialHabits = [
  {
    id: 1,
    name: "Sleep",
    icon: <Moon />,
    unit: "hours",
    target: 8,
    entries: [
      { date: "2025-04-28", value: 7.5 },
      { date: "2025-04-29", value: 8 },
      { date: "2025-04-30", value: 7 },
      { date: "2025-05-01", value: 8.5 },
      { date: "2025-05-02", value: 7.5 },
      { date: "2025-05-03", value: 9 },
      { date: "2025-05-04", value: 0 },
    ],
    streak: 6,
  },
  {
    id: 2,
    name: "Water",
    icon: <Droplet />,
    unit: "glasses",
    target: 8,
    entries: [
      { date: "2025-04-28", value: 6 },
      { date: "2025-04-29", value: 8 },
      { date: "2025-04-30", value: 7 },
      { date: "2025-05-01", value: 5 },
      { date: "2025-05-02", value: 8 },
      { date: "2025-05-03", value: 6 },
      { date: "2025-05-04", value: 3 },
    ],
    streak: 7,
  },
  {
    id: 3,
    name: "Screen Time",
    icon: <Clock />,
    unit: "hours",
    target: 3,
    entries: [
      { date: "2025-04-28", value: 4.5 },
      { date: "2025-04-29", value: 3.5 },
      { date: "2025-04-30", value: 2.5 },
      { date: "2025-05-01", value: 3 },
      { date: "2025-05-02", value: 4 },
      { date: "2025-05-03", value: 5 },
      { date: "2025-05-04", value: 2 },
    ],
    streak: 4,
  },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Main App Component
export default function HabitTracker() {
  const [habits, setHabits] = useState(initialHabits);
  const [selectedHabit, setSelectedHabit] = useState(initialHabits[0]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Format data for weekly progress chart
  const getChartData = () => {
    return selectedHabit.entries.map((entry, index) => ({
      name: days[index],
      value: entry.value,
      target: selectedHabit.target,
    }));
  };

  // Calculate average for selected habit
  const getAverage = () => {
    const sum = selectedHabit.entries.reduce(
      (acc, entry) => acc + entry.value,
      0
    );
    return (sum / selectedHabit.entries.length).toFixed(1);
  };

  // Calculate percentage completion for today
  const getTodayCompletion = () => {
    const today = selectedHabit.entries[selectedHabit.entries.length - 1].value;
    return Math.min(Math.round((today / selectedHabit.target) * 100), 100);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    // Apply dark mode class to document for global styling
    if (!isDarkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  };

  // Toggle settings modal
  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  // Toggle add habit modal
  const toggleAddHabit = () => {
    setIsAddHabitOpen(!isAddHabitOpen);
  };
  const Navbar = () => (
    <nav className="bg-indigo-700 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BarChart2 className="h-6 w-6" />
          <h1 className="text-xl font-bold">Habit Tracker</h1>
        </motion.div>
        <div className="flex items-center space-x-4">
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-indigo-600"
            onClick={() => {
              setNotification({
                message: "Notifications checked!",
                type: "info",
              });
              setTimeout(() => setNotification(null), 3000);
            }}
          >
            <Bell className="h-5 w-5" />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            whileHover={{ scale: 1.1, rotate: [0, 10, -10, 10, 0] }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-indigo-600"
            onClick={toggleSettings}
          >
            <Settings className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </nav>
  );

  // Component: Footer
  const Footer = () => (
    <footer
      className={`${
        isDarkMode ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-600"
      } p-4 mt-8 transition-colors duration-300`}
    >
      <div className="container mx-auto text-center">
        <p>© 2025 Habit Tracker App. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="#"
            className={`${
              isDarkMode
                ? "text-gray-400 hover:text-indigo-400"
                : "hover:text-indigo-600"
            } transition-colors duration-200`}
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className={`${
              isDarkMode
                ? "text-gray-400 hover:text-indigo-400"
                : "hover:text-indigo-600"
            } transition-colors duration-200`}
          >
            Terms of Service
          </a>
          <a
            href="#"
            className={`${
              isDarkMode
                ? "text-gray-400 hover:text-indigo-400"
                : "hover:text-indigo-600"
            } transition-colors duration-200`}
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );

  // Component: Landing Section
  const LandingSection = () => (
    <div
      className={`${
        isDarkMode
          ? "bg-gradient-to-r from-purple-900 to-indigo-900"
          : "bg-gradient-to-r from-indigo-600 to-purple-600"
      } py-12 text-white transition-colors duration-300`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            className="inline-block mb-4"
            animate={{
              rotate: [0, 5, 0, -5, 0],
              scale: [1, 1.1, 1, 1.1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            <Calendar className="h-16 w-16 mx-auto" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">
            Transform Your Habits, Transform Your Life
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Track your habits, visualize your progress, and achieve your goals
            with our powerful habit tracking tools.
          </p>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={toggleAddHabit}
          >
            Add New Habit
          </motion.button>
        </motion.div>
      </div>
    </div>
  );

  // Component: Habit Selection
  const HabitSelection = () => (
    <div className="container mx-auto px-4 py-8">
      <motion.h3
        className="text-xl font-semibold mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Your Habits
      </motion.h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {habits.map((habit, index) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.97 }}
            className={`p-4 rounded-lg shadow cursor-pointer transition-all ${
              selectedHabit.id === habit.id
                ? isDarkMode
                  ? "bg-indigo-900 border-2 border-indigo-500"
                  : "bg-indigo-100 border-2 border-indigo-500"
                : isDarkMode
                ? "bg-gray-700"
                : "bg-white"
            }`}
            onClick={() => setSelectedHabit(habit)}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                className={`p-2 rounded-full ${
                  isDarkMode ? "bg-indigo-800 text-indigo-300" : "bg-indigo-100"
                }`}
                whileHover={{ rotate: 10 }}
              >
                {habit.icon}
              </motion.div>
              <div>
                <h4
                  className={`font-medium ${isDarkMode ? "text-gray-100" : ""}`}
                >
                  {habit.name}
                </h4>
                <div
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Target: {habit.target} {habit.unit}
                </div>
              </div>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <motion.div className="text-sm" whileHover={{ scale: 1.1 }}>
                <span
                  className={`font-bold ${
                    isDarkMode ? "text-indigo-400" : "text-indigo-600"
                  }`}
                >
                  {habit.streak}
                </span>
                <span className={isDarkMode ? "text-gray-400" : ""}>
                  day streak
                </span>
              </motion.div>
              <div className={`text-sm ${isDarkMode ? "text-gray-400" : ""}`}>
                Today: {habit.entries[habit.entries.length - 1].value}{" "}
                {habit.unit}
              </div>
            </div>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: habits.length * 0.1 }}
          whileHover={{
            scale: 1.03,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          }}
          whileTap={{ scale: 0.97 }}
          className={`p-4 rounded-lg shadow cursor-pointer ${
            isDarkMode
              ? "bg-gray-700 border-2 border-dashed border-gray-600"
              : "bg-gray-50 border-2 border-dashed border-gray-300"
          } flex items-center justify-center`}
          onClick={toggleAddHabit}
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: [0, 90, 180, 270, 360] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "linear",
              }}
            >
              <Plus
                className={`h-6 w-6 mx-auto ${
                  isDarkMode ? "text-gray-300" : "text-gray-400"
                }`}
              />
            </motion.div>
            <p
              className={
                isDarkMode ? "text-gray-300 mt-1" : "text-gray-500 mt-1"
              }
            >
              Add Habit
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const handleCheckIn = (value: number) => {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === selectedHabit.id) {
        const updatedEntries = [...habit.entries];
        updatedEntries[updatedEntries.length - 1].value = value;

        const streak =
          value >= habit.target ? habit.streak + 1 : 0;

        return {
          ...habit,
          entries: updatedEntries,
          streak,
        };
      }
      return habit;
    });

    setHabits(updatedHabits);
    const updatedSelected = updatedHabits.find(
      (h) => h.id === selectedHabit.id
    );
    if (updatedSelected) setSelectedHabit(updatedSelected);

    setNotification({
      message: `${selectedHabit.name} updated successfully!`,
      type: "success",
    });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }
  interface CheckInFormProps {
    selectedHabit: Habit;
    isDarkMode: boolean;
    onSubmit: (value: number) => void;
  }

  const CheckInForm: React.FC<CheckInFormProps> = ({
    selectedHabit,
    isDarkMode,
    onSubmit,
  }) => {
    const [value, setValue] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const parsed = parseFloat(value);
      if (isNaN(parsed)) return;
      onSubmit(parsed);
      setValue("");
    };

    return (
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="0"
          className={`border rounded-lg p-2 w-20 ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300"
          }`}
        />
        <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
          {selectedHabit.unit}
        </span>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 transition-colors duration-200"
        >
          Check In
        </motion.button>
      </form>
    );
  };

  // Component: Dashboard
  const Dashboard = () => (
    <div className="container mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${
          isDarkMode ? "bg-gray-700" : "bg-white"
        } rounded-lg shadow-lg p-6 transition-colors duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div
              className={`p-3 rounded-full ${
                isDarkMode ? "bg-indigo-800 text-indigo-300" : "bg-indigo-100"
              }`}
            >
              {selectedHabit.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold">{selectedHabit.name}</h3>
              <p className="text-gray-500">
                Target: {selectedHabit.target} {selectedHabit.unit} daily
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="text-center">
              <p className="text-gray-500 text-sm">Current Streak</p>
              <p className="text-2xl font-bold text-indigo-600">
                {selectedHabit.streak} days
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-sm">Weekly Average</p>
              <p className="text-2xl font-bold text-indigo-600">
                {getAverage()} {selectedHabit.unit}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">Weekly Progress</h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={getChartData()}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  name={selectedHabit.name}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#6b7280"
                  strokeDasharray="5 5"
                  name="Target"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mb-6">
          <h4
            className={`text-lg font-semibold mb-2 ${
              isDarkMode ? "text-gray-200" : ""
            }`}
          >
            Today&apos;s Check-in
          </h4>
          <div
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-gray-50"
            } rounded-lg p-4 transition-colors duration-300`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
              <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                <div
                  className={`w-12 h-12 rounded-full ${
                    isDarkMode
                      ? "bg-indigo-800 text-indigo-300"
                      : "bg-indigo-100"
                  } flex items-center justify-center`}
                >
                  {selectedHabit.icon}
                </div>
                <div>
                  <p
                    className={`font-medium ${
                      isDarkMode ? "text-gray-200" : ""
                    }`}
                  >
                    How much {selectedHabit.name.toLowerCase()} today?
                  </p>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Target: {selectedHabit.target} {selectedHabit.unit}
                  </p>
                </div>
              </div>

              <CheckInForm
                selectedHabit={selectedHabit}
                isDarkMode={isDarkMode}
                onSubmit={handleCheckIn}
              />
            </div>
            <div className="mt-2">
              <p
                className={`text-sm mb-1 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Today&apos;s progress: {getTodayCompletion()}%
              </p>
              <div
                className={`h-2 ${
                  isDarkMode ? "bg-gray-600" : "bg-gray-200"
                } rounded-full overflow-hidden`}
              >
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${getTodayCompletion()}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`h-full ${
                    getTodayCompletion() >= 100
                      ? "bg-green-500"
                      : "bg-indigo-600"
                  } rounded-full`}
                />
              </div>
              {getTodayCompletion() >= 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="mt-2 text-center text-green-500 flex items-center justify-center"
                >
                  <Star className="h-5 w-5 mr-1" />
                  <span>Goal achieved!</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>{" "}
      {/* ✅ Correctly closed motion.div */}
    </div>
  );

  // Component: Settings Modal
  const SettingsModal = () => (
    <AnimatePresence>
      {isSettingsOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={toggleSettings}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`${
              isDarkMode
                ? "bg-gray-800 text-gray-100"
                : "bg-white text-gray-900"
            } rounded-lg p-6 w-full max-w-md shadow-2xl transition-colors duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Settings</h3>
              <button className="p-1" onClick={toggleSettings}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Account</h4>
              <motion.div
                whileHover={{
                  backgroundColor: isDarkMode
                    ? "rgba(75, 85, 99, 0.3)"
                    : "rgba(243, 244, 246, 1)",
                }}
                className="flex items-center p-2 rounded cursor-pointer"
              >
                <User className="h-5 w-5 text-gray-500 mr-3" />
                <span>Profile</span>
              </motion.div>
              <motion.div
                whileHover={{
                  backgroundColor: isDarkMode
                    ? "rgba(75, 85, 99, 0.3)"
                    : "rgba(243, 244, 246, 1)",
                }}
                className="flex items-center p-2 rounded cursor-pointer"
              >
                <Bell className="h-5 w-5 text-gray-500 mr-3" />
                <span>Notifications</span>
              </motion.div>
              <motion.div
                whileHover={{
                  backgroundColor: isDarkMode
                    ? "rgba(75, 85, 99, 0.3)"
                    : "rgba(243, 244, 246, 1)",
                }}
                className="flex items-center p-2 rounded cursor-pointer"
              >
                <LogOut className="h-5 w-5 text-gray-500 mr-3" />
                <span>Logout</span>
              </motion.div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Appearance</h4>
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center">
                  {isDarkMode ? (
                    <Moon className="h-5 w-5 mr-2" />
                  ) : (
                    <Sun className="h-5 w-5 mr-2" />
                  )}
                  <span>Dark Mode</span>
                </div>
                <motion.div
                  className={`w-12 h-6 ${
                    isDarkMode ? "bg-indigo-600" : "bg-gray-300"
                  } rounded-full p-1 flex items-center cursor-pointer transition-colors duration-300`}
                  onClick={toggleDarkMode}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="bg-white w-4 h-4 rounded-full shadow-md flex items-center justify-center"
                    animate={{ translateX: isDarkMode ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {isDarkMode ? (
                      <Moon className="h-3 w-3 text-indigo-600" />
                    ) : (
                      <Sun className="h-3 w-3 text-yellow-500" />
                    )}
                  </motion.div>
                </motion.div>
              </div>
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  <span>Push Notifications</span>
                </div>
                <div className="w-12 h-6 bg-indigo-600 rounded-full p-1 flex items-center cursor-pointer">
                  <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-6"></div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition-colors duration-200"
                onClick={toggleSettings}
              >
                Save Changes
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Component: Add Habit Modal
  interface AddHabitFormProps {
    isOpen: boolean;
    toggleModal: () => void;
    addHabit: (habit: Habit) => void;
    isDarkMode: boolean;
  }

  interface Habit {
    id: number;
    name: string;
    icon: JSX.Element;
    unit: string;
    target: number;
    entries: { date: string; value: number }[];
    streak: number;
  }

  const AddHabitForm = ({
    isOpen,
    toggleModal,
    addHabit,
    isDarkMode,
  }: AddHabitFormProps) => {
    const [name, setName] = useState("");
    const [unit, setUnit] = useState("");
    const [target, setTarget] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (!name || !unit || !target) return;
      const parsedTarget = parseFloat(target);
      if (isNaN(parsedTarget)) return;

      const newHabit = {
        id: Date.now(), // Use a unique ID instead
        name,
        icon: <Trophy />,
        unit,
        target: parsedTarget,
        entries: [
          { date: "2025-04-28", value: 0 },
          { date: "2025-04-29", value: 0 },
          { date: "2025-04-30", value: 0 },
          { date: "2025-05-01", value: 0 },
          { date: "2025-05-02", value: 0 },
          { date: "2025-05-03", value: 0 },
          { date: "2025-05-04", value: 0 },
        ],
        streak: 0,
      };

      addHabit(newHabit);
      toggleModal();
      setName("");
      setUnit("");
      setTarget("");
    };

    if (!isOpen) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
        onClick={toggleModal}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`${
            isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
          } rounded-lg p-6 w-full max-w-md shadow-2xl transition-colors duration-300`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Add New Habit</h3>
            <button type="button" className="p-1" onClick={toggleModal}>
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className={`block mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Habit Name
              </label>
              <input
                type="text"
                className={`w-full p-2 border rounded ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
                placeholder="e.g., Reading"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label
                className={`block mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Unit
              </label>
              <input
                type="text"
                className={`w-full p-2 border rounded ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
                placeholder="e.g., minutes, pages"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </div>

            <div>
              <label
                className={`block mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Daily Target
              </label>
              <input
                type="text"
                className={`w-full p-2 border rounded ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
                placeholder="e.g., 30"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>

            <div className="flex justify-end mt-6">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded mr-2 ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-200"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={toggleModal}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Add Habit
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    );
  };

  // Component: Notification
  const Notification = () => (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-4 right-4 p-4 rounded shadow-lg z-50 flex items-center ${
            notification.type === "success"
              ? "bg-green-500"
              : notification.type === "error"
              ? "bg-red-500"
              : "bg-blue-500"
          } text-white`}
        >
          {notification.type === "success" ? (
            <Check className="h-5 w-5 mr-2" />
          ) : notification.type === "error" ? (
            <X className="h-5 w-5 mr-2" />
          ) : (
            <Bell className="h-5 w-5 mr-2" />
          )}
          {notification.message}
        </motion.div>
      )}
    </AnimatePresence>
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
      if (e.matches) {
        document.documentElement.classList.add("dark-mode");
      } else {
        document.documentElement.classList.remove("dark-mode");
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    // Initialize based on current preference
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
    }

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [isDarkMode]);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-900"
      } transition-colors duration-300`}
    >
      <Navbar />
      <LandingSection />
      <HabitSelection />
      <Dashboard />
      <Footer />
      <SettingsModal />
      <AddHabitForm
        isOpen={isAddHabitOpen}
        toggleModal={() => setIsAddHabitOpen(!isAddHabitOpen)}
        isDarkMode={isDarkMode}
        addHabit={(habit) => {
          setHabits((prev) => [...prev, habit]);
          setNotification({
            message: `${habit.name} habit added successfully!`,
            type: "success",
          });
          setTimeout(() => setNotification(null), 3000);
        }}
      />
      <Notification />
    </div>
  );
}
