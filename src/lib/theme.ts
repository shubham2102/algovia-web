export const brand = {
  navy: "#050714",
  navyAlt: "#0A0B1E",
  purple: "#6366F1",
  purpleLight: "#818CF8",
  purpleDark: "#4F46E5",
  slate: "#4B5563",
  white: "#FFFFFF",
  offWhite: "#F8F9FB",
  border: "#E5E7EB",
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
    darkCard: "#121528",
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
    darkHero: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.12), transparent)`,
    cta: `linear-gradient(135deg, ${brand.navy} 0%, ${brand.navyAlt} 45%, #1E1B4B 100%)`,
    glow: `radial-gradient(ellipse at center, rgba(99, 102, 241, 0.25) 0%, transparent 70%)`,
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
