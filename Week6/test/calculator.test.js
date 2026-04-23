const { expect } = require('chai');
const request = require('supertest');
const app = require('../server');
const { divideNumbers } = require('../utils/calculator');

describe('Calculator project', () => {
  describe('GET /api/calculate', () => {
    it('returns 200 and the result for valid numbers', (done) => {
      request(app)
        .get('/api/calculate?first=10&second=2')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.text).to.include('Result: 5');
          done(err);
        });
    });

    it('returns 400 when a query parameter is missing', (done) => {
      request(app)
        .get('/api/calculate?first=10')
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.text).to.include('Missing required query parameters');
          done(err);
        });
    });
  });

  describe('divideNumbers function', () => {
    it('divides two valid numbers correctly', () => {
      expect(divideNumbers(8, 4)).to.equal(2);
    });

    it('throws an error when dividing by zero', () => {
      expect(() => divideNumbers(8, 0)).to.throw('Cannot divide by zero');
    });
  });
});