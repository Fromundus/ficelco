import { useEffect, useState } from "react";
import { IoMoonSharp } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";

const ThemeToggleButton = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-lg"
    >
      {theme === "dark" ? <IoSunny /> : <IoMoonSharp />}
    </button>
  );
};

export default ThemeToggleButton;
