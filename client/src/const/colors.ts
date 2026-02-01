// V2V Translate Color Palette
// TypeScript color variables

// Primary Colors
export const COLORS = {
  // Background
  background: {
    primary: '#0f1419',      // Dark navy/black background
    secondary: '#1a2332',    // Slightly lighter background
    tertiary: '#2a3f5f',     // Dark blue-gray
  },

  // Accent Colors
  accent: {
    cyan: '#00d4ff',         // Bright cyan/turquoise
    pink: '#ff1493',         // Deep pink/magenta
    neon_pink: '#ff4081',    // Neon pink for glow effect
  },

  // Glow Effects
  glow: {
    pink_glow: '#ff1493',    // Pink glow for microphone
    cyan_glow: '#00d4ff',    // Cyan glow for buttons
  },

  // Text Colors
  text: {
    primary: '#ffffff',      // White text
    secondary: '#b0b8c1',    // Light gray text
    muted: '#7a8a99',        // Muted gray
    cyan: '#00d4ff',         // Cyan text (transcription)
  },

  // Border Colors
  border: {
    primary: '#00d4ff',      // Cyan borders
    secondary: '#2a3f5f',    // Dark blue-gray borders
    subtle: '#1a2f4f',       // Very subtle borders
  },

  // UI Elements
  button: {
    bg: 'rgba(0, 212, 255, 0.1)',  // Transparent cyan background
    border: '#00d4ff',              // Cyan border
    hover_bg: 'rgba(0, 212, 255, 0.2)',
  },

  // Microphone Button
  microphone: {
    bg: '#ff1493',           // Pink background
    glow: '#ff1493',         // Pink glow
    icon_bg: '#ff1493',      // Pink icon background
  },

  // Waveform
  waveform: {
    color: '#ff1493',        // Pink waveform bars
    glow_color: '#ff1493',   // Pink glow effect
  },

  // Status/Messages
  status: {
    listening: '#00d4ff',    // Cyan for "Listening..." text
    transcript: '#00d4ff',   // Cyan for transcript text
  },
};

// Alternative: Tailwind-style naming
export const THEME = {
  // Dark mode backgrounds
  bg: {
    900: '#0f1419',
    800: '#1a2332',
    700: '#2a3f5f',
  },

  // Cyan/Turquoise
  cyan: {
    400: '#00d4ff',
    500: '#00bfff',
  },

  // Pink/Magenta
  pink: {
    500: '#ff1493',
    600: '#ff0080',
  },

  // Text
  text: {
    white: '#ffffff',
    gray: '#b0b8c1',
  },
};

// CSS Variables (if you want to export as CSS too)
export const getCSSVariables = () => `
  :root {
    --bg-primary: ${COLORS.background.primary};
    --bg-secondary: ${COLORS.background.secondary};
    --bg-tertiary: ${COLORS.background.tertiary};
    
    --accent-cyan: ${COLORS.accent.cyan};
    --accent-pink: ${COLORS.accent.pink};
    
    --text-primary: ${COLORS.text.primary};
    --text-secondary: ${COLORS.text.secondary};
    --text-cyan: ${COLORS.text.cyan};
    
    --border-cyan: ${COLORS.border.primary};
    
    --microphone-pink: ${COLORS.microphone.bg};
    --waveform-pink: ${COLORS.waveform.color};
  }
`;