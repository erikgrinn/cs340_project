// import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import axios from 'axios';
import { supabase } from '../../supabaseClient';


// Citation for the following functions:
// Date: 02/26/2025
// Based on: CS 340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

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
      const { data, error } = await supabase.from('employees').select('*');
      if (error) throw error;
      console.log('employees:', data);
      setEmployeesData(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchDropdownOptions = async () => {
    try {
      const { data: employeesData, error: employeesError } = await supabase.from('employees').select('*');
      if (employeesError) throw employeesError;

      const { data: dealershipsData, error: dealershipsError } = await supabase.from('dealerships').select('*');
      if (dealershipsError) throw dealershipsError;

      setDropdownOptions({
        employees: employeesData,
        dealerships: dealershipsData
        });
        console.log('Employees:', employeesData);
        console.log('Dealerships:', dealershipsData);
      } catch (error) {
        console.error('Error fetching dropdown options:', error);
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
      // Use Supabase to insert the new car data into the "cars" table
      const { error } = await supabase.from('employees').insert([newEmployeeData]);
      if (error) throw error;
      // Refresh the cars data after successfully adding a new car
      fetchEmployeesData();
      // alert('Car added successfully!');
    } catch (error) {
      console.error('Error adding new employee:', error);
      alert('Error adding new employee to the database.');
    }
  };

  let content;
  if (!employeesData || employeesData.length === 0) {
    content = <p>No Employee data found.</p>;
  } else {
    content = (
          <div className="table-container">
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Dealership (ID, City)</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  </tr>
                  </thead>
                  <tbody>
                    {employeesData.map((employee) => {
                      const dealership = dropdownOptions.dealerships.find(dealership => dealership.dealership_id === employee.dealership_id);
                      const city = dealership ? dealership.city : 'Unknown';
                      return (
                      <tr key={employee.employee_id}>
                          <td><strong>{employee.employee_id}</strong></td>
                          <td>ID: {employee.dealership_id}, {city}</td>
                          <td>{`${employee.first_name} ${employee.last_name}`}</td>
                          <td>{employee.email}</td>
                          <td>{employee.phone_number}</td>
                      </tr>
                  )})}
                </tbody>
            </table>
          </div>
        
      // <ul>
      //   {employeesData.map((employee) => (
      //     <li key={employee.Employee_id}>
      //       <strong>{`Employee ID: ${employee.employee_id} - Dealership ID: ${employee.dealership_id}`}</strong><br />
      //       Email: {employee.email}<br />
      //       {`Name: ${employee.first_name} ${employee.last_name}`}<br />
      //       Phone Number: {employee.phone_number}<br />
      //     </li>
      //   ))}
      // </ul>
    );
  }

  return (
    <>
      {content}
      <h2>Add a new Employee:</h2>
      <form id="addEmployee" onSubmit={handleSubmit}>
        <div className="form-group">
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
      </label></div>

      <div className="form-group">
        <label>
          Email:
          <input type="email" name="email" value={newEmployeeData.email} onChange={handleChange} required />
        </label></div>

        <div className="form-group">
        <label>
          First Name:
          <input type="text" name="first_name" value={newEmployeeData.first_name} onChange={handleChange} required />
        </label></div>

        <div className="form-group">
        <label>
          Last Name:
          <input type="text" name="last_name" value={newEmployeeData.last_name} onChange={handleChange} required />
        </label></div>

        <div className="form-group">
        <label>
          Phone Number:
          <input type="text" name="phone_number" value={newEmployeeData.phone_number} onChange={handleChange} required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" />
        </label></div>
      <button type="submit" className="submit-btn">Add Employee</button>
      </form>
    </>
  );
}

export default EmployeesPage;