import RequestForm from '@/components/forms/request-form';
import Header from '@/components/site/Header';
import Image from 'next/image';

export default function LoginPage() {
	return (
		<div className='w-screen min-h-screen bg-black/5'>
			<div className='w-screen min-h-screen flex transition-size duration-100'>
				{/* Left Content */}
				<div className='w-full shadow-xl flex justify-center items-center p-2 bg-white flex-col'>
					<Header
						title='GEOPROFS'
						hideLinks
					/>
					<div className='h-full w-full p-2 flex justify-center items-center'>
						<RequestForm />
					</div>
				</div>
				{/* Right Content */}
				<div className='w-full justify-center items-center hidden md:flex p-2'>
					<div className='flex gap-2 items-center'>
						<div className='relative size-14 lg:size-20 transition-all duration-100'>
							<Image
								src='/image/crown.png'
								alt='Logo'
								fill
							/>
						</div>
						<p className='font-medium text-3xl lg:text-5xl transition-all duration-100'>GEOPROFS</p>
					</div>
				</div>
			</div>
		</div>
	);
}
