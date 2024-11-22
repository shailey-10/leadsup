'use client';

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { UserAuth } from '@/context/authContext';
import React, { useRef } from 'react';
import styles from './dataTable.module.css';
import useAnalyzerStates from './hooks/useAnalyzerStates';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const { plan } = UserAuth();
  const { activeTab } = useAnalyzerStates();
  let filteredColumns = columns;
  if (activeTab === 'url') {
    filteredColumns = filteredColumns.filter(
      (column) =>
        'accessorKey' in column &&
        column.accessorKey !== 'Address' &&
        column.accessorKey !== 'Name' &&
        column.accessorKey !== 'reviews' &&
        column.accessorKey !== 'rating' &&
        column.accessorKey !== 'Website'
    );
  }
  if (activeTab === 'csv') {
    filteredColumns = filteredColumns.filter(
      (column) =>
        'accessorKey' in column &&
        column.accessorKey !== 'Address' &&
        column.accessorKey !== 'reviews' &&
        column.accessorKey !== 'rating'
    );
  }
  // update here when pro introduced

  if (
    plan &&
    plan !== 'Free' &&
    plan !== 'Pro-USD-Monthly' &&
    plan !== 'P-6SW07264NX224922MM4MRU4Y'
  ) {
    filteredColumns = filteredColumns.filter(
      (column) =>
        'accessorKey' in column &&
        column.accessorKey !== 'google' &&
        column.accessorKey !== 'facebook' &&
        column.accessorKey !== 'linkedin' &&
        column.accessorKey !== 'twitter' &&
        column.accessorKey !== 'analytics' &&
        column.accessorKey !== 'gtm' &&
        column.accessorKey !== 'isResponsive' &&
        column.accessorKey !== 'pageSpeed' &&
        column.accessorKey !== 'Download'
    );
  }

  const table = useReactTable({
    data,
    columns: filteredColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });
  const tableRef = useRef(null);

  return (
    <>
      <div
        style={{
          maxWidth: '1250px',
          maxHeight: '70vh',
          overflow: 'scroll',
          border: '1px solid #333',
          marginBottom: '30px',
          marginTop: '30px',
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
                  data-state={row.getIsSelected() && 'selected'}
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
                  colSpan={filteredColumns.length}
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
