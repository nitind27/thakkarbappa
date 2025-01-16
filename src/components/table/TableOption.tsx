import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";

export default function TableOption({
  data,
  columns,
  Button,
  filterOptions,
  additionalFilterOptions,
  scholarshipoption,
  submitbtn
}: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState(
    filterOptions.length > 0 ? filterOptions[0].value : ""
  );
  const [filterData, setFilterData] = useState(
    additionalFilterOptions.length > 0 ? additionalFilterOptions[0].value : ""
  );

  const [currentPageIndex, setCurrentPageIndex] = useState(0); // New state for current page index
  const t = useTranslations("IndexPage");

  // Filter data based on search query and filters
  const filteredData = useMemo(() => {
    return data.filter((row: any) => {
      const matchesSearch = Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      );

      const matchesStatus =
        filterStatus === "" || row.current_std === filterStatus;
      const matchesData = filterData === "" || row.school_id === filterData; // Adjust field as needed

      return matchesSearch && matchesStatus && matchesData;
    });
  }, [data, searchQuery, filterStatus, filterData]);

  // Create table instance
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex: currentPageIndex,
        pageSize: 10,
      },
    },
  });

  const pageCount = table.getPageCount();

  // Handle filter change
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
    // Do not reset current page index here
  };

  const handleAdditionalFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterData(e.target.value);
    // Do not reset current page index here
  };
  const [filterscholarship, setFilterscholarship] = useState("");

  const handlescholarshipFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterscholarship(e.target.value);

  };
  // Render pagination controls
  const renderPagination = () => {
    return (
      <div className="pagination d-flex align-items-center">
        <button
          className="btn btn-outline-dark mx-1 btn-sm"
          onClick={() => setCurrentPageIndex(0)} // Go to first page
          disabled={currentPageIndex === 0}
        >
          {`<<`}
        </button>
        <button
          className="btn btn-outline-dark mx-1 btn-sm"
          onClick={() => setCurrentPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={currentPageIndex === 0}
        >
          {`<`}
        </button>
        <span className="btn btn-primary mx-1 btn-sm">
          {currentPageIndex + 1}
        </span>
        <button
          className="btn btn-outline-dark mx-1 btn-sm"
          onClick={() =>
            setCurrentPageIndex((prev) => Math.min(prev + 1, pageCount - 1))
          } // Go to next page
          disabled={currentPageIndex >= pageCount - 1 || pageCount === 0}
        >
          {`>`}
        </button>
        <button
          className="btn btn-outline-dark mx-1 btn-sm"
          onClick={() => setCurrentPageIndex(pageCount - 1)} // Go to last page
          disabled={currentPageIndex >= pageCount - 1 || pageCount === 0}
        >
          {`>>`}
        </button>
      </div>
    );
  };

  return (
    <div className="container mt-5 card card-body p-5">
      <div className="row mb-3 align-items-center" style={{ display: "flex" }}>
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            placeholder={t("search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <select
            className="form-select"
            value={filterStatus}
            onChange={handleFilterChange} // Use new handler for status filter
          >
            <option value="">{t("AllStatus")}</option>
            {filterOptions.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-auto">
          {/* Second select box for additional filtering */}
          <select
            className="form-select ms-2" // Added margin for spacing
            value={filterData}
            onChange={handleAdditionalFilterChange} // Use new handler for additional filter
          >
            <option value="">All School</option>
            {additionalFilterOptions.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-auto">
          {/* Second select box for additional filtering */}
          <select
          className="form-select ms-2" // Added margin for spacing
          value={filterscholarship}
          onChange={handlescholarshipFilterChange} // Use new handler for additional filter
        >
          <option value="">All Scholarship</option>
          {scholarshipoption.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        </div>
        <div className="col-auto">
          {/* Second select box for additional filtering */}
        {submitbtn}
        </div>
        <div className="col-auto ms-auto">{Button}</div>
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
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="text-start p-2">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="text-start p-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  {t("noData")}{" "}
                  {/* Display a message if no data is available */}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <span>
          {t("page")} {currentPageIndex + 1} of {pageCount}
        </span>
        {renderPagination()}
      </div>
    </div>
  );
}
