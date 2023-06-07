const { expect } = require('chai');
let {  driverAvailable } = require('../src/drivers');
let { ridersDriversMatch } = require('../src/matches');
let { rides, ridesBill, startRide, stopRide, rideBill } = require('../src/rides');






describe('Rides Module', () => {

    it('should start a ride and update driver availability', () => {
      const rideId = 'R1';
      const n = 1;
      const riderId = 'R1';
      const driverId = 'D1';
  
      ridersDriversMatch[riderId] = ['D1', 'D2', 'D3'];
      driverAvailable[driverId] = true;
  
      const result = startRide(rideId, n, riderId);
  
      expect(result).to.equal('RIDE_STARTED R1');
      expect(rides[rideId]).to.deep.equal({ driverId, riderId, rideStoped: false });
      expect(driverAvailable[driverId]).to.equal(false);
    });
  
    it('should stop a ride and calculate the bill', () => {
      const rideId = 'R1';
      const destinationX = 5;
      const destinationY = 5;
      const timeTaken = 10;
      const riderId = 'R1';
      const driverId = 'D1';
  
  
      const result = stopRide(rideId, destinationX, destinationY, timeTaken);
  
      expect(result).to.equal('RIDE_STOPPED R1');
      expect(rides[rideId].rideStoped).to.equal(true);
      expect(driverAvailable[driverId]).to.equal(true);
      expect(ridesBill[rideId]).to.deep.equal({ driverId, riderId, totalBill: 123 });
    });
  
    it('should return the bill for a completed ride', () => {
      const rideId = 'R1';
      const riderId = 'R1';
      const driverId = 'D1';
      const totalBill = 98;
  
      ridesBill[rideId] = { driverId, riderId, totalBill };
  
      const result = rideBill(rideId);
  
      expect(result).to.equal('BILL R1 D1 98.00');
    });
  
    // Add more test cases for other functions in the rides module if needed
  });
  