// components/CustomLink.tsx

import Link from 'next/link';

type CustomLinkProps = {
	href: string;
	text: string;
	height?: string;
	width?: string;
	className?: string;
};

const CustomLink: React.FC<CustomLinkProps> = ({ href, text, height, width, className }) => {
	return (
		<Link
			href={href}
			className={`inline-block text-center bg-button text-white rounded-xl btn ${className}`}
			style={{ height, width, display: 'inline-block', lineHeight: height }}>
			{text}
		</Link>
	);
};

export default CustomLink;
