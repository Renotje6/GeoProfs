'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/image/crown.png';

export default function Login() {
	const [isClient, setIsClient] = useState(false);
	const [showPassword, setShowPassword] = useState(false); // State voor het tonen van het wachtwoord

	// Zorg ervoor dat component pas rendert wanneer client-side rendering begint
	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null; // Render niets totdat we zeker weten dat we client-side zijn
	}

	// Toggle functie voor het tonen van het wachtwoord
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<>
			<div className='inlog_section w-full flex justify-center items-center h-screen'>
				<div className='inlog_form w-1/2 flex justify-center items-center h-full'>
					<form className='flex flex-col gap-4'>
						<div className='flex justify-center items-center gap-2'>
							<Image
								src={logo}
								width={30}
								height={30}
								alt='Logo'
								priority
							/>
							<h2 className='text-2xl font-medium'>LOGIN</h2>
						</div>
						{/* <!-- Email / Gebruikersnaam Input --> */}
						<div className='email'>
							<input
								className='rounded-xl p-3'
								type='text'
								placeholder='Email / Gebruikersnaam'
							/>
						</div>
						<div className='wachtwoord relative'>
							{' '}
							{/* Toevoegen van relative position */}
							<input
								className='rounded-xl p-3 pr-10' // Voeg extra padding toe aan de rechterkant voor het icoon
								type={showPassword ? 'text' : 'password'} // Pas type aan op basis van showPassword
								placeholder='Wachtwoord'
							/>
							{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
							<span
								className='absolute right-3 top-4 cursor-pointer w-5 h-5 rounded-xl' // Positie van het oog-icoon
								onClick={togglePasswordVisibility} // Toggle functie bij klikken
							/>
						</div>
						<input
							className='btn font-medium bg-button rounded-xl py-3 text-white cursor-pointer'
							type='submit'
							value='LOGIN'
						/>
						<Link
							className='wachtwoprd_vergeten text-sm self-end text-customGray'
							href='/'>
							Wachtwoord Vergeten?
						</Link>
					</form>
				</div>

				{/* Vervang deze Image-component tijdelijk door een div als test */}
				<div className='inlog_logo w-1/2 flex justify-center items-center bg-hero h-full hidden xl:flex'>
					<Image
						src={logo}
						width={44}
						height={44}
						alt='Logo'
						priority
					/>
					<h2 className='font-medium text-2xl'>GEOPROFS</h2>
				</div>
			</div>
		</>
	);
}
