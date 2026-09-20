export const brand = {
  navy: "#0B2426",
  navyAlt: "#024549",
  purple: "#02BB73",
  purpleLight: "#029961",
  purpleDark: "#019A5F",
  slate: "#5A716F",
  white: "#FFFFFF",
  offWhite: "#ECF1F5",
  border: "#D7E3E6",
} as const;

export const theme = {
  colors: {
    ...brand,
    green: brand.purple,
    greenLight: brand.purpleLight,
    greenDark: brand.purpleDark,
    accent: brand.purple,
    dark: brand.navy,
    darkElevated: brand.navyAlt,
    darkCard: "#0F2E31",
    darkBorder: "rgba(255, 255, 255, 0.1)",
    text: brand.navy,
    textMuted: brand.slate,
    textOnDark: brand.white,
    success: brand.purple,
    glass: "rgba(255, 255, 255, 0.88)",
  },
  gradients: {
    brand: `linear-gradient(135deg, ${brand.purple} 0%, ${brand.purpleLight} 100%)`,
    brandText: `linear-gradient(135deg, ${brand.purple} 0%, ${brand.purpleLight} 100%)`,
    darkHero: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(2, 187, 115, 0.12), transparent)`,
    cta: `linear-gradient(135deg, ${brand.navy} 0%, ${brand.navyAlt} 45%, #03181A 100%)`,
    glow: `radial-gradient(ellipse at center, rgba(2, 187, 115, 0.25) 0%, transparent 70%)`,
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
