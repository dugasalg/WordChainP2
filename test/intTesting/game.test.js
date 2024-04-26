const { get } = require("mongoose");

const supertest = require('supertest');
const app = require('../../app'); // Make sure this imports your initialized Express app

describe('Integration Tests', () => {
  describe('User name validation', () => {
    it.skip('should allow only alphanumeric usernames', async () => {
      const response = await supertest(app)
        .post('/users/')
        .send({ userName: 'testUser'});
      expect(response.statusCode).toBe(201);
      expect(response.body.userName).toMatch(/^[a-zA-Z0-9]+$/);
    }, 15000);  // Increased timeout

    it.skip('should reject usernames with special characters', async () => {
      const response = await supertest(app)
        .post('/users/')
        .send({ userName: 'testUser@123', score: 10 });
      expect(response.statusCode).toBe(500);
    }, 10000);
  });

  describe('Word and user ID sending', () => {
    it.skip('should accept a valid user ID and word containing only letters', async () => {
      const response = await supertest(app)
      .post('/game/play')
      .send({ userId: "6629dc76a7c52d88549784bf", word: "onalsalvaje" })
      .expect(200); // Expecting a 200 OK status if the word is correct and the game continues

      expect(response.body.message).toBe("Correct! Continue playing.");
      expect(response.body.game).toBeDefined();
    }, 1000000);

    it.skip('should only accept words containing letters', async () => {
      const response = await supertest(app)
        .post('/game/play')
        .send({ userId: "6629dc76a7c52d88549784bf", word: "111" })
        .expect(400); // Expecting a 400 error status if the word is incorrect because it doesn't contain only letters
  
      // Asserting that the response body contains the specific error message for invalid words
      expect(response.body.message).toBe("Invalid word! Game over.");
    },15000);
  });

  describe('Scoreboard format validation', () => {
    it.skip('should return a correctly formatted scoreboard', async () => {
      const response = await supertest(app)
        .get('/score/get-top-players')
        .send();
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(2);

    }, 10000);  // Increased timeout
  });

  it.skip('should handle delayed response correctly', async () => {
    jest.useRealTimers();
  
    const promise = supertest(app)
      .post('/game/play')
      .send({ userId: "6629f30e218e0bb87dc2ad1f", word: "a" })
      
  
    jest.advanceTimersByTime(20000); // Simulate 20-second delay
  
    const response = await promise; // Await the promise only after the timer advance
    
    
    console.log(response.body);

    expect(response.status).toBe(200);
    
    
    expect(response.body.message).toBe("Time's up! Game over.");
  
    jest.useRealTimers();
  },15000);
});
