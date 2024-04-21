import React, { useState } from "react";

import {
  Td,
  Tr,
  Th,
  TableContainer,
  Table,
} from "../styles/TableStyling";
import LoaderComponent from "./Loader";

const EmployeeTable = ({
  checkedEmployees,
  setCheckedEmployees,
  loading,
  data,
  columns,
  renderRow,
  keyField,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckBoxChange = (item) => {
    if (!selectedItems.includes(item[keyField])) {
      setSelectedItems([...selectedItems, item[keyField]]);
    } else {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item[keyField])
      );
    }
  };

  return (
    <TableContainer>
      <Table>
        <thead>
          <Tr>
          <Th>
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    const allKeys = data.map((item) => item[keyField]);
                    setSelectedItems(allKeys);
                  } else {
                    setSelectedItems([]);
                  }
                }}
              />
            </Th>
            {columns.map((column) => (
              <Th key={column.field}>{column.label}</Th>
            ))}
          </Tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 1}>
                <LoaderComponent />
              </td>
            </tr>
          ) : (
            data &&
            data.map((item) => (
              <Tr key={item[keyField]}>
                <Td>
                  <input
                    type="checkbox"
                    checked={checkedEmployees.includes(item._id)}
                    onChange={() => {
                      if (!checkedEmployees.includes(item._id)) {
                        setCheckedEmployees([...checkedEmployees, item._id]);
                      } else {
                        setCheckedEmployees(
                          checkedEmployees.filter(
                            (checkedEmployee) => checkedEmployee !== item._id
                          )
                        );
                      }
                    }}
                  />
                </Td>

                {renderRow(item, columns)}
              </Tr>
            ))
          )}
          {!loading && (!data || data.length === 0) && (
            <tr>
              <td colSpan={columns.length + 1}>No Data to Show</td>
            </tr>
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
