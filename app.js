const express = require('express');
const ballDraw = require('./components/ballDraw');
const bingoCard = require('./components/bingoCard');
const gameQueue = require('./components/gameQueue');
const lineEval = require('./components/lineEval');
const payEval = require('./components/payEval');
const cors = require('cors');
const data = require('./components/data');
const reelStop = require('./components/reelStop');

const app = express();

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('hello bingo');
});

app.get('/ball-draw', (req, res) => {
  ballDraw.drawAllBalls();
  res.send(ballDraw.allBallsDrawn);
});

app.get('/bingo-card', (req, res) => {
  bingoCard.anotherCard();
  res.send(bingoCard.currentCardArray);
});

gameQueue.newBingoGame();
let i = 0;
app.get('/bingo-game', (req, res) => {  
  res.send(gameQueue.games[0].players[i]);
  i++
});

let g = 0
app.get('/all-bingo-game', (req, res) => {  
  res.send(gameQueue.games[g]);
  g++
});

// TODO handle bet level in request message
app.get('/class-3', (req, res) => {
  // lineEval.checkLineWins();
  data.playResult = [];
  payEval.creditsPerLine(reelStop.reelStrips);
  res.send(data.playResult);
});