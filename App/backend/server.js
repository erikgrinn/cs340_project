const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8500;

// Middleware:

// If on FLIP, use cors() middleware to allow cross-origin requests from the frontend with your port number:
// EX (local): http://localhost:5173 
// EX (FLIP/classwork) http://flip3.engr.oregonstate.edu:5173
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());

// API Routes for backend CRUD:
app.use("/api/people", require("./routes/peopleRoutes"));
// Add this line to your server.js where you define other routes
app.use("/api/dealerships", require("./routes/dealershipsRoutes"));
app.use("/api/carspurchases", require("./routes/carsPurchasesRoutes.js"))
app.use("/api/cars", require("./routes/carsRoutes.js"))
app.use("/api/purchases", require("./routes/purchasesRoutes.js"))

// Add your Connect DB Activitiy Code Below:
// ...
// Is already in config.js?

// ...
// End Connect DB Activity Code.

// Match to your database config route
const db = require('./database/config.js')
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});
// define a new GET request with express:
app.get('/api/diagnostic', async (req, res) => {
  try {
    try {
      await db.pool.query('DROP TABLE IF EXISTS diagnostic;');
    } catch (dropError) {
      console.log('Drop table error (can be ignored if table does not exist:', dropError.message);
    }
    
       // Create the diagnostic table
       try {
        await db.pool.query('CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);');
      } catch (createError) {
        if (createError.code === 'ER_TABLE_EXISTS_ERROR') {
          console.log('Table already exists, continuing...');
        } else {
          throw createError;
        }
      }
      
      // Insert test data
      await db.pool.query('INSERT INTO diagnostic (text) VALUES ("MySQL is working!")');
      
      // Query the data
      const [results] = await db.pool.query('SELECT * FROM diagnostic;');
      
      // Send results
      res.json(results);
    } catch (error) {
      // Handle Errors with more details
      console.error('Database operation failed:', error);
      res.status(500).send('Server error: ' + error.message);
    }
  });

  app.get('/api/diagnostic', async (req, res) => {
    try {
      try {
        await db.pool.query('DROP TABLE IF EXISTS diagnostic;');
      } catch (dropError) {
        console.log('Drop table error (can be ignored if table does not exist:', dropError.message);
      }
      
         // Create the diagnostic table
         try {
          await db.pool.query('CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);');
        } catch (createError) {
          if (createError.code === 'ER_TABLE_EXISTS_ERROR') {
            console.log('Table already exists, continuing...');
          } else {
            throw createError;
          }
        }
        
        // Insert test data
        await db.pool.query('INSERT INTO diagnostic (text) VALUES ("MySQL is working!")');
        
        // Query the data
        const [results] = await db.pool.query('SELECT * FROM diagnostic;');
        
        // Send results
        res.json(results);
      } catch (error) {
        // Handle Errors with more details
        console.error('Database operation failed:', error);
        res.status(500).send('Server error: ' + error.message);
      }
    });  

  app.get('/api/setup-dealerships', async (req, res) => {
    try {
      // Check if dealerships table exists
      const [tableExists] = await db.pool.query(`
        SELECT * 
        FROM information_schema.tables
        WHERE table_schema = ? 
        AND table_name = 'Dealerships'
      `, [process.env.DB_DATABASE]);
      
      if (tableExists.length === 0) {
        // Create table if it doesn't exist
        await db.pool.query(`
          CREATE TABLE Dealerships (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            phone VARCHAR(20)
          )
        `);
        console.log('Dealerships table created');
        
        // Add sample data
        await db.pool.query(`
          INSERT INTO Dealerships (name, location, phone) VALUES
          ('ABC Motors', 'Portland, OR', '503-555-1234'),
          ('XYZ Autos', 'Salem, OR', '971-555-5678'),
          ('123 Cars', 'Eugene, OR', '541-555-9012')
        `);
        console.log('Sample dealerships added');
      }
      
      // Get current data
      const [dealerships] = await db.pool.query('SELECT * FROM Dealerships');
      res.json({
        message: 'Dealerships table setup complete',
        data: dealerships
      });
    } catch (error) {
      console.error('Error setting up dealerships table:', error);
      res.status(500).json({ 
        error: 'Error setting up dealerships table',
        details: error.message
      });
    }
  });

const os = require("os");
const hostname = os.hostname();

app.listen(PORT, () => {
  // flip server should automatically match whatever server you're on 
  console.log(`Server running:  http://${hostname}:${PORT}...`);
});
