// drivers.test.js
const { expect } = require('chai');
let { drivers, driverAvailable, addDriver } = require('../src/drivers');

describe('Drivers Module', () => {

  it('should add a new driver', () => {
    addDriver('D1', 1, 2);
    expect(drivers).to.have.property('D1');
    expect(drivers['D1']).to.deep.equal({ x: 1, y: 2 });

    expect(driverAvailable).to.have.property('D1');
    expect(driverAvailable['D1']).to.equal(true);
  });

  it('should update driver coordinates', () => {
    addDriver('D1', 1, 2);
    expect(drivers['D1']).to.deep.equal({ x: 1, y: 2 });

    addDriver('D1', 3, 4);
    expect(drivers['D1']).to.deep.equal({ x: 3, y: 4 });
  });

  // Add more test cases for other functions in the drivers module if needed
});