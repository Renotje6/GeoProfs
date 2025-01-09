'use client';

import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { TbMessageReportFilled } from 'react-icons/tb';
import Logo from '@/public/image/crown.png';
import { BiLogOut } from 'react-icons/bi';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
	title: string;
	endContent?: React.ReactNode;
	hideLinks?: boolean;
	hideAvatar?: boolean;
	hideNotifications?: boolean;
}

const Header = ({ title, endContent, hideAvatar = false, hideLinks = false, hideNotifications = true }: HeaderProps) => {
	const routes = [
		{
			label: 'Dashboard',
			href: '/dashboard',
		},
		{
			label: 'Aanvragen',
			href: '/requests',
		},
		{
			label: 'Gebruikers',
			href: '/users',
		},
	];

	return (
		<header className='w-full bg-black/5 rounded-lg min-h-20 flex gap-2 items-center p-2 justify-between px-4 shadow-xl shadow-black/5'>
			{/* Start Content */}
			<div className='flex gap-2 items-center'>
				<div className='relative aspect-square size-16'>
					<Image
						src={Logo}
						alt='GeoProfs Logo'
						fill
					/>
				</div>
				<p className='text-4xl font-semibold'>{title}</p>
				{!hideLinks && (
					<div className='pl-5'>
						<ul className='flex text-lg'>
							{routes.map((route, index) => (
								<li key={route.label}>
									<Link
										className='uppercase font-medium hover:underline decoration-4 underline-offset-4'
										href={route.href}>
										{route.label}
									</Link>
									{index < routes.length - 1 && (
										<span className='mx-2'>●</span> // Dot separator
									)}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>

			{/* End Content */}
			<div className='flex items-center gap-2'>
				{!hideNotifications && (
					<Dropdown
						closeOnSelect={false}
						placement='bottom-end'>
						<DropdownTrigger>
							<Button
								isIconOnly
								size='lg'
								variant='light'
								radius='full'
								startContent={
									<Avatar
										size='lg'
										icon={<TbMessageReportFilled className='size-7' />}
									/>
								}
							/>
						</DropdownTrigger>
						<DropdownMenu aria-label='Account Actions'>
							<DropdownItem
								key={1}
								textValue='Logout'
								variant='flat'
								onClick={() => {
									// signOut();
								}}>
								Notifications
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				)}
				{endContent
					? endContent
					: !hideAvatar && (
							<Dropdown
								closeOnSelect={false}
								placement='bottom-end'>
								<DropdownTrigger>
									<Button
										isIconOnly
										size='lg'
										variant='light'
										radius='full'
										startContent={<Avatar size='lg' />}
									/>
								</DropdownTrigger>
								<DropdownMenu aria-label='Account Actions'>
									<DropdownItem
										key={1}
										textValue='Logout'
										variant='flat'
										startContent={<BiLogOut />}
										onClick={() => {
											// signOut();
										}}
										className='text-danger'
										color='danger'>
										Logout
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						)}
			</div>
		</header>
	);
};

export default Header;
