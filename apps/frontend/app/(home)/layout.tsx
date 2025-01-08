'use client';

import Header from '@/components/site/Header';
import { Button } from '@nextui-org/react';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='p-2 min-h-screen flex flex-col'>
			<Header
				title='GEOPROFS'
				endContent={
					<Button
						color='primary'
						variant='shadow'
						onClick={() => {
							alert('TODO: Login');
						}}
						size='lg'>
						Login
					</Button>
				}
			/>
			<main className='flex-grow flex items-center'>{children}</main>
		</div>
	);
}
