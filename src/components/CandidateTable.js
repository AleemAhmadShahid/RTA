import React, { useState } from "react";
import * as MdIcons from "react-icons/md";
import * as GrIcons from "react-icons/gr";
import LoaderComponent from "./Loader";
import SearchBar from "./searchbar";
import EntriesDropdown from "./CheckBoxMenu";
import styled from "styled-components";
import {
  TableContainer,
  Table,
  Tr,
  Th,
  Td,
  AddEmployeeButton,
  HeadingAndSearchContainer,
  CreateEmployeeHeading,
  AddEmployeeContainer,
  StyledSearchBar
} from "../styles/TableStyling";
import { useDispatch } from "react-redux";

import { setErrorModal } from "../redux/modalSlice";
const CandidateTable = ({
  loading,
  data,
  columns,
  keyField,
  searchQuery,
  entries,
  onSearch,
  onEntriesChange,
  buttontext,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const dispatch = useDispatch();

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckBoxChange = (item) => {
    if (!selectedItems.includes(item[keyField])) {
      setSelectedItems([...selectedItems, item[keyField]]);
    } else {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item[keyField])
      );
    }
  };

  const handleHeaderCheckBoxChange = (e) => {
    if (e.target.checked) {
      const allKeys = data.map((item) => item[keyField]);
      setSelectedItems(allKeys);
    } else {
      setSelectedItems([]);
    }
  };

  const renderRow = (item, columns) => {
    return (
      <>
        {columns.map((column) => (
          <Td key={column.field}>
            {item[column.field]}
          </Td>
        ))}
        <Td>
          <MdIcons.MdOutlineModeEditOutline
            onClick={() => {
              // Handle edit action
            }}
            style={{ fontSize: "18px" }}
          />
          <GrIcons.GrFormView
            style={{
              fontSize: "18px",
              cursor: "pointer",
              marginLeft: "10px",
            }}
            onClick={() => {
              dispatch(setErrorModal({ message: "Employee View is disabled by Admin" }));
            }}
          />
        </Td>
      </>
    );
  };

  return (
    <TableContainer style={{background:"white",borderRadius:"10px"}}>
      <HeadingAndSearchContainer>
        <CreateEmployeeHeading>
          <div style={{ width: "200px" }}>
            <EntriesDropdown
              value={entries}
              options={["10", "25", "50", "100"].map(option => ({
                value: option,
                label: option
              }))}
              onChange={onEntriesChange}
            />
          </div>
        </CreateEmployeeHeading>
        <StyledSearchBar onSearch={onSearch} />
        <AddEmployeeContainer>
          <AddEmployeeButton className="btn btn-primary mb-2">
            <span style={{ whiteSpace: "nowrap" }}>Add Employee</span>
          </AddEmployeeButton>
        </AddEmployeeContainer>
      </HeadingAndSearchContainer>
      <Table>
        <thead>
          <Tr>
            <Th>
              <input
                type="checkbox"
                onChange={handleHeaderCheckBoxChange}
                checked={selectedItems.length === data.length}
              />
            </Th>
            {columns.map((column) => (
              <Th key={column.field}>{column.label}</Th>
            ))}
            <Th>Actions</Th>
          </Tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <Td colSpan={columns.length + 2}>
                <LoaderComponent />
              </Td>
            </tr>
          ) : (
            filteredData.length > 0 ? (
              filteredData.map((item) => (
                <Tr key={item[keyField]}>
                  <Td>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item[keyField])}
                      onChange={() => handleCheckBoxChange(item)}
                    />
                  </Td>
                  {renderRow(item, columns)}
                </Tr>
              ))
            ) : (
              <tr>
                <Td colSpan={columns.length + 2}>No Data Found</Td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default CandidateTable;
