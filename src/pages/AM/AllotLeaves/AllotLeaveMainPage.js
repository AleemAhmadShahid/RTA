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


const AllotedLeaves_list = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bulkOptions = [
    { value: {}, label: "Select" },
    { value: 1, label: "Delete" },
  ];


  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);

  const [checkedAllotedLeaves, setCheckedAllotedLeaves] = useState([]);
  const [allotedLeaves, setAllotedLeaves] = useState([]);
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
    if (typeof allotedLeaves.value !== "object") params.allotedLeaves = allotedLeaves.value;

    setLoading(true);

    const fetchData = async () => {
      try {
        const data = await createGetRequest("/api/leave/assignLeave/", params);
        console.log(data);
        if (data.status === 404 || data.status === 400) {
          setAllotedLeaves([]);
          setLoading(false);
          return;
        }
        setAllotedLeaves(data.assignedLeaves);
        setInfoBoxData(data.analytics);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    };
    fetchData();
  }, [currentPage, entriesToShow, searchTerm, reload, navigate]);

  const handleEditClick = (allotedLeaves) => {
    setFormData(allotedLeaves);
    setShowForm(true);
    setIsEditMode(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setIsEditMode(false);
  };

  const [selectedCheck, setSelectedCheck] = useState([
    "User",
    "Duration",
    "Renew At",
    "Actions",
  ]);
  const CheckOptions = [
    "User",
    "Duration",
    "Renew At",
    "Created By",
    "Actions",
  ];

  const [Export, setExport] = useState({
    label: "Export",
    icon: <FaPrint />,
  });

  const deleteAllotedLeaves = async (id) => {
    const response = await createDeleteRequest(`/api/allotedLeaves/${id}/`);
    if (response.status === 200) {
      setReload(!reload);
      toast.success("AllotedLeaves deleted Successfully!");
    }
  };

  const takeBulkAction = async () => {
    let path = "";
    const data = {allotedLeaves: checkedAllotedLeaves};
    if (checkedAllotedLeaves.length === 0 || bulkOption === "Select") return;
    else if (bulkOption.label === "Delete") path = "/api/allotedLeaves/bulkDelete/";
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
              icon={FiUserPlus}
              iconColor="#512da8"
              data={infoBoxData?.totalAllotedLeaves || 0}
              text="Total Alloted Leaves"
            />
             
             <InfoBox
              icon={FiUserX}
              iconColor="#ffa500"
              data={infoBoxData?.vacantAllotedLeaves || 0}
              text="Vacant Alloted Leaves"
            />

            <InfoBox
              icon={FiUserCheck}
              iconColor="#d32f2f"
              data={infoBoxData?.closedAllotedLeaves || 0}
              text="Closed Alloted Leaves"
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
                  onClick={() => { setIsViewMode(false); toggleForm();}}
                  className="btn btn-primary mb-2"
                >
                  <span style={{ whiteSpace: "nowrap" }}>Assign Leaves</span>
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
                            setCheckedAllotedLeaves(
                              allotedLeaves.map((allotedLeaves) => allotedLeaves._id)
                            );
                          else setCheckedAllotedLeaves([]);
                        }}
                      />
                    </Th>

                    {selectedCheck.includes("User") && <Th>USER</Th>}

                    {selectedCheck.includes("Duration") && (
                      <Th>DURATION</Th>
                    )}

                   
                    {selectedCheck.includes("Renew At") && (
                      <Th>RENEW AT</Th>
                    )}

                    {selectedCheck.includes("Created By") && (
                      <Th>Added By</Th>
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
                    allotedLeaves &&
                    allotedLeaves.map((allotedLeaves) => (
                      <Tr key={allotedLeaves._id}>
                        <Td>
                          {" "}
                          <input
                            type="checkbox"
                            checked={checkedAllotedLeaves.includes(allotedLeaves._id)}
                            onChange={() => {
                              if (!checkedAllotedLeaves.includes(allotedLeaves._id))
                                setCheckedAllotedLeaves([
                                  ...checkedAllotedLeaves,
                                  allotedLeaves._id,
                                ]);
                              else
                                setCheckedAllotedLeaves(
                                  checkedAllotedLeaves.filter(
                                    (checkedAllotedLeaves) =>
                                      checkedAllotedLeaves !== allotedLeaves._id
                                  )
                                );
                            }}
                          />
                        </Td>
                  
              
                        {selectedCheck.includes("User") && (
                          <EmployeeInfo isSpaceRequired={true} employee={allotedLeaves?.employeeDetail }/>
                        )}

                        {selectedCheck.includes("Duration") && (
                          <Td>
                            {allotedLeaves.duration}
                          </Td>
                        )}

                        {selectedCheck.includes("Renew At") && (
                          <Td>
                             {allotedLeaves.renewAt}
                          </Td>
                        )}

                       
                        {selectedCheck.includes("Created By") && (
                          <Td>
                            { allotedLeaves?.createdBy 
                              &&
                              <EmployeeInfo isSpaceRequired={true} employee={allotedLeaves?.createdBy} />
                            }
                          </Td>
                        )}
                       
                        
                       
                        {selectedCheck.includes("Actions") && (
                          <Td>
                            <IconWrapper>
                              <MdIcons.MdOutlineModeEditOutline
                                onClick={() => {
                                  setIsViewMode(false);
                                  setFormData(allotedLeaves);
                                  setShowForm(true);
                                  setIsEditMode(!!allotedLeaves);
                                }}
                                style={{ fontSize: "18px" }}
                              />
                            </IconWrapper>

                            <GrIcons.GrFormView
                             onClick={() => {
                              setFormData(allotedLeaves);
                              setIsViewMode(true);
                              toggleForm();
                            }}
                              style={{ fontSize: "18px", cursor: "pointer" }}
                            />

                            <MdIcons.MdDeleteOutline
                              style={{ fontSize: "18px", cursor: "pointer" }}
                              onClick={() => {
                                dispatch(setErrorModal({message: "Do you want to delete this allotedLeaves?", handleYes: () => {
                                  deleteAllotedLeaves(allotedLeaves._id);
                                }}));
                              }}
                            />
                          </Td>
                        )}
                      </Tr>
                    ))
                  )}
                  {!loading && (!allotedLeaves || allotedLeaves.length === 0) && (
                    <tr>
                      <td colSpan="6">No Data to Show</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </TableContainer>

            {allotedLeaves.length !== 0 && totalPages >= 1 && (
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

export default AllotedLeaves_list;
