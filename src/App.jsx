import Navbar from "./components/Navbar";
import ScrollStory from "./components/ScrollStory";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import ProjectsShowcase from "./components/ProjectsShowcase";
import CraftSections from "./components/CraftSections";
import GradientWaves from "./components/effects/GradientWaves";

import "./styles/global.css";

function App() {
  return (
    <>
      <div id="top" />

      <div className="site-background" aria-hidden="true">
        <GradientWaves className="site-background__waves" horizonColor="#0d1526" waveColor="#2a3a52" crestColor="#d2b06b" opacity={0.6} />
      </div>

      <Navbar />
      <main>
        <ScrollStory />
        <ProjectsShowcase />
        <CraftSections />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
