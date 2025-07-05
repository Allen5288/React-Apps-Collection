import { PaletteIcon } from "lucide-react";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { useState } from "react";

function ThemeSelector() {
  const { theme, setTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (themeName) => {
    setTheme(themeName);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* DROPDOWN TRIGGER */}
      <button
        className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-base-200 transition-colors focus:outline-none"
        aria-label="Select theme"
        onClick={() => setIsOpen(!isOpen)}
      >
        <PaletteIcon className="w-5 h-5" />
      </button>
      
      {/* DROPDOWN CONTENT */}
      {isOpen && (
        <div className="absolute right-0 mt-2 p-1 shadow-2xl bg-base-100 backdrop-blur-lg rounded-2xl w-56 border border-base-300 z-50">
        {THEMES.map((themeOption) => (
          <button
            key={themeOption.name}
            className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors text-left ${
              theme === themeOption.name
                ? "bg-primary text-base-100"
                : "hover:bg-base-200"
            }`}
            onClick={() => handleThemeChange(themeOption.name)}
            type="button"
          >
            <PaletteIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{themeOption.label}</span>
            <div className="ml-auto flex gap-1">
              {themeOption.colors.map((color, i) => (
                <span
                  key={i}
                  className="w-3 h-3 rounded-full border border-base-300"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </button>
        ))}
        </div>
      )}
    </div>
  );
}
export default ThemeSelector;
