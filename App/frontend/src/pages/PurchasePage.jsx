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
        if (sanitizedData[key] === "") {
          sanitizedData[key] = null;
        }
      }

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
        if (sanitizedEditData[key] === "") {
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
      <ul>
        {purchasesData.map((purchase) => (
          <li key={purchase.purchase_id}>
            <strong>{`Purchase ID: ${purchase.purchase_id} - Customer ID: ${purchase.customer_id}`}</strong><br />
            Employee ID: {purchase.employee_id}<br />
            Total Price: {purchase.total_price}<br />
            Quantity: {purchase.quantity}<br />
            Purchase Date: {new Date(purchase.purchase_date).toLocaleDateString()}<br />
            <button onClick={() => handleEditClick(purchase)}>Edit</button>

          {/* Update Form - Only Shows When Editing */}
          {editData && editData.purchase_id === purchase.purchase_id && (
            <form onSubmit={handleEditSubmit}>
              <h3>Editing Purchase ID: {editData.purchase_id}</h3>

              {/* <label>
                Customer:
                <input type="number" name="customer_id" value={editData.customer_id} onChange={(e) => setEditData({ ...editData, customer_id: e.target.value })} required /> */}
                {/* <select 
                  name="customer_id" 
                  value={editData.customer_id} 
                  onChange={(e) => setEditData({ ...editData, customer_id: e.target.value })}
                >
                  <option value="">Select a Car</option>
                  {dropdownOptions.cars.map((car) => (
                    <option key={car.car_id} value={car.car_id}>
                      {car.model} (ID: {car.car_id})
                    </option>
                  ))}
                </select> */}
              {/* </label><br /> */}

              <label>
                Employee:
                <input type="number" name="employee_id" value={editData.employee_id} onChange={(e) => setEditData({ ...editData, employee_id: e.target.value })} />
                {/* <select 
                  name="customer_id" 
                  value={editData.customer_id} 
                  onChange={(e) => setEditData({ ...editData, customer_id: e.target.value })}
                >
                  <option value="">Select a Car</option>
                  {dropdownOptions.cars.map((car) => (
                    <option key={car.car_id} value={car.car_id}>
                      {car.model} (ID: {car.car_id})
                    </option>
                  ))}
                </select> */}
              </label><br />

              {/* <label>
                Total Price:
                <input type="number" name="total_price" value={editData.total_price} onChange={(e) => setEditData({ ...editData, total_price: e.target.value })} required /> */}
                {/* <select 
                  name="customer_id" 
                  value={editData.customer_id} 
                  onChange={(e) => setEditData({ ...editData, customer_id: e.target.value })}
                >
                  <option value="">Select a Car</option>
                  {dropdownOptions.cars.map((car) => (
                    <option key={car.car_id} value={car.car_id}>
                      {car.model} (ID: {car.car_id})
                    </option>
                  ))}
                </select> */}
              {/* </label><br /> */}

              {/* <label>
                Quantity:
                <input type="number" name="quantity" value={editData.quantity} onChange={(e) => setEditData({ ...editData, quantity: e.target.value })} required /> */}
                {/* <select 
                  name="customer_id" 
                  value={editData.customer_id} 
                  onChange={(e) => setEditData({ ...editData, customer_id: e.target.value })}
                >
                  <option value="">Select a Car</option>
                  {dropdownOptions.cars.map((car) => (
                    <option key={car.car_id} value={car.car_id}>
                      {car.model} (ID: {car.car_id})
                    </option>
                  ))}
                </select> */}
              {/* </label><br /> */}

              {/* <label>
                Purchase Date:
                <input type="date" name="purchase_date" value={editData.purchase_date} onChange={(e) => setEditData({ ...editData, purchase_date: e.target.value })} required /> */}
                {/* <select 
                  name="customer_id" 
                  value={editData.customer_id} 
                  onChange={(e) => setEditData({ ...editData, customer_id: e.target.value })}
                >
                  <option value="">Select a Car</option>
                  {dropdownOptions.cars.map((car) => (
                    <option key={car.car_id} value={car.car_id}>
                      {car.model} (ID: {car.car_id})
                    </option>
                  ))}
                </select> */}
              {/* </label><br /> */}


              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditData(null)}>Cancel</button>
            </form>
          )}
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
      <form onSubmit={handleAddSubmit}>
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