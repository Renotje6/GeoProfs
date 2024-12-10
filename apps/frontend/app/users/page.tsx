import Image from 'next/image';
// import logo from "../logo/crown.png"
import Link from 'next/link';
// import noti from "../image/Button.png"
// import avatar from "../image/Avatar.png"
import logotwee from '../image/crown.png';
import CustomLink from '../../components/CustomLink';
import plus from '../image/startContent.png';
import DashHeader from '../../components/DashHeader';
import DashFooter from '../../components/DashFooter';
export default function User() {
	const links = [
		{ href: '/users', label: 'HOME' },
		{ href: '/verlof', label: 'AANVRAGEN' },
	];
	return (
		<>
			{/* Header user dash */}
			<DashHeader links={links} />
			{/* Eind header user dash */}

			{/* cotent users */}

			<div className='user_dash w-full flex justify-center items-center'>
				<div className='inner_user_dash w-11/12 flex justify-center items-center flex-col gap-5'>
					{/* verlof */}
					<div className='verlof_vragen w-full flex justify-between items-center px-3 py-2 rounded-lg'>
						<h2 className='font-bold  '>Verlof Aanvragen</h2>
						<div className='verlof_button relative'>
							<CustomLink
								href='/'
								text='NIEUW'
								height='30px'
								width='100px'
								className='hover:bg-blue-700 text-xs rounded-md'
							/>
							<Image
								className='absolute plus_img'
								src={plus}
								width={18}
								height={18}
								alt='start content'
							/>
						</div>
					</div>

					{/* Eind verlof */}
					{/* Uw aanvraag */}
					<div className='uw_aanvraag w-full rounded-md'>
						<div className='aanvraag_title w-full text-center'>
							<p className='text-pcolor rotate-0 mt-1'>UW AANVRAGEN</p>
						</div>
						<div className='aanvraag_ithems flex justify-between items-center gap-2 p-3 flex-wrap w-full'>
							<h2 className='flex-1 text-center bg-headerground rounded-md font-bold py-1'>AANVRAGEN 3</h2>
							<h2 className='flex-1 text-center bg-headerground rounded-md font-bold py-1'>OPEN 1</h2>
							<h2 className='flex-1 text-center bg-headerground rounded-md font-bold py-1'>GEACCEPTEERD 2</h2>
						</div>
					</div>
					{/* Eind uw aanvraag */}

					{/* Aanvragen Row */}

					<div className='aanvraag_row w-full rounded-md p-3'>
						<div className='aanvraagzoeken w-full flex justify-between items-center'>
							<h2 className='font-bold'>AANVRAGEN</h2>
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
							<p className='rotate-0 text-pcolor text-center flex-1'>CATEGORIE</p>
							<p className='rotate-0 text-pcolor text-center flex-1'>START DATUM</p>
							<p className='rotate-0 text-pcolor text-center flex-1'>EIND DATUM</p>
							<p className='rotate-0 text-pcolor text-center flex-1'>STATUS</p>
							<p className='rotate-0 text-pcolor text-center flex-1'>ACTIES</p>
						</div>
						{/* Row aanvraag */}
						<div className='rows h-[300] w-full overflow-auto'>
							{/* row */}
							<div className='aanvraag_ithems w-full flex justify-between items-center mt-2 border border-[#A1A1A1] rounded-md'>
								<p className='rotate-0 text-pcolor text-center flex-1'>vakantie</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>Goedgekeurd</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>ACTIES</p>
							</div>
							{/* Eind row */}
							{/* row */}
							<div className='aanvraag_ithems w-full flex justify-between items-center mt-2 border border-[#A1A1A1] rounded-md'>
								<p className='rotate-0 text-pcolor text-center flex-1'>vakantie</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>Goedgekeurd</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>ACTIES</p>
							</div>
							{/* Eind row */}
							{/* row */}
							<div className='aanvraag_ithems w-full flex justify-between items-center mt-2 border border-[#A1A1A1] rounded-md'>
								<p className='rotate-0 text-pcolor text-center flex-1'>vakantie</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>Goedgekeurd</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>ACTIES</p>
							</div>
							{/* Eind row */}
							{/* row */}
							<div className='aanvraag_ithems w-full flex justify-between items-center mt-2 border border-[#A1A1A1] rounded-md'>
								<p className='rotate-0 text-pcolor text-center flex-1'>vakantie</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>Goedgekeurd</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>ACTIES</p>
							</div>
							{/* Eind row */}
							{/* row */}
							<div className='aanvraag_ithems w-full flex justify-between items-center mt-2 border border-[#A1A1A1] rounded-md'>
								<p className='rotate-0 text-pcolor text-center flex-1'>vakantie</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>Goedgekeurd</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>ACTIES</p>
							</div>
							{/* Eind row */}
							{/* row */}
							<div className='aanvraag_ithems w-full flex justify-between items-center mt-2 border border-[#A1A1A1] rounded-md'>
								<p className='rotate-0 text-pcolor text-center flex-1'>vakantie</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>Goedgekeurd</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>ACTIES</p>
							</div>
							{/* Eind row */}
							{/* row */}
							<div className='aanvraag_ithems w-full flex justify-between items-center mt-2 border border-[#A1A1A1] rounded-md'>
								<p className='rotate-0 text-pcolor text-center flex-1'>vakantie</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>Goedgekeurd</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>ACTIES</p>
							</div>
							{/* Eind row */}
							{/* row */}
							<div className='aanvraag_ithems w-full flex justify-between items-center mt-2 border border-[#A1A1A1] rounded-md'>
								<p className='rotate-0 text-pcolor text-center flex-1'>vakantie</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>Goedgekeurd</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>ACTIES</p>
							</div>
							{/* Eind row */}
							{/* row */}
							<div className='aanvraag_ithems w-full flex justify-between items-center mt-2 border border-[#A1A1A1] rounded-md'>
								<p className='rotate-0 text-pcolor text-center flex-1'>vakantie</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>Goedgekeurd</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>ACTIES</p>
							</div>
							{/* Eind row */}
							{/* row */}
							<div className='aanvraag_ithems w-full flex justify-between items-center mt-2 border border-[#A1A1A1] rounded-md'>
								<p className='rotate-0 text-pcolor text-center flex-1'>vakantie</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>Goedgekeurd</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>ACTIES</p>
							</div>
							{/* Eind row */}
							{/* row */}
							<div className='aanvraag_ithems w-full flex justify-between items-center mt-2 border border-[#A1A1A1] rounded-md'>
								<p className='rotate-0 text-pcolor text-center flex-1'>vakantie</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>Goedgekeurd</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>ACTIES</p>
							</div>
							{/* Eind row */}
							{/* row */}
							<div className='aanvraag_ithems w-full flex justify-between items-center mt-2 border border-[#A1A1A1] rounded-md'>
								<p className='rotate-0 text-pcolor text-center flex-1'>vakantie</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>Goedgekeurd</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>ACTIES</p>
							</div>
							{/* Eind row */}
							{/* row */}
							<div className='aanvraag_ithems w-full flex justify-between items-center mt-2 border border-[#A1A1A1] rounded-md'>
								<p className='rotate-0 text-pcolor text-center flex-1'>vakantie</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>27-11-24</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>Goedgekeurd</p>
								<p className='rotate-0 text-pcolor text-center flex-1'>ACTIES</p>
							</div>
							{/* Eind row */}
						</div>
						{/* Eind row aanvraag */}
					</div>
					{/* Eind Aanvragen Row */}
				</div>
			</div>

			{/* Footer */}

			<DashFooter Links={links} />
		</>
	);
}
