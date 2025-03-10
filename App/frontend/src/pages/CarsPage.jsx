import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';


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
      <ul>
        {carsData.map((car) => (
          <li key={car.car_id}>
            <strong>{`Car ID: ${car.car_id} - Dealership ID: ${car.dealership_id}`}</strong><br />
            Make & Model: {car.make_model}<br />
            Color: {car.color}
            Price: {car.price}
            Year: {car.year}
            Used or Not: {car.is_used}
            In Stock: {car.in_stock}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <h2>Car Data</h2>
      {content}
      <h2>Add a new car!</h2>
      <form id="addCar" onSubmit={handleSubmit}>
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
      </label><br />
        <label>
          Make & Model:
          <input type="text" name="make_model" value={newCarData.make_model} onChange={handleChange} required />
        </label><br />
        <label>
          Color:
          <input type="text" name="color" value={newCarData.color} onChange={handleChange} required />
        </label><br  />
        <label>
          Price:
          <input type="text" name="price" value={newCarData.price} onChange={handleChange} required />
        </label><br  />
        <label>
          Year:
          <input type="text" name="year" value={newCarData.year} onChange={handleChange} required />
        </label><br  />
        <label>
          Used or Not:
          <input type="text" name="is_used" value={newCarData.is_used} onChange={handleChange} required />
        </label><br  />
        <label>
          In Stock:
          <input type="text" name="in_stock" value={newCarData.in_stock} onChange={handleChange} required />
        </label><br  />
      <button type="submit">Add Car</button>
      </form>
    </>
  );
}

export default CarsPage;