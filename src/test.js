// Import React and React Table
import React, { useMemo } from "react";
import { useTable, useSortBy, useRowSelect } from "@tanstack/react-table";

// Define a custom component for the request title column
function RequestTitle({ value, row }) {
  // Show a rotating arrow icon if the request is recurring
  const icon = row.original.recurring ? "🔄" : "";
  return <span>{icon} {value}</span>;
}

// Define a custom component for the date columns
function Date({ value }) {
  // Format the date as Month DD YYYY
  const date = new Date(value);
  const options = { month: "long", day: "numeric", year: "numeric" };
  return <span>{date.toLocaleDateString("en-US", options)}</span>;
}

// Define a custom component for the documents column
function Documents({ value }) {
  // Show the number of requested documents
  return <span>{value} Requested</span>;
}

// Define a custom component for the status column
function Status({ value }) {
  // Apply a specific style based on the status value
  const style = {
    color: value === "Completed" ? "green" : "red",
    fontWeight: "bold",
  };
  return <span style={style}>{value}</span>;
}

// Define a custom component for the edit menu
function EditMenu({ row }) {
  // Define the edit and delete actions
  const edit = () => {
    // Do something to edit the row
  };
  const delete = () => {
    // Do something to delete the row
  };
  // Return a menu with two options
  return (
    <div className="menu">
      <button onClick={edit}>Edit</button>
      <button onClick={delete}>Delete</button>
    </div>
  );
}

// Define a custom component for the row selection checkbox
function Checkbox({ row }) {
  // Use the getToggleRowSelectedProps method to handle the checkbox state
  return <input type="checkbox" {...row.getToggleRowSelectedProps()} />;
}

// Define the table component
function Table({ data }) {
  // Define the columns
  const columns = useMemo(
    () => [
      // Add a column for the row selection checkbox
      {
        id: "selection",
        Header: ({ getToggleAllRowsSelectedProps }) => (
          // Use the getToggleAllRowsSelectedProps method to handle the header checkbox state
          <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
        ),
        Cell: Checkbox, // Use the custom checkbox component
      },
      // Add a column for the request title
      {
        Header: "Request Title",
        accessor: "title",
        Cell: RequestTitle, // Use the custom request title component
      },
      // Add a column for the sent on date
      {
        Header: "Sent On",
        accessor: "sentOn",
        Cell: Date, // Use the custom date component
        sortType: "datetime", // Use the datetime sort type
      },
      // Add a column for the due date
      {
        Header: "Due Date",
        accessor: "dueDate",
        Cell: Date, // Use the custom date component
        sortType: "datetime", // Use the datetime sort type
      },
      // Add a column for the documents
      {
        Header: "Documents",
        accessor: "documents",
        Cell: Documents, // Use the custom documents component
      },
      // Add a column for the status
      {
        Header: "Status",
        accessor: "status",
        Cell: Status, // Use the custom status component
      },
      // Add a column for the edit menu
      {
        id: "edit",
        Header: "", // No header for this column
        Cell: EditMenu, // Use the custom edit menu component
      },
    ],
    []
  );

  // Use the useTable hook to create the table instance
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useSortBy, // Use the useSortBy plugin
    useRowSelect // Use the useRowSelect plugin
  );

  // Destructure the table instance to get the relevant props and methods
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  // Return the table element
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                {/* Add a sort direction indicator */}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? " 🔽"
                      : " 🔼"
                    : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// Export the table component
export default Table;
