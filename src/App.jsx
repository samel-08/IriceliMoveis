import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import ScrollStory from "./components/ScrollStory";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import GalleryPage from "./components/GalleryPage";
import ProjectsShowcase from "./components/ProjectsShowcase";
import CraftSections from "./components/CraftSections";
import GradientWaves from "./components/effects/GradientWaves";

import "./styles/global.css";

function App() {
  const [isGalleryPage, setIsGalleryPage] = useState(() => window.location.hash === "#fotos");
  const previousPageRef = useRef(isGalleryPage);

  useEffect(() => {
    const syncPage = () => setIsGalleryPage(window.location.hash === "#fotos");
    window.addEventListener("hashchange", syncPage);
    return () => window.removeEventListener("hashchange", syncPage);
  }, []);

  useLayoutEffect(() => {
    if (previousPageRef.current === isGalleryPage) return;
    previousPageRef.current = isGalleryPage;
    window.scrollTo(0, 0);
  }, [isGalleryPage]);

  return (
    <>
      <div className="site-background" aria-hidden="true">
        <GradientWaves className="site-background__waves" horizonColor="#0d1526" waveColor="#2a3a52" crestColor="#d2b06b" opacity={0.6} />
      </div>

      {isGalleryPage ? <GalleryPage /> : <>
        <div id="top" />
        <Navbar />
        <main>
          <ScrollStory />
          <ProjectsShowcase />
          <CraftSections />
          <FinalCTA />
        </main>
        <Footer />
      </>}
    </>
  );
}

export default App;
