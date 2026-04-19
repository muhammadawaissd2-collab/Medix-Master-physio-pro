import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type ThemeMode = "dark" | "light";
type LayoutDensity = "compact" | "normal" | "spacious";

interface ThemeSettings {
  mode: ThemeMode;
  accentColor: string;
  fontSize: number;
  density: LayoutDensity;
}

interface ThemeContextType {
  settings: ThemeSettings;
  setMode: (mode: ThemeMode) => void;
  setAccentColor: (color: string) => void;
  setFontSize: (size: number) => void;
  setDensity: (density: LayoutDensity) => void;
}

const defaultSettings: ThemeSettings = {
  mode: "dark",
  accentColor: "168 80% 42%",
  fontSize: 14,
  density: "normal",
};

const accentPresets = [
  { name: "Teal", value: "168 80% 42%" },
  { name: "Blue", value: "217 91% 60%" },
  { name: "Purple", value: "262 83% 58%" },
  { name: "Rose", value: "346 77% 50%" },
  { name: "Orange", value: "25 95% 53%" },
  { name: "Green", value: "142 71% 45%" },
];

const ThemeContext = createContext<ThemeContextType | null>(null);

export { accentPresets };
export type { ThemeSettings, ThemeMode, LayoutDensity };

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    try {
      const saved = localStorage.getItem("pt-blueprint-settings");
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    localStorage.setItem("pt-blueprint-settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const root = document.documentElement;
    // Apply theme mode
    if (settings.mode === "light") {
      root.classList.remove("dark");
      root.style.setProperty("--background", "220 14% 96%");
      root.style.setProperty("--foreground", "220 20% 20%");
      root.style.setProperty("--card", "220 14% 96%");
      root.style.setProperty("--card-foreground", "220 20% 20%");
      root.style.setProperty("--popover", "220 14% 96%");
      root.style.setProperty("--popover-foreground", "220 20% 20%");
      root.style.setProperty("--secondary", "220 14% 90%");
      root.style.setProperty("--secondary-foreground", "220 20% 25%");
      root.style.setProperty("--muted", "220 14% 90%");
      root.style.setProperty("--muted-foreground", "220 10% 45%");
      root.style.setProperty("--border", "220 14% 85%");
      root.style.setProperty("--input", "220 14% 85%");
      root.style.setProperty("--sidebar-background", "220 14% 96%");
      root.style.setProperty("--sidebar-foreground", "220 20% 25%");
      root.style.setProperty("--sidebar-accent", "220 14% 92%");
      root.style.setProperty("--sidebar-accent-foreground", "220 20% 10%");
      root.style.setProperty("--sidebar-border", "220 14% 88%");
      
      // Neumorphic shadows for light
      root.style.setProperty("--shadow-1", "#d1d9e6");
      root.style.setProperty("--shadow-2", "#ffffff");
      
      document.body.style.background = "hsl(220, 14%, 96%)";
    } else {
      root.classList.add("dark");
      root.style.setProperty("--background", "220 8% 16%");
      root.style.setProperty("--foreground", "0 0% 95%");
      root.style.setProperty("--card", "220 8% 16%");
      root.style.setProperty("--card-foreground", "0 0% 95%");
      root.style.setProperty("--popover", "220 8% 16%");
      root.style.setProperty("--popover-foreground", "0 0% 95%");
      root.style.setProperty("--secondary", "220 8% 22%");
      root.style.setProperty("--secondary-foreground", "0 0% 85%");
      root.style.setProperty("--muted", "220 8% 22%");
      root.style.setProperty("--muted-foreground", "220 8% 65%");
      root.style.setProperty("--border", "220 8% 12%");
      root.style.setProperty("--input", "220 8% 20%");
      root.style.setProperty("--sidebar-background", "220 8% 14%");
      root.style.setProperty("--sidebar-foreground", "0 0% 95%");
      root.style.setProperty("--sidebar-accent", "220 8% 20%");
      root.style.setProperty("--sidebar-accent-foreground", "0 0% 95%");
      root.style.setProperty("--sidebar-border", "220 8% 12%");
      
      // Neumorphic shadows for dark
      root.style.setProperty("--shadow-1", "#1b1d20");
      root.style.setProperty("--shadow-2", "#2f3136");
      
      document.body.style.background = "hsl(220, 8%, 16%)";
    }

    // Apply accent color
    root.style.setProperty("--primary", settings.accentColor);
    root.style.setProperty("--ring", settings.accentColor);
    root.style.setProperty("--accent", settings.accentColor.replace(/42%$/, "30%"));
    root.style.setProperty("--sidebar-primary", settings.accentColor);
    root.style.setProperty("--sidebar-ring", settings.accentColor);

    // Apply font size
    root.style.fontSize = `${settings.fontSize}px`;

    // Apply density
    const densityMap = { compact: "0.5rem", normal: "0.75rem", spacious: "1rem" };
    root.style.setProperty("--radius", densityMap[settings.density]);
  }, [settings]);

  const setMode = (mode: ThemeMode) => setSettings(s => ({ ...s, mode }));
  const setAccentColor = (accentColor: string) => setSettings(s => ({ ...s, accentColor }));
  const setFontSize = (fontSize: number) => setSettings(s => ({ ...s, fontSize }));
  const setDensity = (density: LayoutDensity) => setSettings(s => ({ ...s, density }));

  return (
    <ThemeContext.Provider value={{ settings, setMode, setAccentColor, setFontSize, setDensity }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
