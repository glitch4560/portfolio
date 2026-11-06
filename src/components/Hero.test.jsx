import { act } from "react";
import { createRoot } from "react-dom/client";
import Hero from "./Hero";

let container;
let root;
let frame;
let media;

beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  media = { matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() };
  window.matchMedia = () => media;
  jest.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
    frame = callback;
    return 1;
  });
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.restoreAllMocks();
  window.history.replaceState(null, "", "/");
});

test("Kiro greets before drawing the real content and releases all pieces at the end", () => {
  act(() => root.render(<Hero />));
  const scene = container.querySelector("#top");
  act(() => frame(0));
  act(() => frame(1000));
  expect(scene.dataset.pose).toBe("greeting");
  expect(scene.querySelector("[data-placed]")).toBeNull();

  act(() => frame(3300));
  expect(scene.querySelector("[data-placed]").dataset.build).toBe("profile");
  act(() => frame(3700));
  act(() => frame(4100));
  expect(scene.querySelector('[data-build="given-name"]').hasAttribute("data-placed")).toBe(true);
  expect(scene.querySelector('[data-build="surname"]').hasAttribute("data-placed")).toBe(false);
  expect(scene.querySelector(".plotter-beam path").getAttribute("d")).toMatch(/^M/);

  act(() => frame(9000));
  expect(scene.classList.contains("is-building")).toBe(false);
  expect(scene.querySelector("[data-placed]")).toBeNull();
  expect(scene.querySelector("button").textContent).toBe("Replay intro");
});

test("skip, replay and Escape work without moving focus off the control", () => {
  act(() => root.render(<Hero />));
  const control = container.querySelector("button");
  control.focus();
  act(() => control.click());
  expect(control.textContent).toBe("Replay intro");
  act(() => control.click());
  expect(control.textContent).toBe("Skip intro");
  act(() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" })));
  expect(control.textContent).toBe("Replay intro");
  expect(document.activeElement).toBe(control);
});

test("a section link opens with the hero already assembled", () => {
  window.history.replaceState(null, "", "/#work");
  act(() => root.render(<Hero />));
  expect(container.querySelector(".is-building")).toBeNull();
  expect(container.querySelector("button").textContent).toBe("Replay intro");
});

test("reduced motion presents the finished hero immediately", () => {
  media.matches = true;
  act(() => root.render(<Hero />));
  expect(container.querySelector(".is-building, .intro-control")).toBeNull();
  expect(container.querySelector("h1").textContent).toContain("Chandra Kiran");
  expect(window.requestAnimationFrame).not.toHaveBeenCalled();
});
