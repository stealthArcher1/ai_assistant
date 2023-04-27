/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './features/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            keyframes: {
                typing: {
                    '0%': {
                        width: '0%',
                        visibility: 'hidden',
                    },
                    '100%': {
                        width: '100%',
                    },
                },
                blink: {
                    '50%': {
                        borderColor: 'transparent',
                    },
                    '100%': {
                        borderColor: 'white',
                    },
                },
                slideIn: {
                    '0%': {
                        opacity: '0%',
                        transform: 'translateY(20px)',
                    },
                    '100%': {
                        opacity: '100%',
                        transform: 'translateY(0px)',
                    },
                },
            },
            animation: {
                typing: 'typing 0.7s  alternate',
                slideIn: 'slideIn 0.4s ease',
                // typing:'typing 2.7s ease-out .8s infinite alternate both',
            },
        },
    },
    variants: {
        extend: {
            visibility: ['group-hover'],
        },
    },
    plugins: [require('@tailwindcss/typography'), require('@tailwindcss/line-clamp'), require('daisyui')],
    // plugins: [],
    daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: '',
        darkTheme: 'light',
    },
};
