import ReactQueryProvider from '@/components/providers/react-query';
import { NextUIProvider } from '@nextui-org/react';
import type { ReactNode } from 'react';

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<NextUIProvider>
			<ReactQueryProvider>{children}</ReactQueryProvider>
		</NextUIProvider>
	);
};

export default Providers;
