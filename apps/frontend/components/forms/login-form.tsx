'use client';

import { Button, Input } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { handleLogin } from '@/actions/auth';

type FormFields = {
	login: string;
	pass: string;
};

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<FormFields>();

	// Mutation for login
	const loginMutation = useMutation({
		mutationFn: async (data: FormFields) => {
			const response = await fetch('http://localhost:8080/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			return await response.json();
		},
		onSuccess: async (data) => {
			if (data.message !== 'Unauthorized') {
				// Handle success, e.g., redirect or store token
				console.log('Login successful:', data);
				// store access token in session storage
				const response = await handleLogin(data.accessToken);
				// Redirect or update the state
				if (response) window.location.href = data.role === 'manager' ? '/dashboard' : '/home';
				else {
					// Set error message
					setError('root', {
						message: 'Failed to store token',
					});
				}
			} else {
				// Set error message
				setError('root', {
					message: 'Invalid email or password',
				});
			}
		},
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		onError: (error: any) => {
			// Handle error, e.g., show error messages
			console.error('Login failed:', error.response?.data || error.message);
			// Set error message
			setError('root', {
				message: error.response?.data?.message || error.message,
			});
		},
	});

	// Form submission handler
	const onSubmit = (data: FormFields) => {
		loginMutation.mutate(data);
	};

	return (
		<form
			className='w-screen max-w-[400px] flex flex-col gap-10'
			onSubmit={handleSubmit(onSubmit)}>
			{/* Image & Title */}
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
					{...register('login', { required: 'Email is required' })}
					type='email'
					variant='bordered'
					label='Email'
					size='sm'
					radius='md'
					isInvalid={!!errors.login}
					errorMessage={errors.login?.message?.toString()}
				/>
				<Input
					{...register('pass', { required: 'Password is required' })}
					variant='bordered'
					type='password'
					size='sm'
					radius='md'
					label='Password'
					isInvalid={!!errors.pass}
					errorMessage={errors.pass?.message?.toString()}
				/>
			</div>

			{/* Error message */}
			{errors.root && <p className='text-red-500 text-sm text-center'>{errors.root.message}</p>}

			{/* Submit Button */}

			<div className='flex flex-col gap-2'>
				<Button
					size='lg'
					type='submit'
					color='primary'
					isLoading={loginMutation.isPending}
					variant='shadow'
					className='w-full'
					isDisabled={loginMutation.isPending} // Disable button during loading
				>
					{loginMutation.isPending ? 'Logging in...' : 'LOGIN'}
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
