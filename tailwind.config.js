/* eslint-env es6 */
/* eslint-disable no-console */
const plugin = require("tailwindcss/plugin");
const TailwindPreFunction = require("./tailwind.pre-function");

module.exports = {
    prefix: "",
    content: ["./src/**/*.html", "./src/**/*.ts"],
    darkMode: "class", // or 'media' or 'class'
    /**
     * Src: https://tailwindcss.com/docs/upgrade-guide#disabling-core-plugins
     * In v4, corePlugins doesn't support
     */
    corePlugins: {
        preflight: false,
    },
    theme: {
        // Overwrite the default tailwindCSS
        colors: {},
        spacing: {
            auto: "auto",
            ...TailwindPreFunction.generatePixelValues({
                fromNumber: 0,
                toNumber: 10,
                customNumbers: [0.5, 1.5],
            }),
        },
        fontFamily: {},
        fontWeight: {},
        fontSize: TailwindPreFunction.generatePixelValues({
            fromNumber: 0,
            toNumber: 10,
            customNumbers: [0.5, 1.5, 2.5, 100],
        }),
        lineHeight: {},
        borderRadius: {},
        boxShadow: {},
        screens: {
            "1280px": "1280px",
            // => @media (min-width: 1280px) { ... } // For old design
            // We only use 3 of responsive sizes
            "768px": "768px",
            // => @media (min-width: 768px) { ... }
            "1024px": "1024px",
            // => @media (min-width: 1024px) { ... }
            "1440px": "1440px",
            // => @media (min-width: 1440px) { ... }
        },
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            addUtilities({
                ".break-words": {
                    "word-break": "break-word",
                },
                ".flex-center": {
                    display: "flex",
                    "align-items": "center",
                    "justify-content": "center",
                },
            });
        }),
    ],
};
