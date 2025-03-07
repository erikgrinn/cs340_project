import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';


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
      // Construct the URL for the API call
      const URL = `${import.meta.env.VITE_API_URL}/api/customers`;
      const response = await axios.get(URL);
      setCustomersData(response.data);
    } catch (error) {
      console.error('Error fetching customers data:', error);
      alert('Error fetching customers data from the server.');
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
      const URL = `${import.meta.env.VITE_API_URL}/api/customers`;
      await axios.post(URL, newCustomerData);
      fetchCustomersData(); // Refresh data
    } catch (error) {
      console.error('Error adding new customer:', error);
      alert('Error adding new customer to the server.');
    }
}

  let content;
  if (!customersData || customersData.length === 0) {
    content = <p>No customers data found.</p>;
  } else {
    content = (
      <ul>
        {customersData.map((customer) => (
          <li key={customer.customer_id}>
            <strong>{`ID: ${customer.customer_id} - Name: ${customer.first_name} ${customer.last_name}`}</strong><br />
            Email: {customer.email}<br />
            Phone Number: {customer.phone_number}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <h2>Customers Data</h2>
      {content}
      <h2>Add a new Customer!</h2>
      <form onSubmit={handleSubmit}>
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
      </label><br />
        <label>
          Last Name:
          <input type="text" name="last_name" value={newCustomerData.last_name} onChange={handleChange} required />
        </label><br />
        <label>
          Email:
          <input type="text" name="email" value={newCustomerData.email} onChange={handleChange} required />
        </label><br  />
        <label>
          Phone Number:
          <input type="text" name="phone_number" value={newCustomerData.phone_number} onChange={handleChange} required />
        </label><br  />
      <button type="submit">Add Customer</button>
      </form>
    </>
  );
}

export default CustomersPage;