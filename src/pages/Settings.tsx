import { useTheme, accentPresets } from "@/contexts/ThemeContext";
import { Settings as SettingsIcon, Sun, Moon, Palette, Type, LayoutGrid } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const { settings, setMode, setAccentColor, setFontSize, setDensity } = useTheme();

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
          <SettingsIcon className="h-6 w-6 text-primary" />
          Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Customize your experience</p>
      </div>

      <div className="space-y-6">
        {/* Theme Mode */}
        <div className="glass-card !p-5">
          <div className="flex items-center gap-2 mb-4">
            {settings.mode === "dark" ? <Moon className="h-4 w-4 text-primary" /> : <Sun className="h-4 w-4 text-primary" />}
            <h2 className="text-sm font-display font-semibold text-foreground">Theme Mode</h2>
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="theme-toggle" className="text-sm text-muted-foreground">
              {settings.mode === "dark" ? "Dark Mode" : "Light Mode"}
            </Label>
            <Switch
              id="theme-toggle"
              checked={settings.mode === "light"}
              onCheckedChange={(checked) => setMode(checked ? "light" : "dark")}
            />
          </div>
        </div>

        {/* Accent Color */}
        <div className="glass-card !p-5">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-display font-semibold text-foreground">Accent Color</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {accentPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => setAccentColor(preset.value)}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all ${
                  settings.accentColor === preset.value
                    ? "border-primary bg-primary/10"
                    : "border-border/50 hover:border-primary/30"
                }`}
              >
                <div
                  className="w-8 h-8 rounded-full border-2 border-background"
                  style={{ backgroundColor: `hsl(${preset.value})` }}
                />
                <span className="text-[10px] text-muted-foreground">{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div className="glass-card !p-5">
          <div className="flex items-center gap-2 mb-4">
            <Type className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-display font-semibold text-foreground">Font Size</h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">A</span>
            <Slider
              value={[settings.fontSize]}
              onValueChange={([v]) => setFontSize(v)}
              min={12}
              max={20}
              step={1}
              className="flex-1"
            />
            <span className="text-lg text-muted-foreground">A</span>
            <span className="text-xs text-muted-foreground w-8 text-right">{settings.fontSize}px</span>
          </div>
        </div>

        {/* Layout Density */}
        <div className="glass-card !p-5">
          <div className="flex items-center gap-2 mb-4">
            <LayoutGrid className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-display font-semibold text-foreground">Layout Density</h2>
          </div>
          <div className="flex gap-2">
            {(["compact", "normal", "spacious"] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDensity(d)}
                className={`flex-1 py-2 px-3 rounded-lg border text-xs font-medium capitalize transition-all ${
                  settings.density === d
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/50 text-muted-foreground hover:border-primary/30"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
