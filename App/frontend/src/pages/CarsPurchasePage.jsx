import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

function CarsPurchasePage() {
  const [carsPurchasesData, setcarsPurchasesData] = useState([]);
  const [newCarsPurchasesData, setNewcarsPurchases] = useState({
    car_id: 0,
    purchase_id: 0
  });

  const fetchCarsPurchasesData = async () => {
    try {
      // Construct the URL for the API call
      const URL = `${import.meta.env.VITE_API_URL}/api/carspurchases`;
      const response = await axios.get(URL);
      setcarsPurchasesData(response.data);
    } catch (error) {
      console.error('Error fetching cars purchases data:', error);
      alert('Error fetching cars purchases data from the server.');
    }
  };

  useEffect(() => {
    fetchCarsPurchasesData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewcarsPurchases({
        ...newCarsPurchasesData,
        [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const URL = `${import.meta.env.VITE_API_URL}/api/carspurchases`;
      await axios.post(URL, newCarsPurchasesData);
      fetchCarsPurchasesData(); // Refresh data
    } catch (error) {
      console.error('Error adding new cars purchases:', error);
      alert('Error adding new cars purchases to the server.');
    }
}

  let content;
  if (!carsPurchasesData || carsPurchasesData.length === 0) {
    content = <p>No cars purchases data found.</p>;
  } else {
    content = (
      <ul>
        {carsPurchasesData.map((carspurchases) => (
          <li key={carspurchases.car_purch_id}>
            <strong>{`ID: ${carspurchases.car_purch_id}`}</strong><br />
            Quantity Sold: {carspurchases.car_id}<br />
            Revenue: {carspurchases.purchase_id}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <h2>Dealerships Data</h2>
      {content}
      <h2>Add a new Dealership!</h2>
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
        Car_ID:
        <input type="number" name="car_id" value={newCarsPurchasesData.car_id} onChange={handleChange} required />
      </label><br />
        <label>
          Purchase_ID:
          <input type="number" name="purchase_id" value={newCarsPurchasesData.purchase_id} onChange={handleChange} required />
        </label><br />
      <button type="submit">Add Cars_Purchases</button>
      </form>
    </>
  );
}

export default CarsPurchasePage;