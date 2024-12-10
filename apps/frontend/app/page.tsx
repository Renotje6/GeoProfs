import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/image/crown.png';
import CustomLink from '@/components/CustomLink';

export default function Home() {
	return (
		<>
			<div className='main'>
				<header className='flex justify-between items-center py-6 px-8'>
					<Link
						href='/'
						className='flex justify-center items-center gap-1'>
						<Image
							src={logo}
							width={60}
							height={60}
							alt='Geofrofs'
						/>
						<h2 className='text-4xl font-normal'>GEOPROFS</h2>
					</Link>
					<CustomLink
						href='/login'
						text='LOGIN'
						height='48px'
						width='140px'
						className='hover:bg-blue-700'
					/>
				</header>

				<div className='hero-section flex justify-start items-center mt-16 w-full overflow-hidden'>
					<div className='hero w-full flex flex-col justify-center items-center py-20'>
						<h2 className='text-4xl font-bold tracking-wide'>VERLOF MANAGEMENT</h2>
						<p className='mt-4 text-customGray'>Eenvoudig je verlof beheren, altijd en overal.</p>
					</div>
				</div>
			</div>
		</>
	);
}
