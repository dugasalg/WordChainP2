const GameModel = require("../../models/game.model");
const UserModel = require("../../models/user.model");
const ScoreboardModel = require("../../models/score.model");

const supertest = require('supertest');
const app = require('../../app');

describe("API should meet the following services and validations", function() {
    describe("It should have a user registration service by name, which should return a user identifier for use in subsequent services", function() {
        it("Create user", function(done) {
            const user = {
                userName: "Pancho123"
            };
            
            supertest(app)
                .post('/users/')
                .send(user)
                .expect(201)
                .end(function(err, res) {
                    if (err) return done(err);
                    // Additional assertions can be made here
                    done();
                });
        });

        it('Should not accept names with special characters', async () => {
            const response = await supertest(app)
                .post('/users/')
                .send({ userName: 'User@123' })
                .expect(500); 
            expect(response.body.error).toBeDefined();
        });
    });

    describe.skip("Should have a play service where the user ID and a word are sent as parameters, which will start the game", function() {
        it('Should validate the sending of the user ID and a word, which should only contain letters', async () => {
            const response = await supertest(app)
                .post('/game/')
                .send({ userId: 'someUserId', word: 'testWord' })
                .expect(500); // Adjust the status code based on actual handling
            expect(response.body.error).toBeDefined();
        });

        it('Should not accept words with special characters', async () => {
            const response = await supertest(app)
                .post('/game/')
                .send({ userId: 'someUserId', word: 'Test@123' })
                .expect(500); // Adjust the status code based on actual handling
            expect(response.body.error).toBeDefined();
        });
    });
});
