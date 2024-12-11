'use client';

import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import Logo from '@/public/image/crown.png';
import Image from 'next/image';
import { BiLogOut } from 'react-icons/bi';

interface HeaderProps {
	title: string;
	endContent?: React.ReactNode;
	hideAvatar?: boolean;
}

const Header = ({ title, endContent, hideAvatar = false }: HeaderProps) => {
	return (
		<header className='w-full bg-black/5 rounded-lg min-h-20 flex gap-2 items-center p-2 justify-between px-4 shadow-xl shadow-black/5'>
			<div className='flex gap-2 items-center'>
				<div className='relative aspect-square size-16'>
					<Image
						src={Logo}
						alt='GeoProfs Logo'
						fill
					/>
				</div>
				<p className='text-4xl font-medium'>{title}</p>
			</div>
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
									startContent={
										<Avatar
											size='lg'
											// name={session.data?.user?.name ?? undefined}
											// src={session.data?.user?.image ?? undefined}
										/>
									}
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
		</header>
	);
};

export default Header;
