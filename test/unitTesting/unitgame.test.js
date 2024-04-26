const { generateRandomWord, calculateScore } = require('../../controllers/game.controller');

describe('Game Controller Unit Tests', () => {
    describe('generateRandomWord', () => {
        it('should return a word that starts with the specified letter', () => {
            const startingLetter = 'a';
            const word = generateRandomWord(startingLetter);
            expect(word[0].toLowerCase()).toBe(startingLetter);
        });

        it('should throw an error if the starting letter is invalid', () => {
            const startingLetter = '1';
            expect(() => generateRandomWord(startingLetter)).toThrow("Invalid starting letter.");
        });

        it('should throw an error if no words start with the provided letter', () => {
            const lastLetter = 'x';
            const customWords = ['ensalada', 'estrella', 'banana', 'blueberry', 'avocado'];
            expect(() => generateRandomWord(lastLetter, customWords)).toThrow("No words start with the provided starting letter.");
        });
        
        it('should handle cases when no starting letter is provided', () => {
            const word = generateRandomWord();
            expect(word).toBeTruthy();
            expect(typeof word).toBe('string');
        });
    });

    describe('calculateScore', () => {
        it('should calculate the score based on the length of the words array', () => {
            const wordsArray = ['manzana', 'naranja', 'limón'];
            const score = calculateScore(wordsArray);
            expect(score).toBe(wordsArray.length);
        });
    });
});
