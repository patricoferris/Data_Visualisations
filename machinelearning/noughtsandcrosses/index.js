let trainingData = [];
let number_of_games = 1000;
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let player_one;
let player_two;

const winning_states = [
  [1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1],
  [1, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 1, 0, 1, 0, 0]
];

class Player {
  constructor() {
    this.states = [];
  }

  addState(state) {
    this.states.push(state);
  }

  getStates() {
    return this.states;
  }

  makeMove(board) {
    let position = Math.floor(Math.random() * 10);
    while(board[position] != 0) {
      position = Math.floor(Math.random() * 10);
    }
    board[position] = 1;
    return position;
  }
}

function setup() {
  createCanvas(640, 640);
  player_one = new Player();
  player_two = new Player();
}

let game_count = 0;
let player = 1;
function draw() {
  if(game_count > number_of_games) {
    noLoop();
  }

  let pos = 0;
  if(player == 1) {
    if(winning_states.every((state) => isNotEqual(state, board))){
      pos = player_one.makeMove(board);
      let clone = board.slice(0);
      player_one.addState(clone);
    } else {
      trainingData.push([player_two.getStates(), 'Win']);
      trainingData.push([player_one.getStates(), 'Lose']);
      reset();
    }
    drawBoard(board, 1, pos);
  } else {
    if(winning_states.every((state) => isNotEqual(state, board))) {
        pos = player_two.makeMove(board);
        let clone = board.slice(0);
        player_two.addState(clone);
    } else {
      trainingData.push([player_one.getStates(), 'Win']);
      trainingData.push([player_two.getStates(), 'Lose']);
      reset();
    }
    drawBoard(board, 2, pos);
  }

  if(player == 1) {
    player = 2
  } else {
    player = 1
  }
}

function drawBoard(board, player, pos) {
  let w = width/3;
  let h = height/3;
  let x = pos % 3;
  let y = Math.floor(pos/3);

  textSize(30);
  if(player == 1) {
    text('X', w*x, h*y, w, h);
  } else {
    text('O', w*x, h*y, w, h);
  }
}

function reset() {
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  player_one.states = [];
  player_two.states = [];
  background(255);
  game_count++;
  console.log(game_count + ' out of ' + number_of_games);
}


function isNotEqual(state, b) {
  let total = 0;
  for(let i = 0; i < state.length; i++) {
    total += (state[i] * b[i]);
  }

  if(total >= 3) {
    return false;
  }
  return true;
}
