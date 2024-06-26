import React, { useState } from "react";
import {
  Td,
  Tr,
  Th,
  TableContainer,
  Table,
} from "../styles/TableStyling";
import LoaderComponent from "./Loader";

const EditableEmployeeTable = ({
  loading,
  initialData,
  columns,
  keyField,
}) => {
  const [editableData, setEditableData] = useState(initialData);

  const handleInputChange = (keyField, field, value) => {
    const updatedData = editableData.map((item) =>
      item[keyField] === keyField ? { ...item, [field]: value } : item
    );
    setEditableData(updatedData);
  };

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
              <td colSpan={columns.length}>
                <LoaderComponent />
              </td>
            </tr>
          ) : (
            editableData &&
            editableData.map((item) => (
              <Tr key={item[keyField]}>
                {columns.map((column) => (
                  <Td key={column.field}>
                    <input
                      type="text"
                      value={item[column.field]}
                      onChange={(e) =>
                        handleInputChange(item[keyField], column.field, e.target.value)
                      }
                    />
                  </Td>
                ))}
              </Tr>
            ))
          )}
          {!loading && (!editableData || editableData.length === 0) && (
            <tr>
              <td colSpan={columns.length}>No Data to Show</td>
            </tr>
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default EditableEmployeeTable;
