import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { CenteredContainer } from "../styles/TableStyling";
import { CenteredContainer } from "../styles/TableStyling";
// import { BoxContainer} from "./EmpProfileMainPage";
// import { useNavigate } from "react-router-dom";
import { LeftColumn, RightColumn } from "../pages/EmpSetting";
import { Box } from "./RemoteTrackingTable";
import { DashBoardCompBox } from "../pages/PayM/PayMDashBoard";
import CandidateTable from "./CandidateTable";
import { BackIcon } from "./EmpProfileMainPage";
import { IoMdArrowBack } from "react-icons/io";
import LoaderComponent from "./Loader";

// import { useDispatch } from 'react-redux';
import {
  createGetRequest,
  createDeleteRequest,
  createPutRequest,
} from "../global/requests";
import { handleCheckChange } from "../global/helper";
import { useNavigate } from "react-router-dom";
import InfoBox from "./Cards";
import PageBar from "./PageBar";
//   import PageBar from "./PageBar";
import FilterBox from "./FilterBox";
import { BiUser } from "react-icons/bi";
import { FiUserPlus, FiUserCheck, FiUserX } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
import EmployeeInfo from "./EmployeeInfo";

import * as MdIcons from "react-icons/md";
import * as GrIcons from "react-icons/gr";

import { FaPrint } from "react-icons/fa";
//   import { Td } from "../styles/TableStyling";
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
  // ColumnContainer,
  CardsContainer,
  FilterOuterBox,
  FilterContainer,
  IconWrapper,
  EntriesDropdown,
  StyledSearchBar,
  dropDownStyle,
} from "../styles/TableStyling";
import { ColumnContainer } from "../pages/EmpSetting";

//   import EmployeeTable from "../../../components/Table";

import { entriesOptions, exportOptions } from "../global/constants";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { setErrorModal } from "../redux/modalSlice";
import Candidate_list from "../pages/ATS/Candidate/CandidateMainPage";

const GreyHeading = styled.span`
  font-weight: 500;
  color: grey;
  flex: 0 0 40%;
  font-size: 14px;
`;

const Details = styled.div`
  margin-bottom: 10px;
  font-weight: 600;

  display: flex;
  align-items: center;
`;
const TextWithLine = styled.span`
  flex: 1;
  font-size: 14px;
  border-bottom: 0.5px solid #ededed;
`;


const OfferComp=()=>{
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

  const [checkedOffers, setCheckedOffers] = useState([]);
  const [offers, setOffers] = useState([]);
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
        const data = await createGetRequest("/api/offer", params);
      
        if (data.status === 400) {
          setOffers([]);
          return;
        }
        setOffers(data.offers);
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

  const handleEditClick = (offer) => {
    setFormData(offer);
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
    "Department",
    "Expected Joining Date",
    "Compensation Amount",
    "Actions",
  ]);
  const CheckOptions = [
    "Candidate",
    "Job Post",
    "Department",
    "Expected Joining Date",
    "Compensation Amount",
    "Actions",
  ];

  const [Export, setExport] = useState({
    label: "Export",
    icon: <FaPrint />,
  });

  const deleteOffer = async (id) => {
    const response = await createDeleteRequest(`/api/offer/${id}/`);
    if (response.status === 200) {
      toast.success("Offer Deleted Successfully");
      setReload(!reload);
    }
  };

  const takeBulkAction = async () => {
    if (checkedOffers.length === 0 || bulkOption === "Select") return;
    let path = "";
    const data = { offers: checkedOffers, status: 1 };
    if (bulkOption.label === "Deactive" || bulkOption.label === "Active")
      path = "/api/offer/bulkStatusUpdate/";
    if (bulkOption.label === "Active") data.status = 1;
    if (bulkOption.label === "Deactive") data.status = 2;
    else if (bulkOption.label === "Delete") path = "/api/offer/bulkDelete/";
    const response = await createPutRequest(data, path);
    if (response.status === 200) {
      setReload(!reload);
      toast.success("Offer " + `${bulkOption.label}d Successfully`);
      setBulkOption({ label: "Select", value: 0 });
    }
  };

    return(
        <>
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
                            setCheckedOffers(
                              offers.map((offer) => offer._id)
                            );
                          else setCheckedOffers([]);
                        }}
                      />
                    </Th>
                    {selectedCheck.includes("Candidate") && <Th>CANDIDATE</Th>}
                    
                    {selectedCheck.includes("Job Post") && (
                      <Th>JOB POST</Th>
                    )}

                    {selectedCheck.includes("Department") && (
                      <Th>DEPARTMENT</Th>
                    )}
                    {selectedCheck.includes("Expected Joining Date") && (
                      <Th>EXPECTED JOINING DATE</Th>
                    )}

                    {selectedCheck.includes("Compensation Amount") && (
                      <Th>COMPENSATION AMOUNT</Th>
                    )}

                   
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
                    offers &&
                    offers.map((offer) => (
                      <Tr key={offer._id}>
                        <Td>
                          {" "}
                          <input
                            type="checkbox"
                            checked={checkedOffers.includes(offer._id)}
                            onChange={() => {
                              if (!checkedOffers.includes(offer._id))
                                setCheckedOffers([
                                  ...checkedOffers,
                                  offer._id,
                                ]);
                              else
                                setCheckedOffers(
                                  checkedOffers.filter(
                                    (checkedOffers) =>
                                      checkedOffers !== offer._id
                                  )
                                );
                            }}
                          />
                        </Td>
                        

                        {selectedCheck.includes("Candidate") && (
                          <Td>{offer.candidateDetail.name}</Td>
                        )}

                        {selectedCheck.includes("Job Post") && (
                          <Td>{offer?.jobPostDetail?.postingTitle}</Td>
                        )}

                        {selectedCheck.includes("Department") && (
                          <Td>{offer?.departmentDetail.name}</Td>
                        )}
      
                        {selectedCheck.includes("Expected Joining Date") && (
                          <Td>
                            {(offer.expectedJoiningDate &&
                              new Date(offer.expectedJoiningDate).toLocaleString(
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

                        {selectedCheck.includes("Compensation Amount") && (
                          <Td>{offer.compensationAmount}</Td>
                        )}
                        
                       
                        
                      </Tr>
                    ))
                  )}
                  {!loading && (!offers || offers.length === 0) && (
                    <tr>
                      <td colSpan="6">No Data to Show</td>
                    </tr>
                  )}
                </tbody>
              </Table> 
            </TableContainer>

            {offers.length !== 0 && totalPages >= 1 && (
              <PageBar
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
            <JobInfo   offers={offers}/>
        </>
    );

}
const InterviewComp=()=>{
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
    return(
        <>
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

<JobInfo interview={interviews}/></>
    )
};
const JobInfo = (display=true,interview,offer,candidate) => {
  //for candidate Table
  const dispatch = useDispatch();
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
  }, [
    currentPage,
    entriesToShow,
    searchTerm,
    status,
    jobPost,
    reload,
    navigate,
  ]);

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
const handleViewClick = (candidateId) => {
      // navigate(`/portal/applicationtrackingsystem/${candidateId}`);
    };
  const deleteCandidate = async (id) => {
    const response = await createDeleteRequest(`/api/candidate/${id}/`);
    if (response.status === 200) {
      toast.success("Candidate Deleted Successfully");
      setReload(!reload);
    }
    
    ////
  }
   ;
    return (
      <CenteredContainer>
        <BackIcon
          style={{ background: "orange" }}
          onClick={() =>
            navigate(`/portal/applicationtrackingsystem/jobPosting`)
          }
        >
          {" "}
          <IoMdArrowBack />
        </BackIcon>
        <DashBoardCompBox style={{ padding: "20px" }}>
          <h5 style={{ fontWeight: "bold", marginLeft: "30px" }}>
            Job Opening Information
          </h5>
          <ColumnContainer style={{ padding: "40px" }}>
          <LeftColumn>
          <Details>
              <GreyHeading>Posting Title:</GreyHeading>
              <TextWithLine>{offer?.jobPostDetail?.postingTitle}</TextWithLine>
            </Details>
            <Details>
              <GreyHeading>Number of Positions:</GreyHeading>
              <TextWithLine>{jobPost.numberOfPositions || "N/A"}</TextWithLine>
            </Details>
            <Details>
              <GreyHeading>Assigned Recruiters:</GreyHeading>
              <TextWithLine>{candidates.map(c => c.name).join(', ') || "N/A"}</TextWithLine>
            </Details>
            <Details>
              <GreyHeading>Target Date:</GreyHeading>
              <TextWithLine>{jobPost.targetDate || "N/A"}</TextWithLine>
            </Details>
            <Details>
              <GreyHeading>Job Opening Status:</GreyHeading>
              <TextWithLine>{jobPost.status || "N/A"}</TextWithLine>
            </Details>
            <Details>
              <GreyHeading>Industry:</GreyHeading>
              <TextWithLine>{jobPost.industry || "N/A"}</TextWithLine>
            </Details>
            <Details>
              <GreyHeading>Salary:</GreyHeading>
              <TextWithLine>{jobPost.salary || "N/A"}</TextWithLine>
            </Details>
          </LeftColumn>
          <RightColumn>
            <Details>
              <GreyHeading>Job Opening ID:</GreyHeading>
              <TextWithLine>{jobPost._id || "N/A"}</TextWithLine>
            </Details>
            <Details>
              <GreyHeading>Department Name:</GreyHeading>
              <TextWithLine>{jobPost.departmentName || "N/A"}</TextWithLine>
            </Details>
            <Details>
              <GreyHeading>Hiring Manager:</GreyHeading>
              <TextWithLine>{jobPost.hiringManager || "N/A"}</TextWithLine>
            </Details>
            <Details>
              <GreyHeading>Date Opened:</GreyHeading>
              <TextWithLine> {(interview.to &&
                        new Date(interview.to).toLocaleString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )) ||
                        "Resend Invite"}</TextWithLine>
            </Details>
            <Details>
              <GreyHeading>Job Type:</GreyHeading>
              <TextWithLine>{jobPost.jobType || "N/A"}</TextWithLine>
            </Details>
            <Details>
              <GreyHeading>Work Experience:</GreyHeading>
              <TextWithLine>{jobPost.workExperience || "N/A"}</TextWithLine>
            </Details>
            <Details>
              <GreyHeading>Modified By:</GreyHeading>
              <TextWithLine>{jobPost.modifiedBy || "N/A"}</TextWithLine>
            </Details>
          </RightColumn>
          </ColumnContainer>
        </DashBoardCompBox>
        {display && (
            <>
        <DashBoardCompBox>
          <h5 style={{ fontWeight: "bold", marginLeft: "30px" }}>Offer</h5>
          <OfferComp/>
        </DashBoardCompBox>
        <DashBoardCompBox>
          <h5 style={{ fontWeight: "bold", marginLeft: "30px" }}>Interview</h5>
          <InterviewComp/>
          </DashBoardCompBox>
        
        <DashBoardCompBox>
          <h5 style={{ fontWeight: "bold", marginLeft: "30px" }}>Candidate</h5>
          
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
                        onClick={() =>
                          handleCheckChange(
                            option,
                            selectedCheck,
                            setSelectedCheck
                          )
                        }
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
                {/* <AddEmployeeButton
                  onClick={toggleForm}
                  className="btn btn-primary mb-2"
                >
                  <span style={{ whiteSpace: "nowrap" }}>Add Candidate</span>
                </AddEmployeeButton> */}
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
                            setCheckedCandidate(
                              candidates.map((candidate) => candidate._id)
                            );
                          else setCheckedCandidate([]);
                        }}
                      />
                    </Th>
                    {selectedCheck.includes("Candidate") && <Th>CANDIDATE</Th>}

                    {selectedCheck.includes("Job Post") && <Th>JOB POST</Th>}
                    {selectedCheck.includes("Experience") && (
                      <Th>EXPERIENCE (IN YEARS)</Th>
                    )}

                    {selectedCheck.includes("Status") && <Th>STATUS</Th>}
                    {/* {selectedCheck.includes("Actions") && <Th>ACTION</Th>} */}
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
                          <Td>{candidate?.jobPostDetail?.postingTitle}</Td>
                        )}

                        {selectedCheck.includes("Experience") && (
                          <Td>
                            {candidate.experience
                              .reduce((totalExperience, job) => {
                                const startDate = new Date(job.startDate);
                                const endDate = job.current
                                  ? new Date()
                                  : new Date(job.endDate);
                                const experienceInMilliseconds =
                                  endDate - startDate;
                                const experienceInYears =
                                  experienceInMilliseconds /
                                  (1000 * 60 * 60 * 24 * 365); // milliseconds in a year
                                return totalExperience + experienceInYears;
                              }, 0)
                              .toFixed(2)}{" "}
                            years
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
          
        </DashBoardCompBox>
        </>
    )}
      </CenteredContainer>
    );
  
};
export default JobInfo;
