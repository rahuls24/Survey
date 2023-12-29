import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import PropTypes from "prop-types";
import React from "react";

function GenericTable({  data, columns, initialSorting = [], initialRowSelection = {}, onRowSelectionChange }) {
  const [sorting, setSorting] = React.useState(initialSorting);
  const [rowSelection, setRowSelection] = React.useState(initialRowSelection);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: (newRowSelection) => {
      setRowSelection(newRowSelection);
      // Call the callback prop with the updated row selection
      onRowSelectionChange && onRowSelectionChange(newRowSelection);
    },
    debugTable: process.env.NODE_ENV==='development',
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : (
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : "",
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted()]}
                  </div>
                )}
              </th>
            ))}
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

GenericTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
      cell: PropTypes.oneOfType([PropTypes.elementType, PropTypes.func]),
      header: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string]),
      enableSorting: PropTypes.bool,
      // Add more specific prop types for your columns if needed
    })
  ).isRequired,
  initialSorting: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      desc: PropTypes.bool.isRequired,
    })
  ),
  initialRowSelection: PropTypes.objectOf(PropTypes.bool),
  onRowSelectionChange: PropTypes.func, // Callback prop for handling row selection changes
};
export default GenericTable