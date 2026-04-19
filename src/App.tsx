import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { BookmarkProvider } from "@/contexts/BookmarkContext";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import ExercisesPage from "./pages/Exercises";
import MusclesPage from "./pages/Muscles";
import DisordersPage from "./pages/Disorders";
import DifferentialDiagnosisPage from "./pages/DifferentialDiagnosis";
import EBPPage from "./pages/EBP";
import SportsInjuriesPage from "./pages/SportsInjuries";
import SettingsPage from "./pages/Settings";
import ManualTherapyPage from "./pages/ManualTherapy";
import SpecialTestsPage from "./pages/SpecialTests";
import BookmarksPage from "./pages/Bookmarks";
import AiDiagnosisPage from "./pages/AiDiagnosis";
import AiAssessmentPage from "./pages/AiAssessment";
import PhysioPlanPage from "./pages/PhysioPlan";
import AiSearchPage from "./pages/AiSearch";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <BookmarkProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/exercises" element={<ExercisesPage />} />
                <Route path="/muscles" element={<MusclesPage />} />
                <Route path="/disorders" element={<DisordersPage />} />
                <Route path="/differential-diagnosis" element={<DifferentialDiagnosisPage />} />
                <Route path="/ebp" element={<EBPPage />} />
                <Route path="/sports-injuries" element={<SportsInjuriesPage />} />
                <Route path="/manual-therapy" element={<ManualTherapyPage />} />
                <Route path="/special-tests" element={<SpecialTestsPage />} />
                <Route path="/bookmarks" element={<BookmarksPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                
                {/* AI Tools */}
                <Route path="/ai-diagnosis" element={<AiDiagnosisPage />} />
                <Route path="/ai-assessment" element={<AiAssessmentPage />} />
                <Route path="/physio-plan" element={<PhysioPlanPage />} />
                <Route path="/ai-search" element={<AiSearchPage />} />
                
                {/* Legacy redirect */}
                <Route path="/impairments" element={<Navigate to="/disorders" replace />} />
                <Route path="/books" element={<Navigate to="/" replace />} />
                <Route path="/search" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </BookmarkProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
