import { useState, useEffect } from "react";

const ToggleTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full bg-slate-900 dark:bg-white text-2xl fixed bottom-8 right-8"
    >
      {theme == "light" ? (
        <i className="fa-regular fa-moon text-yellow-200"></i>
      ) : (
        <i className="fa-solid fa-sun text-yellow-500"></i>
      )}
    </button>
  );
};

export default ToggleTheme;
