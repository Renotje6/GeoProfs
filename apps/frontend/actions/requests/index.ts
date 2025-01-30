'use server';

import { cookies } from 'next/headers';

interface CreateRequest {
	type: 'sick' | 'leave';
	request?: {
		startDate: string;
		endDate: string;
		reason: string;
		type: string;
	};
}

export async function createRequest({ type, request }: CreateRequest) {
	try {
		if (type === 'sick') {
			// Create a sick report
			const response = await fetch('http://localhost:8080/sick-reports', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${cookies().get('token')?.value}`,
				},
			});

			if (!response.ok) {
				return { success: false, message: 'Failed to create sick report' };
			}

			return { success: true, message: 'Sick report created' };
		}

		// Create a leave request
		const response = await fetch('http://localhost:8080/leave-requests', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${cookies().get('token')?.value}`,
			},
			body: JSON.stringify({
				startDate: request?.startDate,
				endDate: request?.endDate,
				reason: request?.reason,
				type: request?.type,
			}),
		});

		if (!response.ok) {
			return { success: false, message: 'Failed to create leave request' };
		}

		return { success: true, message: 'Leave request created' };
	} catch (error) {
		console.error('Failed to create request:', error);
		return { success: false, message: 'Failed to create request' };
	}
}
