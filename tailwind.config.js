// /** @type {import('tailwindcss').Config} */
// const { colors } = require("tailwindcss/defaultTheme");
// module.exports = {
//   darkMode: ["class"],
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./**/*.{js,ts,jsx,tsx}", 
//     "./**/*.css"
// // הוספה שתופסת גם תיקיות מחוץ ל-src אם יש
//   ],
  
//   // content: [
//   //   "./index.html",
//   //   "./src/**/*.{js,ts,jsx,tsx}", // זהו הנתיב העיקרי שחייב להיות קיים.
//   //   // "app/**/*.{ts,tsx}", // נתיב זה רלוונטי לרוב לפרויקטי Next.js (תיקיית app),
//   //                        // אם זה לא פרויקט Next.js, סביר להניח שאין צורך בו.
//   //   // "components/**/*.{ts,tsx}", // אם הקומפוננטות שלך נמצאות בתוך src/components,
//   //                                // אז הנתיב העליון "./src/**/*.{js,ts,jsx,tsx}" כבר מכסה אותן.
//   //                                // אם יש לך תיקיית components ברמת ה-root, השאר את זה.
//   // ],
//   theme: {
//     extend: {
//       colors: {
//         ...colors,
//         border: "hsl(var(--border))",
//         input: "hsl(var(--input))",
//         ring: "hsl(var(--ring))",
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",
//         primary: {
//           DEFAULT: "hsl(var(--primary))",
//           foreground: "hsl(var(--primary-foreground))",
//         },
//         secondary: {
//           DEFAULT: "hsl(var(--secondary))",
//           foreground: "hsl(var(--secondary-foreground))",
//         },
//         destructive: {
//           DEFAULT: "hsl(var(--destructive))",
//           foreground: "hsl(var(--destructive-foreground))",
//         },
//         muted: {
//           DEFAULT: "hsl(var(--muted))",
//           foreground: "hsl(var(--muted-foreground))",
//         },
//         accent: {
//           DEFAULT: "hsl(var(--accent))",
//           foreground: "hsl(var(--accent-foreground))",
//         },
//         popover: {
//           DEFAULT: "hsl(var(--popover))",
//           foreground: "hsl(var(--popover-foreground))",
//         },
//         card: {
//           DEFAULT: "hsl(var(--card))",
//           foreground: "hsl(var(--card-foreground))",
//         },
//       },
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//       fontFamily: {
//         // ניתן להגדיר כאן פונטים מותאמים אישית.
//         // Tailwind CSS משתמש ב-sans-serif כברירת מחדל,
//         // ואתה יכול להוסיף כאן פונטים משלך (למשל, מ-Google Fonts)
//         // אם אתה רוצה שהם יופיעו בקלאסים כמו font-sans.
//         // נראה שזה מוגדר נכון עבור "Segoe UI" וכו'.
//         sans: ["Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif"],
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate")],
// };
/** @type {import('tailwindcss').Config} */
const { colors } = require("tailwindcss/defaultTheme")

module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ...colors,
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
