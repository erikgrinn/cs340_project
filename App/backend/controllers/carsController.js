// Use the same database connection method as your diagnostic endpoint
const { create } = require("lodash");
const db = require("../database/config");

// Get all Cars Purchases
const getCars = async (req, res) => {
  try {
    // Adjust this query to match your actual dealerships table structure
    const query = "SELECT * FROM Cars";
    
    // Use the same query method as in your diagnostic endpoint
    // If your diagnostic uses db.pool.query, use that here too
    const [rows] = await db.pool.query(query);
    
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ 
      error: "Error fetching cars", 
      details: error.message 
    });
  }
};

// Get Cars Purchase by ID
const getCarByID = async (req, res) => {
  try {
    const carID = req.params.id;
    const query = "SELECT * FROM Cars_Purchases WHERE id = ?";
    const [result] = await db.pool.query(query, [carID]);
    
    if (result.length === 0) {
      return res.status(404).json({ error: "Car not found" });
    }
    
    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching car:", error);
    res.status(500).json({ error: "Error fetching car" });
  }
};


// Create new Car
const createCar = async (req, res) => {
  try {
    const { dealership_id, make_model, color, price, year, is_used, in_stock } = req.body;
    const test = req.params
    const query = "INSERT INTO Cars (dealership_id, make_model, color, price, year, is_used, in_stock) VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    const response = await db.pool.query(query, [dealership_id, make_model, color, price, year, is_used, in_stock]);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(500).json({ error: "Error creating car" });
  }
};

module.exports = {
    getCars,
    getCarByID,
    createCar,
    // updateCarsPurchases,
    // deleteCarsPurchases,
  };