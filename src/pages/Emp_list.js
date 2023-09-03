import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import SearchBar from "../components/searchbar";
import MultiStepForm from "./MultiStepForm";

const BoxContainer = styled.div`
  border: 1px solid #ccc; /* Add a border */
  padding: 50px 0px; /* Add some padding around the content */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Add a box shadow */
  border-radius: 5px; /* Add rounded corners */
  background: #ffffff;
`;

const CreateEmployeeHeading = styled.h6`
  margin-bottom: 10px;
  width: 50%;
  right: 2%;
  font-weight: lighter;
  fontsize: "smaller";
  /* Add some spacing below */
`;

const styledbutton = styled.button`
  // background: #d3d3d3;
  // fontSize: 'smaller';
`;

const AddEmployeeButton = styled(Link)`
  background-color: #ffa500;
  color: #fff;
  padding: 8px 16px;
  border: none; /* Remove the default border */
  border-radius: 5px; /* Add rounded corners */
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Add a smooth transition */

  &:hover {
    background-color: #ff8000; /* Change the color on hover */
  }
`;

// Flex container for arranging the heading and search bar side by side
const HeadingAndSearchContainer = styled.div`
  display: flex;
  padding: 10px 55px;
  justify-content: space-between;
  align-items: center; /* Center align items vertically */
`;
const StyledSearchBar = styled(SearchBar)`
  width: 100%;
`;

const Th = styled.th`
  background: #ffffff;
  color: #000000;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
  height: 57px;
  top: 10%;
  padding: 0px 66px;
  right: 2%;
  font-weight: lighter;
  width: 78%; /* Added more horizontal padding */
  text-align: left;
  border-left: 0px;
  border-bottom: 0px solid #ddd;
`;

const Tr = styled.tr`
  padding: 8px 20px;
  text-align: left;
  border-bottom: 0px solid #ddd;
  margin: 100px;
`;

const Table = styled.table`
  width: 10%;
  border-bottom: none;
  color: #ffa500;
  backgorund-color: #ffa500;
  border-collapse: separate; /* Set to 'separate' for individual borders */
  border-spacing: 10px 5px; /* Adjust spacing as needed */
  border: 0px solid #ccc;
`;
const CenteredContainer = styled.div`
  position: absolute;
  top: 20%; /* Adjust the vertical position */
  left: 18%;
  right: 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: top;
  padding: 0 20px;
  // border-bottom: 0px solid #ddd;
  border-radius: 5px 5px 5px 5px;
  height: 100vh; /* Adjust as needed */
`;

const Emp_list = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [entriesToShow, setEntriesToShow] = useState(10);
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
  const filteredEmployees = employees.filter((employee) =>
    employee.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <CenteredContainer>
        <div>
          <BoxContainer>
            <HeadingAndSearchContainer>
              <CreateEmployeeHeading>
                <div>
                  Show
                  <button onClick={() => setEntriesToShow(entriesToShow + 1)}>
                    {entriesToShow}
                  </button>
                  entries
                </div>{" "}
              </CreateEmployeeHeading>
              <StyledSearchBar onSearch={setSearchTerm} />
              <AddEmployeeButton
               onClick={toggleForm}
              // onClick={openForm}
              // onClick={() => setShowForm(true)}
              //    to="/add-employee"
                 className="btn btn-primary mb-2"
              >
                Add Employee
              </AddEmployeeButton>
            </HeadingAndSearchContainer>
           
            <Table>
              <thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Team</Th>
                  <Th>Last Login</Th>
                  <Th>Status</Th>
                  <Th>Role</Th>
                  <Th>Actions</Th>
                </Tr>
              </thead>
              <tbody>
              {/* <Tr>
                  <td>Name</td>
                  <td>Team</td>
                  <td>Last Login</td>
                  <td>Status</td>
                  <td>Role</td>
                  <td>Actions</td>
                </Tr> */}
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
