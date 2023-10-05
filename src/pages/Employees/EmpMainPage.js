import React, { useState, useEffect } from "react";
import MultiStepForm from "./MultiStepForm";
import LoaderComponent from "../../components/Loader";
import {
  createGetRequest,
  createDeleteRequest,
  createPutRequest,
} from "../../global/helper";
import { useNavigate } from "react-router-dom";
import InfoBox from "../../components/Cards";
import PageBar from "../../components/PageBar";
import FilterBox from "../../components/FilterBox";
import ToastDialogBox, { DialogOverlay } from "../../components/Toast";
import ErrorDialog from "../../components/ErrorDialog";
import { BiUser } from "react-icons/bi";
import { FiUserPlus, FiUserCheck, FiUserX } from "react-icons/fi";

import EmployeeInfo from "../../components/EmployeeInfo";

import * as MdIcons from "react-icons/md";
import * as GrIcons from "react-icons/gr";

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
  dropDownStyle,
} from "../styles/TableStyling";

const Emp_list = () => {
  const entriesOptions = [5, 10, 20, 50, 100];
  const statusOptions = [
    { value: {}, label: "Select" },
    { value: 1, label: "Active" },
    { value: 2, label: "Inactive" },
  ];
  const bulkOptions = [
    { value: {}, label: "Select" },
    { value: 1, label: "Active" },
    { value: 2, label: "Deactive" },
    { value: 3, label: "Delete" },
  ];

  const exportOptions = [
    { label: "Print", icon: <FaPrint /> },
    { label: "CSV", icon: <FaFileCsv /> },
    { label: "Excel", icon: <FaFileExcel /> },
    { label: "PDF", icon: <FaFilePdf /> },
    { label: "Copy", icon: <FaCopy /> },
  ];

  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);

  const [checkedEmployees, setCheckedEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [reload, setReload] = useState(false);

  const [infoBoxData, setInfoBoxData] = useState({});
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState();

  const [status, setStatus] = useState({ value: {}, label: "Select" });
  const [bulkOption, setBulkOption] = useState({ value: {}, label: "Select" });
  const [role, setRole] = useState({ value: {}, label: "Select" });
  const [roleOptions, setRoleOptions] = useState({
    value: {},
    label: "Select",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(role);
    const params = {
      page: currentPage,
      pageItems: entriesToShow,
      name: searchTerm,
    };
    if (typeof status.value !== "object") params.status = status.value;
    if (typeof role.value !== "object") params.roles = role.value;

    setLoading(true);

    const fetchData = async () => {
      try {
        const data = await createGetRequest("/api/user", params);
        if (
          data.status === 401 &&
          (data.error === "Invalid or expired token" ||
            data.error === "No token provided")
        )
          navigate("/login/");
        if (data.status === 404) {
          setEmployees([]);
          return;
        }
        setEmployees(data.users);
        setTotalPages(data.totalPages);
        setInfoBoxData(data.analytics);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      try {
        const data = await createGetRequest("/api/role");
        if (data.status === 200) {
          const roles = data.roles.map((role) => ({
            label: role.name,
            value: role._id,
          }));
          setRoleOptions([{ value: {}, label: "Select" }, ...roles]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentPage, entriesToShow, searchTerm, status, role, reload, navigate]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditClick = (employee) => {
    setFormData(employee);
    setShowForm(true);
    setIsEditMode(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setIsEditMode(false);
  };

  // const handleStatusChange = (selectedOption) => {
  //   setStatus(selectedOption);
  // };
  // const handleRoleChange = (selectedOption) => {
  //   setRole(selectedOption);
  // };

  // const handleEntriesChange = (value) => {
  //   setEntriesToShow(value);
  // };

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
    "Member Since",
    "Status",
    "Actions",
  ];

  const handleCheckChange = (optionLabel) => {
    let selectedCheckCopy = [...selectedCheck];
    if (!selectedCheckCopy.includes(optionLabel))
      selectedCheckCopy.push(optionLabel);
    else
      selectedCheckCopy = selectedCheckCopy.filter(
        (check) => check !== optionLabel
      );
    setSelectedCheck(selectedCheckCopy);
  };
  const [Export, setExport] = useState({
    label: "Export",
    icon: <FaPrint />,
  });

  const [deleteEmployeeId, setDeleteEmployeeId] = useState("");
  const deleteEmployee = async (id) => {
    const response = await createDeleteRequest(`/api/user/${id}/`);
    if (response.status === 200) {
      setIsConfirmDialogOpen(false);
      setMessage("Deleted Successfully");
      setReload(!reload);
      setshowToast(true);
      setTimeout(() => {
        setshowToast(false);
      }, 1500);
    }
  };

  const takeBulkAction = async () => {
    if (checkedEmployees.length === 0 || bulkOption === "Select") return;
    let path = "";
    const data = { users: checkedEmployees, status: 1 };
    if (bulkOption.label === "Deactive" || bulkOption.label === "Active")
      path = "/api/user/bulkStatusUpdate/";
    if (bulkOption.label === "Active") data.status = 1;
    if (bulkOption.label === "Deactive") data.status = 2;
    else if (bulkOption.label === "Delete") path = "/api/user/bulkDelete/";
    const response = await createPutRequest(data, path);
    if (response.status === 200) {
      setReload(!reload);
      setMessage(`${bulkOption.label}d Successfully`);
      setshowToast(true);
      setTimeout(() => {
        setshowToast(false);
      }, 1500);
      setBulkOption({ label: "Select", value: 0 });
    }
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <ErrorDialog
        message={message}
        show={isDialogOpen}
        handleClose={handleCloseDialog}
      />
      <ErrorDialog
        title={"Are you sure?"}
        message={message}
        show={isConfirmDialogOpen}
        handleClose={() => setIsConfirmDialogOpen(false)}
        handleYes={() => {
          deleteEmployee(deleteEmployeeId);
        }}
      />{" "}
      <CenteredContainer>
        {showToast && (
          <DialogOverlay show={showToast}>
            <ToastDialogBox message={message} />
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
                options={statusOptions}
                onValueChange={(selectedOption) => setStatus(selectedOption)}
                selectedValue={status}
                title="Status"
              />

              <FilterBox
                options={roleOptions}
                onValueChange={(selectedOption) => setRole(selectedOption)}
                selectedValue={role}
                title="Role"
              />
            </FilterOuterBox>
            <h6 style={{ marginLeft: "20px", paddingTop: "10px" }}>
              Bulk Actions
            </h6>
            <FilterOuterBox>
              <FilterBox
                options={bulkOptions}
                onValueChange={(selectedOption) =>
                  setBulkOption(selectedOption)
                }
                selectedValue={bulkOption}
                title=""
              />
              <AddEmployeeButton
                style={{ marginBottom: "0px" }}
                className="btn btn-primary mb-2"
                onClick={takeBulkAction}
              >
                <span style={{ whiteSpace: "nowrap" }}>Apply</span>
              </AddEmployeeButton>
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
                      setEntriesToShow(selectedOption.value)
                    }
                    options={entriesOptions.map((option) => ({
                      value: option,
                      label: option.toString(),
                    }))}
                    styles={dropDownStyle}
                  />
                </div>
              </CreateEmployeeHeading>
              <StyledSearchBar onSearch={setSearchTerm} />

              <AddEmployeeContainer>
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
                          checked={selectedCheck.includes(option)}
                          style={{ marginRight: "8px" }}
                        />
                        <span>{option}</span>
                      </div>
                    ),
                  }))}
                  styles={{ ...dropDownStyle }}
                />

                <EntriesDropdown
                  value={{
                    value: Export.label,
                    label: Export.label.toString(),
                  }}
                  onChange={(selectedOption) => {
                    setExport({
                      label: selectedOption.value,
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
                    icon: option.icon,
                  }))}
                  styles={dropDownStyle}
                />
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
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked)
                            setCheckedEmployees(
                              employees.map((employee) => employee._id)
                            );
                          else setCheckedEmployees([]);
                        }}
                      />
                    </Th>
                    {selectedCheck.includes("User") && <Th>USER</Th>}
                    {/* <Th>NAME</Th>  */}
                    {selectedCheck.includes("Employee Code") && (
                      <Th>EMPLOYEE CODE</Th>
                    )}
                    {selectedCheck.includes("Last Login") && (
                      <Th>LAST LOGIN</Th>
                    )}
                    {selectedCheck.includes("Member Since") && (
                      <Th>MEMBER SINCE</Th>
                    )}
                    {selectedCheck.includes("Status") && <Th>STATUS</Th>}
                    {selectedCheck.includes("Actions") && <Th>ACTION</Th>}
                  </Tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6">
                        <LoaderComponent />
                      </td>
                    </tr>
                  ) : (
                    employees &&
                    employees.map((employee) => (
                      <Tr key={employee._id}>
                        <Td>
                          {" "}
                          <input
                            type="checkbox"
                            checked={checkedEmployees.includes(employee._id)}
                            onChange={() => {
                              if (!checkedEmployees.includes(employee._id))
                                setCheckedEmployees([
                                  ...checkedEmployees,
                                  employee._id,
                                ]);
                              else
                                setCheckedEmployees(
                                  checkedEmployees.filter(
                                    (checkedEmployee) =>
                                      checkedEmployee !== employee._id
                                  )
                                );
                            }}
                          />
                        </Td>
                        {selectedCheck.includes("User") && (
                          <Td>
                            <EmployeeInfo employee={employee} />
                          </Td>
                        )}

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
                        {selectedCheck.includes("Member Since") && (
                          <Td>
                            {(employee.dateOfJoining &&
                              new Date(employee.dateOfJoining).toLocaleString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )) ||
                              ""}
                          </Td>
                        )}
                        {selectedCheck.includes("Status") && (
                          <Td>
                            {employee.status === 1 ? (
                              <SuccessBadge>Active</SuccessBadge>
                            ) : employee.status === 2 ? (
                              <DangerBadge>Inactive</DangerBadge>
                            ) : (
                              <DangerBadge>Deleted</DangerBadge>
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
                                  setIsEditMode(!!employee);
                                }}
                                style={{ fontSize: "18px" }}
                              />
                            </IconWrapper>

                            <GrIcons.GrFormView
                              style={{ fontSize: "18px", cursor: "pointer" }}
                            />

                            <MdIcons.MdDeleteOutline
                              style={{ fontSize: "18px", cursor: "pointer" }}
                              onClick={() => {
                                setMessage(
                                  "Do you want to delete this employee?"
                                );
                                setDeleteEmployeeId(employee._id);
                                setIsConfirmDialogOpen(true);
                              }}
                            />
                          </Td>
                        )}
                      </Tr>
                    ))
                  )}
                  {!loading && (!employees || employees.length === 0) && (
                    <tr>
                      <td colSpan="6">No Data to Show</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </TableContainer>

            {employees.length !== 0 && totalPages >= 1 && (
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
          setshowToast={setshowToast}
          reload={reload}
          setReload={setReload}
          isEditMode={isEditMode}
          onEditClick={handleEditClick}
        />
      )}
    </>
  );
};

export default Emp_list;
