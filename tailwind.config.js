const { colors } = require('tailwindcss/defaultTheme')
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            borderRadius: {
                'xxl': '1rem',
            },
            fontFamily: {
                'poppins': ['"Poppins"'],
            },
            fontSize: {
                'xxxs': '0.25rem',
                'xxs': '0.6rem'
            }
        },
        colors: {
            ...colors,
            red: {
                light: '#EB786F',
                DEFAULT: '#b42318',
                dark: '#7E1811',
            },
            white: {
                light: '#fff',
                DEFAULT: '#f7f7f7',
            },
            black: {
                light: '#97979B',
                DEFAULT: '#363537',
                dark: '#141415'
            }
        }
    },
    variants: {
        extend: {
            animation: ['responsive', 'motion-safe', 'motion-reduce', 'hover', 'focus', 'active'],
            transform: ['responsive', 'motion-safe', 'motion-reduce', 'hover', 'focus', 'active'],
        }
    },
    plugins: []
}
