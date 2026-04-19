import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CloudSun, Target, BatteryCharging, Bookmark } from "lucide-react";
import { DailyFlashcards } from "@/components/DailyFlashcards";
import { useBookmarks } from "@/contexts/BookmarkContext";

export default function Index() {
  const navigate = useNavigate();
  const { bookmarks } = useBookmarks();
  const recentBookmarks = bookmarks.slice(-5).reverse();
  
  const [currentTime, setCurrentTime] = useState(new Date());
  const [battery, setBattery] = useState<number | null>(null);
  const [weather, setWeather] = useState({ temp: 36, max: 37, min: 24, desc: 'clear skies' });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // Battery Status API
    if ('getBattery' in navigator) {
      // @ts-expect-error - getBattery is non-standard
      navigator.getBattery().then((batt: { level: number; addEventListener: (type: string, listener: () => void) => void }) => {
        setBattery(Math.round(batt.level * 100));
        batt.addEventListener('levelchange', () => {
          setBattery(Math.round(batt.level * 100));
        });
      });
    }

    // Weather fetch via Geolocation (Open-Meteo, no API key needed)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`);
            const data = await res.json();
            
            const code = data.current?.weather_code || 0;
            let desc = 'clear skies';
            if (code >= 1 && code <= 3) desc = 'partly cloudy';
            if (code >= 45 && code <= 48) desc = 'foggy';
            if (code >= 51 && code <= 67) desc = 'rainy';
            if (code >= 71 && code <= 77) desc = 'snowy';
            if (code >= 95) desc = 'stormy';
            
            setWeather({
              temp: Math.round(data.current?.temperature_2m || 24),
              max: Math.round(data.daily?.temperature_2m_max?.[0] || 28),
              min: Math.round(data.daily?.temperature_2m_min?.[0] || 18),
              desc
            });
          } catch (e) {
            console.error("Failed to fetch weather", e);
          }
        },
        () => console.log("Geolocation ignored, using default static weather.")
      );
    }
    
    return () => clearInterval(timer);
  }, []);

  const bookmarkPath = (b: { id: number; type: string }) => {
    const map: Record<string, string> = {
      exercise: "/exercises", muscle: "/muscles", impairment: "/disorders", disorder: "/disorders",
      "sports-injury": "/sports-injuries", "special-test": "/special-tests",
      "manual-technique": "/manual-therapy", "ebp-guideline": "/ebp", "differential-diagnosis": "/differential-diagnosis",
      flashcard: "/flashcards"
    };
    return `${map[b.type] || "/"}?id=${b.id}`;
  };

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const [hourStr, minStr] = formattedTime.split(':');
  const amPm = currentTime.getHours() >= 12 ? 'p.m.' : 'a.m.';
  const formattedDate = currentTime.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  const dayName = currentTime.toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="p-6 md:p-10 max-w-lg mx-auto animate-fade-in space-y-12 relative z-10 flex flex-col min-h-[90vh]">
      
      {/* Top Section - Time & Date */}
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="elevated px-4 py-2 flex items-center justify-center">
            <span className="font-sans text-3xl sm:text-4xl font-light tracking-widest">{hourStr}</span>
          </div>
          <div className="w-8 h-px bg-foreground/30 mt-6 hidden sm:block" />
          <div className="elevated px-4 py-2 flex items-center justify-center">
            <span className="font-sans text-3xl sm:text-4xl font-light tracking-widest">{minStr}</span>
          </div>
          <div className="ml-2 flex flex-col justify-end text-sm text-foreground/50 font-medium pt-2">
            <span className="flex items-center gap-1 capitalize"><CloudSun className="w-3 h-3"/> {weather.desc}</span>
            <span>{amPm}</span>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-xl sm:text-2xl font-medium tracking-wide">{formattedDate}</h2>
          <p className="text-foreground/60 text-sm sm:text-base">{dayName}</p>
        </div>
      </div>

      {/* Circular Widget */}
      <div className="flex justify-center my-6 scale-90 sm:scale-100">
        <div className="relative w-64 h-64 elevated rounded-full flex pl-8 items-center border border-primary/5 overflow-hidden">
           {/* Dial line indicator */}
           <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full border-2 border-dashed border-primary/20 rotate-[45deg]" />
           <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full border-r-2 border-t-2 border-primary rotate-[10deg]" />
           
           {/* Right side Battery/Temp labels */}
           <svg className="absolute w-full h-full left-0 top-0 pointer-events-none" viewBox="0 0 200 200">
             <path id="curve" d="M 120 40 A 80 80 0 0 1 180 120" fill="transparent" />
             <text width="200" fill="currentColor" className="text-[10px] tracking-widest text-primary/70">
               <textPath href="#curve" startOffset="30%">{battery !== null ? `${battery}%` : '---'} Battery</textPath>
             </text>
           </svg>
           
           <div className="z-10 flex flex-col items-start gap-2 pr-12">
             <div className="w-12 h-12 rounded-full inner-elevated flex items-center justify-center mb-2">
                 <div className="w-6 h-6 rounded-full bg-primary shadow-[0_0_15px_rgba(251,191,36,0.6)] animate-pulse" />
             </div>
             <p className="text-4xl sm:text-5xl font-light">{weather.temp}°C</p>
           </div>
        </div>
      </div>

      {/* Greeting Text */}
      <div className="text-sm font-light text-foreground/60 leading-relaxed pr-8 pl-4 border-l-2 border-primary/40">
        Hello! PT-User, today you have a temperature <span className="text-primary">MAX</span> of {weather.max}°C and <span className="text-[#38bdf8]">MIN</span> of {weather.min}°C, with a forecast of {weather.desc}.
        Have a great day!
      </div>
      
      {/* App Icons (like bottom grid in image, mapping to Quick Actions if needed, but we're doing flashes and recently viewed instead, though I'll add a few decorative action buttons) */}
      <div className="flex justify-end gap-4 px-4 my-4">
         <button onClick={() => navigate('/exercises')} className="w-12 h-12 flex items-center justify-center elevated-icon text-foreground/70 hover:text-primary transition-colors"><Target className="w-5 h-5"/></button>
         <button onClick={() => navigate('/bookmarks')} className="w-12 h-12 flex items-center justify-center elevated-icon text-foreground/70 hover:text-primary transition-colors"><Bookmark className="w-5 h-5"/></button>
      </div>

      {/* Flashes (Flashcards) Section */}
      <div className="mt-8">
        <h3 className="font-medium text-lg mb-4 opacity-80 uppercase tracking-widest text-primary">Flashes</h3>
        <DailyFlashcards />
      </div>

      {/* Recently Viewed (Recent Bookmarks) Section */}
      <div className="mt-8 pb-12">
        <h3 className="font-medium text-lg mb-4 opacity-80 uppercase tracking-widest text-primary">Recently Viewed</h3>
        <div className="space-y-4">
          {recentBookmarks.length > 0 ? (
            recentBookmarks.map((b) => (
              <button
                key={`${b.type}-${b.id}`}
                onClick={() => navigate(bookmarkPath(b))}
                className="w-full text-left elevated !p-5 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-light text-foreground">{b.name}</span>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            ))
          ) : (
            <div className="elevated text-center p-6 border border-white/5">
              <p className="text-sm font-light text-muted-foreground">No recently viewed items.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
