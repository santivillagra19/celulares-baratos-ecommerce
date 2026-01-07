import type { Config } from 'tailwindcss'

const config: Config = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            container: {
                center: true,
                padding: '1rem',
            },
            fontFamily: {
                montserrat: ['Montserrat', 'sans-serif'],
            }
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
    ]
}

export default config