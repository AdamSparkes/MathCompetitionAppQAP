const express = require('express');
const app = express();
const port = 3000;
const mathUtilities = require('./utils/mathUtilities')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static('public')); // To serve static files (e.g., CSS)

let currentQuestion = null;
let streak = 0;
let leaderboards = []


app.get('/', (req, res) => {
    res.render('index', {streak});
});

app.get('/quiz', (req, res) => {
    currentQuestion = mathUtilities.getQuestion(); 
    res.render('quiz', { question: currentQuestion.question, streak }); 
});

app.post('/quiz', (req, res) => {
    const userAnswer = parseInt(req.body.answer, 10);
    const correctAnswer = currentQuestion.answer;

    if (userAnswer === correctAnswer) {
        streak += 1; 
        res.redirect('/quiz');
    } else {
        if (streak > 0) {
            leaderboards.push({ streak, date: new Date().toLocaleString() });
        }
        const finalStreak = streak;
        streak = 0; // Reset the streak
        res.render('completion', { finalStreak });
    }
});
app.get('/leaderboards', (req, res) => {
    
    const sortedLeaderboards = leaderboards.sort((a, b) => b.streak - a.streak).slice(0, 10);
    res.render('leaderboards', { leaderboards: sortedLeaderboards });
});
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});