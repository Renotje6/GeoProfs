import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				button: '#006FEE',
				customGray: '#A7A7A7',
				hero: 'f1f0f0',
				achterground: '#e7e5e5',
				headerground: '#eae7e7',
				buttonsh: '#d1e5fc',
				pcolor: '#A4A4A4',
			},
		},
	},
	plugins: [nextui()],
};
export default config;
