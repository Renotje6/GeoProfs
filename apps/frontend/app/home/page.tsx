'use client';

import HomeTable from '@/components/home/home-table';
import HomeStats from '@/components/home/stats';

export default function AdminPage() {
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
