'use client';

import { getUserData } from '@/actions/users';
import HomeTable from '@/components/home/home-table';
import HomeStats from '@/components/home/stats';
import { Spinner } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';

export default function AdminPage() {
	const { data, isLoading, isError } = useQuery({ queryKey: ['home'], queryFn: () => getUserData() });

	if (isLoading) {
		return (
			<Spinner
				size='lg'
				label='Loading Data...'
			/>
		);
	}

	if (data)
		return (
			<div className='flex flex-col gap-10 w-full xl:w-[80%] my-24'>
				{/* Statics */}
				<HomeStats />
				{/* Table */}
				<div className='w-full bg-black/[2.5%] rounded-xl p-4 min-w-[800px]'>
					<HomeTable />
				</div>
			</div>
		);
}
