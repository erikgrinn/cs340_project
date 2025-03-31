// import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import axios from 'axios';
import { supabase } from '../../supabaseClient';


// Citation for the following functions:
// Date: 02/26/2025
// Based on: CS 340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

function CustomersPage() {

  const [customersData, setCustomersData] = useState([]);
  const [newCustomerData, setNewCustomer] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: ''
  });

  const fetchCustomersData = async () => {
    try {
      const { data, error } = await supabase.from('customers').select('*');
      if (error) throw error;
      console.log('Dealerships:', data);
      setCustomersData(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };


  useEffect(() => {
    fetchCustomersData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({
        ...newCustomerData,
        [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use Supabase to insert the new car data into the "cars" table
      const { error } = await supabase.from('customers').insert([newCustomerData]);
      if (error) throw error;
      // Refresh the cars data after successfully adding a new car
      fetchCustomersData();
      // alert('Car added successfully!');
    } catch (error) {
      console.error('Error adding new customer:', error);
      alert('Error adding new customer to the database.');
    }
  };

  let content;
  if (!customersData || customersData.length === 0) {
    content = <p>No customers data found.</p>;
  } else {
    content = (
      <div className="table-container">
        <table className="customers-table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            </tr>
        </thead>
        <tbody>
        {customersData.map((customer) => (
          <tr key={customer.customer_id}>
            <td><strong>{customer.customer_id}</strong></td>
            <td>{`${customer.first_name} ${customer.last_name}`}</td>
            <td>{customer.email}</td>
            <td>{customer.phone_number}</td>
          </tr>
        ))}
        </tbody>
       </table>
       </div>
    );
  }

  return (
    <>
      {content}
      <h2>Add a new Customer:</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
      <label>
        {/* Select City:
        <select name="selectedCity" value={newDealershipData.selectedCity} onChange={handleChange} required>
            <option value="" disabled>Select a city</option>
            {dealershipsData.map((dealership) => (
                <option key={dealership.dealership_id} value={dealership.city}>
                {`ID: ${dealership.dealership_id} - City: ${dealership.city}`}
                </option>
            ))}
        </select> */}
        First Name:
        <input type="text" name="first_name" value={newCustomerData.first_name} onChange={handleChange} required />
      </label></div>

      <div className="form-group">
        <label>
          Last Name:
          <input type="text" name="last_name" value={newCustomerData.last_name} onChange={handleChange} required />
        </label></div>

        <div className="form-group">
        <label>
          Email:
          <input type="text" name="email" value={newCustomerData.email} onChange={handleChange} required />
        </label></div>

        <div className="form-group">
        <label>
          Phone Number:
          <input type="text" name="phone_number" value={newCustomerData.phone_number} onChange={handleChange} required />
        </label></div>
      <button type="submit" className="submit-btn">Add Customer</button>
      </form>
    </>
  );
}

export default CustomersPage;