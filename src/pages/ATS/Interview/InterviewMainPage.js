import React, { useState, useEffect } from "react";
import MultiStepForm from "./MultiStepForm";
import {
  createGetRequest,
  createDeleteRequest,
  createPutRequest,
} from "../../../global/requests";
import { handleCheckChange } from "../../../global/helper";
import { useNavigate } from "react-router-dom";
import InfoBox from "../../../components/Cards";
import PageBar from "../../../components/PageBar";
import FilterBox from "../../../components/FilterBox";
import { BiUser } from "react-icons/bi";
import { FiUserPlus, FiUserCheck, FiUserX } from "react-icons/fi";

import EmployeeInfo from "../../../components/EmployeeInfo";

import * as MdIcons from "react-icons/md";
import * as GrIcons from "react-icons/gr";

import { FaPrint} from "react-icons/fa";

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
} from "../../../styles/TableStyling";

import EmployeeTable from "../../../components/Table";
import LoaderComponent from "../../../components/Loader";
import { entriesOptions, exportOptions } from "../../../global/constants"
import toast  from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {  setErrorModal } from '../../../redux/modalSlice';

const Interview_list = () => {
  const dispatch = useDispatch();

  
  const bulkOptions = [
    { value: {}, label: "Select" },
    { value: 1, label: "Active" },
    { value: 2, label: "Deactive" },
    { value: 3, label: "Delete" },
  ];
  
  const statusOptions = [
    { value: {}, label: "Select" },
    { label: 'In-progress', value: 'In-progress' },
    { label: 'Waiting for approval', value: 'Waiting for approval' },
    { label: 'On-Hold', value: 'On-Hold' },
    { label: 'Filled', value: 'Filled' },
    { label: 'Cancelled', value: 'Cancelled' },
    { label: 'Declined', value: 'Declined' },
    { label: 'Inactive', value: 'Inactive' }
  ];

  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);

  const [checkedInterviews, setCheckedInterviews] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [reload, setReload] = useState(false);

  const [infoBoxData, setInfoBoxData] = useState({});
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [status, setStatus] = useState({ value: {}, label: "Select" });
  const [bulkOption, setBulkOption] = useState({ value: {}, label: "Select" });
  const [role, setRole] = useState({ value: {}, label: "Select" });
  const [roleOptions, setRoleOptions] = useState({
    value: {},
    label: "Select",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    
    const params = {
      page: currentPage,
      pageItems: entriesToShow,
      name: searchTerm,
    };
    if (typeof status.value !== "object") params.status = status.value;
    if (typeof role.value !== "object") params.role = role.value;

    setLoading(true);

    const fetchData = async () => {
      try {
        const data = await createGetRequest("/api/interview", params);
      
        if (data.status === 400 || data.status === 404) {
          setInterviews([]);
          setLoading(false);
          return;
        }
        setInterviews(data.interviews);
        setTotalPages(data.totalPages);
        //setInfoBoxData(data.analytics);
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

  const handleEditClick = (interview) => {
    setFormData(interview);
    setShowForm(true);
    setIsEditMode(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setIsEditMode(false);
  };


  const [selectedCheck, setSelectedCheck] = useState([
    "Candidate",
    "Interview Name",
    "From",
    "To",
    "Actions",
  ]);
  const CheckOptions = [
    "Candidate",
    "Interview Name",
    "From",
    "To",
    "Actions",
  ];

  const [Export, setExport] = useState({
    label: "Export",
    icon: <FaPrint />,
  });

  const deleteInterview = async (id) => {
    const response = await createDeleteRequest(`/api/interview/${id}/`);
    if (response.status === 200) {
      toast.success("Interview Deleted Successfully");
      setReload(!reload);
    }
  };

  const takeBulkAction = async () => {
    if (checkedInterviews.length === 0 || bulkOption === "Select") return;
    let path = "";
    const data = { interviews: checkedInterviews, status: 1 };
    if (bulkOption.label === "Deactive" || bulkOption.label === "Active")
      path = "/api/interview/bulkStatusUpdate/";
    if (bulkOption.label === "Active") data.status = 1;
    if (bulkOption.label === "Deactive") data.status = 2;
    else if (bulkOption.label === "Delete") path = "/api/interview/bulkDelete/";
    const response = await createPutRequest(data, path);
    if (response.status === 200) {
      setReload(!reload);
      toast.success("Interview " + `${bulkOption.label}d Successfully`);
      setBulkOption({ label: "Select", value: 0 });
    }
  };
  const handleViewClick = (interviewId) => {
    navigate(`/portal/applicationtrackingsystem/interview/${interviewId}`);
  };

  return (
    <>
     {" "}
      <CenteredContainer>
        <div>
          <CardsContainer>
            <InfoBox
              icon={BiUser}
              iconColor="#512da8"
              data={infoBoxData.totalPosts}
              text="Total Posts"
            />
            <InfoBox
              icon={FiUserCheck}
              iconColor="#2ac779"
              data={infoBoxData.activePosts}
              text="Active Posts"
            />

            <InfoBox
              icon={FiUserPlus}
              iconColor="#d32f2f"
              data={infoBoxData.InActivePosts}
              text="Inactive Posts"
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
                        onClick={() => handleCheckChange(option, selectedCheck, setSelectedCheck)}
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
                  <span style={{ whiteSpace: "nowrap" }}>Schedule</span>
                </AddEmployeeButton>
              </AddEmployeeContainer>
            </HeadingAndSearchContainer>

            {/* <EmployeeTable
            checkedInterviews={checkedInterviews}
            setCheckedInterviews={setCheckedInterviews}
  loading={loading}
  data={interviews}
  columns={[    
    { label: 'User', field: 'EmployeeInfo' },
    { label: 'Employee Code', field: '_id' },
    { label: 'Last Login', field: 'lastLogin' },
    { label: 'Status', field: 'status' },
    { label: 'Actions', field: 'actions' },
  ]}

   setCheckedItems={setCheckedInterviews}
  renderRow={(interview, columns) => (
    <React.Fragment key={interview._id}>
      
      {columns.map((column) => (
        <Td key={column.field}>
          {selectedCheck.includes(column.label) && (
            <>
              {column.field === 'EmployeeInfo' ? (
                <EmployeeInfo interview={interview} />
              ) : column.field === '_id' ? (
                interview._id
              ) : column.field === 'lastLogin' ? (
                (interview.lastLogin &&
                  new Date(interview.lastLogin).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })) ||
                'Resend Invite'
              ) : column.field === 'status' ? (
                interview.status === 1 ? (
                  <SuccessBadge>Active</SuccessBadge>
                ) : interview.status === 2 ? (
                  <DangerBadge>Inactive</DangerBadge>
                ) : (
                  <DangerBadge>Deleted</DangerBadge>
                )
              ) : (
                column.field === 'actions' && (
                  <IconWrapper>
                    <MdIcons.MdOutlineModeEditOutline
                      onClick={() => {
                        setFormData(interview);
                        setShowForm(true);
                        setIsEditMode(!!interview);
                      }}
                      style={{ fontSize: '18px' }}
                    />
                    <GrIcons.GrFormView
                      style={{
                        fontSize: '18px',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        dispatch(setErrorModal({message: "Employee View is disabled by Admin"}));
                      }}
                    />
                    <MdIcons.MdDeleteOutline
                      style={{
                        fontSize: '18px',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        dispatch(setErrorModal({message: "Do you want to delete this interview?", handleYes: () => {
                          deleteInterview(interview._id);
                        }}));
                      }}
                    />
                  </IconWrapper>
                )
              )}
            </>
          )}
        </Td>
      ))}
    </React.Fragment>
  )}
  keyField="_id"
/> */}


            <TableContainer>
               <Table>
                <thead>
                  <Tr>
                    <Th>
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked)
                            setCheckedInterviews(
                              interviews.map((interview) => interview._id)
                            );
                          else setCheckedInterviews([]);
                        }}
                      />
                    </Th>
                    {selectedCheck.includes("Candidate") && <Th>CANDIDATE</Th>}
                    
                    {selectedCheck.includes("Interview Name") && (
                      <Th>INTERVIEW NAME</Th>
                    )}

                    {selectedCheck.includes("From") && (
                      <Th>FROM</Th>
                    )}
                    {selectedCheck.includes("To") && (
                      <Th>To</Th>
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
                    interviews &&
                    interviews.map((interview) => (
                      <Tr key={interview._id}>
                        <Td>
                          {" "}
                          <input
                            type="checkbox"
                            checked={checkedInterviews.includes(interview._id)}
                            onChange={() => {
                              if (!checkedInterviews.includes(interview._id))
                                setCheckedInterviews([
                                  ...checkedInterviews,
                                  interview._id,
                                ]);
                              else
                                setCheckedInterviews(
                                  checkedInterviews.filter(
                                    (checkedInterviews) =>
                                      checkedInterviews !== interview._id
                                  )
                                );
                            }}
                          />
                        </Td>
                        

                        {selectedCheck.includes("Candidate") && (
                          <Td>{interview.candidate}</Td>
                        )}
                        {selectedCheck.includes("Interview Name") && (
                          <Td>{interview.interviewName}</Td>
                        )}
      
                        {selectedCheck.includes("From") && (
                          <Td>
                            {(interview.from &&
                              new Date(interview.from).toLocaleString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )) ||
                              "-"}
                          </Td>
                        )}
                        {selectedCheck.includes("To") && (
                          <Td>
                            {(interview.to &&
                              new Date(interview.to).toLocaleString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )) ||
                              "Resend Invite"}
                          </Td>
                        )}
                       
                        {selectedCheck.includes("Actions") && (
                          <Td>
                            <IconWrapper>
                              <MdIcons.MdOutlineModeEditOutline
                                onClick={() => {
                                  setFormData(interview);
                                  setShowForm(true);
                                  setIsEditMode(!!interview);
                                }}
                                style={{ fontSize: "18px" }}
                              />
                            </IconWrapper>

                            <GrIcons.GrFormView
                              style={{ fontSize: "18px", cursor: "pointer" }}
                              onClick={() => handleViewClick(interview.Id)}
                            />

                            <MdIcons.MdDeleteOutline
                              style={{ fontSize: "18px", cursor: "pointer" }}
                              onClick={() => {
                                dispatch(setErrorModal({message: "Do you want to delete this interview?", handleYes: () => {
                                  deleteInterview(interview._id);
                                }}));
                              }}
                            />
                          </Td>
                        )}
                      </Tr>
                    ))
                  )}
                  {!loading && (!interviews || interviews.length === 0) && (
                    <tr>
                      <td colSpan="6">No Data to Show</td>
                    </tr>
                  )}
                </tbody>
              </Table> 
            </TableContainer>

            {interviews.length !== 0 && totalPages >= 1 && (
              <PageBar
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </BoxContainer>
        </div>
        <hr />
      </CenteredContainer>
      {showForm && (
        <MultiStepForm
          showForm={showForm}
          setShowForm={setShowForm}
          formData={formData}
          setFormData={setFormData}
          reload={reload}
          setReload={setReload}
          isEditMode={isEditMode}
          onEditClick={handleEditClick}
        />
      )}
    </>
  );
};

export default Interview_list;
