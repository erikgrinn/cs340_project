// Use the same database connection method as your diagnostic endpoint
const { create } = require("lodash");
const db = require("../database/config");

// Get all Cars Purchases
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

// Get Cars Purchase by ID
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

// Create new Cars Purchases
const createCarsPurchases = async (req, res) => {
  try {
    // Adjust these fields to match your dealerships table
    const { car_id, purchase_id } = req.body;
    const test = req.params
    const query = "INSERT INTO Cars_Purchases (car_id, purchase_id) VALUES (?, ?)";
    
    const response = await db.pool.query(query, [car_id, purchase_id]);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating cars purchases:", error);
    res.status(500).json({ error: "Error creating cars purchases" });
  }
};

// Update Cars Purchases
// app.put('/api/carspurchases/:id', async (req, res) => {
//   try {
//     const { car_id, purchase_id } = req.body;
//     const { id } = req.params;
//     const query = 'UPDATE carspurchases SET car_id = ?, purchase_id = ? WHERE car_purch_id = ?';
//     await db.query(query, [car_id, purchase_id, id]);
//     res.status(200).json({ message: 'Car purchase updated successfully!' });
//   } catch (error) {
//     console.error('Error updating car purchase:', error);
//     res.status(500).send('Server error!');
//   }
// });
const updateCarsPurchases = async (req, res) => {
  const carsPurchaseID = req.params.id;
  // Adjust these fields to match your dealerships table
  const { car_purch_id, car_id, purchase_id } = req.body;
  
  try {
    const query = "UPDATE Cars_Purchases SET car_id=?, purchase_id=? WHERE car_purch_id=?";
    const values = [car_id, purchase_id, carsPurchaseID];
    
    const [result] = await db.pool.query(query, values);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Car Purchase not found" });
    }
    
    res.json({ message: "Car Purchase updated successfully" });
  } catch (error) {
    console.error("Error updating dealership:", error);
    res.status(500).json({ error: "Error updating Car Purchase" });
  }
};


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
  createCarsPurchases,
  updateCarsPurchases,
  // deleteDealership,
};