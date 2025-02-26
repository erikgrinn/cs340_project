-- cars
SELECT car_id, make_model, year, price, is_used, in_stock FROM Cars;
INSERT INTO Cars (make_model, year, price, is_used, in_stock)
VALUES (:make_modelInput, :yearInput, :priceInput, :isUsedInput, :inStockInput);
UPDATE Cars 
SET make_model = :make_modelInput, year = :yearInput, price = :priceInput, is_used = :isUsedInput, in_stock = inStockInput
WHERE car_id = :carIDSelected;
DELETE FROM Cars WHERE car_id = :carIDSelected;

-- purchases
SELECT purchase_id, customer_id, dealership_id, employee_id, purchase_date, quantity, total_price FROM Purchases;
INSERT INTO Purchases (customer_id, dealership_id, employee_id, purchase_date, quantity, total_price)
VALUES (:customerIDInput, :dealershipIDInput, :employeeIDInput, :purchaseDateInput, :quantityInput, :totalPriceInput);
UPDATE Purchases 
SET customer_id = :customerIDInput, dealership_id = :dealershipIDInput, employee_id = :employeeIDInput, 
    purchase_date = :purchaseDateInput, quantity = :quantityInput total_price = :totalPriceInput
WHERE purchase_id = :purchaseIDSelected;
DELETE FROM Purchases WHERE purchase_id = :purchaseIDSelected;

-- cars_purchases
SELECT car_purch_id, purchase_id, car_id FROM Cars_Purchases;
INSERT INTO Cars_Purchases (purchase_id, car_id)
VALUES (:purchaseIDInput, :carIDInput);

-- customers
SELECT customer_id, first_name, last_name, email, phone_number FROM Customers;

INSERT INTO Customers (first_name, last_name, email, phone_number)
	VALUES (:fnameInput, :lnameInput, :emailInput, :phoneNumberInput);

DELETE FROM Customers WHERE customer_id = :customer_ID_selected;

UPDATE Customer SET first_name = :fnameInput, lname = :lnameInput, email = :emailInput, phone_number = :phoneNumberInput WHERE customer_id = :customer_ID_selected;

-- dealerships
SELECT dealership_id, city, quantity_sold, revenue FROM Dealerships;

INSERT INTO Dealerships (city, quantity_sold, revenue)
	VALUES (:cityInput, :quantitySold, :revenueInput);

DELETE FROM Dealerships WHERE dealership_id = dealership_ID_selected;

UPDATE Dealerships SET city = :cityInput, quantity_sold = :quantitySold, revenue = :revenueInput WHERE dealership_id = :dealership_ID_selected;


-- employees
SELECT employee_id, dealership_id, email, first_name, last_name, phone_number FROM Employees;

INSERT INTO Employees (dealership_id, email, first_name, last_name, phone_number)
	VALUES (:dealershipIDInput, :emailInput, :fnameInput, :lnameInput, :phoneNumberInput);

DELETE FROM Employees WHERE employee_id = employee_ID_selected;

UPDATE Employees SET dealership_id = :dealershipIDInput, email = :emailInput, first_name = :fnameInput, last_name = :lnameInput, phone_number = :phoneNumberInput WHERE employee_id = :employee_ID_selected;