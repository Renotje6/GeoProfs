'use server';

import { cookies } from 'next/headers';

export async function getUserData() {
	try {
		const cookiesStore = cookies();
		if (!cookiesStore.get('token')) return null;

		const response = await fetch('http://localhost:8080/auth/me', {
			headers: {
				Authorization: `Bearer ${cookiesStore.get('token')?.value}`,
			},
		});

		if (!response.ok) {
			return null;
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Failed to fetch user data:', error);
		return null;
	}
}
