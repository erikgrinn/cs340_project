import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

function CarsPurchasePage() {
  const [carsPurchasesData, setcarsPurchasesData] = useState([]);
  const [newCarsPurchasesData, setNewcarsPurchases] = useState({
    car_id: 0,
    purchase_id: 0
  });
  const [selectedCarPurchase, setSelectedCarPurchase] = useState('');

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
    if (name === 'selectedCarPurchase') {
      setSelectedCarPurchase(value);
    } else {
    setNewcarsPurchases({
      //Note: Can use prevState. Could combine in const at top?
        ...newCarsPurchasesData,
        [name]: value
    });
  }
}

  const handleAddSubmit = async (e) => {
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

const handleRemoveSubmit = async (e) => {
  e.preventDefault();
  try {
    const URL = `${import.meta.env.VITE_API_URL}/api/carspurchases/${selectedCarPurchase}`;
    await axios.delete(URL, newCarsPurchasesData);
    fetchCarsPurchasesData(); // Refresh data
  } catch (error) {
    console.error('Error removing new cars purchases:', error);
    alert('Error removing new cars purchases to the server.');
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
            Purchase ID: {carspurchases.car_id}<br />
            Car ID: {carspurchases.purchase_id}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <h2>Cars Purchases Data</h2>
      {content}
      <h2>Add a new Cars Purchase:</h2>
      <form onSubmit={handleAddSubmit}>
      <label>
        Car_ID:
        <input type="number" name="car_id" value={newCarsPurchasesData.car_id} onChange={handleChange} required />
      </label><br />
        <label>
          Purchase_ID:
          <input type="number" name="purchase_id" value={newCarsPurchasesData.purchase_id} onChange={handleChange} required />
        </label><br />
      <button type="submit">Add Cars_Purchases</button>
      </form>
      
      <h2>Remove a Cars Purchase</h2>
      <form onSubmit={handleRemoveSubmit}>
        <select name="selectedCarPurchase" value={newCarsPurchasesData.selectedCarPurchase} onChange={handleChange} required >
        <option value="" disabled>Select A Car Purchase</option>
        {carsPurchasesData.map((carspurchases) => (
            <option key={carspurchases.car_purch_id} value={carspurchases.car_purch_id}>
              {carspurchases.car_purch_id}
            </option>
        ))}
       </select>
       <button type="submit">Remove Cars Purchases</button>
      </form>
    </>
  );
}

export default CarsPurchasePage;