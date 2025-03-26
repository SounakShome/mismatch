/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			animation: {
				'float': 'float 6s ease-in-out infinite',
				'slide-up': 'slideUp 0.5s ease-out',
				'gradient': 'gradient 8s linear infinite',
				'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				slideUp: {
					'0%': { transform: 'translateY(100%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				gradient: {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				}
			},
			colors: {
				'surface': '#ffffff',
				'card': '#ffffff',
				'accent-primary': '#0ea5e9',
				'accent-secondary': '#d946ef',
				'glow': 'rgba(14, 165, 233, 0.1)',
				'glow-hover': 'rgba(14, 165, 233, 0.2)'
			}
		}
	},
	plugins: []
};