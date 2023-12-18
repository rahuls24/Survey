import React from 'react';
import { useTable, useSortBy, useRowSelect } from 'react-table';

const sampleData = [
  {
    id: 1,
    selected: false, // Add this property for row selection
    title: 'Sample Request 1',
    recurring: false,
    sentOn: '2023-11-01T08:00:00Z',
    dueDate: '2023-11-10T08:00:00Z',
    documents: 3,
    status: 'Completed',
  },
  {
    id: 2,
    selected: false, // Add this property for row selection
    title: 'Recurring Request',
    recurring: true,
    sentOn: '2023-11-05T08:00:00Z',
    dueDate: '2023-11-15T08:00:00Z',
    documents: 5,
    status: 'Pending',
  },
  {
    id: 3,
    selected: false, // Add this property for row selection
    title: 'Sample Request 3',
    recurring: false,
    sentOn: '2023-11-10T08:00:00Z',
    dueDate: '2023-11-20T08:00:00Z',
    documents: 2,
    status: 'In Progress',
  },
  {
    id: 4,
    selected: false, // Add this property for row selection
    title: 'Another Recurring Request',
    recurring: true,
    sentOn: '2023-11-15T08:00:00Z',
    dueDate: '2023-11-25T08:00:00Z',
    documents: 4,
    status: 'Pending',
  },
  {
    id: 5,
    selected: false, // Add this property for row selection
    title: 'Sample Request 5',
    recurring: false,
    sentOn: '2023-11-20T08:00:00Z',
    dueDate: '2023-11-30T08:00:00Z',
    documents: 1,
    status: 'Incomplete',
  },
];




const Table = ({ data=sampleData }) => {
  const columns = React.useMemo(
    () => [
      {
        id: 'selection',
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
        ),
        Cell: ({ row }) => <input type="checkbox" {...row.getToggleRowSelectedProps()} />,
      },
      {
        Header: 'Request Title',
        accessor: 'title',
        Cell: ({ row }) => (
          <>
            {row.original.recurring && <span>🔄</span>}
            {row.values.title}
          </>
        ),
      },
      {
        Header: 'Sent On',
        accessor: 'sentOn',
        Cell: ({ value }) => new Date(value).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
        sortType: 'datetime',
      },
      {
        Header: 'Due Date',
        accessor: 'dueDate',
        Cell: ({ value }) => new Date(value).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
        sortType: 'datetime',
      },
      {
        Header: 'Documents',
        accessor: 'documents',
        Cell: ({ value }) => `${value} Requested`,
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }) => <span style={{ color: value === 'Completed' ? 'green' : 'red' }}>{value}</span>,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <input type="checkbox" {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );

  return (
    <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ borderBottom: '2px solid black', padding: '8px' }}>
                {column.render('Header')}
                <span>{column.isSorted ? (column.isSortedDesc ? ' ⬇️' : ' ⬆️') : ''}</span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} style={{ borderBottom: '1px solid black', background: row.isSelected ? '#f7f7f7' : 'white' }}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} style={{ padding: '8px' }}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};


export default Table;
