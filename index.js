const express = require('express');
const app = express();
const port = 3000;
const { getQuestion, isCorrectAnswer } = require('./utils/mathUtilities');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public')); 

let currentQuestion = null;
let streak = 0;
let leaderboards = [];  

// Route to display the home page
app.get('/', (req, res) => {
    res.render('index', { streak });
});

// Route to display the quiz page
app.get('/quiz', (req, res) => {
    currentQuestion = getQuestion();  
    res.render('quiz', { question: currentQuestion.question, streak });  
});

// Handle form submission with the user's answer
app.post('/quiz', (req, res) => {
    const userAnswer = req.body.answer;  
    const isCorrect = isCorrectAnswer(currentQuestion, userAnswer);  

    if (isCorrect) {
        streak += 1;  
        res.redirect('/quiz');  
    } else {
        if (streak > 0) {
            leaderboards.push({ streak, date: new Date().toLocaleString() });  
        }
        const finalStreak = streak;
        streak = 0;  
        res.redirect(`/completion?streak=${finalStreak}`);  
    }
});

// Route to display the completion page
app.get('/completion', (req, res) => {
    const finalStreak = req.query.streak;  
    res.render('completion', { finalStreak });  
});

// Route to display the leaderboard page
app.get('/leaderboards', (req, res) => {
    const sortedLeaderboards = leaderboards.sort((a, b) => b.streak - a.streak).slice(0, 10);
    res.render('leaderboards', { leaderboards: sortedLeaderboards });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});