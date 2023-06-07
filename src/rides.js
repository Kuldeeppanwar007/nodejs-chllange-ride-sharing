// Importing modules and constants
const euclideanDistance = require('./euclideanDistance');
const { riders } = require('./riders');
const { drivers, driverAvailable } = require('./drivers');
const { ridersDriversMatch } = require('./matches');
const { BASE_FARE, PER_KM_FARE, PER_MINUTE_FARE, FIXED_DECIMAL_PLACES, SERVICE_TAX, INVALID_RIDE, RIDE_STARTED, RIDE_STOPPED, RIDE_NOT_COMPLETED, BILL } = require('./constants');

// Variables to store ride information and ride bills
let rides = {};
let ridesBill = {};

// Function to start a ride
const startRide = (rideId, n, riderId) => {
  if (rides.hasOwnProperty(rideId) || !riders.hasOwnProperty(riderId)) {
    return INVALID_RIDE;
  }

  if (n > Object.keys(drivers).length) {
    return INVALID_RIDE;
  }

  const driverId = Object.values(ridersDriversMatch[riderId])[n - 1];
  if (Object.values(rides).includes(driverId)) {
    return INVALID_RIDE;
  }
  
  rides[rideId] = { driverId, riderId, rideStoped: false };
  driverAvailable[driverId] = false;

  return `${RIDE_STARTED} ${rideId}`;
};

// Function to generate ride bill
const generateRideBill = (rideId, destinationX, destinationY, timeTaken, driverId, riderId) => {
  const { x: riderX, y: riderY } = riders[riderId];
  const distanceR = euclideanDistance(riderX, riderY, destinationX, destinationY);
  const bill = BASE_FARE + parseFloat((distanceR * PER_KM_FARE).toFixed(FIXED_DECIMAL_PLACES)) + timeTaken * PER_MINUTE_FARE;
  const serviceTax = SERVICE_TAX * bill;
  const totalBill = parseFloat(bill + serviceTax);
  
  ridesBill[rideId] = { driverId, riderId, totalBill };
};

// Function to stop a ride
const stopRide = (rideId, destinationX, destinationY, timeTaken) => {
  if (!rides.hasOwnProperty(rideId)) {
    return INVALID_RIDE;
  }
  
  if (rides[rideId].rideStoped) {
    return INVALID_RIDE;
  }
  
  const { driverId, riderId } = rides[rideId];
  rides[rideId].rideStoped = true;
  driverAvailable[driverId] = true;
  
  generateRideBill(rideId, destinationX, destinationY, timeTaken, driverId, riderId);
  
  return `${RIDE_STOPPED} ${rideId}`;
};

// Function to get the ride bill
const rideBill = (rideId) => {
  if (!ridesBill.hasOwnProperty(rideId) && !rides.hasOwnProperty(rideId)) {
    return INVALID_RIDE;
  }
  
  if (!ridesBill.hasOwnProperty(rideId) && rides.hasOwnProperty(rideId)) {
    return RIDE_NOT_COMPLETED;
  }
  
  const { driverId, totalBill } = ridesBill[rideId];
  
  return `${BILL} ${rideId} ${driverId} ${Number(totalBill).toFixed(FIXED_DECIMAL_PLACES)}`;
};

// Exporting functions and variables
module.exports = {
  startRide,
  stopRide,
  rideBill,
  ridesBill,
  rides
};