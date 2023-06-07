const { expect } = require('chai');
let { riders, addRider } = require('../src/riders');



describe('Riders Module', () => {
    it('should add a new rider', () => {
      addRider('R1', 1, 2);
  
      expect(riders).to.have.property('R1');
      expect(riders['R1']).to.deep.equal({ x: 1, y: 2 });
    });
  
    // Add more test cases for other functions in the riders module if needed
  });