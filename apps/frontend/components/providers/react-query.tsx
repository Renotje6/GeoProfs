'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { type ReactNode, useState } from 'react';

interface Props {
	children: ReactNode;
}

const ReactQueryProvider = ({ children }: Props) => {
	// React Query Client instance
	const [queryClient] = useState(() => new QueryClient());

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
