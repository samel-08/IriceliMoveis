import { useEffect, useState } from "react";
import { navigation } from "../data/site";

export default function useActiveSection() {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const sections = navigation.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const visible = new Set();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      });
      setActiveSection(sections.find(section => visible.has(section.id))?.id ?? null);
    }, { rootMargin: "-15% 0px -65% 0px" });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeSection;
}
