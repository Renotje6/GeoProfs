import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Chip, User, Pagination, type SortDescriptor } from '@nextui-org/react';
import React from 'react';

const columns = [
	{ name: 'ID', uid: 'id', sortable: true },
	{ name: 'NAME', uid: 'name', sortable: true },
	{ name: 'STATUS', uid: 'status', sortable: true },
	{ name: 'DATE', uid: 'date', sortable: true },
	{ name: 'ACTIONS', uid: 'actions' },
];

// Placeholder data
const users = [
	{
		id: 1,
		name: 'John Doe',
		status: 'active',
		date: new Date().toLocaleString(),
	},
	{
		id: 2,
		name: 'Jane Doe',
		status: 'inactive',
		date: new Date().toLocaleString(),
	},
	{
		id: 3,
		name: 'John Smith',
		status: 'active',
		date: new Date().toLocaleString(),
	},
];

const AbsentionTable = () => {
	const [filterValue, setFilterValue] = React.useState('');
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
		column: 'id',
		direction: 'ascending',
	});

	const [page, setPage] = React.useState(1);

	const hasSearchFilter = Boolean(filterValue);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const filteredItems = React.useMemo(() => {
		let filteredUsers = [...users];

		if (hasSearchFilter) {
			filteredUsers = filteredUsers.filter((user) => user.name.toLowerCase().includes(filterValue.toLowerCase()));
		}

		return filteredUsers;
	}, [users, filterValue]);

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

	const renderCell = React.useCallback((user: (typeof users)[0], columnKey: React.Key) => {
		const cellValue = user[columnKey as keyof typeof user];

		switch (columnKey) {
			case 'date':
				return <div suppressHydrationWarning>{cellValue}</div>;
			case 'actions':
				return (
					<div>
						<Button isIconOnly />
					</div>
				);
			default:
				return cellValue;
		}
	}, []);

	const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setRowsPerPage(Number(e.target.value));
		setPage(1);
	}, []);

	const onSearchChange = React.useCallback((value?: string) => {
		if (value) {
			setFilterValue(value);
			setPage(1);
		} else {
			setFilterValue('');
		}
	}, []);

	const onClear = React.useCallback(() => {
		setFilterValue('');
		setPage(1);
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const topContent = React.useMemo(() => {
		return (
			<div className='flex justify-between gap-4 items-center'>
				<h2 className='font-semibold text-lg'>ABSENTIE</h2>
				<div className='flex gap-3 items-end'>
					<Input
						isClearable
						className='w-fit'
						placeholder='Search by name...'
						// startContent={<SearchIcon />}
						value={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
					<div className='flex gap-3'>
						<Button
							color='primary'
							// endContent={<PlusIcon />}
						>
							Add New
						</Button>
					</div>
				</div>
			</div>
		);
	}, [filterValue, onRowsPerPageChange, users.length, onSearchChange, hasSearchFilter]);

	const bottomContent = React.useMemo(() => {
		return (
			<div className='py-2 px-2 flex justify-center items-center'>
				{/* <span className='w-[30%] text-small text-default-400'>{selectedKeys === 'all' ? 'All items selected' : `${selectedKeys.size} of ${filteredItems.length} selected`}</span> */}
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
				emptyContent={'No users found'}
				items={sortedItems}>
				{(item) => <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}
			</TableBody>
		</Table>
	);
};

export default AbsentionTable;
