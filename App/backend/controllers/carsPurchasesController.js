// Use the same database connection method as your diagnostic endpoint
const db = require("../database/config");

// Get all dealerships
const getCarsPurchases = async (req, res) => {
  try {
    // Adjust this query to match your actual dealerships table structure
    const query = "SELECT * FROM Cars_Purchases";
    
    // Use the same query method as in your diagnostic endpoint
    // If your diagnostic uses db.pool.query, use that here too
    const [rows] = await db.pool.query(query);
    
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching cars purchases:", error);
    res.status(500).json({ 
      error: "Error fetching cars purchases", 
      details: error.message 
    });
  }
};

// Get dealership by ID
const getCarsPurchaseByID = async (req, res) => {
  try {
    const carsPurchaseID = req.params.id;
    const query = "SELECT * FROM Cars_Purchases WHERE id = ?";
    const [result] = await db.pool.query(query, [carsPurchaseID]);
    
    if (result.length === 0) {
      return res.status(404).json({ error: "Cars purchase not found" });
    }
    
    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching cars purchase:", error);
    res.status(500).json({ error: "Error fetching cars purchase" });
  }
};

// // Create new dealership
// const createDealership = async (req, res) => {
//   try {
//     // Adjust these fields to match your dealerships table
//     const { city, quantity_sold, revenue } = req.body;
//     const query = "INSERT INTO Dealerships (city, quantity_sold, revenue) VALUES (?, ?, ?)";
    
//     const response = await db.pool.query(query, [city, quantity_sold, revenue]);
//     res.status(201).json(response);
//   } catch (error) {
//     console.error("Error creating dealership:", error);
//     res.status(500).json({ error: "Error creating dealership" });
//   }
// };

// // Update dealership
// const updateDealership = async (req, res) => {
//   const dealershipID = req.params.id;
//   // Adjust these fields to match your dealerships table
//   const { name, location, phone } = req.body;
  
//   try {
//     const query = "UPDATE Dealerships SET name=?, location=?, phone=? WHERE id=?";
//     const values = [name, location, phone, dealershipID];
    
//     const [result] = await db.pool.query(query, values);
    
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Dealership not found" });
//     }
    
//     res.json({ message: "Dealership updated successfully" });
//   } catch (error) {
//     console.error("Error updating dealership:", error);
//     res.status(500).json({ error: "Error updating dealership" });
//   }
// };

// // Delete dealership
// const deleteDealership = async (req, res) => {
//   const dealershipID = req.params.id;
  
//   try {
//     const query = "DELETE FROM Dealerships WHERE id = ?";
//     const [result] = await db.pool.query(query, [dealershipID]);
    
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Dealership not found" });
//     }
    
//     res.status(204).send();
//   } catch (error) {
//     console.error("Error deleting dealership:", error);
//     res.status(500).json({ error: "Error deleting dealership" });
//   }
// };

module.exports = {
  getCarsPurchases,
  getCarsPurchaseByID,
  // createDealership,
  // updateDealership,
  // deleteDealership,
};