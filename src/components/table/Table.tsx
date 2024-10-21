"use client";
import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";


export default function Table({ data, columns, Button }: any) {

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const t = useTranslations('IndexPage');




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
          onClick={() => table.setPageIndex(0)} // Go to first page
          disabled={currentPage === 1}
        >
          {`<<`}
        </button>
        <button
          className="btn btn-outline-dark mx-1 btn-sm"
          onClick={() => table.setPageIndex(currentPage - 2)}
          disabled={currentPage === 1}
        >
          {`<`}
        </button>
        <span className="btn btn-primary mx-1 btn-sm">{currentPage}</span>
        <button
          className="btn btn-outline-dark mx-1 btn-sm"
          onClick={() => table.setPageIndex(currentPage)} // Go to next page
          disabled={currentPage === pageCount || pageCount === 0}
        >
          {`>`}
        </button>
        <button
          className="btn btn-outline-dark mx-1 btn-sm"
          onClick={() => table.setPageIndex(pageCount - 1)} // Go to last page
          disabled={currentPage === pageCount || pageCount === 0}
        >
          {`>>`}
        </button>
      </div>
    );
  };

  return (
    <div className="container mt-5 card card-body p-5">
      <div className="row mb-3 align-items-center" style={{display:"flex"}}>
        <div className="col-auto">
          
          <input
            type="text"
            className="form-control"
            placeholder={t('search')}
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
            <option value="">{t('AllStatus')}</option>
            <option value="Active">{t('Active')}</option>
            <option value="Deactive">{t('Deactive')}</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="col-auto ms-auto">
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
          <tbody >
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="text-start p-2">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="text-start p-2" >
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
          {t('page')} {currentPage} of {pageCount}
        </span>
        {renderPagination()}
      </div>
    </div>
  );
}