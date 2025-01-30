import { getEmployeeRequests } from '@/actions/users';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, Pagination, type SortDescriptor, Spinner, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { MdManageAccounts } from 'react-icons/md';

const columns = [
	{ name: 'NAAM', uid: 'name', sortable: true },
	{ name: 'STATUS', uid: 'status', sortable: true },
	{ name: 'START ', uid: 'startDate', sortable: true },
	{ name: 'EIND', uid: 'endDate', sortable: true },
	{ name: 'REDEN', uid: 'reason', sortable: false },
	{ name: 'ACTIES', uid: 'actions', sortable: false },
];

const HomeTable = () => {
	const [page, setPage] = React.useState(1);
	const [filterValue, setFilterValue] = React.useState('');
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
		column: 'name',
		direction: 'ascending',
	});

	const { data, isPending: isLoadingRequests } = useQuery({
		queryKey: ['requests'],
		queryFn: async () => getEmployeeRequests(),
	});

	const hasSearchFilter = Boolean(filterValue);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const filteredItems = React.useMemo(() => {
		let filteredUsers = [...(data || [])];

		if (hasSearchFilter) {
			filteredUsers = filteredUsers.filter(
				(user) => (user.name || '').toLowerCase().includes(filterValue.toLowerCase()) // Fallback to empty string
			);
		}

		return filteredUsers;
	}, [data, filterValue]);

	const pages = Math.ceil(filteredItems.length / rowsPerPage);

	const items = React.useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return filteredItems.slice(start, end);
	}, [page, filteredItems, rowsPerPage]);

	const sortedItems = React.useMemo(() => {
		return [...items].sort((a, b) => {
			const first = a[sortDescriptor.column as keyof typeof a] as number;
			const second = b[sortDescriptor.column as keyof typeof b] as number;
			const cmp = first < second ? -1 : first > second ? 1 : 0;

			return sortDescriptor.direction === 'descending' ? -cmp : cmp;
		});
	}, [sortDescriptor, items]);

	const renderCell = React.useCallback((user: (typeof data)[0], columnKey: React.Key) => {
		const cellValue = user[columnKey as keyof typeof user];

		switch (columnKey) {
			case 'startDate':
				return <div suppressHydrationWarning>{new Date(cellValue).toLocaleString()}</div>;
			case 'endDate':
				return <div suppressHydrationWarning>{new Date(cellValue).toLocaleString()}</div>;
			case 'status':
				return cellValue === 'pending' ? (
					<Chip
						color='default'
						variant='flat'>
						Pending
					</Chip>
				) : cellValue === 'approved' ? (
					<Chip
						color='success'
						variant='flat'>
						Approved
					</Chip>
				) : (
					<Chip
						color='danger'
						variant='flat'>
						Rejected
					</Chip>
				);

			case 'actions':
				return (
					<Dropdown>
						<DropdownTrigger>
							<Button
								startContent={<MdManageAccounts />}
								variant='light'
							/>
						</DropdownTrigger>
						<DropdownMenu aria-label='Static Actions'>
							<DropdownItem key='new'>New file</DropdownItem>
							<DropdownItem key='copy'>Copy link</DropdownItem>
							<DropdownItem key='edit'>Edit file</DropdownItem>
							<DropdownItem
								key='delete'
								className='text-danger'
								color='danger'>
								Delete file
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				);
			default:
				return cellValue;
		}
	}, []);

	const onSearchChange = React.useCallback((value?: string) => {
		setFilterValue(value || '');
		setPage(1);
	}, []);

	const onClear = React.useCallback(() => {
		setFilterValue('');
		setPage(1);
	}, []);

	const topContent = React.useMemo(() => {
		return (
			<div className='flex justify-between gap-4 items-center'>
				<h2 className='font-semibold text-lg'>AANVRAGEN</h2>
				<div className='flex gap-3 items-end'>
					<Input
						isClearable
						className='w-fit'
						placeholder='Search by name...'
						value={filterValue}
						onClear={onClear}
						onValueChange={onSearchChange}
					/>
					<div className='flex gap-3'>
						<Button color='primary'>Add New</Button>
					</div>
				</div>
			</div>
		);
	}, [filterValue, onSearchChange, onClear]);

	const bottomContent = React.useMemo(() => {
		return (
			<div className='py-2 px-2 flex justify-center items-center'>
				<Pagination
					isCompact
					showControls
					showShadow
					color='primary'
					page={page}
					total={pages}
					onChange={setPage}
				/>
			</div>
		);
	}, [page, pages]);

	return (
		<Table
			removeWrapper
			isHeaderSticky
			aria-label='Example table with custom cells, pagination and sorting'
			bottomContent={bottomContent}
			bottomContentPlacement='outside'
			classNames={{
				wrapper: 'max-h-[382px]',
			}}
			topContent={topContent}
			topContentPlacement='outside'
			onSortChange={setSortDescriptor}>
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={column.uid === 'actions' ? 'center' : 'start'}
						allowsSorting={column.sortable}>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody
				isLoading={isLoadingRequests}
				emptyContent={'No users found'}
				items={sortedItems}>
				{(item) => <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}
			</TableBody>
		</Table>
	);
};

export default HomeTable;
