'use client';

import HomeTable from '@/components/home/home-table';

export default function AdminPage() {
	return (
		<div className='flex flex-col gap-10 w-full xl:w-[80%] my-24'>
			{/* Statics */}
			<div className='bg-black/[2.5%] rounded-xl w-full p-4 flex flex-col gap-2 items-center'>
				<h2>UW AANVRAGEN</h2>
				<div className='flex gap-4 md:gap-10 w-full flex-col md:flex-row'>
					{/* Requests */}
					<div className='flex gap-4 bg-black/5 rounded-lg p-2 items-center w-full text-xl justify-center'>
						<h2 className='font-medium'>AANVRAGEN</h2>
						<p className='text-zinc-500'>3</p>
					</div>
					{/* Open */}
					<div className='flex gap-4 bg-black/5 rounded-lg p-2 items-center w-full px-14 text-xl justify-center'>
						<h2 className='font-medium'>OPEN</h2>
						<p className='text-zinc-500'>1</p>
					</div>
					{/* Accepted */}
					<div className='flex gap-4 bg-black/5 rounded-lg p-2 items-center w-full px-14 text-xl justify-center'>
						<h2 className='font-medium'>GEACCEPTEERD</h2>
						<p className='text-zinc-500'>2</p>
					</div>
				</div>
			</div>
			{/* Table */}
			<div className='w-full bg-black/[2.5%] rounded-xl p-4 min-w-[800px]'>
				<HomeTable />
			</div>
		</div>
	);
}
