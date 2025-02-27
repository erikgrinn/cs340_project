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

  const [editData, setEditData] = useState(null); 
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
      console.log(cars, purchaes)
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

  // const handleEditChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditData({
  //     ...editData,
  //     [name]: value
  //   });
  // };

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
        {carsPurchasesData.map((carspurchases) => (
          <li key={carspurchases.car_purch_id}>
            <strong>{`ID: ${carspurchases.car_purch_id}`}</strong><br />
            Car ID: {carspurchases.car_id}<br />
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
                      ))}
                    </ul>
                );
          }
            {/* {editData && editData.car_purch_id === carspurchases.car_purch_id && (
              <form onSubmit={handleEditSubmit}>
                <label>
                  Car ID:
                  <input type="number" name="car_id" value={editData.car_id} onChange={handleEditChange} required />
                </label><br />
                <label>
                  Purchase ID:
                  <input type="number" name="purchase_id" value={editData.purchase_id} onChange={handleEditChange} required />
                </label><br />
                <button type="submit">Update</button>
                <button type="button" onClick={() => setEditData(null)}>Cancel</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    );

  } */}

  return (
    <>
      <h2>Cars Purchases Data</h2>
      {content}
      <h2>Add a new Cars Purchase</h2>
      <form onSubmit={handleAddSubmit}>
      <label>
                Car:
                <select 
                  name="car_id" 
                  // value={editData.car_id} 
                  onChange={handleChange}
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
                  // value={editData.purchase_id}
                  onChange={handleChange} 
                >
                  <option value="">Select a Purchase</option>
                  {dropdownOptions.purchases.map((purchase) => (
                    <option key={purchase.purchase_id} value={purchase.purchase_id}>
                      {purchase.date} (ID: {purchase.purchase_id})
                    </option>
                  ))}
                </select>
              </label><br />       
       <button type="submit">Add a Cars_Purchases</button>
      </form>
      {/* <h2>Add a new Cars Purchase:</h2>
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
      </form> */}
      
      <h2>Remove a Cars Purchase</h2>
      <form onSubmit={handleRemoveSubmit}>
        <select name="selectedCarPurchase" value={newCarsPurchasesData.selectedCarPurchase} onChange={handleChange} required >
        <option value="">Select A Car Purchase</option>
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