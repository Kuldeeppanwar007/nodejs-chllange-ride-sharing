// Importing modules and constants
const euclideanDistance = require('./euclideanDistance');
const { riders } = require('./riders');
const { drivers, driverAvailable } = require('./drivers');
const { MAX_DISTANCE_THRESHOLD, ZERO_AVAIALBLE_DRIVERS, TOP_N_DRIVERS, INVALID_RIDE, NO_DRIVERS_AVAILABLE, DRIVERS_MATCHED } = require('./constants');

// Variable to store rider-driver matches
let ridersDriversMatch = {};

// Function to get the top N drivers
const getTopNDrivers = (availableDrivers) => {
  return availableDrivers.slice(0, TOP_N_DRIVERS).map(({ driverId }) => driverId);
}

// Function to match a rider with drivers
const matchRider = (riderId) => {
  if (!riders.hasOwnProperty(riderId)) {
    return INVALID_RIDE;
  }

  // Extracting rider coordinates
  const { x: riderX, y: riderY } = riders[riderId];

  // Array to store available drivers
  let availableDrivers = [];

  // Iterating through drivers to find available and nearby drivers
  for (const [driverId, { x: driverX, y: driverY }] of Object.entries(drivers)) {
    const distance = euclideanDistance(riderX, riderY, driverX, driverY);
    if (distance <= MAX_DISTANCE_THRESHOLD && driverAvailable[driverId]) {
      availableDrivers.push({ distance, driverId });
    }
  }

  // Checking if no available drivers found
  if (availableDrivers.length === ZERO_AVAIALBLE_DRIVERS) {
    return NO_DRIVERS_AVAILABLE;
  }

  // Sorting available drivers by distance and driverId
  availableDrivers.sort((a, b) => {
    if (a.distance !== b.distance) {
      return a.distance - b.distance;
    } else {
      return a.driverId.localeCompare(b.driverId);
    }
  });

  // Getting the top N matched drivers
  const matchedDrivers = getTopNDrivers(availableDrivers);

  // Storing the matched drivers for the rider
  ridersDriversMatch[riderId] = matchedDrivers;

  return `${DRIVERS_MATCHED} ${matchedDrivers.join(" ")}`;
};

// Exporting functions and variables
module.exports = {
  matchRider,
  ridersDriversMatch
};