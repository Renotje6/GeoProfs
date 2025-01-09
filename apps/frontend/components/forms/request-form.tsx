'use client';

import { Button, DateRangePicker, Input, Select, SelectItem } from '@nextui-org/react';
import { parseZonedDateTime, now, type ZonedDateTime } from '@internationalized/date';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import React, { useEffect } from 'react';

type FormFields = {
	type: 'personal' | 'holiday';
	startDate: string;
	endDate: string;
	reason: string;
};

const RequestForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	return (
		<form className='w-screen max-w-[400px] flex flex-col gap-10'>
			{/* Iamge & Title */}
			<div className='flex gap-2 items-center justify-center'>
				<p className='font-medium text-3xl'>VERLOF AANVRAGEN</p>
			</div>
			{/* Form Fields */}
			<div className='w-full flex flex-col gap-4'>
				<Select
					variant='bordered'
					label='Soort verlof'
					size='lg'>
					<SelectItem key='personal'>Persoonlijk</SelectItem>
					<SelectItem key='holiday'>Vakantie</SelectItem>
				</Select>
				<DateRangePicker
					hideTimeZone
					variant='bordered'
					label='Event duration'
					visibleMonths={2}
					onChange={(value) => console.log(value)}
				/>
				<Input
					{...register('reason')}
					variant='bordered'
					type='text'
					size='sm'
					radius='md'
					label='Reden'
					isInvalid={!!errors.reason}
					errorMessage={errors.reason?.message?.toString()}
				/>
			</div>

			<div className='flex flex-col gap-2'>
				<Button
					size='lg'
					type='submit'
					color='primary'
					variant='shadow'
					className='w-full'>
					LOGIN
				</Button>

				<div className='flex gap-1 text-sm justify-center'>
					<p className='text-center text-zinc-400'>Forgot your password?</p>
					<Link
						href='/reset-password'
						className='text-primary-300 hover:underline'>
						Click here
					</Link>
				</div>
			</div>
		</form>
	);
};

export default RequestForm;
