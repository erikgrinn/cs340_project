-- Benton County Dealership Service
-- Database Aficionado (Group 43)
-- Erik Grinn, Jacob Natowicz

DROP TABLE IF EXISTS Cars;
DROP TABLE IF EXISTS Dealerships;
DROP TABLE IF EXISTS Employees;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Purchases;
DROP TABLE IF EXISTS Cars_Purchases;

-- -----------------------------------------------------
-- Create Table Dealerships
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Dealerships(
  dealership_id bigint generated always as identity PRIMARY KEY,
  city varchar(45) not NULL,
  quantity_sold bigint not NULL,
  revenue DECIMAL(20,2) not NULL
);

-- Inserting example data into Dealerships table
INSERT INTO Dealerships (city, quantity_sold, revenue)
    VALUES
        ('Adair Village', 7, 64350.67),
        ('Albany', 2, 76235.45),
        ('Corvallis', 23, 1674897.12);
        
-- -----------------------------------------------------
-- Create Table Cars
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Cars (
  car_id bigint generated always as identity PRIMARY KEY,
  dealership_id bigint NOT NULL,
  make_model VARCHAR(255) NOT NULL,
  color VARCHAR(45) NOT NULL,
  price DECIMAL(20,2) NOT NULL,
  year integer NOT NULL,
  is_used BOOL NOT NULL,
  in_stock BOOL NOT NULL,
  FOREIGN KEY (dealership_id) REFERENCES Dealerships (dealership_id)
      ON DELETE CASCADE
);

-- Inserting example data into Cars table
INSERT INTO Cars (dealership_id, make_model, color, price, year, is_used, in_stock)
VALUES
    (1, 'Honda CRV', 'Blue', 10999.34, 2023, true, true),
    (2, 'Jeep Renegade Latitude', 'Orange', 21500.88, 2019, false, true),
    (1, 'Toyota CH-R', 'Yellow', 6500.56, 2005, true, true),
    (2, 'Lexus ISF', 'Black', 52750.99, 2024, false, false);


-- -----------------------------------------------------
-- Create Table Customers
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Customers(
    customer_id bigint generated always as identity PRIMARY KEY,
    first_name varchar(45) not NULL,
    last_name varchar(45) not NULL,
    email varchar(45) not NULL UNIQUE,
    phone_number varchar(45) not NULL
);

-- Inserting example data into Customers table
INSERT INTO Customers (first_name, last_name, email, phone_number)
    VALUES
        ('Beverly', 'Green', 'bgreen@gmail.com', '216-492-4932'),
        ('Moses', 'Mendelsohn', 'mmendel@gmail.com', '492-239-3939'),
        ('Alex', 'Shih', 'ashih@yahoo.com', '493-129-2939'),
        ('Rachel', 'Rhinehart', 'rrhineheart@hotmail.com', '402-494-2929');

-- -----------------------------------------------------
-- Create Table Employees
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Employees(
    employee_id bigint generated always as identity PRIMARY KEY,
    dealership_id bigint NOT NULL,
    email VARCHAR(45) NOT NULL,
    first_name varchar(45) not NULL,
    last_name varchar(45) not NULL,
    phone_number varchar(45) not NULL,
    FOREIGN KEY (dealership_id) REFERENCES Dealerships(dealership_id)
          ON DELETE CASCADE
);

-- Inserting example data into Employees table
INSERT INTO Employees (dealership_id, first_name, last_name, email, phone_number)
VALUES
    (2, 'Tina', 'Cohen', 'tcohen@bcdr.com', '541-403-2095'),
    (3, 'Natalia', 'Gonzalez', 'ngonza@bcdr.com', '458-593-2974'),
    (3, 'Matthew', 'Silverstein', 'msilver@bcdr.com', '458-938-2103'),
    (1, 'Parker', 'Simbol', 'psimbol@bcdr.com', '541-938-4950');


-- -----------------------------------------------------
-- Create Table Purchases
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Purchases (
  purchase_id bigint generated always as identity PRIMARY KEY,
  customer_id bigint NOT NULL,
  employee_id bigint, 
  total_price DECIMAL(20,2) NOT NULL,
  quantity bigint NOT NULL,
  purchase_date DATE NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES Customers (customer_id)
      ON DELETE CASCADE,
  FOREIGN KEY (employee_id) REFERENCES Employees (employee_id)
      ON DELETE SET NULL
);


-- Inserting example data into Purchases table
INSERT INTO Purchases (customer_id, employee_id, total_price, quantity, purchase_date)
    VALUES
        (1, 1, 10999.34, 1, '2022-05-16'),
        (2, NULL, 52750.99, 1, '2024-01-25'),
        (3, 2, 13000.76, 2, '2025-02-04'),
        (1, NULL, 10999.34, 1, '2025-01-07');

-- -----------------------------------------------------
-- Create Table Cars_Purchases
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Cars_Purchases (
  car_purch_id bigint generated always as identity PRIMARY KEY,
  car_id bigint NOT NULL,
  purchase_id bigint NOT NULL,
  FOREIGN KEY (car_id) REFERENCES Cars (car_id)
      ON DELETE CASCADE,
  FOREIGN KEY (purchase_id) REFERENCES Purchases (purchase_id)
      ON DELETE CASCADE
);

-- Inserting example data into Cars_Purchases table
INSERT INTO Cars_Purchases (car_id, purchase_id)
    VALUES
        (1, 1),
        (4, 2),
        (3, 3),
        (3, 3);


