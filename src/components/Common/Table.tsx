import { nanoid } from '@reduxjs/toolkit';
import React, { useState } from 'react';

interface Props {
  data: Record<string, any>[];
  pageSize: number;
}

const Table = ({ data, pageSize }: Props) => {
  const cols = data != null && data.length > 0 ? Object.keys(data[0]) : [];
  const [filterBy, setFilterBy] = useState<string>(cols[0]);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const limit = Math.ceil(data.length / pageSize);
  const renderTable = () => {
    if (data && data.length > 0) {
      let filtereddata = data
        .filter((e) => {
          const object = e[filterBy];
          if (typeof object == 'string') {
            return object.toLowerCase().includes(search.toLowerCase());
          } else {
            return search === '' ? true : object === +search;
          }
        })
        .slice((page - 1) * pageSize, page * pageSize);
      if (filtereddata.length === 0)
        return (
          <tr>
            <td>No records match that search criteria</td>
          </tr>
        );
      return filtereddata.map((d) => (
        <tr key={d.id}>
          {Object.entries(d).map((entry) => (
            <td key={nanoid()}>{entry[1]}</td>
          ))}
        </tr>
      ));
    }
    return <tr>No data received</tr>;
  };
  return (
    <div className="">
      <div className=" ">
        <div className="" >
          <div style={{ color: "#120b6f", background: "#efc861", padding: "30px", borderRadius: "20px", boxShadow: "#000 5px 5px 5px" }}>
            <div className="">


              <label style={{ fontSize: "20px" }} htmlFor="search">Search by:</label>
              <input
                type="text"
                name="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder={filterBy}
                className="form-control"

              />
              <span style={{ color: "gray" }}>Search An Employee</span>
            </div>
            <table style={{ color: "#120b6f" }} className='table table-striped table-hover table-sm table-active'>
              <thead>
                <tr>
                  {cols.map((c) => (
                    <th
                      style={{ color: "#000" }}
                      key={c}
                      className={`${filterBy === c ? 'active' : ''}`}
                      onClick={() => setFilterBy(c)}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>{renderTable()}</tbody>
            </table>
            {search === '' && (
              <div className="pagination">

                <button style={{ color: "#e8c3ed", background: "#655eb6" }} className="btn btn-dark mb-3" disabled={page === 1} onClick={() => setPage(page - 1)}>
                  Prev
                </button>

                <span style={{ padding: "7px", color: " #000 " }}>{`${page} of ${limit}`}</span>

                <button style={{ color: "#e8c3ed", background: "#655eb6" }} className="btn btn-dark mb-3" disabled={page === limit} onClick={() => setPage(page + 1)}>
                  Next
                </button>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
