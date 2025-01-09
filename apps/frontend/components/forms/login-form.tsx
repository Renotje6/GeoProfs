'use client';

import { Button, Input } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

type FormFields = {
	email: string;
	password: string;
};

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	return (
		<form className='w-screen max-w-[400px] flex flex-col gap-10'>
			{/* Iamge & Title */}
			<div className='flex gap-2 items-center justify-center'>
				<div className='relative size-14'>
					<Image
						src='/image/crown.png'
						alt='Logo'
						fill
					/>
				</div>
				<p className='font-medium text-3xl'>LOGIN</p>
			</div>
			{/* Form Fields */}
			<div className='w-full flex flex-col gap-4'>
				<Input
					{...register('email', { required: 'Email is required' })}
					type='email'
					variant='bordered'
					label='Email'
					size='sm'
					radius='md'
					isInvalid={!!errors.email}
					errorMessage={errors.email?.message?.toString()}
				/>
				<Input
					{...register('password', { required: 'Password is required' })}
					variant='bordered'
					type='password'
					size='sm'
					radius='md'
					label='Password'
					isInvalid={!!errors.password}
					errorMessage={errors.password?.message?.toString()}
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

export default LoginForm;
