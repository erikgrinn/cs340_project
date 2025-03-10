import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';


function EmployeesPage() {

  const [employeesData, setEmployeesData] = useState([]);
  const [newEmployeeData, setNewEmployee] = useState({
    dealership_id: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: ''
  });

  const [dropdownOptions, setDropdownOptions] = useState({
    employees: [],
    dealerships: []
  });

  const fetchEmployeesData = async () => {
    try {
      // Construct the URL for the API call
      const URL = `${import.meta.env.VITE_API_URL}/api/employees`;
      const response = await axios.get(URL);
      setEmployeesData(response.data);
    } catch (error) {
      console.error('Error fetching Employee data:', error);
      alert('Error fetching Employee data from the server.');
    }
  };

  const fetchDropdownOptions = async () => {
    try {
      const employeesURL = `${import.meta.env.VITE_API_URL}/api/employees`; 
      const dealershipsURL = `${import.meta.env.VITE_API_URL}/api/dealerships`;
  
      const [employeesResponse, dealershipsResponse] = await Promise.all([
        axios.get(employeesURL),
        axios.get(dealershipsURL)
      ]);
  
      setDropdownOptions({
        employees: employeesResponse.data,
        dealerships: dealershipsResponse.data
      });
    } catch (error) {
      console.error("Error fetching dropdown options:", error);
    }
  };

  useEffect(() => {
    fetchEmployeesData();
    fetchDropdownOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({
        ...newEmployeeData,
        [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const URL = `${import.meta.env.VITE_API_URL}/api/employees`;
      await axios.post(URL, newEmployeeData);
      fetchEmployeesData(); // Refresh data
    } catch (error) {
      console.error('Error adding new Employee:', error);
      alert('Error adding new Employee to the server.');
    }
}

  let content;
  if (!employeesData || employeesData.length === 0) {
    content = <p>No Employee data found.</p>;
  } else {
    content = (
      <ul>
        {employeesData.map((employee) => (
          <li key={employee.Employee_id}>
            <strong>{`Employee ID: ${employee.employee_id} - Dealership ID: ${employee.dealership_id}`}</strong><br />
            Email: {employee.email}<br />
            {`Name: ${employee.first_name} ${employee.last_name}`}
            Phone Number: {employee.phone_number}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <h2>Employee Data</h2>
      {content}
      <h2>Add a new Employee:</h2>
      <form id="addEmployee" onSubmit={handleSubmit}>
      <label>Dealership ID:
        <select
          name="dealership_id" 
          value={newEmployeeData.dealership_id} 
          onChange={handleChange} required >
            <option value="">Select a Dealership</option>
            {dropdownOptions.dealerships.map((dealership) => (
              <option key={dealership.dealership_id} value={dealership.dealership_id}>
                {dealership.city} (ID: {dealership.dealership_id})
              </option>
            ))}
            </select>
      </label><br />
        <label>
          Email:
          <input type="text" name="email" value={newEmployeeData.email} onChange={handleChange} />
        </label><br />
        <label>
          First Name:
          <input type="text" name="first_name" value={newEmployeeData.first_name} onChange={handleChange} required />
        </label><br  />
        <label>
          Last Name:
          <input type="text" name="last_name" value={newEmployeeData.last_name} onChange={handleChange} required />
        </label><br  />
        <label>
          Phone Number:
          <input type="text" name="phone_number" value={newEmployeeData.phone_number} onChange={handleChange} required />
        </label><br  />
      <button type="submit">Add Employee</button>
      </form>
    </>
  );
}

export default EmployeesPage;