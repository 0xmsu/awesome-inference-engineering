// Site-wide behaviour: the theme toggle and the "/" shortcut to the search field.
// The stored theme is applied before first paint by an inline script in the layout's <head>.

const root = document.documentElement;
const dark = window.matchMedia("(prefers-color-scheme: dark)");
const toggle = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");

type Theme = "light" | "dark";

function effective(): Theme {
  const set = root.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return dark.matches ? "dark" : "light";
}

function label(): void {
  if (!toggle) return;
  const other: Theme = effective() === "dark" ? "light" : "dark";
  toggle.textContent = other === "dark" ? "Dark" : "Light";
  toggle.setAttribute("aria-label", `Switch to ${other} theme`);
}

toggle?.addEventListener("click", () => {
  const next: Theme = effective() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the choice then lasts for this page only.
  }
  label();
});

dark.addEventListener("change", label);
label();

document.addEventListener("keydown", (event) => {
  if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
  // Leave "/" alone where it is typed as text; from a checkbox, radio or link it still jumps to search.
  const target = event.target as HTMLElement | null;
  const typing =
    target instanceof HTMLInputElement ? !["checkbox", "radio", "button", "submit", "reset"].includes(target.type) : Boolean(target?.closest("textarea, select, [contenteditable]"));
  if (typing) return;
  const field = document.querySelector<HTMLInputElement>("[data-search]");
  if (!field) return;
  event.preventDefault();
  field.focus();
  field.select();
});
