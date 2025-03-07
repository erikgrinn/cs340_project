// Use the same database connection method as your diagnostic endpoint
const db = require("../database/config");

// Define functions which contain logic to handle HTTP requests, export them at end, import functions in routes file and attach to specific routes.

// Get all customers
const getCustomers = async (req, res) => {
    console.log("GET /api/customers called");
  try {
    // Adjust this query to match your actual customers table structure
    const query = "SELECT * FROM Customers";
    console.log("Running SQL query:", query);
    // Use the same query method as in your diagnostic endpoint
    // If your diagnostic uses db.pool.query, use that here too
    const [rows] = await db.pool.query(query);
    console.log("Query results:", rows);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching customers from database:", error);
    res.status(500).json({ 
      error: "Error fetching customers", 
      details: error.message 
    });
  }
};

// Get customer by ID
const getCustomerByID = async (req, res) => {
  try {
    const customerID = req.params.id;
    const query = "SELECT * FROM Customers WHERE id = ?";
    const [result] = await db.pool.query(query, [customerID]);
    
    if (result.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    
    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ error: "Error fetching customer" });
  }
};

// Create new Customer
const createCustomer = async (req, res) => {
  try {
    const { first_name, last_name, email, phone_number } = req.body;
    const query = "INSERT INTO Customers (first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?)";
    
    const response = await db.pool.query(query, [first_name, last_name, email, phone_number]);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: "Error creating customer" });
  }
};

// Update dealership
const updateDealership = async (req, res) => {
  const dealershipID = req.params.id;
  // Adjust these fields to match your dealerships table
  const { name, location, phone } = req.body;
  
  try {
    const query = "UPDATE Dealerships SET name=?, location=?, phone=? WHERE id=?";
    const values = [name, location, phone, dealershipID];
    
    const [result] = await db.pool.query(query, values);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Dealership not found" });
    }
    
    res.json({ message: "Dealership updated successfully" });
  } catch (error) {
    console.error("Error updating dealership:", error);
    res.status(500).json({ error: "Error updating dealership" });
  }
};

// Delete dealership
const deleteDealership = async (req, res) => {
  const dealershipID = req.params.id;
  
  try {
    const query = "DELETE FROM Dealerships WHERE id = ?";
    const [result] = await db.pool.query(query, [dealershipID]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Dealership not found" });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting dealership:", error);
    res.status(500).json({ error: "Error deleting dealership" });
  }
};

module.exports = {
  getCustomers,
  getCustomerByID,
  createCustomer,
//   updateDealership,
//   deleteDealership,
};