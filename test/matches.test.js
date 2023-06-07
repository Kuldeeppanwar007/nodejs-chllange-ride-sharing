const { expect } = require('chai');
let { drivers, driverAvailable } = require('../src/drivers');
let {  addRider } = require('../src/riders');
let { ridersDriversMatch, matchRider } = require('../src/matches');



  // matches.test.js
  describe('Matches Module', () => {

    it('should match a rider with available drivers', () => {
      const driver1 = { x: 1, y: 1 };
      const driver2 = { x: 2, y: 2 };
      const driver3 = { x: 3, y: 3 };
      const driver4 = { x: 4, y: 4 };
      const driver5 = { x: 5, y: 5 };
      const riderId = 'R1';
  
      drivers['D1'] = driver1;
      drivers['D2'] = driver2;
      drivers['D3'] = driver3;
      drivers['D4'] = driver4;
      drivers['D5'] = driver5;
      driverAvailable['D1'] = true;
      driverAvailable['D2'] = true;
      driverAvailable['D3'] = true;
      driverAvailable['D4'] = true;
      driverAvailable['D5'] = true;
  
      addRider(riderId, 0, 0);
      const result = matchRider(riderId);
  
      expect(result).to.equal('DRIVERS_MATCHED D1 D2 D3');
      expect(ridersDriversMatch[riderId]).to.deep.equal(['D1', 'D2', 'D3']);
    });
  
    // Add more test cases for other functions in the matches module if needed
  });
  