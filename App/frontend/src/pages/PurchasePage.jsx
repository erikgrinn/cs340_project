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

  useEffect(() => {
    fetchPurchasesData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPurchase({
        ...newPurchaseData,
        [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const URL = `${import.meta.env.VITE_API_URL}/api/purchases`;
      await axios.post(URL, newPurchaseData);
      fetchPurchasesData(); // Refresh data
    } catch (error) {
      console.error('Error adding new purchase:', error);
      alert('Error adding new purchase to the server.');
    }
}

  let content;
  if (!purchasesData || purchasesData.length === 0) {
    content = <p>No purchase data found.</p>;
  } else {
    content = (
      <ul>
        {purchasesData.map((purchase) => (
          <li key={purchase.purchase_id}>
            <strong>{`Purchase ID: ${purchase.purchase_id} - Customer ID: ${purchase.customer_id}`}</strong><br />
            Employee ID: {purchase.employee_id}<br />
            Total Price: {purchase.total_price}
            Quantity: {purchase.quantity}
            Purchase Date: {purchase.purchase_date}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <h2>Purchase Data</h2>
      {content}
      <h2>Add a new purchase:</h2>
      <form onSubmit={handleSubmit}>
      <label>
        Customer ID:
        <input type="number" name="customer_id" value={newPurchaseData.customer_id} onChange={handleChange} required />
      </label><br />
        <label>
          Employee ID:
          <input type="text" name="employee_id" value={newPurchaseData.employee_id} onChange={handleChange} />
        </label><br />
        <label>
          Total Price:
          <input type="number" name="total_price" value={newPurchaseData.total_price} onChange={handleChange} required />
        </label><br  />
        <label>
          Quantity:
          <input type="number" name="quantity" value={newPurchaseData.quantity} onChange={handleChange} required />
        </label><br  />
        <label>
          Purchase Date:
          <input type="date" name="purchase_date" value={newPurchaseData.purchase_date} onChange={handleChange} required />
        </label><br  />
      <button type="submit">Add purchase</button>
      </form>
    </>
  );
}

export default PurchasePage;