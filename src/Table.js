import React, { useEffect, useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  
} from "@tanstack/react-table";
import GenericTable from './table/GenericTable';

const tableData = [
  {
    id: '11',
    title: "Request 1",
    sentOn: new Date("2023-11-01").toISOString(),
    dueDate: new Date("2023-11-02").toISOString(),
    documents: 4,
    status: "Completed",
    isRecurring: true,
  },
  {
    id: '12',
    title: "Request 2",
    sentOn: new Date("2023-11-03").toISOString(),
    dueDate: new Date("2023-11-04").toISOString(),
    documents: 2,
    status: "Pending",
    isRecurring: false,
  },
  {
    id: '13',
    title: "Request 3",
    sentOn: new Date("2023-10-08").toISOString(),
    dueDate: new Date("2023-10-22").toISOString(),
    documents: 2,
    status: "Pending",
    isRecurring: false,
  },
  // ...more rows
];
const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor("selection", {
    cell: ({ row }) => (
      <div className="">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
     header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    enableSorting:false,
  }),
  columnHelper.accessor("title", {
    cell: (props) => <RequestTitle row={props.row} value={props.getValue()} />,
    header: "Request Title",
  }),
  columnHelper.accessor("sentOn", {
    cell: (props) => <DateView value={props.getValue()} />,
    header: "Sent On",
    sortType: 'datetime',
  }),
  columnHelper.accessor("dueDate", {
    cell: (props) => <DateView value={props.getValue()} />,
    header: "Due Date",
    // sortType: 'datetime',
  }),
  columnHelper.accessor("documents", {
    cell: (props) => <span>{`${props.getValue()} Requested`}</span> ,
    header: "Documents",
    // sortType: 'datetime',
  }),
  columnHelper.accessor("status", {
    cell: (props) => <Status value={props.getValue()} />,
    header: "Status",
    enableSorting:false,
    
  }),
];
function Table() {
  const [selectedRows, setSelectedRows] = useState({});

  const handleRowSelectionChange = (newRowSelection) => {
    setSelectedRows(newRowSelection);
    // Do whatever you need with the selected rows
  };
  console.log({
    selectedRows
  })
  return (
    <GenericTable data={tableData} columns={columns}  onRowSelectionChange={handleRowSelectionChange} />
  )
}

export default Table
// Helper
// Define a custom component for the request title column
function RequestTitle({ row, value }) {
  // Show a rotating arrow icon if the request is recurring
  
  const icon = row.original.recurring ? "🔄" : "";
  return (
    <span>
      {icon} {value}
    </span>
  );
}

function DateView({ value }) {
  // Format the date as Month DD YYYY
  const date = new Date(value);
  const options = { month: "long", day: "numeric", year: "numeric" };
  return <span>{date.toLocaleDateString("en-US", options)}</span>;
}

function Status({ value }) {
  // Apply a specific style based on the status value
  const style = {
    color: value === "Completed" ? "green" : "red",
    fontWeight: "bold",
  };
  return <span style={style}>{value}</span>;
}





function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}) {
  const ref = React.useRef(null)

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate, rest.checked])

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  )
}