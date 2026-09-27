import { useCallback, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ProjectHub from "./components/ProjectHub.jsx";
import Skills from "./components/Skills.jsx";
import Timeline from "./components/Timeline.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import AdminCMS from "./components/AdminCMS.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { useKeyboardShortcut } from "./hooks/useKeyboardShortcut.js";
import seedProjects from "./data/projects.json";

export default function App() {
  const [projects, setProjects] = useLocalStorage("devxdragon.projects", seedProjects);
  const [adminOpen, setAdminOpen] = useState(false);

  const openAdmin = useCallback(() => setAdminOpen(true), []);
  const closeAdmin = useCallback(() => setAdminOpen(false), []);

  useKeyboardShortcut({ key: "a", ctrl: true, shift: true }, openAdmin);

  return (
    <>
      <CustomCursor />
      <Navbar onOpenAdmin={openAdmin} />
      <main>
        <Hero />
        <ProjectHub projects={projects} />
        <Skills />
        <Timeline />
        <Contact />
      </main>
      <Footer onOpenAdmin={openAdmin} />
      <AdminCMS open={adminOpen} onClose={closeAdmin} projects={projects} setProjects={setProjects} />
    </>
  );
}
