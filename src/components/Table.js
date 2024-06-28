import React from "react";

import LoaderComponent from "./Loader";

// styles/TableStyling.js
import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const Th = styled.th`
  padding: 8px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
`;

export const Td = styled.td`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const RemoteTrackingTable = ({
  loading,
  data,
  columns,
  renderRow,
  keyField,
}) => {

  return (
    <TableContainer>
      <Table>
        <thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column.field}>{column.label}</Th>
            ))}
          </Tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <Td colSpan={columns.length}>
                <LoaderComponent />
              </Td>
            </tr>
          ) : (
            data && data.map((item) => (
              <Tr key={item[keyField]}>
                {renderRow(item, columns)}
              </Tr>
            ))
          )}
          {!loading && (!data || data.length === 0) && (
            <tr>
              <Td colSpan={columns.length}>No Data to Show</Td>
            </tr>
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default RemoteTrackingTable;
