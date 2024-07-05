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
// import { useNavigate } from "react-router-dom";
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
import CandidateTable from "../../../components/CandidateTable";

const Candidate_list = () => {
  const dispatch = useDispatch();

  const handleViewClick = (candidateId) => {
    navigate(`/portal/applicationtrackingsystem/candidate/${candidateId}`);
  };
  const bulkOptions = [
    { value: {}, label: "Select" },
    { value: 1, label: "Active" },
    { value: 2, label: "Deactive" },
    { value: 3, label: "Delete" },
  ];
  
  const statusOptions = [
    { value: {}, label: "Select" },
    { value: 1, label: "Active" },
    { value: 2, label: "Inactive" },
  ];

  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);

  const [checkedCandidates, setCheckedCandidate] = useState([]);
  const [candidates, setCandidates] = useState([]);
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
  const [jobPost, setJobPost] = useState({ value: {}, label: "Select" });
  const [jobPostOptions, setJobPostOptions] = useState({
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
    if (typeof jobPost.value !== "object") params.jobPost = jobPost.value;

    setLoading(true);

    const fetchData = async () => {
      try {
        const data = await createGetRequest("/api/candidate", params);
        console.log(data);
        if (data.status === 404) {
          setCandidates([]);
          setLoading(false);
          return;
        }
        setCandidates(data.candidates);
        setTotalPages(data.totalPages);
        setInfoBoxData(data.analytics);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      try {
        const data = await createGetRequest("/api/jobPost");
        if (data.status === 200) {
          const jobPosts = data.jobPosts.map((jobPost) => ({
            label: jobPost.postingTitle,
            value: jobPost._id,
          }));
          setJobPostOptions([{ value: {}, label: "Select" }, ...jobPosts]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentPage, entriesToShow, searchTerm, status, jobPost, reload, navigate]);

  const handleEditClick = (candidate) => {
    setFormData(candidate);
    setShowForm(true);
    setIsEditMode(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setIsEditMode(false);
  };


  const [selectedCheck, setSelectedCheck] = useState([
    "Candidate",
    "Job Post",
    "Experience",
    "Status",
    "Actions",
  ]);
  const CheckOptions = [
    "Candidate",
    "Job Post",
    "Experience",
    "Status",
    "Actions",
  ];

  const [Export, setExport] = useState({
    label: "Export",
    icon: <FaPrint />,
  });

  const deleteCandidate = async (id) => {
    const response = await createDeleteRequest(`/api/candidate/${id}/`);
    if (response.status === 200) {
      toast.success("Candidate Deleted Successfully");
      setReload(!reload);
    }
  };

  const takeBulkAction = async () => {
    if (checkedCandidates.length === 0 || bulkOption === "Select") return;
    let path = "";
    const data = { candidates: checkedCandidates, status: 1 };
    if (bulkOption.label === "Deactive" || bulkOption.label === "Active")
      path = "/api/candidate/bulkStatusUpdate/";
    if (bulkOption.label === "Active") data.status = 1;
    if (bulkOption.label === "Deactive") data.status = 2;
    else if (bulkOption.label === "Delete") path = "/api/candidate/bulkDelete/";
    const response = await createPutRequest(data, path);
    if (response.status === 200) {
      setReload(!reload);
      toast.success("Candidate " + `${bulkOption.label}d Successfully`);
      setBulkOption({ label: "Select", value: 0 });
    }
  };

  return (
    <>
     {" "}
      <CenteredContainer>
        <div>
          <CardsContainer>
            {/* <InfoBox
              icon={BiUser}
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
            /> */}
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
                options={jobPostOptions}
                onValueChange={(selectedOption) => setJobPost(selectedOption)}
                selectedValue={jobPost}
                title="Job Post"
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
                  <span style={{ whiteSpace: "nowrap" }}>Add Candidate</span>
                </AddEmployeeButton>
              </AddEmployeeContainer>
            </HeadingAndSearchContainer>

            {/* <EmployeeTable
            checkedCandidates={checkedCandidates}
            setCheckedCandidate={setCheckedCandidate}
  loading={loading}
  data={candidates}
  columns={[    
    { label: 'User', field: 'EmployeeInfo' },
    { label: 'Employee Code', field: '_id' },
    { label: 'Last Login', field: 'lastLogin' },
    { label: 'Status', field: 'status' },
    { label: 'Actions', field: 'actions' },
  ]}

   setCheckedItems={setCheckedCandidate}
  renderRow={(candidate, columns) => (
    <React.Fragment key={candidate._id}>
      
      {columns.map((column) => (
        <Td key={column.field}>
          {selectedCheck.includes(column.label) && (
            <>
              {column.field === 'EmployeeInfo' ? (
                <EmployeeInfo candidate={candidate} />
              ) : column.field === '_id' ? (
                candidate._id
              ) : column.field === 'lastLogin' ? (
                (candidate.lastLogin &&
                  new Date(candidate.lastLogin).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })) ||
                'Resend Invite'
              ) : column.field === 'status' ? (
                candidate.status === 1 ? (
                  <SuccessBadge>Active</SuccessBadge>
                ) : candidate.status === 2 ? (
                  <DangerBadge>Inactive</DangerBadge>
                ) : (
                  <DangerBadge>Deleted</DangerBadge>
                )
              ) : (
                column.field === 'actions' && (
                  <IconWrapper>
                    <MdIcons.MdOutlineModeEditOutline
                      onClick={() => {
                        setFormData(candidate);
                        setShowForm(true);
                        setIsEditMode(!!candidate);
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
                        dispatch(setErrorModal({message: "Do you want to delete this candidate?", handleYes: () => {
                          deleteCandidate(candidate._id);
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
                            setCheckedCandidate(
                              candidates.map((candidate) => candidate._id)
                            );
                          else setCheckedCandidate([]);
                        }}
                      />
                    </Th>
                    {selectedCheck.includes("Candidate") && <Th>CANDIDATE</Th>}

                    {selectedCheck.includes("Job Post") && <Th>JOB POST</Th>}
                    {selectedCheck.includes("Experience") && <Th>EXPERIENCE (IN YEARS)</Th>}
                   
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
                    candidates &&
                    candidates.map((candidate) => (
                      <Tr key={candidate._id}>
                        <Td>
                          {" "}
                          <input
                            type="checkbox"
                            checked={checkedCandidates.includes(candidate._id)}
                            onChange={() => {
                              if (!checkedCandidates.includes(candidate._id))
                                setCheckedCandidate([
                                  ...checkedCandidates,
                                  candidate._id,
                                ]);
                              else
                                setCheckedCandidate(
                                  checkedCandidates.filter(
                                    (checkedCandidate) =>
                                      checkedCandidate !== candidate._id
                                  )
                                );
                            }}
                          />
                        </Td>
                        {selectedCheck.includes("Candidate") && (
                          <Td>
                            <EmployeeInfo employee={candidate} />
                          </Td>
                        )}
                        
                        {selectedCheck.includes("Job Post") && (
                          <Td>
                            {candidate?.jobPostDetail?.postingTitle}
                          </Td>
                        )}

                        {selectedCheck.includes("Experience") && (
                          <Td>
                            {candidate.experience.reduce((totalExperience, job) => {
                              const startDate = new Date(job.startDate);
                              const endDate = job.current ? new Date() : new Date(job.endDate);
                              const experienceInMilliseconds = endDate - startDate;
                              const experienceInYears = experienceInMilliseconds / (1000 * 60 * 60 * 24 * 365); // milliseconds in a year
                              return totalExperience + experienceInYears;
                            }, 0).toFixed(2)} years
                          </Td>
                        )}



                        
                        {selectedCheck.includes("Status") && (
                          <Td>
                            {candidate.status === 1 ? (
                              <SuccessBadge>Active</SuccessBadge>
                            ) : candidate.status === 2 ? (
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
                                  setFormData(candidate);
                                  setShowForm(true);
                                  setIsEditMode(!!candidate);
                                }}
                                style={{ fontSize: "18px" }}
                              />
                            </IconWrapper>

                            <GrIcons.GrFormView
                              style={{ fontSize: "18px", cursor: "pointer" }}
                              onClick={() => handleViewClick(candidate.Id)
                                // dispatch(setErrorModal({message: "Candidate View is disabled by Admin"}));'
                                // navigate("/portal/applicationtrackingsystem//${candidate._id}")
                              }
                            />

                            <MdIcons.MdDeleteOutline
                              style={{ fontSize: "18px", cursor: "pointer" }}
                              onClick={() => {
                                dispatch(setErrorModal({message: "Do you want to delete this candidate?", handleYes: () => {
                                  deleteCandidate(candidate._id);
                                }}));
                              }}
                            />
                          </Td>
                        )}
                      </Tr>
                    ))
                  )}
                  {!loading && (!candidates || candidates.length === 0) && (
                    <tr>
                      <td colSpan="6">No Data to Show</td>
                    </tr>
                  )}
                </tbody>
              </Table> 
            </TableContainer>

            {candidates.length !== 0 && totalPages >= 1 && (
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

export default Candidate_list;
