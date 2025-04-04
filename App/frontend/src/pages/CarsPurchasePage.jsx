// import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import axios from 'axios';
import { supabase } from '../../supabaseClient';


// Citation for the following functions:
// Date: 02/26/2025
// Based on: CS 340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

function CarsPurchasePage() {
  // All relationships in DB. Properties: car_purch_id, car_id, purchase_id
  const [carsPurchasesData, setCarsPurchasesData] = useState([]);
  // For a new car, set car_id and purchase_id, used in Add form
  const [newCarsPurchasesData, setNewCarsPurchases] = useState({
    car_id: 0,
    purchase_id: 0
  });
  // Stores ID of car_purch_id we want to delete, used in Remove form
  const [selectedCarPurchase, setSelectedCarPurchase] = useState('');

  const [editData, setEditData] = useState(null); 
  // Properties from cars, purchases tables
  const [dropdownOptions, setDropdownOptions] = useState({
    cars: [],
    purchases: []
  });

  const fetchCarsPurchasesData = async () => {
      try {
        const { data, error } = await supabase.from('cars_purchases').select('*');
        if (error) throw error;
        console.log('CarsPurchases:', data);
        setCarsPurchasesData(data);
      } catch (error) {
        console.error('Error fetching cars purchases:', error);
      }
    };

  const fetchDropdownOptions = async () => {
    try {
      const { data: carsData, error: carsError } = await supabase.from('cars').select('*');
      if (carsError) throw carsError;

      const { data: purchasesData, error: purchasesError } = await supabase.from('purchases').select('*');
      if (purchasesError) throw purchasesError;

      setDropdownOptions({
        cars: carsData,
        purchases: purchasesData
        });
      } catch (error) {
        console.error('Error fetching dropdown options:', error);
      }
    };
  
  useEffect(() => {
    fetchCarsPurchasesData();
    fetchDropdownOptions(); // Fetch dropdown options on load
  }, []);


  const handleChange = (e) => {
    // Gets name and value
    const { name, value } = e.target;
    // If from the remove form, i.e. has changed, calls setSelectedCarPurchase to update the value
    if (name === 'selectedCarPurchase') {
      setSelectedCarPurchase(value);
    } else {
    setNewCarsPurchases({
      //Note: Can use prevState. Could combine in const at top?
        ...newCarsPurchasesData,
        // name can be anything, car_id, purchase_id, whatever it's set to
        [name]: value
    });
  }
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use Supabase to insert the new car data into the "cars" table
      const { error } = await supabase.from('cars_purchases').insert([newCarsPurchasesData]);
      if (error) throw error;
      // Refresh the cars data after successfully adding a new car
      fetchCarsPurchasesData();
    } catch (error) {
      console.error('Error adding new cars_purchase:', error);
      alert('Error adding new cars_purchase to the database.');
    }
  };

  const handleRemoveSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use Supabase to insert the new car data into the "cars" table
      const { error } = await supabase.from('cars_purchases').delete().eq('car_purch_id', selectedCarPurchase);
      if (error) throw error;
      // Refresh the cars data after successfully adding a new car
      fetchCarsPurchasesData();
      // alert('Car added successfully!');
    } catch (error) {
      console.error('Error adding new cars_purchase:', error);
      alert('Error adding new cars_purchase to the database.');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    // Exclude the `car_purch_id` field from the update payload
    const { car_purch_id, ...sanitizedEditData } = editData;

    try {
      // Use Supabase to insert the new car data into the "cars" table
      const { error } = await supabase.from('cars_purchases').update(sanitizedEditData).eq('car_purch_id', car_purch_id);
      if (error) throw error;
      // Refresh the cars data after successfully adding a new car
      fetchCarsPurchasesData();
    } catch (error) {
      console.error('Error adding new purchase:', error);
      alert('Error adding new purchase to the database.');
    }
  };

  const handleEditClick = (carspurchases) => {
    setEditData(carspurchases); // Load data into form
  };


  let content;
  if (!carsPurchasesData || carsPurchasesData.length === 0) {
    content = <p>No cars purchases data found.</p>;
  } else {
    content = (
      <div className="table-container">
        <table className="carspurchases-table">
          <thead>
            <tr>
              <th>Car Purchase ID</th>
              <th>Car ID</th>
              <th>Make & Model</th>
              <th>Purchase ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {carsPurchasesData.map((carspurchase) => {
              const car = dropdownOptions.cars.find(car => car.car_id === carspurchase.car_id);
              const makeModel = car ? car.make_model : 'Unknown';
              return (
                <tr key={carspurchase.car_purch_id}>
                  <td><strong>{carspurchase.car_purch_id}</strong></td>
                  <td>{carspurchase.car_id}</td>
                  <td>{makeModel}</td>
                  <td>{carspurchase.purchase_id}</td>
                  <td>
                    <button onClick={() => handleEditClick(carspurchase)}>Edit</button>
                  </td>
                </tr>
              )})}
          </tbody>
        </table>
  
        {/* Update Form - Only Shows When Editing */}
        {editData && (
          <form onSubmit={handleEditSubmit} className="edit-form">
            <h3>Editing Car_Purch ID: {editData.car_purch_id}</h3>
          
            <div className="form-group">
            <label>
              Car ID:
              <select
                name="car_id"
                value={editData.car_id}
                onChange={(e) => setEditData({ ...editData, car_id: e.target.value })}
                required
              >
                <option value="" disabled>Select a Car</option>
                {dropdownOptions.cars.map((car) => (
                  <option key={car.car_id} value={car.car_id}>
                    {car.make_model} (ID: {car.car_id})
                  </option>
                ))}
              </select>
            </label></div>
  
          <div className="form-group">
            <label>
              Employee:
              <select
                name="purchase_id"
                value={editData.purchase_id}
                onChange={(e) => setEditData({ ...editData, purchase_id: e.target.value })}
                required
              >
                <option value="" disabled>Select a Purchase</option>
                {dropdownOptions.purchases.map((purchase) => (
                  <option key={purchase.purchase_id} value={purchase.purchase_id}>
                    (ID: {purchase.purchase_id})
                  </option>
                ))}
              </select>
            </label></div>
  
            <button type="submit" className="submit-btn">Update</button>
            <button type="button" className="submit-btn" onClick={() => setEditData(null)}>Cancel</button>
          </form>
        )}
      </div>
    );
  }


  return (
    <>
    <div className="cars-purchases-container">
      {content}
      <div id="insert" className="section">
        <h2>Add a new Cars Purchase:</h2>
        <form id="addCarPurchase" onSubmit={handleAddSubmit}>
          <legend><strong>Add Car_Purchase</strong></legend>
          <fieldset>
            <label>Car ID:
            <select
              name="car_id"
              value={newCarsPurchasesData.car_id}
              onChange={handleChange}
              required>
                <option value="">Select a Car</option>
                {/* Car is a parameter name, could be anything. Taking each car object from cars array in dropdownOptions object */}
                {dropdownOptions.cars.map((car) => (
                  <option key={car.car_id} value={car.car_id}>
                     {car.make_model} (ID: {car.car_id})
                  </option>
                ))}
              </select>
      
            </label>
            <label>
          Purchase_ID:
          
          <select name="purchase_id" value={newCarsPurchasesData.purchase_id} onChange={handleChange} required >
          <option value="">Select a Purchase</option>
          {/* Purchases is a parameter name. */}
          {dropdownOptions.purchases.map((purchases) => (
            <option key={purchases.purchase_id} value={purchases.purchase_id}>
              (ID: {purchases.purchase_id})
            </option>
          ))}
          </select>
          </label>
      <button className="btn" type="submit">Add Cars_Purchases</button>
          </fieldset>
        </form>
      </div>
     
      
      <h2>Remove a Cars Purchase:</h2>
      <form id="removeCarPurchase" onSubmit={handleRemoveSubmit}>
        <select name="selectedCarPurchase" value={selectedCarPurchase} onChange={handleChange} required >
        <option value="">Select A Car Purchase</option>
        {carsPurchasesData.map((carsPurchases) => (
          // Get car_purch_id from current object (carsPurchases - being processed in map function, one of the items in the carsPurchasesData array)
            <option key={carsPurchases.car_purch_id} value={carsPurchases.car_purch_id}>
              {carsPurchases.car_purch_id}
            </option>
        ))}
       </select>
       <button className="btn" type="submit">Remove Cars Purchases</button>
       {/* <button className="btn" type="button" onClick={() => setNewCarsPurchases({ car_id: 0, purchase_id: 0})}
       >Cancel</button> */}
      </form>
      </div>
    </>
  );
}

export default CarsPurchasePage;