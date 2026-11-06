import { act } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// jsdom ships neither of these and several components wire them up on mount.
beforeAll(() => {
  // Tells React 19 that act() is legitimate here.
  global.IS_REACT_ACT_ENVIRONMENT = true;

  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent: () => false,
  });
});

// A render smoke test: the whole tree has to mount without throwing, and the
// content that carries the page has to actually reach the DOM.
test("the page renders every section", async () => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  await act(async () => {
    root.render(<App />);
  });

  const text = container.textContent;

  expect(container.querySelector("h1")).toBeTruthy();
  expect(text).toContain("Chandra Kiran");
  expect(text).toContain("Post-Earthquake Damage Assessment");
  expect(text).toContain("Cloud Security Posture Analysis");
  expect(text).toContain("chandukopparapu@gmail.com");

  // One anchored landing point per nav entry, or the menu links go nowhere.
  ["work", "about", "stack", "research", "contact"].forEach((id) => {
    expect(container.querySelector(`#${id}`)).toBeTruthy();
  });

  // Each project should have drawn its generated visual.
  expect(container.querySelectorAll("svg[role='img']").length).toBe(4);

  await act(() => root.unmount());
  document.body.removeChild(container);
});
