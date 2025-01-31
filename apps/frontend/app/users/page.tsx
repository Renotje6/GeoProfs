'use client';

import UsersTable from '@/components/dashboard/users-table';

export default function AdminPage() {
	return (
		<div className='flex flex-col gap-10 w-full xl:w-[80%] my-24'>
			{/* Table */}
			<div className='w-full bg-black/[2.5%] rounded-xl p-4 min-w-[800px]'>
				<UsersTable />
			</div>
		</div>
	);
}
