import { Routes, Route, useLocation } from "react-router-dom";
import { ResultsSection } from "./Sections/ResultsSection.jsx";
import HomeSection from "./Sections/HomeSection.jsx";
import { AnimatePresence } from "framer-motion";
export const AppRouter = () => {
  const location = useLocation();

  return (
    <div className="mx-auto max-w-screen-xl">
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/*" element={<HomeSection />} />
          <Route path="/results" element={<ResultsSection />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};
