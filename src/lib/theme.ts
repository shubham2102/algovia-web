export const brand = {
  darkGreen: "#012A2D",
  brightGreen: "#02BB73",
  yellow: "#EEAD2B",
  white: "#FFFFFF",
} as const;

export const theme = {
  colors: {
    ...brand,
    green: brand.brightGreen,
    greenLight: "#35D49A",
    greenDark: "#019A5F",
    accent: brand.yellow,
    dark: brand.darkGreen,
    darkElevated: "#033538",
    darkCard: "#04363A",
    darkBorder: "rgba(255, 255, 255, 0.08)",
    text: brand.white,
    textMuted: "#8BA8AB",
    success: brand.brightGreen,
    glass: "rgba(255, 255, 255, 0.06)",
  },
  gradients: {
    brand: `linear-gradient(135deg, ${brand.brightGreen} 0%, ${brand.yellow} 100%)`,
    brandText: `linear-gradient(135deg, ${brand.brightGreen} 0%, ${brand.yellow} 100%)`,
    darkHero: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(2, 187, 115, 0.18), transparent)`,
    cta: `linear-gradient(135deg, ${brand.darkGreen} 0%, #024840 45%, ${brand.brightGreen} 100%)`,
    glow: `radial-gradient(ellipse at center, rgba(2, 187, 115, 0.35) 0%, transparent 70%)`,
  },
  fonts: {
    sans: "var(--font-poppins)",
    display: "var(--font-poppins)",
  },
  radius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    panel: "1.25rem",
  },
} as const;
