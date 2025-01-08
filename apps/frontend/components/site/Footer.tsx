'use client';

import Logo from '@/public/image/crown.png';
import { Button } from '@nextui-org/react';
import { FaArrowUp } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
	return (
		<footer className='w-full bg-black/5 rounded-lg min-h-10 opacity-50 flex justify-between gap-4 p-1'>
			<div className='flex gap-4'>
				<div className='relative aspect-square size-10'>
					<Image
						src={Logo}
						alt='GeoProfs Logo'
						fill
					/>
				</div>
				<div className='flex gap-2 items-center'>
					<Link
						href='/admin'
						className='hover:underline'>
						HOME
					</Link>
					●
					<Link
						href='/admin'
						className='hover:underline'>
						AANVRAGEN
					</Link>
				</div>
			</div>
			<Button
				isIconOnly
				size='sm'
				onClick={() => {
					window.scrollTo({ top: 0, behavior: 'smooth' });
				}}
				startContent={<FaArrowUp />}
			/>
		</footer>
	);
};

export default Footer;
