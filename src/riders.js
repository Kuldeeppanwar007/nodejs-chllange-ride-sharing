// Initialize riders object
let riders = {};

// Function to add a rider
const addRider = (riderId, xCoordinate, yCoordinate) => {
  riders[riderId.trim()] = { x: xCoordinate, y: yCoordinate };
};

// Exporting riders object and addRider function
module.exports = {
  riders,
  addRider,
};