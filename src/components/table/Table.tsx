"use client";
import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

import { useRouter } from "next/navigation";

export default function Table({ data, columns, Button }: any) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showQrModal, setShowQrModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [imageCount, setImageCount] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const handleShowQr = () => setShowQrModal(true);
  const handleCloseQr = () => setShowQrModal(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setImageCount(value);
    if (value < 1) {
      setError("Please enter a number greater than or equal to 1.");
    } else {
      setError("");
    }
  };

  const handleShowPrint = () => setShowPrintModal(true);
  const handleClosePrint = () => {
    setShowPrintModal(false);
    setImageCount(0);
    setError("");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (imageCount < 1) {
      setError("Please enter a valid number greater than or equal to 1.");
      return;
    }

    router.push(`/printcards/${imageCount}`);
    handleClosePrint();
  };

  const filteredData = React.useMemo(() => {
    return data.filter((row: any) => {
      const matchesSearch = Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      );

      const matchesStatus = filterStatus === "" || row.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [data, searchQuery, filterStatus]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const currentPage = table.getState().pagination.pageIndex + 1;
  const pageCount = table.getPageCount();

  const renderPagination = () => {
    return (
      <div className="pagination d-flex align-items-center">
        <button
          className="btn btn-outline-dark mx-1 btn-sm"
          onClick={() => table.setPageIndex(currentPage - 2)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="btn btn-primary mx-1 btn-sm">{currentPage}</span>
        <button
          className="btn btn-outline-dark mx-1 btn-sm"
          onClick={() => table.setPageIndex(currentPage)}
          disabled={currentPage === pageCount || pageCount === 0}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="container mt-5 card card-body p-5">
      {/* <h2 className="text-center">User Status</h2> */}
      <div className="row mb-3 align-items-center">
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="col-auto ms-auto">
          {" "}
          {/* Add 'ms-auto' to push the button to the left */}
          {Button}
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-start">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="text-start p-2">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="text-start p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <span>
          Page {currentPage} of {pageCount}
        </span>
        {renderPagination()}
      </div>
    </div>
  );
}
