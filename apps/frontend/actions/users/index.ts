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

export async function getEmployeeData() {
	try {
		const response = await fetch('http://localhost:8080/employees/me', {
			headers: {
				Authorization: `Bearer ${cookies().get('token')?.value}`,
			},
		});
		if (!response.ok) {
			return null;
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Failed to fetch employee data:', error);
		return null;
	}
}

export async function getSickReports() {
	try {
		const response = await fetch('http://localhost:8080/sick-reports', {
			headers: {
				Authorization: `Bearer ${cookies().get('token')?.value}`,
			},
		});
		if (!response.ok) {
			return null;
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Failed to fetch sick reports:', error);
		return null;
	}
}

export async function getEmployeeRequests() {
	try {
		const response = await fetch('http://localhost:8080/leave-requests', {
			headers: {
				Authorization: `Bearer ${cookies().get('token')?.value}`,
			},
		});
		if (!response.ok) {
			return null;
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Failed to fetch requests:', error);
		return null;
	}
}
