'use server';

import { cookies } from 'next/headers';

export async function handleLogin(token: string) {
	try {
		const cookiesStore = cookies();
		cookiesStore.set('token', token, {
			maxAge: 60 * 60 * 24 * 1, // 1 day
		});
		return true;
	} catch (error) {
		console.error('Failed to store token:', error);
		return false;
	}
}

export async function handleLogout() {
	try {
		const cookiesStore = cookies();
		cookiesStore.delete('token');
		return true;
	} catch (error) {
		console.error('Failed to remove token:', error);
		return false;
	}
}

export async function isTokenValid() {
	try {
		const cookiesStore = cookies();
		const response = await fetch('http://localhost:8080/auth/me', {
			headers: {
				Authorization: `Bearer ${cookiesStore.get('token')?.value}`,
			},
		});
		// If the response is not OK, the token is invalid
		if (!response.ok) return false;

		return true;
	} catch (error) {
		console.error('Failed to validate token:', error);
		return false;
	}
}
