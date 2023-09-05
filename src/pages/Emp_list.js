import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import SearchBar from "../components/searchbar";
import MultiStepForm from "./Multistepform";

const BoxContainer = styled.div`
  border: 0px solid #ccc;
  padding: 3px 0px;
  box-shadow: 0px 01px 0px rgba(0, 0, 0, 0);
  border-radius: 5px;
  background: #ffffff;
  margin-top:10px;
`;

const CreateEmployeeHeading = styled.h6`
  margin-bottom: 10px;
  width: 50%;
  right: 2%;
  font-weight: lighter;
  fontsize: "smaller";
`;

const AddEmployeeButton = styled(Link)`
  background-color: #ffa500;
  color: #fff;
  padding: 4px 14px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff8000;
  }
`;

const HeadingAndSearchContainer = styled.div`
  display: flex;
  padding: 10px 55px;
  justify-content: space-between;
  align-items: center;
`;

const StyledSearchBar = styled(SearchBar)`
  width: 10%;
`;

const Th = styled.th`
  background: #ededed;
  color: #000000;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
  height: 30px;
  top: 10%;
  padding: 9px 68.4px;
  right: 2%;
  font-weight: lighter;
  width: 78%;
  font-size:13px;
  text-align: left !important;
  border-left: 0px;
  border-bottom: 0px solid #ddd;
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflow text */
  text-overflow: ellipsis;
  @media screen and (max-width: 768px) {
    padding: 0px 20px;
  }
`;

const Tr = styled.tr`
  padding: 8px 20px;
  text-align: left;
  border-bottom: 0px solid #ddd;
  margin: 100px;
  
`;
const Td = styled.td`
  padding: 10px 50px;
  text-align: center;
  border-top: 1px solid #ededed;
  margin: 100px;
  color: black;
  // font-weight: 100;
   font-weight: medium;
  font-size:13px;
  

`;


const TableContainer = styled.div`
  border: 0px solid #ccc;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background: #ffffff;
`;

const Table = styled.table`
  width: 9%;
  border-bottom: none;
  color: #ffa500;
  backgorund-color: #ffa500;
  border-collapse: collapse;
  border-spacing: 10px 5px;
  border: 0px solid #ccc;
  

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const CenteredContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 20%;
  right: 2%;
  width: 78%;
  
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: top;
  padding: 10px 20px;
  border-radius: 5px 5px 5px 5px;
  height: 100vh;
`;

const EntriesDropdown = styled.select`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 10px;
  width:150px;
  &:focus {
    outline: none;
    border-color:  #ffa500; /* Change border color to orange when focused */
    box-shadow: 0 0 0 0px rgba(255, 165, 0, 0.5); /* Add an orange shadow when focused */
  }
  option {
    &:hover {
      background-color: #ffa500; /* Change the background color when hovering */
      color: white; /* You can change the text color as well if needed */
    }

    &:checked {
      background-color: #ffa500;
      color: white;
    }
  }
  
`;


const AddEmployeeContainer = styled.div`
  display: flex;
  align-items: center;
`;



const OptionsButton = styled.button`
  background-color: #ffa500;
  color: #fff;
  padding: 4px 10px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  margin-left: 10px;
  margin-bottom:7px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff8000;
  }
`;


const SubmenuButton = styled.button`
  background-color: #fff;
  color: #000;
  padding: 4px 10px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  margin-right: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ccc;
  }
`;

const SubmenuOptions = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  top: 10%; /* Position the submenu below the button */
  left: 80%;
  right:3%;
  margin-top: 5px; /* Add some spacing between the button and submenu */
  min-width: 10%; /* Make sure the submenu is at least as wide as the button */
  z-index: 1; /* Ensure the submenu appears above other content */
`;








const Emp_list = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [entriesToShow, setEntriesToShow] = useState(10);
  const entriesOptions = [10, 20, 30]; 
  const [isOptionsCollapsed, setIsOptionsCollapsed] = useState(true);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  //useEffect(()=> {
  // getAllEmployees();
  //},[])

  //const getAllEmployees=()=>{
  // for API
  //}
  const openForm = () => {
    setShowForm(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleEntriesChange = (event) => {
    setEntriesToShow(Number(event.target.value)); // Convert value to a number
  }
  const displayedEmployees = employees.slice(0, entriesToShow)


  const filteredEmployees = employees.filter((employee) =>
    employee.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  return (
    <>
      <CenteredContainer>
        <div>
          <BoxContainer>
            <HeadingAndSearchContainer>
              <CreateEmployeeHeading>
              <div>
                 
                  <EntriesDropdown
                    value={entriesToShow}
                    onChange={handleEntriesChange}
                  >
                    {entriesOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </EntriesDropdown>
                  
                </div>{" "}
              </CreateEmployeeHeading>
              <StyledSearchBar onSearch={setSearchTerm} />
              <AddEmployeeContainer>
              <AddEmployeeButton
               onClick={toggleForm}
              // onClick={openForm}
              // onClick={() => setShowForm(true)}
              //    to="/add-employee"
                 className="btn btn-primary mb-2"
              >
                Add Employee
              </AddEmployeeButton>

              <OptionsButton onClick={toggleOptions}>
                  *
                </OptionsButton>
                <SubmenuOptions isOpen={isOptionsOpen}>
                    <SubmenuButton>Copy</SubmenuButton>
                    <SubmenuButton>PDF</SubmenuButton>
                    <SubmenuButton>Excel</SubmenuButton>
                  </SubmenuOptions>
              
            </AddEmployeeContainer>
            </HeadingAndSearchContainer>
            {/* </BoxContainer>
            <BoxContainer> */}
            <Table>
              <thead>
                <Tr>
                  <Th>NAME</Th>
                  <Th>TEAM</Th>
                  <Th>LAST LOGIN</Th>
                  <Th>STATUS</Th>
                  <Th>ROLE </Th>
                  <Th>ACTION</Th>
                </Tr>
              </thead>
              <tbody>
               <Tr>
                  <Td>Aleem</Td>
                  <Td>RTA</Td>
                  <Td>not today</Td>
                  <Td>Single</Td>
                  <Td>team</Td>
                  <Td>Active</Td>
                </Tr> 
                <Tr>
                  <Td>Shaheer</Td>
                  <Td>RTA</Td>
                  <Td>today</Td>
                  <Td>single</Td>
                  <Td>team </Td>
                  <Td>Active</Td>
                </Tr> 
                {employees.map((employee) => (
                  <Tr key={employee.Name}>
                    <td>{employee.Name}</td>
                    <td>{employee.Team}</td>
                    <td>{employee.Lastlogin}</td>
                    <td>{employee.Status}</td>
                    <td>{employee.Role}</td>
                    <td>
                      <Link
                        className="btn btn-info"
                        to={`/edit/${employee.Name}`}
                      >
                        Update
                      </Link>
                      <button
                        className="btn btn-danger"
                        // onClick={() => handleDelete(employee.id)}
                        style={{ marginRight: "10px" }}
                      >
                        Delete
                      </button>
                    </td>
                  </Tr>
                ))}
              </tbody>
            </Table>
           </BoxContainer> 
        </div>
      </CenteredContainer>
      {showForm && <MultiStepForm />}
    </>
  );
};

export default Emp_list;
