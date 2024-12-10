import plus from '@/public/image/startContent.png';
import Link from 'next/link';
import Image from 'next/image';

const Gebruikers: React.FC = () => {
	return (
		<>
			<div className='aanvraag_row w-full rounded-md p-3'>
				<div className='aanvraagzoeken w-full flex justify-between items-center'>
					<h2 className='font-bold text-[#545454]'>GEBRUIKERS</h2>
					<div className='zoeken_row flex justify-between items-center gap-2'>
						<div className='relative'>
							<input
								className='bg-headerground outline-none py-1 px-8 rounded-md'
								type='text'
								placeholder='Zoeken'
							/>
							<span className='span_zoken block w-4 h-4 rounded-full absolute top-[8] left-[5]' />
						</div>
						<div className='p-1 bg-button rounded-[12] '>
							<Link href='/verlof'>
								<Image
									src={plus}
									width={18}
									height={18}
									alt='plus'
								/>
							</Link>
						</div>
					</div>
				</div>

				<div className='aanvraag_rows flex justify-between items-center bg-headerground py-2 mt-3 rounded-md'>
					<p className='rotate-0 text-pcolor text-center flex-1'>GEBRUIKER</p>
					<p className='rotate-0 text-pcolor text-center flex-1'>EMAIL</p>
					<p className='rotate-0 text-pcolor text-center flex-1'>TELEFOON</p>
					<p className='rotate-0 text-pcolor text-center flex-1'>ACTIES</p>
				</div>

				<div className='rows h-[70vh] w-full overflow-auto'>
					{/* row */}
					<div className='aanvraag_ithems w-full flex justify-between items-center mt-2 border border-[#A1A1A1] rounded-md'>
						<p className='rotate-0 text-pcolor text-center flex-1'>Hussein Omar</p>
						<p className='rotate-0 text-pcolor text-center flex-1'>husein@gmail.com</p>
						<p className='rotate-0 text-pcolor text-center flex-1'>0682322425</p>
						<p className='rotate-0 text-pcolor text-center flex-1'>ACTIES</p>
					</div>
					{/* Eind Row */}
				</div>
			</div>
		</>
	);
};

export default Gebruikers;
