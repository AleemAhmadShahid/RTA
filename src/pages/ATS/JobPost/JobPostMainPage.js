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

const JobPost_list = () => {
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

  const [checkedJobPosts, setCheckedJobPosts] = useState([]);
  const [jobPosts, setJobPosts] = useState([]);
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
        const data = await createGetRequest("/api/jobPost", params);
      
        if (data.status === 400) {
          setJobPosts([]);
          return;
        }
        setJobPosts(data.jobPosts);
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

  const handleEditClick = (jobPost) => {
    setFormData(jobPost);
    setShowForm(true);
    setIsEditMode(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setIsEditMode(false);
  };


  const [selectedCheck, setSelectedCheck] = useState([
    "Title",,
    "Department",
    "Date Opened",
    "Hiring Manager",
    "Status",
    "Actions",
  ]);
  const CheckOptions = [
    "Title",,
    "Department",
    "Role",
    "Date Opened",
    "Target Date",
    "Number of Positions",
    "Hiring Manager",
    "Status",
    "Actions",
  ];

  const [Export, setExport] = useState({
    label: "Export",
    icon: <FaPrint />,
  });

  const deleteJobPost = async (id) => {
    const response = await createDeleteRequest(`/api/jobPost/${id}/`);
    if (response.status === 200) {
      toast.success("Job Post Deleted Successfully");
      setReload(!reload);
    }
  };

  const takeBulkAction = async () => {
    if (checkedJobPosts.length === 0 || bulkOption === "Select") return;
    let path = "";
    const data = { jobPosts: checkedJobPosts, status: 1 };
    if (bulkOption.label === "Deactive" || bulkOption.label === "Active")
      path = "/api/jobPost/bulkStatusUpdate/";
    if (bulkOption.label === "Active") data.status = 1;
    if (bulkOption.label === "Deactive") data.status = 2;
    else if (bulkOption.label === "Delete") path = "/api/jobPost/bulkDelete/";
    const response = await createPutRequest(data, path);
    if (response.status === 200) {
      setReload(!reload);
      toast.success("Job Post " + `${bulkOption.label}d Successfully`);
      setBulkOption({ label: "Select", value: 0 });
    }
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
                  <span style={{ whiteSpace: "nowrap" }}>Post Job</span>
                </AddEmployeeButton>
              </AddEmployeeContainer>
            </HeadingAndSearchContainer>

            {/* <EmployeeTable
            checkedJobPosts={checkedJobPosts}
            setCheckedJobPosts={setCheckedJobPosts}
  loading={loading}
  data={jobPosts}
  columns={[    
    { label: 'User', field: 'EmployeeInfo' },
    { label: 'Employee Code', field: '_id' },
    { label: 'Last Login', field: 'lastLogin' },
    { label: 'Status', field: 'status' },
    { label: 'Actions', field: 'actions' },
  ]}

   setCheckedItems={setCheckedJobPosts}
  renderRow={(jobPost, columns) => (
    <React.Fragment key={jobPost._id}>
      
      {columns.map((column) => (
        <Td key={column.field}>
          {selectedCheck.includes(column.label) && (
            <>
              {column.field === 'EmployeeInfo' ? (
                <EmployeeInfo jobPost={jobPost} />
              ) : column.field === '_id' ? (
                jobPost._id
              ) : column.field === 'lastLogin' ? (
                (jobPost.lastLogin &&
                  new Date(jobPost.lastLogin).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })) ||
                'Resend Invite'
              ) : column.field === 'status' ? (
                jobPost.status === 1 ? (
                  <SuccessBadge>Active</SuccessBadge>
                ) : jobPost.status === 2 ? (
                  <DangerBadge>Inactive</DangerBadge>
                ) : (
                  <DangerBadge>Deleted</DangerBadge>
                )
              ) : (
                column.field === 'actions' && (
                  <IconWrapper>
                    <MdIcons.MdOutlineModeEditOutline
                      onClick={() => {
                        setFormData(jobPost);
                        setShowForm(true);
                        setIsEditMode(!!jobPost);
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
                        dispatch(setErrorModal({message: "Do you want to delete this jobPost?", handleYes: () => {
                          deleteJobPost(jobPost._id);
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
                            setCheckedJobPosts(
                              jobPosts.map((jobPost) => jobPost._id)
                            );
                          else setCheckedJobPosts([]);
                        }}
                      />
                    </Th>
                    {selectedCheck.includes("Title") && <Th>TITLE</Th>}
                    
                    {selectedCheck.includes("Department") && (
                      <Th>DEPARTMENT</Th>
                    )}

                    {selectedCheck.includes("Role") && (
                      <Th>ROLE</Th>
                    )}
                    {selectedCheck.includes("Date Opened") && (
                      <Th>DATE OPENED</Th>
                    )}
                    {selectedCheck.includes("Target Date") && (
                      <Th>TARGET DATE</Th>
                    )}
                    {selectedCheck.includes("Number of Positions") && (
                      <Th>NUMBER OF POSITIONS</Th>
                    )}
                    
                    {selectedCheck.includes("Hiring Manager") && <Th>HIRING MANAGER</Th>}
                    {selectedCheck.includes("Status") && <Th>Status</Th>}
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
                    jobPosts &&
                    jobPosts.map((jobPost) => (
                      <Tr key={jobPost._id}>
                        <Td>
                          {" "}
                          <input
                            type="checkbox"
                            checked={checkedJobPosts.includes(jobPost._id)}
                            onChange={() => {
                              if (!checkedJobPosts.includes(jobPost._id))
                                setCheckedJobPosts([
                                  ...checkedJobPosts,
                                  jobPost._id,
                                ]);
                              else
                                setCheckedJobPosts(
                                  checkedJobPosts.filter(
                                    (checkedJobPosts) =>
                                      checkedJobPosts !== jobPost._id
                                  )
                                );
                            }}
                          />
                        </Td>
                        

                        {selectedCheck.includes("Title") && (
                          <Td>{jobPost.postingTitle}</Td>
                        )}
                        {selectedCheck.includes("Department") && (
                          <Td>{jobPost.departmentName}</Td>
                        )}
                        {selectedCheck.includes("Role") && (
                          <Td>{jobPost.role}</Td>
                        )}
                        {selectedCheck.includes("Date Opened") && (
                          <Td>
                            {(jobPost.dateOpened &&
                              new Date(jobPost.dateOpened).toLocaleString(
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
                        {selectedCheck.includes("Target Date") && (
                          <Td>
                            {(jobPost.targetDate &&
                              new Date(jobPost.targetDate).toLocaleString(
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
                        {selectedCheck.includes("Number of Positions") && (
                          <Td>{jobPost.numberOfPositions}</Td>
                        )}
                       
                        {selectedCheck.includes("Hiring Manager") && (
                          <Td>
                            <EmployeeInfo employee={jobPost.hiringManager} />
                          </Td>
                        )}
                        {selectedCheck.includes("Status") && (
                          <Td>{jobPost.status}</Td>
                        )}
                        {selectedCheck.includes("Actions") && (
                          <Td>
                            <IconWrapper>
                              <MdIcons.MdOutlineModeEditOutline
                                onClick={() => {
                                  setFormData(jobPost);
                                  setShowForm(true);
                                  setIsEditMode(!!jobPost);
                                }}
                                style={{ fontSize: "18px" }}
                              />
                            </IconWrapper>

                            <GrIcons.GrFormView
                              style={{ fontSize: "18px", cursor: "pointer" }}
                              onClick={() => {
                                dispatch(setErrorModal({message: "Job Post View is disabled by Admin"}));
                              }}
                            />

                            <MdIcons.MdDeleteOutline
                              style={{ fontSize: "18px", cursor: "pointer" }}
                              onClick={() => {
                                dispatch(setErrorModal({message: "Do you want to delete this job post?", handleYes: () => {
                                  deleteJobPost(jobPost._id);
                                }}));
                              }}
                            />
                          </Td>
                        )}
                      </Tr>
                    ))
                  )}
                  {!loading && (!jobPosts || jobPosts.length === 0) && (
                    <tr>
                      <td colSpan="6">No Data to Show</td>
                    </tr>
                  )}
                </tbody>
              </Table> 
            </TableContainer>

            {jobPosts.length !== 0 && totalPages >= 1 && (
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

export default JobPost_list;
