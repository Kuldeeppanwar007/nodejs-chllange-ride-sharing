// Initialize variables
let drivers = {};
let driverAvailable = {};

// Function to add a driver
const addDriver = (driverId, xCoordinate, yCoordinate) => {
  // Storing driver information
  drivers[driverId] = { x: xCoordinate, y: yCoordinate };
  driverAvailable[driverId] = true;
};

// Exporting variables and function
module.exports = {
  drivers,
  driverAvailable,
  addDriver,
};