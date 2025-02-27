// Use the same database connection method as your diagnostic endpoint
const { create } = require("lodash");
const db = require("../database/config");

// Get all Cars Purchases
const getPurchases = async (req, res) => {
  try {
    // Adjust this query to match your actual dealerships table structure
    const query = "SELECT * FROM Purchases";
    
    // Use the same query method as in your diagnostic endpoint
    // If your diagnostic uses db.pool.query, use that here too
    const [rows] = await db.pool.query(query);
    
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching purchases:", error);
    res.status(500).json({ 
      error: "Error fetching purchases", 
      details: error.message 
    });
  }
};

// Get Cars Purchase by ID
const getPurchaseByID = async (req, res) => {
  try {
    const purchaseID = req.params.id;
    const query = "SELECT * FROM Purchases WHERE id = ?";
    const [result] = await db.pool.query(query, [carID]);
    
    if (result.length === 0) {
      return res.status(404).json({ error: "Purchase not found" });
    }
    
    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching purchase:", error);
    res.status(500).json({ error: "Error fetching purchase" });
  }
};

module.exports = {
    getPurchases,
    getPurchaseByID,
    // createCarsPurchases,
    // updateCarsPurchases,
    // deleteCarsPurchases,
  };