'use client';

import { Button, DateRangePicker, Input, Select, SelectItem } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import React from 'react';

type FormFields = {
	category: 'ziekmelding' | 'verlof';
	type: 'personal' | 'holiday';
	startDate: string;
	endDate: string;
	reason: string;
};

const RequestForm = () => {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm();

	return (
		<form
			className='w-screen max-w-[400px] flex flex-col gap-10'
			onSubmit={handleSubmit((data) => console.log(data))}>
			{/* Iamge & Title */}
			<div className='flex gap-2 items-center justify-center'>
				<p className='font-medium text-3xl'>VERLOF AANVRAGEN</p>
			</div>
			{/* Form Fields */}
			<div className='w-full flex flex-col gap-4'>
				<Select
					{...register('category')}
					variant='bordered'
					label='Categorie'
					disallowEmptySelection
					defaultSelectedKeys={['ziekmelding']}
					size='lg'>
					<SelectItem key='ziekmelding'>Ziekmelding</SelectItem>
					<SelectItem key='verlof'>Verlof</SelectItem>
				</Select>
				{watch('category') === 'verlof' && (
					<>
						<Select
							{...register('type')}
							variant='bordered'
							label='Soort verlof'
							disallowEmptySelection
							defaultSelectedKeys={['personal']}
							size='lg'>
							<SelectItem key='personal'>Persoonlijk</SelectItem>
							<SelectItem key='holiday'>Vakantie</SelectItem>
						</Select>
						<DateRangePicker
							hideTimeZone
							variant='bordered'
							label='Event duration'
							visibleMonths={2}
							onChange={(value) => {
								value?.start && setValue('startDate', value.start.toString());
								value?.end && setValue('endDate', value.end.toString());
							}}
						/>
						<Input
							{...register('reason')}
							variant='bordered'
							type='text'
							size='md'
							radius='md'
							label='Reden'
							isInvalid={!!errors.reason}
							errorMessage={errors.reason?.message?.toString()}
						/>
					</>
				)}
			</div>

			<div className='flex flex-col gap-2'>
				<Button
					size='lg'
					type='submit'
					color='primary'
					variant='shadow'
					className='w-full'>
					INDIENEN
				</Button>
			</div>
		</form>
	);
};

export default RequestForm;
