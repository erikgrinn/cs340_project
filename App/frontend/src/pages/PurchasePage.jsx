import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';


function PurchasePage() {

  const [purchasesData, setPurchasesData] = useState([]);
  const [newPurchaseData, setNewPurchase] = useState({
    customer_id: '',
    employee_id: '',
    total_price: '',
    quantity: '',
    purchase_date: ''
  });

  const [editData, setEditData] = useState(null); 
  const [dropdownOptions, setDropdownOptions] = useState({
    customers: [],
    employees: []
  });

  const fetchPurchasesData = async () => {
    try {
      // Construct the URL for the API call
      const URL = `${import.meta.env.VITE_API_URL}/api/purchases`;
      const response = await axios.get(URL);
      setPurchasesData(response.data);
    } catch (error) {
      console.error('Error fetching purchase data:', error);
      alert('Error fetching purchase data from the server.');
    }
  };

  const fetchDropdownOptions = async () => {
    try {
      const customersURL = `${import.meta.env.VITE_API_URL}/api/customers`;
      const employeesURL = `${import.meta.env.VITE_API_URL}/api/employees`;
  
      const [customersResponse, employeesResponse] = await Promise.all([
        axios.get(customersURL),
        axios.get(employeesURL)
      ]);
  
      setDropdownOptions({
        customers: customersResponse.data,
        employees: employeesResponse.data
      });
    } catch (error) {
      console.error("Error fetching dropdown options:", error);
    }
  };

  useEffect(() => {
    fetchPurchasesData();
    fetchDropdownOptions(); // Fetch dropdown options on load
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPurchase({
        ...newPurchaseData,
        [name]: value
    });
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const URL = `${import.meta.env.VITE_API_URL}/api/purchases`;

      // Convert empty strings to null before sending for nullable employee_id
      // const sanitizedData = Object.fromEntries(
      //   Object.entries(newPurchaseData).map(([key, value]) => [
      //     key,
      //     value === "" ? null : value,
      //   ])
      // );

      // another way 
      const sanitizedData = { ...newPurchaseData };
      for (let key in sanitizedData) {
        if (sanitizedData[key] === "null") {
          sanitizedData[key] = null;
        }
      }
      
      console.log(sanitizedData)
      
      await axios.post(URL, sanitizedData);
      fetchPurchasesData(); // Refresh data
    } catch (error) {
      console.error('Error adding new purchase:', error);
      alert('Error adding new purchase to the server.');
    }
}

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const URL = `${import.meta.env.VITE_API_URL}/api/purchases/${editData.purchase_id}`;

      const sanitizedEditData = { ...editData };
      for (let key in sanitizedEditData) {
        if (sanitizedEditData[key] === "null") {
          sanitizedEditData[key] = null;
        }
      }
      await axios.put(URL, sanitizedEditData);
      setEditData(null); // Hide the form after update
      fetchPurchasesData(); // Refresh data
    } catch (error) {
      console.error('Error updating purchase:', error);
      alert('Error updating purchase.');
    }
  };

  const handleEditClick = (purchase) => {
    setEditData(purchase); // Load data into form
  };

  let content;
  if (!purchasesData || purchasesData.length === 0) {
    content = <p>No purchase data found.</p>;
  } else {
    content = (
      <div className="table-container">
        <table className="purchases-table">
          <thead>
            <tr>
              <th>Purchase ID</th>
              <th>Customer</th>
              <th>Employee</th>
              <th>Total Price</th>
              <th>Quantity</th>
              <th>Purchase Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchasesData.map((purchase) => {
                const customer = dropdownOptions.customers.find(customer => customer.customer_id === purchase.customer_id);
                const customerName = customer ? `${customer.first_name} ${customer.last_name}`  : 'Unknown';
                const employee = dropdownOptions.employees.find(employee => employee.employee_id === purchase.employee_id);
                const employeeName = employee ? `${employee.first_name} ${employee.last_name}` : 'None';
                return (
            
              <tr key={purchase.purchase_id}>
                <td><strong>{purchase.purchase_id}</strong></td>
                <td>{customerName}</td>
                <td>{employeeName}</td>
                <td>{purchase.total_price}</td>
                <td>{purchase.quantity}</td>
                <td>{new Date(purchase.purchase_date).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleEditClick(purchase)}>Edit</button>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
  
        {/* Update Form - Only Shows When Editing */}
        {editData && (
          <form onSubmit={handleEditSubmit} className="edit-form">
            <h3>Editing Purchase ID: {editData.purchase_id}</h3>
  
            <label>
              Customer:
              <select
                name="customer_id"
                value={editData.customer_id}
                onChange={(e) => setEditData({ ...editData, customer_id: e.target.value })}
                required
              >
                <option value="" disabled>Select a customer</option>
                {dropdownOptions.customers.map((customer) => (
                  <option key={customer.customer_id} value={customer.customer_id}>
                    {customer.first_name} (ID: {customer.customer_id})
                  </option>
                ))}
              </select>
            </label><br />
  
            <label>
              Employee:
              <select
                name="employee_id"
                value={editData.employee_id !== null && editData.employee_id !== undefined ? editData.employee_id : "null"}
                onChange={(e) => setEditData({ ...editData, employee_id: e.target.value })}
                required
              >
                <option value="" disabled>Select an employee</option>
                <option value="null">No Employee</option>
                {dropdownOptions.employees.map((employee) => (
                  <option key={employee.employee_id} value={employee.employee_id}>
                    {employee.first_name} (ID: {employee.employee_id})
                  </option>
                ))}
              </select>
            </label><br />
  
            <label>
              Total Price:
              <input
                type="number"
                name="total_price"
                value={editData.total_price}
                onChange={(e) => setEditData({ ...editData, total_price: e.target.value })}
                required
              />
            </label><br />
  
            <label>
              Quantity:
              <input
                type="number"
                name="quantity"
                value={editData.quantity}
                onChange={(e) => setEditData({ ...editData, quantity: e.target.value })}
                required
              />
            </label><br />
  
            <label>
              Purchase Date:
              <input
                type="date"
                name="purchase_date"
                value={editData.purchase_date}
                onChange={(e) => setEditData({ ...editData, purchase_date: e.target.value })}
                required
              />
            </label><br />
  
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditData(null)}>Cancel</button>
          </form>
        )}
      </div>
    );
  }

  return (
    <>
      <h2>Purchase Data</h2>
      {content}
      <h2>Add a new Purchase:</h2>
      <form onSubmit={handleAddSubmit}>
        <div className="form-group">
      <label>
        Customer ID:
        <select 
              name="customer_id" 
              value={newPurchaseData.customer_id} 
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a Customer</option>
              console.log(dropdownOptions.customers)
              {dropdownOptions.customers.map((customer) => (
                <option key={customer.customer_id} value={customer.customer_id}>
                  {customer.first_name} (ID: {customer.customer_id})
                </option>
              ))}
          </select>
        {/* <input type="number" name="customer_id" value={newPurchaseData.customer_id} onChange={handleChange} required /> */}
      </label></div>

      <div className="form-group">
        <label>
          Employee ID:
          <select 
              name="employee_id" 
              value={newPurchaseData.employee_id} 
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select an Employee</option>
              <option value="null">No Employee</option>
              console.log(dropdownOptions.employees)
              {dropdownOptions.employees.map((employee) => (
                <option key={employee.employee_id} value={employee.employee_id}>
                  {employee.first_name} (ID: {employee.employee_id})
                </option>
              ))}
          </select>
          {/* <input type="text" name="employee_id" value={newPurchaseData.employee_id} onChange={handleChange} /> */}
        </label></div>

        <div className="form-group">
        <label>
          Total Price:
          <input type="number" name="total_price" value={newPurchaseData.total_price} onChange={handleChange} required />
        </label></div>

        <div className="form-group">
        <label>
          Quantity:
          <input type="number" name="quantity" value={newPurchaseData.quantity} onChange={handleChange} required />
        </label></div>

        <div className="form-group">
        <label>
          Purchase Date:
          <input type="date" name="purchase_date" value={newPurchaseData.purchase_date} onChange={handleChange} required />
        </label></div>
      <button type="submit" className="submit-btn">Add purchase</button>
      </form>
    </>
  );
}

export default PurchasePage;