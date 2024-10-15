/**
 * Gets a random multiplication, division, subtraction or addition question
 * 
 * @returns {} The randomly generated math question
 */
function getQuestion() {
    const operations = ["-","+","*","/"];
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let question = "";
    let answer = 0;

    switch(operation) {
        case "+":
            question = `What is ${num1} + ${num2}?`;
            answer = num1 + num2;
            break;
        case "-":
            question = `What is ${num1} - ${num2}?`;
            answer = num1 - num2;
            break;
        case "*":
            question = `What is ${num1} x ${num2}?`;
            answer = num1 * num2;
            break;
        case "/":
            const product = num1 * num2;
            question = `What is ${product} / ${num2}?`;
            answer = num1;
            break;
    }
    return {question, answer}
}

/**
 * Parses the provided question and gets whether or not the provided answer is correct
 * 
 * @param {*} question The question being answered
 * @param {*} answer The potential answer
 * @returns {boolean} True if the answer was correct, false otherwise.
 */
function isCorrectAnswer(question, answer) {
    return false;
}

module.exports = {
    getQuestion,
    isCorrectAnswer
}