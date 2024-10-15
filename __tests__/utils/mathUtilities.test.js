const { isCorrectAnswer, getQuestion } = require('../../utils/mathUtilities');

describe('Tests for getQuestion', () => {
    it('Ensuring valid question and answer', () => {
        const questionObject = getQuestion();

        expect(questionObject).toHaveProperty('question');
        expect(questionObject).toHaveProperty('answer');

        expect(typeof questionObject.question).toBe('string');
        expect(typeof questionObject.answer).toBe('number');
    });
});

describe('isCorrectAnswer Tests', () => {
    it('Ensuring detection of correct answer', () => {
        const questionObject = { question: 'What is 1 + 1?', answer: 2 };
        const userAnswer = 2; 
    
        expect(isCorrectAnswer(questionObject, userAnswer)).toBe(true);
    });

    it('Ensuring detection of incorrect answer', () => {
        const questionObject = { question: 'What is 1 + 1?', answer: 2 };
        const userAnswer = 5;

        // Ensure incorrect answer detection
        expect(isCorrectAnswer(questionObject, userAnswer)).toBe(false);
    });
});