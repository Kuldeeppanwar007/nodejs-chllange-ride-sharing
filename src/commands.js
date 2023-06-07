const driversModule = require('./drivers');
const ridersModule = require('./riders');
const matchesModule = require('./matches');
const ridesModule = require('./rides');

const processCommand = (command) => {
  const commandParts = command.split(" ");
  const commandName = commandParts[0]?.trim();

  switch (commandName) {
    case "ADD_DRIVER": {
      const driverId = commandParts[1]?.trim();
      const xCoordinate = parseInt(commandParts[2]?.trim());
      const yCoordinate = parseInt(commandParts[3]?.trim());
      driversModule.addDriver(driverId, xCoordinate, yCoordinate);
      break;
    }

    case "ADD_RIDER": {
      const riderId = commandParts[1]?.trim();
      const xCoordinate = parseInt(commandParts[2]?.trim());
      const yCoordinate = parseInt(commandParts[3]?.trim());
      ridersModule.addRider(riderId, xCoordinate, yCoordinate);
      break;
    }

    case "MATCH": {
      const riderId = commandParts[1]?.trim();
      const result = matchesModule.matchRider(riderId);
      console.log(result);
      break;
    }

    case "START_RIDE": {
      const rideId = commandParts[1]?.trim();
      const n = parseInt(commandParts[2]?.trim());
      const riderId = commandParts[3]?.trim();
      const result = ridesModule.startRide(rideId, n, riderId);
      console.log(result);
      break;
    }

    case "STOP_RIDE": {
      const rideId = commandParts[1]?.trim();
      const destinationX = parseInt(commandParts[2]?.trim());
      const destinationY = parseInt(commandParts[3]?.trim());
      const timeTaken = parseInt(commandParts[4]?.trim());
      const result = ridesModule.stopRide(rideId, destinationX, destinationY, timeTaken);
      console.log(result);
      break;
    }

    case "BILL": {
      const rideId = commandParts[1]?.trim();
      const result = ridesModule.rideBill(rideId);
      console.log(result);
      break;
    }

    default:
      console.log("Invalid command");
      break;
  }
};

module.exports = {
  processCommand,
};
