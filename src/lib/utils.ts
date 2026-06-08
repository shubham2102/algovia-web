export function scrollToAIPanel(focusInput = true) {
  if (typeof window === "undefined") return;

  const panel = document.getElementById("ai-panel");
  panel?.scrollIntoView({ behavior: "smooth", block: "center" });

  if (focusInput) {
    setTimeout(() => {
      const input = panel?.querySelector<HTMLInputElement>(".hero-ai__input");
      input?.focus();
    }, 400);
  }
}
