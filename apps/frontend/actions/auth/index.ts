'use server';

import { cookies } from 'next/headers';

export async function handleLogin(token: string) {
	try {
		const cookiesStore = await cookies();
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
		const cookiesStore = await cookies();
		cookiesStore.delete('token');
		return true;
	} catch (error) {
		console.error('Failed to remove token:', error);
		return false;
	}
}
