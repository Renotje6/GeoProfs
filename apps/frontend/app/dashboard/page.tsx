'use client';

import { Button } from '@nextui-org/react';

export default function AdminPage() {
	const sections = [
		{
			key: 'aanvragen',
			label: 'AANVRAGEN',
			content: <div>content</div>,
		},
		{
			key: 'absentie',
			label: 'ABSENTIE',
			content: <div>content</div>,
		},
		{
			key: 'gebruikers',
			label: 'GEBRUIKERS',
			content: <div>content</div>,
		},
	];

	return (
		<div className='flex gap-10 w-full xl:w-[80%] justify-between'>
			<div className='bg w-96 hidden 2xl:flex items-center flex-col lg:p-4 p-2 gap-2 grow-0 bg-black/5 rounded-xl'>
				<h2 className='text-xl font-medium'>SECTIONS</h2>
				{sections.map((section) => (
					<Button
						key={section.key}
						size='sm'
						className='w-full'
						onClick={() => {}}>
						{section.label}
					</Button>
				))}
			</div>
			<div className='flex flex-col h-full w-full gap-5 md:gap-10 bg-black/5 rounded-xl p-2 lg:p-4 '>
				{sections.map((section) => (
					<section
						key={section.key}
						id={section.key}
					/>
				))}
			</div>
		</div>
	);
}
