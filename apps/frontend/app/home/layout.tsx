import Footer from '@/components/site/Footer';
import Header from '@/components/site/Header';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='p-2 min-h-screen flex flex-col'>
			<Header
				title='HOME'
				hideNotifications={false}
			/>
			<main className='min-h-screen flex justify-center'>{children}</main>
			<Footer />
		</div>
	);
}
