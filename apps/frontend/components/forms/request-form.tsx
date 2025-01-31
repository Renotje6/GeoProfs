'use client';

import { Button, DateRangePicker, Input, Select, SelectItem } from '@nextui-org/react';
import { createRequest } from '@/actions/requests';
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
		setError,
		watch,
		formState: { errors },
	} = useForm<FormFields>();

	const onSubmit = async (data: FormFields) => {
		if (data.category === 'verlof' && !data.startDate) {
			return setError('root', { message: 'Start date is required' });
		}

		if (data.category === 'verlof' && !data.endDate) {
			return setError('root', { message: 'End date is required' });
		}

		if (data.category === 'verlof' && !data.reason) {
			return setError('root', { message: 'Reason is required' });
		}

		const response = await createRequest({
			type: data.category === 'verlof' ? 'leave' : 'sick',
			...(data.category === 'verlof' && {
				request: {
					startDate: new Date(data.startDate).toISOString(),
					endDate: new Date(data.endDate).toISOString(),
					reason: data.reason,
					type: data.type,
				},
			}),
		});

		console.log('Response:', response);

		if (!response.success) {
			return setError('root', { message: response.message });
		}

		console.log('Request created:', response);

		// redirect
		window.location.href = '/home';
	};

	return (
		<form
			className='w-screen max-w-[400px] flex flex-col gap-10'
			onSubmit={handleSubmit(onSubmit)}>
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
							{...register('type', {
								disabled: watch('category') === 'ziekmelding',
								required: 'Soort verlof is verplicht',
							})}
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
							{...register('reason', {
								disabled: watch('category') === 'ziekmelding',
								required: 'Reden is verplicht',
							})}
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

			{/* errors */}
			{errors.root && <p className='text-red-500 text-center'>{errors.root.message}</p>}

			{/* Submit Button */}
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
