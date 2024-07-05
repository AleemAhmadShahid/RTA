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

import { FaPrint } from "react-icons/fa";

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

import { entriesOptions, exportOptions } from "../../../global/constants";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setErrorModal } from "../../../redux/modalSlice";
import EditableEmployeeTable from "../../../components/EditableTable";

const Processing_list = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bulkOptions = [
    { value: {}, label: "Select" },
    { value: 1, label: "Delete" },
  ];

  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);

  const [checkedProcessing, setCheckedProcessing] = useState([]);
  const [processings, SetProcessing] = useState([]);
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
    if (typeof processings.value !== "object")
      params.processings = processings.value;

    setLoading(true);

    const fetchData = async () => {
      try {
        const data = await createGetRequest("/api/payrollProcessing/", params);
        if (data.status === 404 || data.status === 400) {
          SetProcessing([]);
          setLoading(false);
          console.log("processing", data);
          return;
        }
        SetProcessing(data.processings);
        setInfoBoxData(data.analytics);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentPage, entriesToShow, searchTerm, reload, navigate]);

  const handleEditClick = (processing) => {
    setFormData(processing);
    setShowForm(true);
    setIsEditMode(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setIsEditMode(false);
  };

  const [selectedCheck, setSelectedCheck] = useState([
    "Period Start",
    "Period End",
    "Created By",
    "Actions",
  ]);
  const CheckOptions = [
    "Period Start",
    "Period End",
    "Created By",
    "Actions",
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) setCheckedProcessing(processings.map((processing) => processing._id));
    else setCheckedProcessing([]);
  };

  const handleCheckboxChange = (id) => {
    if (!checkedProcessing.includes(id))
      setCheckedProcessing([...checkedProcessing, id]);
    else setCheckedProcessing(checkedProcessing.filter((checkedProcessing) => checkedProcessing !== id));
  };

  const handleEdit = (processing) => {
    setIsViewMode(false);
    setFormData(processing);
    setShowForm(true);
    setIsEditMode(!!processing);
  };

  const handleView = (processing) => {
    setFormData(processing);
    setIsViewMode(true);
    toggleForm();
  };

  const handleDelete = (id) => {
    dispatch(setErrorModal({
      message: "Do you want to delete this processing?",
      handleYes: () => deleteCycle(id),
    }));
  };

  const columns = [
    { field: "select", label: <input type="checkbox" onChange={handleSelectAll} /> },
    { field: "payPeriodStart", label: "Period Start" },
    { field: "payPeriodEnd", label: "Period End" },
    { field: "createdBy", label: "Added By" },
    { field: "action", label: "Action" },
  ];

  const initialData = [
    {
      _id: "1",
      payPeriodStart: "2023-01-01",
      payPeriodEnd: "2023-01-15",
      createdBy: { name: "John Doe" },
    },
    {
      _id: "2",
      payPeriodStart: "2023-02-01",
      payPeriodEnd: "2023-02-15",
      createdBy: { name: "Jane Smith" },
    },
    {
      _id: "3",
      payPeriodStart: "2023-03-01",
      payPeriodEnd: "2023-03-15",
      createdBy: { name: "Alice Johnson" },
    },
  ];
  const formattedData = initialData.map((processing) => ({
    ...processing,
    select: (
      <input
        type="checkbox"
        checked={checkedProcessing.includes(processing._id)}
        onChange={() => handleCheckboxChange(processing._id)}
      />
    ),
    createdBy: processing.createdBy ? (
      <EmployeeInfo isSpaceRequired={true} employee={processing.createdBy} />
    ) : null,
    action: (
      <div style={{ display: "flex", gap: "1px" }}>
        <MdIcons.MdOutlineModeEditOutline
          onClick={() => handleEdit(processing)}
          style={{ fontSize: "18px", cursor: "pointer" }}
        />
        <GrIcons.GrFormView
          onClick={() => handleView(processing)}
          style={{ fontSize: "18px", cursor: "pointer" }}
        />
        <MdIcons.MdDeleteOutline
          onClick={() => handleDelete(processing._id)}
          style={{ fontSize: "18px", cursor: "pointer" }}
        />
      </div>
    ),
  }));
  // const initialData = processings.map((processing) => ({
  //   ...processing,
  //   select: (
  //     <input
  //       type="checkbox"
  //       checked={checkedProcessing.includes(processing._id)}
  //       onChange={() => handleCheckboxChange(processing._id)}
  //     />
  //   ),
  //   createdBy: processing.createdBy ? (
  //     <EmployeeInfo isSpaceRequired={true} employee={processing.createdBy} />
  //   ) : null,
  //   action: (
  //     <div style={{ display: "flex", gap: "1px" }}>
  //       <MdIcons.MdOutlineModeEditOutline
  //         onClick={() => handleEdit(processing)}
  //         style={{ fontSize: "18px", cursor: "pointer" }}
  //       />
  //       <GrIcons.GrFormView
  //         onClick={() => handleView(processing)}
  //         style={{ fontSize: "18px", cursor: "pointer" }}
  //       />
  //       <MdIcons.MdDeleteOutline
  //         onClick={() => handleDelete(processing._id)}
  //         style={{ fontSize: "18px", cursor: "pointer" }}
  //       />
  //     </div>
  //   ),
  // }));

  const [Export, setExport] = useState({
    label: "Export",
    icon: <FaPrint />,
  });

  const deleteCycle = async (id) => {
    const response = await createDeleteRequest(`/api/payrollProcessing/${id}/`);
    if (response.status === 200) {
      setReload(!reload);
      toast.success("Processing deleted Successfully!");
    }
  };

  const takeBulkAction = async () => {
    let path = "";
    const data = { processings: checkedProcessing };
    if (checkedProcessing.length === 0 || bulkOption === "Select") return;
    else if (bulkOption.label === "Delete") path = "/api/payrollProcessing/bulkDelete/";
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
          {
            <CardsContainer>
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
                data={infoBoxData?.totalProcessings || 0}
                text="Total Processings"
              />

              <InfoBox
                icon={FiUserX}
                iconColor="#ffa500"
                data={infoBoxData?.vacantProcessings || 0}
                text="Vacant Processings"
              />

              <InfoBox
                icon={FiUserCheck}
                iconColor="#d32f2f"
                data={infoBoxData?.closedProcessings || 0}
                text="Closed Processings"
              />
            </CardsContainer>
          }

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
                <AddEmployeeButton
                  onClick={() => {
                    setIsViewMode(false);
                    toggleForm();
                  }}
                  className="btn btn-primary mb-2"
                >
                  <span style={{ whiteSpace: "nowrap" }}>Add Processing</span>
                </AddEmployeeButton>
              </AddEmployeeContainer>
            </HeadingAndSearchContainer>
            <EditableEmployeeTable
              loading={loading}
              initialData={initialData}
              columns={columns}
              keyField="_id"
              handleInputChange={(id, field, value) => {
                setFormData((prevData) =>
                  prevData.map((item) =>
                    item._id === id ? { ...item, [field]: value } : item
                  )
                );
              }}
            />
            {/* <TableContainer>
              <Table>
                <thead>
                  <Tr>
                    <Th>
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked)
                            setCheckedProcessing(
                              processings.map((processing) => processing._id)
                            );
                          else setCheckedProcessing([]);
                        }}
                      />
                    </Th>
                    {selectedCheck.includes("Period Start") && (
                      <Th>Period Start</Th>
                    )}

                    {selectedCheck.includes("Period End") && <Th>Period End</Th>}

                   
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
                    processings &&
                    processings.map((processing) => (
                      <Tr key={processing._id}>
                        <Td>
                          {" "}
                          <input
                            type="checkbox"
                            checked={checkedProcessing.includes(processing._id)}
                            onChange={() => {
                              if (!checkedProcessing.includes(processing._id))
                                setCheckedProcessing([
                                  ...checkedProcessing,
                                  processing._id,
                                ]);
                              else
                                setCheckedProcessing(
                                  checkedProcessing.filter(
                                    (checkedProcessing) =>
                                      checkedProcessing !== processing._id
                                  )
                                );
                            }}
                          />
                        </Td>
                  
                        {selectedCheck.includes("Period Start") && (
                          <Td style={{ whiteSpace: 'pre-line' }}>{processing.payPeriodStart}</Td>
                        )}

                        {selectedCheck.includes("Period Start") && (
                          <Td>{processing.payPeriodEnd}</Td>
                        )}
                       
                        {selectedCheck.includes("Created By") && (
                          <Td>
                            { processing?.createdBy 
                              &&
                              <EmployeeInfo isSpaceRequired={true} employee={processing?.createdBy} />
                            }
                          </Td>
                        )}
                       
                        
                       
                        {selectedCheck.includes("Actions") && (
                          <Td>
                            <IconWrapper>
                              <MdIcons.MdOutlineModeEditOutline
                                onClick={() => {
                                  setIsViewMode(false);
                                  setFormData(processing);
                                  setShowForm(true);
                                  setIsEditMode(!!processing);
                                }}
                                style={{ fontSize: "18px" }}
                              />
                            </IconWrapper>

                            <GrIcons.GrFormView
                             onClick={() => {
                              setFormData(processing);
                              setIsViewMode(true);
                              toggleForm();
                            }}
                              style={{ fontSize: "18px", cursor: "pointer" }}
                            />

                            <MdIcons.MdDeleteOutline
                              style={{ fontSize: "18px", cursor: "pointer" }}
                              onClick={() => {
                                dispatch(setErrorModal({message: "Do you want to delete this processing?", handleYes: () => {
                                  deleteCycle(processing._id);
                                }}));
                              }}
                            />
                          </Td>
                        )}
                      </Tr>
                    ))
                  )}
                  {!loading && (!processings || processings.length === 0) && (
                    <tr>
                      <td colSpan="6">No Data to Show</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </TableContainer> */}

            {processings.length !== 0 && totalPages >= 1 && (
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

export default Processing_list;
