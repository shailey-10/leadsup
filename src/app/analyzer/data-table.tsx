"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import exportFromJSON from "export-from-json";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./dataTable.module.css";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });
  const tableRef = useRef(null);

  const { filteredWebsiteData } = useSelector(
    (state: any) => state.filteredWebsiteData
  );

  function downloadCsv() {
    const data = [...filteredWebsiteData];
    console.log(filteredWebsiteData);
    const fileName = "Leads Data";
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  }

  return (
    <>
      <button
        style={{
          backgroundColor: "#000",
          padding: "10px 18px",
          color: "#fff",
          borderRadius: "6px",
          marginBottom: "10px",
        }}
        onClick={downloadCsv}
      >
        Export to csv
      </button>
      <div
        style={{
          maxWidth: "1500px",
          maxHeight: "70vh",
          margin: "0 auto",
          overflow: "scroll",
          border: "1px solid #333",
          marginBottom: "30px",
        }}
        className="rounded-md border"
      >
        <Table ref={tableRef}>
          <TableHeader className={styles.header}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={styles.cell}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
