/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
        colors: {
            // "primary": "#8B5CF6", // purple-600
            // "secondary": "#333a48",
            // "tertiary": "#768A96",
            // "light": "#AAC7D8",
            // "lighter": "#DFEBF6",
            // "lightest": "#E6E6E6",

            // "lightest": "#c3e2e5",
            // "lighter": "#80dcda",
            // "light": "#48cbc5",
            // "tertiary": "#1e9c98",
            // "secondary": "#016f6c",
            // "primary": "#054d50",
            "bg1": "#ffc7c7",
            "bg2": "#f8d2c4",
            "bg": "#ffffff",
            // "primary-bg": "#e5e5e5",
            "primary-text": "#000000",
            "primary": "#E63946",
            "phover" : "#FF6B6B",
            "pactive" : "#B22234",
            "tertiary": "#0d6efd",
            "accent": "#F77F00",

            "secondary": "#b3b3b3",
            "hover": "#E5E5E5",
            "active": "#CCCCCC",

            "dark-primary-bg": "#1E1E1E",
            "dark-secondary-bg" : "#121212",
            "dark-accent-bg": "#343541",
            "dark-primary-text": "#FFFFFF",
            "dark-secondary-text": "#B3B3B3",
            "dark-border": "#292929",
            "dark-hover": "#232323",
            "dark-active": "#383838",
            "dark-modal-bg": "#2A2A37",
            "dark-primary": "#9B2831",
            "dark-modal": "#1A1A1E",

            // "primary-bg": "#9f9f9f",
            // "primary-bg": "#bebebe",
            "primary-bg": "#e0e0e0",
            "side-bar": "#d2d2d2",
            "secondary-bg" : "#FFFFFF",
            "primary-text": "#333333",
            "secondary-text": "#555555",
            "border": "#D1D5DB",
            "card": "#FFFFFF",
            "modal": "#F3F4F6",
            "hover": "#e1e1e1",
            "active": "#6B7280",
        }
    },
  },
  variants: {
    extend: {
        display: ["print"],
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

