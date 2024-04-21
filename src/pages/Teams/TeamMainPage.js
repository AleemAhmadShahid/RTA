import React, { useState, useEffect } from "react";
import MultiStepForm from "./MultiStepForm";
import LoaderComponent from "../../components/Loader";
import {
  createGetRequest,
  createDeleteRequest,
  createPutRequest,
} from "../../global/requests";
import { handleCheckChange } from "../../global/helper";
import { useNavigate } from "react-router-dom";
import InfoBox from "../../components/Cards";
import PageBar from "../../components/PageBar";
import FilterBox from "../../components/FilterBox";
import { FiUserPlus, FiUserCheck, FiUserX } from "react-icons/fi";
import EmployeeInfo from "../../components/EmployeeInfo";

import * as MdIcons from "react-icons/md";
import * as GrIcons from "react-icons/gr";

import { FaPrint} from "react-icons/fa";
import toast  from 'react-hot-toast';

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
} from "../styles/TableStyling";
import { entriesOptions, exportOptions } from "../../global/constants"
import { useDispatch } from 'react-redux';
import {  setErrorModal } from '../../redux/modalSlice';




const Team_list = ({id}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const bulkOptions = [
    { value: {}, label: "Select" },
    { value: 1, label: "Delete" },
  ];



  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);

  const [checkedTeam, setcheckedTeam] = useState([]);
  const [teams, setTeams] = useState([]);
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
        if (data.status === 404) {
          setTeams([]);
          setLoading(false);
          return;
        }
        setTeams(data.departments);
        setInfoBoxData(data.analytics);
        setTotalPages(data.totalPages);    
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    };
    fetchData();
  }, [currentPage, entriesToShow, searchTerm, status, reload, navigate]);

  const handleEditClick = (team) => {
    const updatedteam = {...team, lead: team?.lead?._id, superDepartment: team?.superDepartment?._id};
    setFormData(updatedteam);
    setShowForm(true);
    setIsEditMode(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setIsEditMode(false);
  };


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

  const [Export, setExport] = useState({
    label: "Export",
    icon: <FaPrint />,
  });

  const deleteDepartment = async (departmentId) => {
    const response = await createDeleteRequest(`/api/department/${departmentId}/`);
    if (response.status === 200) {
      toast.success(pageName[id-1].name + " deleted successfully!");
      setReload(!reload);
    }
  };

  const takeBulkAction = async () => {
    let path = "";
    const data = {teams: checkedTeam};
    if (checkedTeam.length === 0 || bulkOption === "Select") return;
    else if (bulkOption.label === "Delete") path = "/api/department/bulkDelete/";
    const response = await createPutRequest(data, path);
    if (response.status === 200) {
      setReload(!reload);
      toast.success(pageName[id-1].name + `${bulkOption.label}d Successfully`);
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
                            setcheckedTeam(
                              teams.map((team) => team._id)
                            );
                          else setcheckedTeam([]);
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
                    teams &&
                    teams.map((team) => (
                      <Tr key={team._id}>
                        <Td>
                          {" "}
                          <input
                            type="checkbox"
                            checked={checkedTeam.includes(team._id)}
                            onChange={() => {
                              if (!checkedTeam.includes(team._id))
                                setcheckedTeam([
                                  ...checkedTeam,
                                  team._id,
                                ]);
                              else
                                setcheckedTeam(
                                  checkedTeam.filter(
                                    (checkedTeam) =>
                                      checkedTeam !== team._id
                                  )
                                );
                            }}
                          />
                        </Td>

                        {selectedCheck.includes("Name") && (
                          <Td>{team.name}</Td>
                        )}

                        {selectedCheck.includes(pageName[id-1].columnName) && (
                          <Td>
                          { team?.lead 
                            &&
                            <EmployeeInfo isSpaceRequired={true} employee={team?.lead} />
                          }
                        </Td>
                        )}

                        {selectedCheck.includes("Supervising Department") && (
                          <Td>{team?.superDepartment?.name}</Td>
                        )}
                       
                        {selectedCheck.includes("Created By") && (
                          <Td>
                            { team?.createdBy 
                              &&
                              <EmployeeInfo isSpaceRequired={true} employee={team?.createdBy} />
                            }
                          </Td>
                        )}
                       
                        
                       
                        {selectedCheck.includes("Actions") && (
                          <Td>
                            <IconWrapper>
                              <MdIcons.MdOutlineModeEditOutline
                                onClick={() => {
                                  setIsViewMode(false);
                                  const updatedteam = {...team, lead: team?.lead?._id, superDepartment: team?.superDepartment?._id};
                                  setFormData(updatedteam);
                                  setShowForm(true);
                                  setIsEditMode(!!team);
                                }}
                                style={{ fontSize: "18px" }}
                              />
                            </IconWrapper>

                            <GrIcons.GrFormView
                             onClick={() => {
                              setFormData(team);
                              setIsViewMode(true);
                              toggleForm();
                            }}
                              style={{ fontSize: "18px", cursor: "pointer" }}
                            />

                            <MdIcons.MdDeleteOutline
                              style={{ fontSize: "18px", cursor: "pointer" }}
                              onClick={() => {
                                dispatch(setErrorModal({message:  `Do you want to delete this ${pageName[id-1].name.toLowerCase()}?`, handleYes: () => {
                                  deleteDepartment(team._id);
                                }}));
                              }}
                            />
                          </Td>
                        )}
                      </Tr>
                    ))
                  )}
                  {!loading && (!teams || teams.length === 0) && (
                    <tr>
                      <td colSpan="6">No Data to Show</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </TableContainer>

            {teams.length !== 0 && totalPages >= 1 && (
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
          id = {id}
          pageName = {pageName}
        />
      )}
    </>
  );
};

export default Team_list;
