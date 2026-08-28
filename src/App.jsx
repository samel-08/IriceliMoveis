import Navbar from "./components/Navbar";
import ScrollStory from "./components/ScrollStory";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import ProjectsShowcase from "./components/ProjectsShowcase";

import "./styles/global.css";

function App() {
  return (
    <>
      <div id="top" />

      <Navbar />

      <ScrollStory />

      <ProjectsShowcase />

      <FinalCTA />

      <Footer />
    </>
  );
}

export default App;