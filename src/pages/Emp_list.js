import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import SearchBar from "../components/searchbar";
import MultiStepForm from "./MultiStepForm";
import { createGetRequest } from "../global/helper";
import { useNavigate } from "react-router-dom";
import { async } from "q";

import * as MdIcons from "react-icons/md";
import * as GrIcons from "react-icons/gr";
import * as CgIcons from "react-icons/cg";

import Select from "react-select";
const BoxContainer = styled.div`
  // border: 0px solid #ccc;
  padding: 3px 0px;
  box-shadow: 0px 01px 0px rgba(0, 0, 0, 0);
  border-radius: 5px;
  background: #ffffff;
  margin-top: 10px;
`;

const CreateEmployeeHeading = styled.h6`
  margin-bottom: 10px;
  width: 50%;
  right: 2%;
  font-weight: lighter;
  fontsize: "smaller";
`;

const AddEmployeeButton = styled(Link)`
  background-color: #ffa500;
  color: #fff;
  padding: 4px 14px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff8000;
  }
  @media screen and (max-width: 768px) {
    padding: 4px 10px; /* Adjust padding for smaller screens */
    min-width: 120px; /* Set a fixed width for smaller screens */
  }
`;

const HeadingAndSearchContainer = styled.div`
  display: flex;
  padding: 10px 50px;
  justify-content: space-between;
  align-items: center;
`;

const StyledSearchBar = styled(SearchBar)`
  width: 10%;
`;

const Th = styled.th`
  background: #ededed;
  color: #000000;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
  height: 30px;
  top: 10%;
  padding: 9px 61.4px;
  right: 2%;
  font-weight: lighter;
  // width: 10%;
  font-size: 13px;
  text-align: left !important;
  border-left: 0px;
  border-bottom: 0px solid #ddd;
  white-space: nowrap; /* Prevent text from wrapping */
  // overflow: hidden; /* Hide overflow text */
  text-overflow: ellipsis;
  @media screen and (width: 78%;) {
    padding: 0px 20px;
  }
`;

const Tr = styled.tr`
  padding: 4px 10px;
  text-align: left;
  border-bottom: 0px solid #ddd;
  margin: 100px;
`;
const Td = styled.td`
  padding: 8px 13px;
  white-space: nowrap;
  text-align: center;
  border-top: 1px solid #ededed;
  // margin: 100px;
  vertical-align: middle;
  color: black;
  // font-weight: 100;
  font-weight: medium;
  font-size: 13px;
`;

const Table = styled.table`
  position: stick;
  table-layout: fixed;
  margin-top: 27px;
  width: 100%;
  border-bottom: none;
  color: #ffa500;
  backgorund-color: #ffa500;
  border-collapse: collapse;
  border-spacing: 10px 5px;
  border: 0px solid #ccc;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const CenteredContainer = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: top;
  position: fixed;
  top: 20%;
  left: 18.6%;
  right: 13%;

  width: 80.9%;
  // margin: 0 auto:
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);

  justify-content: center;
  align-items: top;
  padding: 0px 20px;
  border-radius: 5px 5px 5px 5px;
  height: 100vh;
`;

const EntriesDropdown = styled(Select)`
  width: 150px;

  .select__control {
    border: 1px solid orange; /* Change border color to orange */
    border-radius: 5px;
    padding: 5px;
    transition: border-color 0.3s ease;

    &:hover {
      border-color: orange;
    }

    &:focus {
      outline: none;
      border-color: orange; /* Change border color to orange when focused */
      box-shadow: 0 0 0 3px rgba(255, 165, 0, 0.5);
    }
  }
`;

const AddEmployeeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SubmenuButton = styled.button`
  background-color: #fff;
  color: #000;
  padding: 4px 10px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  margin-right: 5px;
  
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ccc;
  }

  @media screen and (max-width: 768px) {
    padding: 4px 8px; /* Adjust padding for smaller screens */
    min-width: 100px; /* Set a fixed width for smaller screens */
  }
`;

const SubmenuOptions = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  background-color: #fff;
  border: 0px solid #ccc;
  border-radius: 0px;
  margin-top: 5px; /* Add some spacing between the button and submenu */
  min-width: 190px; /* Set a fixed width for the submenu */
  z-index: 0; /* Ensure the submenu appears above other content */
`;

const SuccessBadge = styled.span`
  background-color: #28a745;
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
`;

const DangerBadge = styled.span`
  background-color: #ea54542c;
  color: #ea5455;
  padding: 4px 12px;
  border-radius: 4px;
`;

const UserImage = styled.img`
  width: 39px;
  height: 31px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: -4px;
`;
const CheckboxLabel = styled.label`
  // display: flex;
   align-items: center;
  // margin-bottom: 5px;
  font-weight: 500;
  // font-size:16.6px;
  text-decoration: none;
`;

const CheckboxInput = styled.input`
  margin-right: 6px;
  margin-left:10px;
`;



const Emp_list = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [entriesToShow, setEntriesToShow] = useState(10);
  const entriesOptions = [10, 20, 50, 100];
  const [isOptionsOpen, setIsOptionsOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const params = {
      page: 1,
      pageItems: entriesToShow,
      name: searchTerm,
    };
    const fetchData = async () => {
      try {
        const data = await createGetRequest("/api/user", params);
        if (data.status == 401 && data.error == "Invalid or expired token")
          navigate("/login/");
        setEmployees(data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [entriesToShow, searchTerm]);

  const openForm = () => {
    setShowForm(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleEntriesChange = (selectedOption) => {
    setEntriesToShow(selectedOption); // Set selectedOption directly
  };

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };
  const [isCheckbox1Checked, setIsCheckbox1Checked] = useState(false);
  const [isCheckbox2Checked, setIsCheckbox2Checked] = useState(false);

  const handleCheckbox1Change = () => {
    setIsCheckbox1Checked(!isCheckbox1Checked);
  };

  const handleCheckbox2Change = () => {
    setIsCheckbox2Checked(!isCheckbox2Checked);
  };

  return (
    <>
      <CenteredContainer>
        <div>
          <BoxContainer>
            <HeadingAndSearchContainer>
              <CreateEmployeeHeading>
              <div>
  <EntriesDropdown
    value={{
      value: entriesToShow,
      label: entriesToShow.toString(),
    }}
    onChange={(selectedOption) =>
      handleEntriesChange(selectedOption.value)
    }
    options={entriesOptions.map((option) => (
      {
        value: option,
        label: (
          <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              {option}
              <input
                type="checkbox"
                // Add event handlers and state as needed
                onChange={(e) => {
                  // Handle checkbox change here
                }}
              />
            </div>
          </div>
        ),
      }
    ))}
    styles={{
      menu: (provided) => ({
        ...provided,
        background: "#ffffff", // Background color when the dropdown is open
        border: provided.isFocused
          ? "1px solid orange"
          : "1px solid #ccc",
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "white" : "white", // Background color when an option is selected
        color: state.isSelected ? "black" : "black", // Text color when an option is selected
        "&:hover": {
          backgroundColor: "#ffa500", // Background color when hovering over an option
          color: "white", // Text color when hovering over an option
        },
        display: "flex",
        justifyContent: "space-between", // Add space between label and checkbox
        alignItems: "center", // Vertically center the label and checkbox
      }),
    }}
  />
</div>

              </CreateEmployeeHeading>

              <StyledSearchBar onSearch={setSearchTerm} />
              <AddEmployeeContainer>
                <AddEmployeeButton
                  onClick={toggleForm}
                  className="btn btn-primary mb-2"
                >
                  Add Employee
                </AddEmployeeButton>
              </AddEmployeeContainer>
            </HeadingAndSearchContainer>
            {isOptionsOpen && (
              <HeadingAndSearchContainer>
                <AddEmployeeContainer>
                  <SubmenuOptions isOpen={isOptionsOpen}>
                    
                    <SubmenuButton>Copy</SubmenuButton>
                    <SubmenuButton>PDF</SubmenuButton>
                    <SubmenuButton>Excel</SubmenuButton>
                    
                  </SubmenuOptions>
                </AddEmployeeContainer>
              </HeadingAndSearchContainer>
            )}

            <Table>
              <thead>
                <Tr>
                  <Th>PROFILE</Th>
                  <Th>EMPLOYEE CODE</Th>
                  <Th>NAME</Th>
                  <Th>LAST LOGIN</Th>
                  <Th>STATUS</Th>
                  <Th>ACTION</Th>
                </Tr>
              </thead>
              <tbody>
                {employees && employees.length > 0 ? (
                  employees.map((employee) => (
                    <Tr key={employee._id}>
                      <Td>
                        {employee.profileImg && (
                          <UserImage src={employee.profileImg} />
                        )}{" "}
                        {/* Render UserImage conditionally */}
                      </Td>
                      <Td>{employee._id}</Td>
                      <Td>{employee.name}</Td>
                      <Td>
                        {new Date(employee.lastLogin).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Td>
                      <Td>
                        {employee.status === 1 ? (
                          <SuccessBadge>active</SuccessBadge>
                        ) : (
                          <DangerBadge>inactive</DangerBadge>
                        )}
                      </Td>
                      <Td>
                        <MdIcons.MdOutlineModeEditOutline
                          style={{ fontSize: "18px" }}
                        />
                        <GrIcons.GrFormView style={{ fontSize: "18px" }} />
                        <MdIcons.MdDeleteOutline style={{ fontSize: "18px" }} />
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">
                      <HeadingAndSearchContainer>
                        No Data to Show
                      </HeadingAndSearchContainer>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </BoxContainer>
        </div>
      </CenteredContainer>
      {showForm && (
        <MultiStepForm showForm={showForm} setShowForm={setShowForm} />
      )}
    </>
  );
};

export default Emp_list;
