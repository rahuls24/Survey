import React, { useMemo,useRef,useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  
} from "@tanstack/react-table";
const tableData = [
  {
    title: "Request 1",
    sentOn: new Date("2023-11-01").toISOString(),
    dueDate: new Date("2023-11-02").toISOString(),
    documents: 4,
    status: "Completed",
    isRecurring: true,
  },
  {
    title: "Request 2",
    sentOn: new Date("2023-11-03").toISOString(),
    dueDate: new Date("2023-11-04").toISOString(),
    documents: 2,
    status: "Pending",
    isRecurring: false,
  },
  {
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
  columnHelper.accessor("status", {
    cell: (props) => <Status value={props.getValue()} />,
    header: "Status",
    enableSorting:false,
    
  }),
  columnHelper.accessor("edit", {
    cell: (props) => <EditMenu row={props.row} />,
    header: "",
  }),
];
function RequestTable({ data=tableData }) {
  const [sorting, setSorting] = React.useState([])
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() ]}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
   
    </table>
  );
}

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

function EditMenu({ row }) {
  // Define the edit and delete actions
  const edit = () => {
    // Do something to edit the row
  };
  const deleteHandler = () =>{

  }
  // Return a menu with two options
  return (
    <div className="">
      <button onClick={edit}>Edit</button>
      <button onClick={deleteHandler}>Delete</button>
    </div>
  );
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
export default RequestTable