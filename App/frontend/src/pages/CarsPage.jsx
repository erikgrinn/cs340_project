import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

// Citation for the following functions:
// Date: 02/26/2025
// Based on: CS 340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

function CarsPage() {

  const [carsData, setCarsData] = useState([]);
  const [newCarData, setNewCar] = useState({
    dealership_id: '',
    make_model: '',
    color: '',
    price: '',
    year: '',
    is_used: '',
    in_stock: ''
  });

  const [dropdownOptions, setDropdownOptions] = useState({
    dealerships: []
  })

  const fetchCarsData = async () => {
    try {
      // Construct the URL for the API call
      const URL = `${import.meta.env.VITE_API_URL}/api/cars`;
      const response = await axios.get(URL);
      setCarsData(response.data);
      console.log("Cars Data:", response.data);
    } catch (error) {
      console.error('Error fetching car data:', error);
      alert('Error fetching car data from the server.');
    }
  };

  const fetchDropdownOptions = async () => {
    try {
      const dealershipsURL = `${import.meta.env.VITE_API_URL}/api/dealerships`; 
  
      const [dealershipsResponse] = await Promise.all([
        axios.get(dealershipsURL),
      ]);
  
      setDropdownOptions({
        dealerships: dealershipsResponse.data,
      });
    } catch (error) {
      console.error("Error fetching dropdown options:", error);
    }
  };

  useEffect(() => {
    fetchCarsData();
    fetchDropdownOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCar({
        ...newCarData,
        [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const URL = `${import.meta.env.VITE_API_URL}/api/cars`;
      await axios.post(URL, newCarData);
      fetchCarsData(); // Refresh data
    } catch (error) {
      console.error('Error adding new car:', error);
      alert('Error adding new car to the server.');
    }
}

  let content;
  if (!carsData || carsData.length === 0) {
    content = <p>No car data found.</p>;
  } else {
    content = (
      <div className="table-container">
        <table className="cars-table">
          <thead>
            <tr>
              <th>Car ID</th>
              <th>Dealership</th>
              <th>Make & Model</th>
              <th>Color</th>
              <th>Price</th>
              <th>Year</th>
              <th>Used or Not</th>
              <th>In Stock</th>
              </tr>
              </thead>
              <tbody>
              {carsData.map((car) => {
                const dealership = dropdownOptions.dealerships.find(dealership => dealership.dealership_id === car.dealership_id);
                const city = dealership ? dealership.city : 'Unknown';
                return (
                <tr key={car.car_id}>
                  <td><strong>{car.car_id}</strong></td>
                  <td>ID: {car.dealership_id}, {city}</td>
                  <td>{car.make_model}</td>
                  <td>{car.color}</td>
                  <td>{car.price}</td>
                  <td>{car.year}</td>
                  <td>{car.is_used === 1 ? "Yes" : "No"}</td>
                  <td>{car.in_stock === 1 ? "Yes" : "No"}</td>
                </tr>
              )})}
              </tbody>
        </table>
      </div>
    );
  }

  return (
    <>
      {content}
      <h2>Add a new car:</h2>
      <form id="addCar" onSubmit={handleSubmit}>
        <div className="form-group">
      <label>
        Dealership ID:
        <select name="dealership_id" value={newCarData.dealership_id} onChange={handleChange} required >
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
          Make & Model:
          <input type="text" name="make_model" value={newCarData.make_model} onChange={handleChange} required />
        </label></div>

        <div className="form-group">
        <label>
          Color:
          <input type="text" name="color" value={newCarData.color} onChange={handleChange} required />
        </label></div>

        <div className="form-group">
        <label>
          Price:
          <input type="number" name="price" value={newCarData.price} onChange={handleChange} required min="0" />
        </label></div>

        <div className="form-group">
        <label>
          Year:
          <input type="number" name="year" value={newCarData.year} onChange={handleChange} required min="1900" max="2100" />
        </label></div>

        <div className="form-group">
        <label>
          Used or Not:
          <select name="is_used" value={newCarData.is_used} onChange={handleChange} required >
          <option value="">Yes/No</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
          </select>
        </label></div>

        <div className="form-group">
        <label>
          In Stock:
          <select name="in_stock" value={newCarData.in_stock} onChange={handleChange} required >
          <option value="">Yes/No</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
          </select>
        </label></div>
      <button type="submit" className="submit-btn">Add Car</button>
      </form>
    </>
  );
}

export default CarsPage;