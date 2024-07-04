import React, { useState, useEffect } from "react";
import MultiStepForm from "./MultiStepForm";
import LoaderComponent from "../../../components/Loader";
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
import { FiUserPlus, FiUserCheck, FiUserX } from "react-icons/fi";
import EmployeeInfo from "../../../components/EmployeeInfo";

import * as MdIcons from "react-icons/md";
import * as GrIcons from "react-icons/gr";

import { FaPrint} from "react-icons/fa";
import { FaRegCalendarXmark } from "react-icons/fa6";
import { FaRegCalendarPlus } from "react-icons/fa6";
import { LuCalendarCheck } from "react-icons/lu";
// import { FaPrint} from "react-icons/fa";


import {
  Td,
  Tr,
  Th,
  AddEmployeeContainer,
  Table,
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

import { entriesOptions, exportOptions } from "../../../global/constants"
import toast  from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {  setErrorModal } from '../../../redux/modalSlice';


const AppliedLeaves_list = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bulkOptions = [
    { value: {}, label: "Select" },
    { value: 1, label: "Delete" },
  ];


  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);

  const [checkedAppliedLeaves, setCheckedAppliedLeaves] = useState([]);
  const [appliedLeaves, setAppliedLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [reload, setReload] = useState(false);

  const [infoBoxData, setInfoBoxData] = useState({});
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [bulkOption, setBulkOption] = useState({ value: {}, label: "Select" });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = {
      page: currentPage,
      pageItems: entriesToShow,
      name: searchTerm,
    };
    if (typeof appliedLeaves.value !== "object") params.appliedLeaves = appliedLeaves.value;

    setLoading(true);

    const fetchData = async () => {
      try {
        const data = await createGetRequest("/api/leave/ess/getMyLeaves/", params);
        if (data.status === 404 || data.status === 400) {
          setAppliedLeaves([]);
          setLoading(false);
          return;
        }
        setAppliedLeaves(data.leaves);
        setInfoBoxData(data.analytics);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    };
    fetchData();
  }, [currentPage, entriesToShow, searchTerm, reload, navigate]);

  const handleEditClick = (appliedLeaves) => {
    setFormData(appliedLeaves);
    setShowForm(true);
    setIsEditMode(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setIsEditMode(false);
  };

  const [selectedCheck, setSelectedCheck] = useState([
    "User",
    "Start Date",
    "End Date",
    "Leave Type",
    "Status",
    "Actions"
  ]);
  const CheckOptions = [
    "User",
    "Start Date",
    "End Date",
    "Leave Type",
    "Status",
    "Actions"
  ];

  const [Export, setExport] = useState({
    label: "Export",
    icon: <FaPrint />,
  });

  const deleteAppliedLeaves = async (id) => {
    const response = await createDeleteRequest(`/api/appliedLeaves/${id}/`);
    if (response.status === 200) {
      setReload(!reload);
      toast.success("AppliedLeaves deleted Successfully!");
    }
  };

  const takeBulkAction = async () => {
    let path = "";
    const data = {appliedLeaves: checkedAppliedLeaves};
    if (checkedAppliedLeaves.length === 0 || bulkOption === "Select") return;
    else if (bulkOption.label === "Delete") path = "/api/appliedLeaves/bulkDelete/";
    const response = await createPutRequest(data, path);
    if (response.status === 200) {
      setReload(!reload);
      toast.success(`${bulkOption.label}d Successfully`);
      setBulkOption({ label: "Select", value: 0 });
    }
  };

  return (
    <>
      {" "}
      <CenteredContainer>
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
              icon={LuCalendarCheck}
              iconColor="#512da8"
              data={infoBoxData?.totalAppliedLeaves || 0}
              text="Total Applied Leaves"
            />
             
             <InfoBox
              icon={FaRegCalendarPlus}
              iconColor="#ffa500"
              data={infoBoxData?.vacantAppliedLeaves || 0}
              text="Vacant Applied Leaves"
            />

            <InfoBox
              icon={FaRegCalendarXmark}
              iconColor="#d32f2f"
              data={infoBoxData?.closedAppliedLeaves || 0}
              text="Closed Applied Leaves"
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
                {/* <AddEmployeeButton
                  onClick={() => { setIsViewMode(false); toggleForm();}}
                  className="btn btn-primary mb-2"
                >
                  <span style={{ whiteSpace: "nowrap" }}>Assign Leaves</span>
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
                            setCheckedAppliedLeaves(
                              appliedLeaves.map((appliedLeaves) => appliedLeaves._id)
                            );
                          else setCheckedAppliedLeaves([]);
                        }}
                      />
                    </Th>

                    {selectedCheck.includes("User") && <Th>USER</Th>}

                    {selectedCheck.includes("Start Date") && (
                      <Th>START DATE</Th>
                    )}

                   
                    {selectedCheck.includes("End Date") && (
                      <Th>END DATE</Th>
                    )}

                    {selectedCheck.includes("Leave Type") && (
                      <Th>LEAVE TYPE</Th>
                    )}

                    {selectedCheck.includes("Status") && (
                      <Th>Status</Th>
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
                    appliedLeaves &&
                    appliedLeaves.map((appliedLeaves) => (
                      <Tr key={appliedLeaves._id}>
                        <Td>
                          {" "}
                          <input
                            type="checkbox"
                            checked={checkedAppliedLeaves.includes(appliedLeaves._id)}
                            onChange={() => {
                              if (!checkedAppliedLeaves.includes(appliedLeaves._id))
                                setCheckedAppliedLeaves([
                                  ...checkedAppliedLeaves,
                                  appliedLeaves._id,
                                ]);
                              else
                                setCheckedAppliedLeaves(
                                  checkedAppliedLeaves.filter(
                                    (checkedAppliedLeaves) =>
                                      checkedAppliedLeaves !== appliedLeaves._id
                                  )
                                );
                            }}
                          />
                        </Td>
                  
              
                        {selectedCheck.includes("User") && (
                          <EmployeeInfo isSpaceRequired={true} employee={appliedLeaves?.employeeDetail }/>
                        )}

                        {selectedCheck.includes("Start Date") && (
                          <Td>
                            {(appliedLeaves?.startDate  &&
                              new Date(appliedLeaves?.startDate ).toLocaleString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "2-digit"
                                }
                              )) ||
                              "-"
                            }
                          </Td>
                        )}

                        {selectedCheck.includes("End Date") && (
                          <Td>
                            {(appliedLeaves?.endDate  &&
                              new Date(appliedLeaves?.endDate ).toLocaleString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "2-digit"
                                }
                              )) ||
                              "-"
                            }
                          </Td>
                        )}

                        {selectedCheck.includes("Leave Type") && (
                          <Td>{appliedLeaves?.leaveTypeDetail?.name}</Td>
                        )}
                       
                        {selectedCheck.includes("Status") && (
                          <Td>
                            { appliedLeaves?.status 
  
                            }
                          </Td>
                        )}
                       
                        
                       
                        {selectedCheck.includes("Actions") && (
                          <Td>
                            

                            <GrIcons.GrFormView
                             onClick={() => {
                              setFormData(appliedLeaves);
                              setIsViewMode(true);
                              toggleForm();
                            }}
                              style={{ fontSize: "18px", cursor: "pointer" }}
                            />

                           
                          </Td>
                        )}
                      </Tr>
                    ))
                  )}
                  {!loading && (!appliedLeaves || appliedLeaves.length === 0) && (
                    <tr>
                      <td colSpan="6">No Data to Show</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </TableContainer>

            {appliedLeaves.length !== 0 && totalPages >= 1 && (
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
          reload={reload}
          setReload={setReload}
          isEditMode={isEditMode}
          isViewMode={isViewMode}
          onEditClick={handleEditClick}
        />
      )}
    </>
  );
};

export default AppliedLeaves_list;
