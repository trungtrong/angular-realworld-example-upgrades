/* eslint-env es6 */
/* eslint-disable no-console */
const plugin = require("tailwindcss/plugin");
module.exports = {
    prefix: "",
    content: ["./src/**/*.html", "./src/**/*.ts"],
    darkMode: "class", // or 'media' or 'class'
    corePlugins: {
        preflight: false
    },
    theme: {
        extend: {
            opacity: {
                0: "0",
                5: "0.05",
                10: "0.1",
                20: "0.2",
                25: "0.25",
                30: "0.3",
                40: "0.4",
                50: "0.5",
                60: "0.6",
                70: "0.7",
                75: "0.75",
                80: "0.8",
                90: "0.9",
                95: "0.95",
                100: "1"
            },
            rotate: {
                0: "0deg",
                45: "45deg",
                90: "90deg",
                180: "180deg"
            },
        },
        // Overwrite the default tailwindCSS
        colors: {},
        spacing: {},
        fontFamily: {},
        fontWeight: {},
        fontSize: {},
        lineHeight: {},
        borderRadius: {},
        boxShadow: {},
        screens: {
            '1280': '1280px',
            // => @media (min-width: 1280px) { ... } // For old design
            // We only use 3 of responsive sizes
            '768': '768px',
            // => @media (min-width: 768px) { ... }
            '1024': '1024px',
            // => @media (min-width: 1024px) { ... }
            '1440': '1440px',
            // => @media (min-width: 1440px) { ... }
        },
    },
    variants: {
        extend: {}
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            addUtilities({
                ".break-words": {
                    "word-break": "break-word"
                },
                ".flex-center": {
                    "display": "flex",
                    "align-items": "center",
                    "justify-content": "center",
                }
            });
        })
    ]
};



