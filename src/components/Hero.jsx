import { useRef } from "react";
import { ArrowDown, ArrowDownRight, RotateCcw, SkipForward } from "lucide-react";
import { profile, robotIntro } from "../data/content";
import BuilderRobot from "./BuilderRobot";
import useHeroAssembly from "./useHeroAssembly";
import "./assembly.css";

function Workbench() {
  return (
    <svg className="workbench" viewBox="62 40 366 316" aria-hidden="true">
      <defs>
        <radialGradient id="contact-shadow">
          <stop stopColor="#030303" stopOpacity=".95" />
          <stop offset=".65" stopColor="#050505" stopOpacity=".62" />
          <stop offset="1" stopColor="#050505" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g transform="rotate(-8 249 310)" fill="none" strokeWidth=".7">
        <ellipse cx="249" cy="310" rx="162" ry="36" stroke="#908675" opacity=".43" />
        <ellipse cx="249" cy="310" rx="171" ry="42" stroke="#998d75" opacity=".32" strokeDasharray="2 6" />
        <path d="M72 310h354M220 266l60 90" stroke="#a2947b" opacity=".28" strokeDasharray="8 4 1 4" />
        <ellipse cx="250" cy="307" rx="124" ry="29" fill="url(#contact-shadow)" />
      </g>
    </svg>
  );
}

export default function Hero() {
  const scene = useRef(null);
  const tip = useRef(null);
  const beam = useRef(null);
  const { running, reduced, status, finish, replay } = useHeroAssembly(scene, tip, beam);

  return (
    <section id="top" ref={scene} className={`assembly-hero ${running ? "is-building" : ""}`}>
      <div aria-hidden="true" className="blueprint mask-fade-b pointer-events-none absolute inset-0" />
      <div className="shell assembly-layout">
        <div className="assembly-copy">
          {running && (
            <div className="robot-greeting">
              <p className="font-display">{robotIntro.hello}</p>
              <p>{robotIntro.greeting}</p>
            </div>
          )}
          <div data-build="profile" className="assembly-meta">
            <span className="label flex items-center gap-2.5 !text-fg">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />{profile.available}
            </span>
            <span className="label">{profile.location}</span>
          </div>
          <h1 aria-label={profile.name} className="assembly-name">
            {profile.nameLines.map((line, i) => (
              <span key={line} data-build={i === 0 ? "given-name" : "surname"}>{line}</span>
            ))}
          </h1>
          <p data-build="statement" className="assembly-statement">{profile.statement}</p>
          <div data-build="links" className="assembly-links">
            <a href="#work" className="work-link">View selected work <ArrowDownRight size={14} aria-hidden="true" /></a>
            <a href={`mailto:${profile.email}`}>Get in touch</a>
            <span className="assembly-socials">
              <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </span>
          </div>
        </div>

        <figure className="robot-dock">
          <div className="robot-stage" aria-hidden="true">
            <span className="dock-corners" />
            <div className="robot-drawing">
              <Workbench />
              <div className="robot-carriage"><BuilderRobot tipRef={tip} /></div>
            </div>
          </div>
          <figcaption className="robot-caption">
            <div className="robot-status">
              <span className="status-led" aria-hidden="true" />
              <span className="unit-name">{robotIntro.name}</span>
              <span className="unit-status">{running ? status : "On standby"}</span>
            </div>
            {!reduced && (
              <button type="button" className="intro-control" onClick={running ? finish : replay}>
                {running ? <SkipForward size={13} aria-hidden="true" /> : <RotateCcw size={13} aria-hidden="true" />}
                {running ? "Skip intro" : "Replay intro"}
              </button>
            )}
          </figcaption>
        </figure>
      </div>
      <svg className="plotter-beam" ref={beam} aria-hidden="true">
        <path fill="none" stroke="#f0c76e" strokeWidth="1.1" strokeOpacity=".78" />
        <g>
          <circle r="5" fill="#e9b949" opacity=".2" />
          <path d="M0-8v16m-5-8H5" stroke="#ffdb85" strokeWidth="1" />
          <circle r="1.9" fill="#fff4ce" />
        </g>
      </svg>
      <div className="shell">
        <div data-build="footer" className="assembly-footer">
          <p>{profile.role}</p>
          <a href="#work" aria-label="Scroll to selected work">Scroll <ArrowDown size={13} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
