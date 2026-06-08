export const MENU_CLOSE_EVENT = "menu-close";

export function dispatchMenuClose() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(MENU_CLOSE_EVENT));
  }
}
