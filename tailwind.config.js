/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
        colors: {
            "primary": "#eab308",

            // Light Mode Colors (Neutral)
            light: {
                background: "#ffffff",          // Pure White
                foreground: "#111111",          // Almost Black
                primary: "#333333",             // Dark Gray
                secondary: "#666666",           // Medium Gray
                accent: "#999999",              // Light Gray
                muted: "#f5f5f5",               // Soft White
            },
            // Dark Mode Colors (Neutral)
            dark: {
                background: "#000000",          // Pure Black
                foreground: "#e5e5e5",          // Soft White
                primary: "#999999",             // Light Gray
                secondary: "#666666",           // Medium Gray
                accent: "#333333",              // Dark Gray
                muted: "#1a1a1a",               // Very Dark Gray
            },
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

