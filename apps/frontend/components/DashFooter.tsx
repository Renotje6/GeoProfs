import Image from 'next/image';
import Link from 'next/link';
import logotwee from '@/public/image/crown.png';

interface LinkItem {
	href: string;
	label: string;
}

interface DashFooter {
	Links: LinkItem[];
}

const Footer: React.FC<DashFooter> = ({ Links }) => {
	return (
		<div className='userfooter w-full p-2'>
			<div className='inner_footer rounded-xl w-full bg-headerground p-2 flex justify-start items-center gap-3'>
				<Image
					src={logotwee}
					width={23}
					height={23}
					alt='Logo'
				/>
				<ul className='flex items-center'>
					{Links.map((link, index) => (
						<Link
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={index}
							href={link.href}>
							<li className={`${index === 0 ? 'text-pcolor text-xs' : 'ml-7 list-disc text-pcolor text-xs'}`}>{link.label}</li>
						</Link>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Footer;
