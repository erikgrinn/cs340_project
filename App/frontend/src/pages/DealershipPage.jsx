import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

function DealershipPage() {
  const [dealershipsData, setDealershipsData] = useState([]);
  const [newDealershipData, setNewDealership] = useState({
    city: '',
    quantity_sold: 0,
    revenue: 0
  });

  const fetchDealershipsData = async () => {
    try {
      // Construct the URL for the API call
      const URL = `${import.meta.env.VITE_API_URL}/api/dealerships`;
      const response = await axios.get(URL);
      setDealershipsData(response.data);
    } catch (error) {
      console.error('Error fetching dealerships data:', error);
      alert('Error fetching dealerships data from the server.');
    }
  };

  useEffect(() => {
    fetchDealershipsData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDealership({
        ...newDealershipData,
        [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const URL = `${import.meta.env.VITE_API_URL}/api/dealerships`;
      await axios.post(URL, newDealershipData);
      fetchDealershipsData(); // Refresh data
    } catch (error) {
      console.error('Error adding new dealership:', error);
      alert('Error adding new dealership to the server.');
    }
}

  let content;
  if (!dealershipsData || dealershipsData.length === 0) {
    content = <p>No dealerships data found.</p>;
  } else {
    content = (
      <div className="table-container">
        <table className="dealerships-table">
          <thead>
            <tr>
              <th>Dealership ID</th>
              <th>City</th>
              <th>Quantity Sold</th>
              <th>Revenue</th>
              </tr>
              </thead>
              <tbody>
              {dealershipsData.map((dealership) => (
                <tr key={dealership.dealership_id}>
                <td><strong>{dealership.dealership_id}</strong></td>
                <td>{dealership.city}</td>
                <td>{dealership.quantity_sold}</td>
                <td>{dealership.revenue}</td>
                </tr>
              ))}
              </tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      <h2>Dealerships Data</h2>
      {content}
      <h2>Add a new Dealership:</h2>
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
        City:
        <input type="text" name="city" value={newDealershipData.city} onChange={handleChange} required />
      </label></div>

        <div className="form-group">
        <label>
          Quantity Sold:
          <input type="number" name="quantity_sold" value={newDealershipData.quantity_sold} onChange={handleChange} required />
        </label></div>

        <div className="form-group">
        <label>
          Revenue:
          <input type="number" name="revenue" value={newDealershipData.revenue} onChange={handleChange} required />
        </label></div>
      <button type="submit" className="submit-btn">Add Dealership</button>
      </form>
    </>
  );
}

export default DealershipPage;