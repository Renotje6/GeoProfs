import Image from 'next/image';
import Logo from '@/public/image/crown.png';

const Header = () => {
	return (
		<header>
			<div className=''>
				<Image
					src={Logo}
					alt='GeoProfs Logo'
					fill
				/>
			</div>
		</header>
	);
};

export default Header;
