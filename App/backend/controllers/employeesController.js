// Use the same database connection method as your diagnostic endpoint
const { create } = require("lodash");
const db = require("../database/config");

// Get all Employees
const getEmployees = async (req, res) => {
  try {
    // Adjust this query to match your actual dealerships table structure
    const query = "SELECT * FROM Employees";
    
    // Use the same query method as in your diagnostic endpoint
    // If your diagnostic uses db.pool.query, use that here too
    const [rows] = await db.pool.query(query);
    
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ 
      error: "Error fetching employees", 
      details: error.message 
    });
  }
};

// Get Employee by ID
const getEmployeeByID = async (req, res) => {
  try {
    const employeeID = req.params.id;
    const query = "SELECT * FROM Employees WHERE id = ?";
    const [result] = await db.pool.query(query, [employeeID]);
    
    if (result.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    
    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ error: "Error fetching employee" });
  }
};

// Create new employee
const createEmployee = async (req, res) => {
  try {
    const { dealership_id, email, first_name, last_name, phone_number } = req.body;
    const query = "INSERT INTO Employees ( dealership_id, email, first_name, last_name, phone_number ) VALUES (?, ?, ?, ?, ?)";
    
    const response = await db.pool.query(query, [dealership_id, email, first_name, last_name, phone_number]);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ error: "Error creating employee" });
  }
};

module.exports = {
    getEmployees,
    getEmployeeByID,
    createEmployee,
    // updateCarsEmployees,
    // deleteCarsEmployees,
  };