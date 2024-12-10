import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/image/crown.png';
import noti from '@/public/image/Button.png';
import avatar from '@/public/image/Avatar.png';

// Define the type for individual link objects
interface LinkItem {
	href: string;
	label: string;
}

// Props for the Header component
interface HeaderProps {
	links: LinkItem[];
}

const Header: React.FC<HeaderProps> = ({ links }) => {
	return (
		<div className='head w-full p-2'>
			<div className='logo_Home flex w-full bg-headerground justify-between items-center px-3 rounded-xl'>
				{/* Left Side: Logo and Dynamic Links */}
				<div className='flex items-center gap-4'>
					<Image
						src={logo}
						width={40}
						height={40}
						alt='Logo'
					/>
					<ul className='flex items-center'>
						{links.map((link, index) => (
							<Link
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={index}
								href={link.href}>
								<li className={` ${index === 0 ? 'text-pcolor' : ' ml-7 list-disc text-pcolor'}`}>{link.label}</li>
							</Link>
						))}
					</ul>
				</div>

				{/* Right Side: Notification and Avatar */}
				<div className='user_info flex justify-center items-center gap-2'>
					<div className='noti relative melding cursor-pointer'>
						<Image
							src={noti}
							width={30}
							height={30}
							alt='Notification Icon'
						/>
					</div>
					<div className='user_avatar cursor-pointer'>
						<Image
							src={avatar}
							width={30}
							height={30}
							alt='User Avatar'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
