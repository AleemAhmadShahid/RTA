import React, { useState } from "react";
import {
  Td,
  Th,
  TableContainer,
  Table,
} from "../styles/TableStyling";
import styled from "styled-components";
import LoaderComponent from "./Loader";
import * as MdIcons from "react-icons/md";
import * as GrIcons from "react-icons/gr";

const Tr = styled.tr`
  margin: 100px;
  justify-content: left;
`;

const EditableEmployeeTable = ({
  loading,
  initialData,
  columns,
  keyField,
}) => {
  const [editableData, setEditableData] = useState(initialData);

  const handleInputChange = (id, field, value) => {
    const updatedData = editableData.map((item) =>
      item[keyField] === id ? { ...item, [field]: value } : item
    );
    setEditableData(updatedData);
  };

  return (
    <TableContainer>
      <Table>
        <thead>
          <Tr >
            {columns.map((column) => (
              <Th key={column.field} style={{ background: "white", textAlign: "left" }}>
                {column.label}
              </Th>
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
              <Tr key={item[keyField]} >
                {columns.map((column) => (
                  <Td key={column.field} style={{ height: "40px", textAlign: "left" }}>
                    {column.field !== "action" ? (
                      <input
                        type="text"
                        placeholder="Enter..."
                        value={item[column.field]}
                        style={{ border: "none", height: "30px", padding: "5px", borderRadius: "5px" }}
                        onChange={(e) =>
                          handleInputChange(item[keyField], column.field, e.target.value)
                        }
                      />
                    ) : (
                      <div style={{ display: "flex", gap: "1px" }}>
                        <MdIcons.MdOutlineModeEditOutline
                          style={{ fontSize: "18px", cursor: "pointer" }}
                          
                        />
                       
                        <MdIcons.MdDeleteOutline
                          style={{ fontSize: "18px", cursor: "pointer" }}
                          
                        />
                      </div>
                    )}
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
