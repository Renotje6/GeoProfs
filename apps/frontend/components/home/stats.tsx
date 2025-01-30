'use client';

import { getEmployeeData, getEmployeeRequests, getSickReports } from '@/actions/users';
import { Spinner } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const HomeStats = () => {
	const { data: employeeData, isLoading: isLoadingEmployees, isError: isErrorEmployees } = useQuery({ queryKey: ['employees-home'], queryFn: async () => getEmployeeData() });
	const { data: sickData, isLoading: isLoadingSick, isError: isErrorSick } = useQuery({ queryKey: ['sick-reports'], queryFn: async () => getSickReports() });
	const { data: requestData, isLoading: isLoadingRequests, isError: isErrorRequests } = useQuery({ queryKey: ['requests'], queryFn: async () => getEmployeeRequests() });

	if (isLoadingEmployees || isLoadingSick || isLoadingRequests) {
		return (
			<div className='bg-black/[2.5%] rounded-xl w-full p-4 flex flex-col gap-2 items-center'>
				<Spinner />
			</div>
		);
	}

	if (isErrorEmployees || isErrorSick || isErrorRequests) {
		return <div>Failed to fetch data</div>;
	}

	console.log({ employeeData, sickData });

	return (
		<div className='bg-black/[2.5%] rounded-xl w-full p-4 flex flex-col gap-2 items-center'>
			<h2>UW AANVRAGEN</h2>
			<div className='flex gap-4 md:gap-10 w-full flex-col md:flex-row'>
				{/* Requests */}
				<div className='flex gap-4 bg-black/5 rounded-lg p-2 items-center w-full text-xl justify-center'>
					<h2 className='font-medium'>AFMELDINGEN</h2>
					<p className='text-zinc-500'>{requestData.length}</p>
				</div>
				{/* Open */}
				<div className='flex gap-4 bg-black/5 rounded-lg p-2 items-center w-full px-14 text-xl justify-center'>
					<h2 className='font-medium'>ZIEKMELDINGEN</h2>
					<p className='text-zinc-500'>{sickData.length}</p>
				</div>
				{/* Accepted */}
				<div className='flex gap-4 bg-black/5 rounded-lg p-2 items-center w-full px-14 text-xl justify-center'>
					<h2 className='font-medium'>BALANS</h2>
					<p className='text-zinc-500'>{employeeData.balance}</p>
				</div>
			</div>
		</div>
	);
};

export default HomeStats;
