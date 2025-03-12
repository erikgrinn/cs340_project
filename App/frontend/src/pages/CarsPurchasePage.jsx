import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

function CarsPurchasePage() {
  // All relationships in DB. Properties: car_purch_id, car_id, purchase_id
  const [carsPurchasesData, setcarsPurchasesData] = useState([]);
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

  const fetchDropdownOptions = async () => {
    try {
      const carsURL = `${import.meta.env.VITE_API_URL}/api/cars`; 
      const purchasesURL = `${import.meta.env.VITE_API_URL}/api/purchases`;
  
      const [carsResponse, purchasesResponse] = await Promise.all([
        axios.get(carsURL),
        axios.get(purchasesURL)
      ]);
  
      setDropdownOptions({
        cars: carsResponse.data,
        purchases: purchasesResponse.data
      });
    } catch (error) {
      console.error("Error fetching dropdown options:", error);
    }
  };
  
  useEffect(() => {
    fetchCarsPurchasesData();
    fetchDropdownOptions(); // Fetch dropdown options on load
  }, []);

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

  // ** redundant
  // useEffect(() => {
  //   fetchCarsPurchasesData();
  // }, []);

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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };

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
      console.log(selectedCarPurchase)
      await axios.delete(URL, newCarsPurchasesData);
      fetchCarsPurchasesData(); // Refresh data
    } catch (error) {
      console.error('Error removing new cars purchases:', error);
      alert('Error removing new cars purchases to the server.');
    }
  }


  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const URL = `${import.meta.env.VITE_API_URL}/api/carspurchases/${editData.car_purch_id}`;
      await axios.put(URL, editData);
      setEditData(null); // Hide the form after update
      fetchCarsPurchasesData(); // Refresh data
    } catch (error) {
      console.error('Error updating cars purchase:', error);
      alert('Error updating cars purchase.');
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
      <ul>
        {/* if returning JSX, use ( for cleaner, shorter code.
        if need to define variables or logic before returning JSX, use {} and explicitly return. */}
        {carsPurchasesData.map((carspurchases) => {
        // Find the corresponding car
        const car = dropdownOptions.cars.find(car => car.car_id === carspurchases.car_id);
        const makeModel = car ? car.make_model : 'Unknown';
        return (
          <li key={carspurchases.car_purch_id}>
            <strong>{`ID: ${carspurchases.car_purch_id}`}</strong><br />
            Car ID: {carspurchases.car_id} {makeModel}<br />
            Purchase ID: {carspurchases.purchase_id}<br />
            <button onClick={() => handleEditClick(carspurchases)}>Edit</button>

            {/* Update Form - Only Shows When Editing */}
            {editData && editData.car_purch_id === carspurchases.car_purch_id && (
            <form onSubmit={handleEditSubmit}>
              <h3>Editing Car Purchase ID: {editData.car_purch_id}</h3>

              <label>
                Car:
                <select 
                  name="car_id" 
                  value={editData.car_id} 
                  onChange={(e) => setEditData({ ...editData, car_id: e.target.value })}
                >
                  <option value="">Select a Car</option>
                  {dropdownOptions.cars.map((car) => (
                    <option key={car.car_id} value={car.car_id}>
                      {car.model} (ID: {car.car_id})
                    </option>
                  ))}
                </select>
              </label><br />

              <label>
                Purchase:
                <select 
                  name="purchase_id" 
                  value={editData.purchase_id} 
                  onChange={(e) => setEditData({ ...editData, purchase_id: e.target.value })}
                >
                  <option value="">Select a Purchase</option>
                  {dropdownOptions.purchases.map((purchase) => (
                    <option key={purchase.purchase_id} value={purchase.purchase_id}>
                      {purchase.date} (ID: {purchase.purchase_id})
                    </option>
                  ))}
                </select>
              </label><br />

              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditData(null)}>Cancel</button>
            </form>
          )}
          </li>
        )
        })}
      </ul>
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
       <button className="btn" type="button" onClick={() => setNewCarsPurchases({ car_id: 0, purchase_id: 0})}
       >Cancel</button>
      </form>
      </div>
    </>
  );
}

export default CarsPurchasePage;