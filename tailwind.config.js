/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
        colors: {
            "primary": "#eab308",
            "primary-darker": "#ca8a04",
            "secondary": "#1d4ed8",
            "secondary-darker": "#1e40af",

            // Light Mode Colors (Neutral)
            light: {
                background: "#ffffff",          // Pure White
                foreground: "#111111",          // Almost Black
                primary: "#333333",             // Dark Gray
                secondary: "#666666",           // Medium Gray
                accent: "#999999",              // Light Gray
                muted: "#f5f5f5",               // Soft White
                line: "#D4D4D4",
                hover: "#c5c5c5"
            },
            // Dark Mode Colors (Neutral)
            dark: {
                background: "#1c1c1d",          // Pure Black
                // foreground: "#e5e5e5",          // Soft White
                foreground: "#e2e5e9",          // Soft White
                primary: "#999999",             // Light Gray
                secondary: "#666666",           // Medium Gray
                // accent: "#333333",              // Dark Gray
                accent: "#252728",              // Dark Gray
                muted: "#1a1a1a",               // Very Dark Gray
                line: "#404040",
                hover: "#4f5152"
            },
        },
        animation: {
            'pulse-slow': 'pulse 5s ease-in-out infinite',
            'pulse-fast': 'pulse 2s ease-in-out infinite',
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

