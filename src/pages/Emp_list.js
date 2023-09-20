import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import SearchBar from "../components/searchbar";
import MultiStepForm from "./MultiStepForm";
import { createGetRequest } from "../global/helper";
import { useNavigate } from "react-router-dom";
import InfoBox from "../components/Cards";
import PageBar from "../components/PageBar";
import FilterBox from "../components/FliterBox";
import ToastDialogBox, { DialogOverlay } from "../components/Toast";
import ErrorDialog from "../components/ErrorDialog";
import {
  Td,
  Tr,
  Th,
  AddEmployeeContainer,
  Table,
  UserImage,
  SuccessBadge,
  DangerBadge,
  CreateEmployeeHeading,
} from "./TableStyling";
import EmployeeInfo from "../components/EmployeeInfo";
import { async } from "q";

import * as MdIcons from "react-icons/md";
import * as GrIcons from "react-icons/gr";

import Select from "react-select";
import {
  FaPrint,
  FaFileCsv,
  FaFileExcel,
  FaFilePdf,
  FaCopy,
} from "react-icons/fa";

const BoxContainer = styled.div`
  // border: 0px solid #ccc;
  padding: 3px 0px;
  box-shadow: 0px 01px 0px rgba(0, 0, 0, 0);
  border-radius: 5px;
  background: #ffffff;
  margin-top: 24px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

const AddEmployeeButton = styled(Link)`
  background-color: #ffa500;
  color: #fff;
  padding: 7px 40px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  margin-left: 10px;
  margin-top: 5.5px;
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
  padding: 7px 40px;
  justify-content: space-between;
  align-items: center;
`;

const StyledSearchBar = styled(SearchBar)`
  width: 10%;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const CenteredContainer = styled.div`
  position: relative; /* Keep it relative for child elements */
  // left: 18.6%; /* Adjust the left position to match your sidebar width */
  right: 13%;
  top:90px;
  left:253px;
  // transform: translateX(0%);
  padding: 0px 20px;
  border-radius: 5px;
  width: 81.9%; /* Default width */
  // overflow: auto;
  @media (max-width: 1200px) {
    width: 84%;
  }

  @media (max-width: 768px) {
    width: 84%;
  }

  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
  // height: 100vh;
  // overflow-y: auto; /* Add vertical scroll if necessary */
`;


const EntriesDropdown = styled(Select)`
  width: 110px;

  .select__control {
    border: 1px solid orange; /* Change border color to orange */
    border-radius: 5px;
    // padding: 5px;
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

const CardsContainer = styled.div`
  display: flex;
   justify-content: space-between;

`;

const FilterOuterBox = styled.div`
  background: #fff;
  display: flex; /* Use flex display to align FilterBox components side by side */
  justify-content: space-between; /* Distribute space evenly between FilterBox components */
  // align-items: center;
  border-bottom-left-radius: 5px; /* Adjust as needed */
  border-bottom-right-radius: 5px; /* Adjust as needed */

  padding: 5px 19px; /* Add padding to create spacing between FilterBox components */
`;
const FilterContainer = styled.div`
  background: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  // border-bottom-left-radius: 5px; /* Adjust as needed */
  // border-bottom-right-radius: 5px; /* Adjust as needed */
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const Emp_list = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [entriesToShow, setEntriesToShow] = useState(10);
  const entriesOptions = [10, 20, 50, 100];
  const [isOptionsOpen, setIsOptionsOpen] = useState(true);
  const navigate = useNavigate();
  const [infoBoxData, setInfoBoxData] = useState(123);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = employees
    ? Math.ceil(employees.length / entriesToShow)
    : 0;

  useEffect(() => {
    const params = {
      page: currentPage,
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
  }, [currentPage, entriesToShow, searchTerm]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openForm = () => {
    setShowForm(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleStatusChange = (selectedOption) => {
    setStatus(selectedOption); // Update the status state with the selected option's value
  };
  const handleRoleChange = (selectedOption) => {
    setRole(selectedOption); // Update the status state with the selected option's value
  };

  const handleEntriesChange = (value) => {
    setEntriesToShow(value);
  };
  const handlePlanChange = (selectedOption) => {
    setPlan(selectedOption); // Update the status state with the selected option's value
  };

  const [status, setStatus] = useState("Select Status"); // Initialize with an empty string
  const statusOptions = ["Active", "Inactive"];
  const [role, setRole] = useState("Select Role");
  const roleOptions = ["Admin", "Developer", "Tester"];
  const [plan, setPlan] = useState("Select Plan");
  const planOptions = ["Daily", "Weekly", "Monthly"];

  const [showToast, setshowToast] = useState(false);

  const [Export, setExport] = useState("Export");
   const [selectedCheck, setSelectedCheck] = useState(""); // Initialize with an empty string or an appropriate default value
   const CheckOptions = ["1", "2", "3", "4"];
   const handleCheckChange = (optionLabel) => {
     setSelectedCheck(optionLabel); // Update selectedCheck directly
   };
  




  const exportOptions = [
    { label: "Print", icon: <FaPrint /> },
    { label: "CSV", icon: <FaFileCsv /> },
    { label: "Excel", icon: <FaFileExcel /> },
    { label: "PDF", icon: <FaFilePdf /> },
    { label: "Copy", icon: <FaCopy /> },
  ];

  const toggleToast = (event) => {
    const rect = event.target.getBoundingClientRect();

    setshowToast(!showToast);
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteIconClick = (event) => {
    const rect = event.target.getBoundingClientRect();

    setIsDialogOpen(!isDialogOpen);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      {/* for error ToastDialogBox  */}
      <ErrorDialog show={isDialogOpen} handleClose={handleCloseDialog} />{" "}
      {showToast && (
        <DialogOverlay show={showToast}>
          <ToastDialogBox />
        </DialogOverlay>
      )}
      <CenteredContainer>
        <div>
          <CardsContainer>
            <InfoBox
              iconColor="#ffa500"
              data={infoBoxData}
              text="Total Users"
              //  width="300px"
            />
            <InfoBox iconColor="#ffa500" data={infoBoxData} text="Paid Users" />

            <InfoBox
              iconColor="#ffa500"
              data={infoBoxData}
              text="Active users"
            />
            <InfoBox
              iconColor="#ffa500"
              data={infoBoxData}
              text="Pending Users"
            />
          </CardsContainer>

          <FilterContainer>
            <h6 style={{ marginLeft: "20px", paddingTop: "10px" }}>Filters</h6>
            <FilterOuterBox>
              <FilterBox
                options={statusOptions} // Pass the options directly
                onValueChange={handleStatusChange}
                selectedValue={status}
                title="Status"
                // width={"340px"}
              />
              <FilterBox
                options={roleOptions} // Pass the options directly
                onValueChange={handleRoleChange}
                selectedValue={role}
                title=" Role"
              />
              <FilterBox
                options={planOptions} // Pass the options directly
                onValueChange={handlePlanChange}
                selectedValue={plan}
                title=" Plan"
              />
            </FilterOuterBox>
          </FilterContainer>

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
                    options={entriesOptions.map((option) => ({
                      value: option,
                      label: option.toString(), // Use the option value as the label
                    }))}
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

              <div style={{ marginRight: "8px" }}>
                <EntriesDropdown
                  value={selectedCheck} // Use the singular selectedCheck variable
                  onChange={(selectedOption) =>
                    handleCheckChange(selectedOption.value)
                  }
                  options={CheckOptions.map((option) => ({
                    value: option,
                    label: (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                          type="checkbox"
                          checked={selectedCheck === option} // Check against selectedCheck
                          onChange={() => handleCheckChange(option)} // Update selectedCheck
                          style={{ marginRight: "8px" }}
                        />
                        <span>{option}</span>
                      </div>
                    ),
                  }))}
                  styles={{
                    menu: (provided) => ({
                      ...provided,
                      background: "#ffffff",
                      border: provided.isFocused
                        ? "1px solid orange"
                        : "1px solid #ccc",
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected ? "white" : "white",
                      color: state.isSelected ? "black" : "black",
                      "&:hover": {
                        backgroundColor: "#ffa500",
                        color: "white",
                      },
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }),
                  }}
                />
              </div>

              <AddEmployeeContainer>
                <div>
                  <EntriesDropdown
                    value={{
                      value: Export,
                      label: Export.toString(),
                    }}
                    onChange={(selectedOption) =>
                      setExport(selectedOption.value)
                    }
                    options={exportOptions.map((option) => ({
                      value: option.label,
                      label: (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {option.icon}
                          <span style={{ marginLeft: "8px" }}>
                            {option.label}
                          </span>
                        </div>
                      ),
                    }))}
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

                <AddEmployeeButton
                  onClick={toggleForm}
                  className="btn btn-primary mb-2"
                >
                  <span style={{ whiteSpace: "nowrap" }}>Add Employee</span>
                </AddEmployeeButton>
              </AddEmployeeContainer>
            </HeadingAndSearchContainer>
            <TableContainer>
              <Table>
                <thead>
                  <Tr>
                    <Th>
                      <input type="checkbox" />
                    </Th>
                    <Th>PROFILE</Th>
                    {/* <Th>NAME</Th>  */}
                    <Th>EMPLOYEE CODE</Th>
                    <Th>LAST LOGIN</Th>
                    <Th>STATUS</Th>
                    <Th>ACTION</Th>
                  </Tr>
                </thead>
                <tbody>
                  {employees &&
                    employees
                      .slice(
                        (currentPage - 1) * entriesToShow,
                        currentPage * entriesToShow
                      )
                      .map((employee) => (
                        <Tr key={employee._id}>
                          <Td>
                            {" "}
                            <input type="checkbox" />
                          </Td>
                          <Td>
                            {/* {employee.profileImg && (
                  <UserImage src={employee.profileImg} />
                )} */}
                            <EmployeeInfo employee={employee} />
                          </Td>
                          {/* <Td> */}
                          {/* <EmployeeInfo employee={employee} />  */}
                          {/* {employee.name} */}
                          {/* <br /> */}
                          {/* <span style={{ fontSize: "12px", color: "grey" }}> */}
                          {/* {employee.email} */}
                          {/* </span> */}
                          {/* </Td> */}

                          <Td>{employee._id}</Td>
                          <Td>
                            {new Date(employee.lastLogin).toLocaleString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </Td>
                          <Td>
                            {employee.status === 1 ? (
                              <SuccessBadge>Active</SuccessBadge>
                            ) : (
                              <DangerBadge>Inactive</DangerBadge>
                            )}
                          </Td>
                          <Td>
                            <IconWrapper onClick={toggleToast}>
                              <MdIcons.MdOutlineModeEditOutline
                                style={{ fontSize: "18px" }}
                              />
                            </IconWrapper>

                            <GrIcons.GrFormView style={{ fontSize: "18px" }} />

                            <MdIcons.MdDeleteOutline
                              style={{ fontSize: "18px", cursor: "pointer" }}
                              onClick={handleDeleteIconClick}
                            />
                          </Td>
                        </Tr>
                      ))}
                  {!employees ||
                    (employees.length === 0 && (
                      <tr>
                        <td colSpan="6">
                          <HeadingAndSearchContainer>
                            No Data to Show
                          </HeadingAndSearchContainer>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </TableContainer>

            {totalPages >= 1 && (
              <PageBar
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
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
