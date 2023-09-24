import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import SearchBar from "../../components/searchbar";
import MultiStepForm from "./MultiStepForm";
import { createGetRequest } from "../../global/helper";
import { useNavigate } from "react-router-dom";
import InfoBox from "../../components/Cards";
import PageBar from "../../components/PageBar";
import FilterBox from "../../components/FliterBox";
import ToastDialogBox, { DialogOverlay } from "../../components/Toast";
import ErrorDialog from "../../components/ErrorDialog";
import { BiUser } from "react-icons/bi";
import { FiUserPlus, FiUserCheck, FiUserX } from "react-icons/fi";

import EmployeeInfo from "../../components/EmployeeInfo";
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
  BoxContainer,
  AddEmployeeButton,
  HeadingAndSearchContainer,
  TableContainer,
  CenteredContainer,
  CardsContainer,
  FilterOuterBox,
  FilterContainer,
  IconWrapper,
  EntriesDropdown,
  StyledSearchBar,
} from "../styles/TableStyling";

const Emp_list = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});

  const entriesOptions = [5, 10, 20, 50, 100];
  const [isOptionsOpen, setIsOptionsOpen] = useState(true);
  const navigate = useNavigate();
  const [infoBoxData, setInfoBoxData] = useState({});
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState();

  const [status, setStatus] = useState({ value: {}, label: "Select" }); // Initialize with an empty string
  const statusOptions = [
    { value: {}, label: "Select" },
    { value: 1, label: "Active" },
    { value: 2, label: "Inactive" },
  ];
  const [role, setRole] = useState({ value: {}, label: "Select" });
  const roleOptions = [
    { value: {}, label: "Select" },
    { value: 1, label: "Active" },
    { value: 2, label: "Inactive" },
  ];
  const [plan, setPlan] = useState({ value: {}, label: "Select" });
  const planOptions = [
    { value: {}, label: "Select" },
    { value: 1, label: "Active" },
    { value: 2, label: "Inactive" },
  ];

  useEffect(() => {
    const params = {
      page: currentPage,
      pageItems: entriesToShow,
      name: searchTerm,
    };
    if (typeof status.value !== "object") params.status = status.value;
    const fetchData = async () => {
      try {
        const data = await createGetRequest("/api/user", params);
        if (
          data.status == 401 &&
          (data.error == "Invalid or expired token" ||
            data.error == "No token provided")
        )
          navigate("/login/");
        if (data.status == 404) {
          setEmployees([]);
          return;
        }
        setEmployees(data.users);
        setTotalPages(data.totalPages);
        setInfoBoxData(data.analytics);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentPage, entriesToShow, searchTerm, status]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const [currentPage, setCurrentPage] = useState(1);
  // const [tableEntriesToShow] = useState(5); // Fixed number of entries to show per page
  // const [employees, setEmployees] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [totalPages, setTotalPages] = useState(0);

  // useEffect(() => {
  //   const params = {
  //     page: currentPage,
  //     pageItems: entriesToShow,
  //     name: searchTerm,
  //   };
  //   const fetchData = async () => {
  //     try {
  //       const data = await createGetRequest("/api/user", params);
  //       if (data.status === 401 && data.error === "Invalid or expired token") {
  //         navigate("/login/");
  //       }
  //       setEmployees(data.users);
  //       setTotalPages(Math.ceil(data.totalCount / entriesToShow));
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, [currentPage, entriesToShow, searchTerm]);

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  // // Calculate the range of employees to display for the current page
  // const startIndex = (currentPage - 1) * entriesToShow;
  // const endIndex = startIndex + entriesToShow;
  // const displayedEmployees = employees.slice(startIndex, endIndex);
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

  const [showToast, setshowToast] = useState(false);

  const [selectedCheck, setSelectedCheck] = useState([
    "User",
    "Employee Code",
    "Last Login",
    "Status",
    "Actions",
  ]);
  const CheckOptions = [
    "User",
    "Employee Code",
    "Last Login",
    "Status",
    "Actions",
  ];
  const handleCheckChange = (optionLabel) => {
    let selectedCheckCopy = [...selectedCheck];
    if (!selectedCheckCopy.includes(optionLabel))
      selectedCheckCopy.push(optionLabel);
    else
      selectedCheckCopy = selectedCheckCopy.filter(
        (check) => check != optionLabel
      );
    setSelectedCheck(selectedCheckCopy);
  };
  const [Export, setExport] = useState({
    label: "Export",
    icon: <FaPrint />, // You can change the icon here
  });
  const exportOptions = [
    { label: "Print", icon: <FaPrint /> },
    { label: "CSV", icon: <FaFileCsv /> },
    { label: "Excel", icon: <FaFileExcel /> },
    { label: "PDF", icon: <FaFilePdf /> },
    { label: "Copy", icon: <FaCopy /> },
  ];

  // Then, you can use the exportOptions array to render the options in your component

  const toggleToast = (event) => {
    const rect = event.target.getBoundingClientRect();

    setshowToast(!showToast);
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      {/* for error ToastDialogBox  */}
      <ErrorDialog
        message={message}
        show={isDialogOpen}
        handleClose={handleCloseDialog}
      />{" "}
      {/* {showToast && (
        <DialogOverlay show={showToast}>
          <ToastDialogBox />
        </DialogOverlay>
      )} */}
      <CenteredContainer>
        {showToast && (
          <DialogOverlay show={showToast}>
            <ToastDialogBox />
          </DialogOverlay>
        )}
        <div>
          <CardsContainer>
            <InfoBox
              icon={BiUser}
              // iconColor="blue"
              iconColor="#512da8"
              data={infoBoxData.totalUsers}
              text="Total Users"
            />
            <InfoBox
              icon={FiUserCheck}
              iconColor="#2ac779"
              data={infoBoxData.activeUsers}
              text="Active Users"
            />

            <InfoBox
              icon={FiUserPlus}
              iconColor="#d32f2f"
              data={infoBoxData.InActiveUsers}
              text="Inactive Users"
            />
            <InfoBox
              icon={FiUserX}
              iconColor="#ffa500"
              data={infoBoxData.pendingInvites}
              text="Pending Invites"
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
              {/* <AddEmployeeContainerMobile> */}
              <AddEmployeeContainer>
                <div style={{ marginRight: "8px" }}>
                  <EntriesDropdown
                    value={"Select"}
                    options={CheckOptions.map((option) => ({
                      value: option,
                      label: (
                        <div
                          onClick={() => handleCheckChange(option)}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <input
                            type="checkbox"
                            checked={selectedCheck.includes(option)} // Check against selectedCheck
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

                {/* <AddEmployeeContainer> */}
                <div>
                  <EntriesDropdown
                    value={{
                      value: Export.label, // Changed this to Export.label
                      label: Export.label.toString(),
                    }}
                    onChange={(selectedOption) => {
                      setExport({
                        label: selectedOption.value, // Set both label and icon
                        icon: selectedOption.icon,
                      });
                    }}
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
                      icon: option.icon, // Add icon to the option object
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
              {/* </AddEmployeeContainerMobile> */}
            </HeadingAndSearchContainer>
            <TableContainer>
              <Table>
                <thead>
                  <Tr>
                    <Th>
                      <input type="checkbox" />
                    </Th>
                    {selectedCheck.includes("User") && <Th>USER</Th>}
                    {/* <Th>NAME</Th>  */}
                    {selectedCheck.includes("Employee Code") && (
                      <Th>EMPLOYEE CODE</Th>
                    )}
                    {selectedCheck.includes("Last Login") && (
                      <Th>LAST LOGIN</Th>
                    )}
                    {selectedCheck.includes("Status") && <Th>STATUS</Th>}
                    {selectedCheck.includes("Actions") && <Th>ACTION</Th>}
                  </Tr>
                </thead>
                <tbody>
                  {employees &&
                    employees.map((employee) => (
                      <Tr key={employee._id}>
                        <Td>
                          {" "}
                          <input type="checkbox" />
                        </Td>
                        {selectedCheck.includes("User") && (
                          <Td>
                            {/* {employee.profileImg && (
                  <UserImage src={employee.profileImg} />
                )} */}
                            <EmployeeInfo employee={employee} />
                          </Td>
                        )}
                        {/* <Td> */}
                        {/* <EmployeeInfo employee={employee} />  */}
                        {/* {employee.name} */}
                        {/* <br /> */}
                        {/* <span style={{ fontSize: "12px", color: "grey" }}> */}
                        {/* {employee.email} */}
                        {/* </span> */}
                        {/* </Td> */}

                        {selectedCheck.includes("Employee Code") && (
                          <Td>{employee._id}</Td>
                        )}
                        {selectedCheck.includes("Last Login") && (
                          <Td>
                            {(employee.lastLogin &&
                              new Date(employee.lastLogin).toLocaleString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )) ||
                              "Resend Invite"}
                          </Td>
                        )}
                        {selectedCheck.includes("Status") && (
                          <Td>
                            {employee.status === 1 ? (
                              <SuccessBadge>Active</SuccessBadge>
                            ) : (
                              <DangerBadge>Inactive</DangerBadge>
                            )}
                          </Td>
                        )}
                        {selectedCheck.includes("Actions") && (
                          <Td>
                            <IconWrapper>
                              <MdIcons.MdOutlineModeEditOutline
                                onClick={() => {
                                  setFormData(employee);
                                  setShowForm(true);
                                }}
                                style={{ fontSize: "18px" }}
                              />
                            </IconWrapper>

                            <GrIcons.GrFormView
                              onClick={toggleToast}
                              style={{ fontSize: "18px", cursor: "pointer" }}
                            />

                            <MdIcons.MdDeleteOutline
                              style={{ fontSize: "18px", cursor: "pointer" }}
                              onClick={() => {}}
                            />
                          </Td>
                        )}
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

            {employees.length != 0 && totalPages >= 1 && (
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
        <MultiStepForm
          showForm={showForm}
          setShowForm={setShowForm}
          formData={formData}
          setFormData={setFormData}
          setMessage={setMessage}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
    </>
  );
};

export default Emp_list;
