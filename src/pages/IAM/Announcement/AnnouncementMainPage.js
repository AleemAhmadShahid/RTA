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


const Announcement_list = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bulkOptions = [
    { value: {}, label: "Select" },
    { value: 1, label: "Delete" },
  ];


  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);

  const [checkedAnnouncement, setCheckedAnnouncement] = useState([]);
  const [announcements, setAnnouncement] = useState([]);
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
    if (typeof announcements.value !== "object") params.announcements = announcements.value;

    setLoading(true);

    const fetchData = async () => {
      try {
        const data = await createGetRequest("/api/announcement", params);
        if (data.status === 404) {
          setAnnouncement([]);
          return;
        }
        setAnnouncement(data.annoucements);
        setInfoBoxData(data.analytics);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    };
    fetchData();
  }, [currentPage, entriesToShow, searchTerm, reload, navigate]);

  const handleEditClick = (announcement) => {
    setFormData(announcement);
    setShowForm(true);
    setIsEditMode(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setIsEditMode(false);
  };

  const [selectedCheck, setSelectedCheck] = useState([
    "Title",
    "Content",
    "Actions",
  ]);
  const CheckOptions = [
    "Title",
    "Content",
    "Created By",
    "Actions",
  ];

  const [Export, setExport] = useState({
    label: "Export",
    icon: <FaPrint />,
  });

  const deleteAnnouncement = async (id) => {
    const response = await createDeleteRequest(`/api/announcement/${id}/`);
    if (response.status === 200) {
      setReload(!reload);
      toast.success("Announcement deleted Successfully!");
    }
  };

  const takeBulkAction = async () => {
    let path = "";
    const data = {announcements: checkedAnnouncement};
    if (checkedAnnouncement.length === 0 || bulkOption === "Select") return;
    else if (bulkOption.label === "Delete") path = "/api/announcement/bulkDelete/";
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

            {/* <InfoBox
              icon={FiUserPlus}
              iconColor="#512da8"
              data={infoBoxData?.totalAnnouncements || 0}
              text="Total Announcements"
            />
             
             <InfoBox
              icon={FiUserX}
              iconColor="#ffa500"
              data={infoBoxData?.vacantAnnouncements || 0}
              text="Vacant Announcements"
            />

            <InfoBox
              icon={FiUserCheck}
              iconColor="#d32f2f"
              data={infoBoxData?.closedAnnouncements || 0}
              text="Closed Announcements"
            /> */}
           
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
                  <span style={{ whiteSpace: "nowrap" }}>Add Announcement</span>
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
                            setCheckedAnnouncement(
                              announcements.map((announcement) => announcement._id)
                            );
                          else setCheckedAnnouncement([]);
                        }}
                      />
                    </Th>
                    {selectedCheck.includes("Content") && (
                      <Th>CONTENT</Th>
                    )}

                    {selectedCheck.includes("Title") && <Th>TITLE</Th>}

                   
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
                    announcements &&
                    announcements.map((announcement) => (
                      <Tr key={announcement._id}>
                        <Td>
                          {" "}
                          <input
                            type="checkbox"
                            checked={checkedAnnouncement.includes(announcement._id)}
                            onChange={() => {
                              if (!checkedAnnouncement.includes(announcement._id))
                                setCheckedAnnouncement([
                                  ...checkedAnnouncement,
                                  announcement._id,
                                ]);
                              else
                                setCheckedAnnouncement(
                                  checkedAnnouncement.filter(
                                    (checkedAnnouncement) =>
                                      checkedAnnouncement !== announcement._id
                                  )
                                );
                            }}
                          />
                        </Td>
                  
                        {selectedCheck.includes("Content") && (
                          <Td style={{ whiteSpace: 'pre-line' }}>{announcement.content}</Td>
                        )}

                        {selectedCheck.includes("Title") && (
                          <Td>{announcement.title}</Td>
                        )}
                       
                        {selectedCheck.includes("Created By") && (
                          <Td>
                            { announcement?.createdBy 
                              &&
                              <EmployeeInfo isSpaceRequired={true} employee={announcement?.createdBy} />
                            }
                          </Td>
                        )}
                       
                        
                       
                        {selectedCheck.includes("Actions") && (
                          <Td>
                            <IconWrapper>
                              <MdIcons.MdOutlineModeEditOutline
                                onClick={() => {
                                  setIsViewMode(false);
                                  setFormData(announcement);
                                  setShowForm(true);
                                  setIsEditMode(!!announcement);
                                }}
                                style={{ fontSize: "18px" }}
                              />
                            </IconWrapper>

                            <GrIcons.GrFormView
                             onClick={() => {
                              setFormData(announcement);
                              setIsViewMode(true);
                              toggleForm();
                            }}
                              style={{ fontSize: "18px", cursor: "pointer" }}
                            />

                            <MdIcons.MdDeleteOutline
                              style={{ fontSize: "18px", cursor: "pointer" }}
                              onClick={() => {
                                dispatch(setErrorModal({message: "Do you want to delete this announcement?", handleYes: () => {
                                  deleteAnnouncement(announcement._id);
                                }}));
                              }}
                            />
                          </Td>
                        )}
                      </Tr>
                    ))
                  )}
                  {!loading && (!announcements || announcements.length === 0) && (
                    <tr>
                      <td colSpan="6">No Data to Show</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </TableContainer>

            {announcements.length !== 0 && totalPages >= 1 && (
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

export default Announcement_list;
