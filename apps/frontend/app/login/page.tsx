import LoginForm from '@/components/forms/login-form';
import Image from 'next/image';

export default function LoginPage() {
	return (
		<div className='w-screen min-h-screen bg-black/5'>
			<div className='w-screen min-h-screen flex transition-size duration-100'>
				{/* XS Logo */}
				<div className='md:hidden absolute top-4 left-4 flex gap-2 items-center animate-appearance-in'>
					<div className='relative size-10'>
						<Image
							src='/image/crown.png'
							alt='Logo'
							fill
						/>
					</div>
					<p className='text-xl font-medium'>GEOPROFS</p>
				</div>
				{/* Left Content */}
				<div className='w-full shadow-xl flex justify-center items-center p-2 bg-white'>
					<LoginForm />
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
