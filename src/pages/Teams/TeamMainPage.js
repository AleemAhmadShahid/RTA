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

const Team_list = ({id}) => {
  const entriesOptions = [5, 10, 20, 50, 100];
  const pageName = [
    {
      name: "Department",
      columnName: "Department Head"
    },
    {
      name: "Team",
      columnName: "Team Lead"
    },
  ];
  const statusOptions = [
    { value: {}, label: "Select" },
    { value: 1, label: "Active" },
    { value: 2, label: "Inactive" },
  ];
  const bulkOptions = [
    { value: {}, label: "Select" },
    { value: 1, label: "Delete" },
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
  const [isViewMode, setIsViewMode] = useState(false);

  const [checkedRole, setCheckedRole] = useState([]);
  const [roles, setRole] = useState([]);
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = {
      page: currentPage,
      pageItems: entriesToShow,
      type: id,
      name: searchTerm,
    };
    if (typeof status.value !== "object") params.status = status.value;
    setLoading(true);

    const fetchData = async () => {
      try {
        const data = await createGetRequest("/api/department", params);
        if (
          data.status === 401 &&
          (data.error === "Invalid or expired token" ||
            data.error === "No token provided")
        )
          navigate("/login/");
        if (data.status === 404) {
          setRole([]);
          setLoading(false);
          return;
        }
        setRole(data.departments);
        setInfoBoxData(data.analytics);
        setTotalPages(data.totalPages);    
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    };
    fetchData();
  }, [currentPage, entriesToShow, searchTerm, status, reload, navigate]);

  const handleEditClick = (role) => {
    const updatedRole = {...role, lead: role?.lead?._id, superDepartment: role?.superDepartment?._id};
    setFormData(updatedRole);
    setShowForm(true);
    setIsEditMode(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setIsEditMode(false);
  };

  const [showToast, setshowToast] = useState(false);

  const [selectedCheck, setSelectedCheck] = useState([
    "Name",
    pageName[id-1].columnName,
    "Supervising Department",
    "Created By",
    "Actions",
  ]);
  const CheckOptions = [
    "Name",
    pageName[id-1].columnName,
    "Supervising Department",
    "Created By",
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

  const [deleteDepartmentId, setDeleteEmployeeId] = useState("");
  const deleteDepartment = async (id) => {
    const response = await createDeleteRequest(`/api/department/${id}/`);
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
    let path = "";
    const data = {roles: checkedRole};
    if (checkedRole.length === 0 || bulkOption === "Select") return;
    else if (bulkOption.label === "Delete") path = "/api/role/bulkDelete/";
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
          deleteDepartment(deleteDepartmentId);
        }}
      />{" "}
      <CenteredContainer>
        {showToast && (
          <DialogOverlay show={showToast}>
            <ToastDialogBox message={message} />
          </DialogOverlay>
        )}
        <div>
          {<CardsContainer>
            {/* <InfoBox
              icon={BiUser}
              // iconColor="blue"
              iconColor="#512da8"
              data={infoBoxData.totalUsers}
              text="Total Users"
            /> */}

            <InfoBox
              icon={FiUserPlus}
              iconColor="#512da8"
              data={infoBoxData?.totalDepartments || 0}
              text={`Total ${pageName[id - 1].name}s`}
            />
             
             <InfoBox
              icon={FiUserX}
              iconColor="#ffa500"
              data={infoBoxData?.vacantDepartments || 0}
              text={`Vacant ${pageName[id - 1].name}s`}
            />

            <InfoBox
              icon={FiUserCheck}
              iconColor="#d32f2f"
              data={infoBoxData?.closedDepartments || 0}
              text={`Closed ${pageName[id - 1].name}s`}
            />
           
          </CardsContainer> }

          <FilterContainer>

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
                  onClick={() => { setIsViewMode(false); toggleForm();}}
                  className="btn btn-primary mb-2"
                >
                  <span style={{ whiteSpace: "nowrap" }}>Add {pageName[id-1].name}</span>
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
                            setCheckedRole(
                              roles.map((role) => role._id)
                            );
                          else setCheckedRole([]);
                        }}
                      />
                    </Th>

                    {selectedCheck.includes("Name") && <Th>NAME</Th>}

                    {selectedCheck.includes(pageName[id-1].columnName) && (
                      <Th>{pageName[id-1].columnName}</Th>
                    )}

                    {selectedCheck.includes("Supervising Department") && <Th>Supervising Department</Th>}

                   
                    {selectedCheck.includes("Created By") && (
                      <Th>ADDED BY</Th>
                    )}
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
                    roles &&
                    roles.map((role) => (
                      <Tr key={role._id}>
                        <Td>
                          {" "}
                          <input
                            type="checkbox"
                            checked={checkedRole.includes(role._id)}
                            onChange={() => {
                              if (!checkedRole.includes(role._id))
                                setCheckedRole([
                                  ...checkedRole,
                                  role._id,
                                ]);
                              else
                                setCheckedRole(
                                  checkedRole.filter(
                                    (checkedRole) =>
                                      checkedRole !== role._id
                                  )
                                );
                            }}
                          />
                        </Td>

                        {selectedCheck.includes("Name") && (
                          <Td>{role.name}</Td>
                        )}

                        {selectedCheck.includes(pageName[id-1].columnName) && (
                          <Td>
                          { role?.lead 
                            &&
                            <EmployeeInfo isSpaceRequired={true} employee={role?.lead} />
                          }
                        </Td>
                        )}

                        {selectedCheck.includes("Supervising Department") && (
                          <Td>{role?.superDepartment?.name}</Td>
                        )}
                       
                        {selectedCheck.includes("Created By") && (
                          <Td>
                            { role?.createdBy 
                              &&
                              <EmployeeInfo isSpaceRequired={true} employee={role?.createdBy} />
                            }
                          </Td>
                        )}
                       
                        
                       
                        {selectedCheck.includes("Actions") && (
                          <Td>
                            <IconWrapper>
                              <MdIcons.MdOutlineModeEditOutline
                                onClick={() => {
                                  setIsViewMode(false);
                                  const updatedRole = {...role, lead: role?.lead?._id, superDepartment: role?.superDepartment?._id};
                                  setFormData(updatedRole);
                                  setShowForm(true);
                                  setIsEditMode(!!role);
                                }}
                                style={{ fontSize: "18px" }}
                              />
                            </IconWrapper>

                            <GrIcons.GrFormView
                             onClick={() => {
                              setFormData(role);
                              setIsViewMode(true);
                              toggleForm();
                            }}
                              style={{ fontSize: "18px", cursor: "pointer" }}
                            />

                            <MdIcons.MdDeleteOutline
                              style={{ fontSize: "18px", cursor: "pointer" }}
                              onClick={() => {
                                setMessage(
                                  `Do you want to delete this ${pageName[id-1].name.toLowerCase()}?`
                                );
                                setDeleteEmployeeId(role._id);
                                setIsConfirmDialogOpen(true);
                              }}
                            />
                          </Td>
                        )}
                      </Tr>
                    ))
                  )}
                  {!loading && (!roles || roles.length === 0) && (
                    <tr>
                      <td colSpan="6">No Data to Show</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </TableContainer>

            {roles.length !== 0 && totalPages >= 1 && (
              <PageBar
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
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
          isViewMode={isViewMode}
          onEditClick={handleEditClick}
          id = {id}
          pageName = {pageName}
        />
      )}
    </>
  );
};

export default Team_list;
