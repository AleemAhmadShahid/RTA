import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import SearchBar from "../components/searchbar";
import MultiStepForm from "./MultiStepForm";
import { createGetRequest } from "../global/helper";
import { useNavigate } from "react-router-dom";
import InfoBox from "../components/Infobox";
import PageBar from "../components/PageBar";
import FilterBox from "../components/FliterBox";
import DialogBox from "../components/DialogBox";
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
} from "react-icons/fa"; // Import icons from your preferred icon library

const BoxContainer = styled.div`
  // border: 0px solid #ccc;
  padding: 3px 0px;
  box-shadow: 0px 01px 0px rgba(0, 0, 0, 0);
  border-radius: 5px;
  background: #ffffff;
  margin-top: 24px;
`;

const CreateEmployeeHeading = styled.h6`
  margin-bottom: 10px;
  width: 100%;
  right: 0%;
  font-weight: lighter;
  fontsize: "smaller";
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
  width: 130px;

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

const InfoBoxesContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
// const PageBar = ({ currentPage, totalPages, onPageChange }) => {
//   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
//   return (
//     <div>
//       {pages.map((page) => (
//         <PageCircle
//           key={page}
//           onClick={() => onPageChange(page)}
//           active={currentPage === page}
//         >
//           {page}
//         </PageCircle>
//       ))}
//     </div>
//   );
// };

// const PageCircle = styled.span`
//   display: inline-block;
//   width: 30px;
//   height: 30px;
//   border: 1px solid #ccc;
//   border-radius: 50%;
//   margin-right: 5px;
//   cursor: pointer;
//   background-color: ${(props) => (props.active ? "#ffa500" : "white")};
//   color: ${(props) => (props.active ? "white" : "#000")};
// `;
const OuterBox = styled.div`
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
  border-bottom-left-radius: 5px; /* Adjust as needed */
  border-bottom-right-radius: 5px; /* Adjust as needed */
`;

const IconWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const DialogOverlay = styled.div`
  position: absolute;
  top: calc(100% + 10px); /* Position the dialog box below the icon */
  left: 0;
  z-index: 1; /* Ensure the dialog box appears above other content */
  display: ${(props) => (props.show ? "block" : "none")};
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
  const [isExportOptionsOpen, setIsExportOptionsOpen] = useState(false);
  const exportOptionsRef = useRef(null);
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

  // const handleEntriesChange = (selectedOption) => {
  //   setEntriesToShow(selectedOption); // Set selectedOption directly
  // };
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

  const [showDialog, setShowDialog] = useState(false);
  const [dialogPosition, setDialogPosition] = useState({ x: 0, y: 0 });
  // const exportOptions = ["Print","CVS","Excel","PDF","Copy"];
  const [Export, setExport] = useState("Export");
  const [selectedCheck, setSelectedCheck] = useState("");// Initialize with an empty string or an appropriate default value
  const CheckOptions = ["1", "2", "3", "4"]
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

  const toggleDialog = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = rect.left + window.scrollX;
    const y = rect.bottom + window.scrollY;
    setDialogPosition({ x, y });
    setShowDialog(!showDialog);
  };

  return (
    <>
      <CenteredContainer>
        <div>
          <InfoBoxesContainer>
            <InfoBox
              iconColor="#ffa500"
              data={infoBoxData}
              text="Total Users"
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
          </InfoBoxesContainer>

          <FilterContainer>
            <h6 style={{ marginLeft: "20px", paddingTop: "10px" }}>Filters</h6>
            <OuterBox>
              <FilterBox
                options={statusOptions} // Pass the options directly
                onValueChange={handleStatusChange}
                selectedValue={status}
                title="Status"
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
            </OuterBox>
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
                {/* <FilterBox
                options={NoOptions} // Pass the options directly
                onValueChange={handleNoChange}
                selectedValue={No}
                title=" "
              /> */}
                {/* <div style={{ margin: '10px 0' }}></div> */}
              </CreateEmployeeHeading>
              <div>
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
         border: provided.isFocused ? "1px solid orange" : "1px solid #ccc",
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
              <StyledSearchBar onSearch={setSearchTerm} />
              
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
                 <span style={{ whiteSpace: 'nowrap' }}>Add Employee</span>
                </AddEmployeeButton>
              </AddEmployeeContainer>
            </HeadingAndSearchContainer>
            

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
                {employees &&
                  employees
                    .slice(
                      (currentPage - 1) * entriesToShow,
                      currentPage * entriesToShow
                    )
                    .map((employee) => (
                      <Tr key={employee._id}>
                        <Td>
                          
                          {employee.profileImg && (
                            <UserImage src={employee.profileImg} />
                          )}
                        </Td>
                        <Td>{employee._id}</Td>
                        <Td>
                        {/* <EmployeeInfo employee={employee} /> */}
                          {employee.name}
                          <br />
                          <span style={{ fontSize: "12px", color: "grey" }}>
                            {employee.email}
                          </span>
                        </Td>

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
                            <SuccessBadge>active</SuccessBadge>
                          ) : (
                            <DangerBadge>inactive</DangerBadge>
                          )}
                        </Td>
                        <Td>
                          <IconWrapper onClick={toggleDialog}>
                            <MdIcons.MdOutlineModeEditOutline
                              style={{ fontSize: "18px" }}
                            />
                            {showDialog && (
                              <DialogOverlay
                                show={showDialog}
                                // style={{
                                //   top: dialogPosition.y + "px",
                                //   left: dialogPosition.x + "px",
                                // }}
                              >
                                <DialogBox />
                              </DialogOverlay>
                            )}
                          </IconWrapper>

                          <GrIcons.GrFormView s tyle={{ fontSize: "18px" }} />
                          <MdIcons.MdDeleteOutline
                            style={{ fontSize: "18px" }}
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
          </BoxContainer>
          {totalPages > 1 && (
            <PageBar
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </CenteredContainer>
      {showForm && (
        <MultiStepForm showForm={showForm} setShowForm={setShowForm} />
      )}
    </>
  );
};

export default Emp_list;
