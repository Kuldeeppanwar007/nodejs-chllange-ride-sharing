// Importing constants
const { FIXED_DECIMAL_PLACES, MATH_SQUARE } = require('./constants');

// Euclidean distance function
const euclideanDistance = (x1, y1, x2, y2) => {
  // Calculating the distance using the Euclidean formula
  return Math.sqrt(Math.pow(x2 - x1, MATH_SQUARE) + Math.pow(y2 - y1, MATH_SQUARE)).toFixed(FIXED_DECIMAL_PLACES);
};

// Exporting the euclideanDistance function
module.exports = euclideanDistance;