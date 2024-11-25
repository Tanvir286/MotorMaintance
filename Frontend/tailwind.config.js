/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            colors: {
                "light-gray": '#f1f5f9', 
                "dark-gray": '#1f2937', 
            },
            fontFamily: {
                "gum-bold": ['Gummy Bold']
            },        
            container: {
                center: true 
            },
            boxShadow: {
                'custom': 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
            },
        },
    },
    plugins: [],
}
