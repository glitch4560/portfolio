import "./App.css";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Stack from "./components/Stack";
import Research from "./components/Research";
import Contact from "./components/Contact";
import Cursor from "./components/Cursor";

export default function App() {
  return (
    <div className="grain min-h-screen bg-ground text-fg">
      {/* Keyboard users land here first. */}
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[110] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-ground"
      >
        Skip to content
      </a>

      <Cursor />
      <Nav />

      <main>
        <Hero />
        <Projects />
        <About />
        <Stack />
        <Research />
      </main>

      <Contact />
    </div>
  );
}
