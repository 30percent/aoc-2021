const _ = require('lodash');
const {fetchInput,matrixTranspose} = require('../../utils/basics');

function parseBoard(board) {
  const input = board[0].split(',');

  const players = [];
  let ind = 1;
  while(ind < board.length) {
    const playerStrs = board.slice(ind, ind+5);
    players.push(playerStrs.map(row => row.trim().split(/\s+/)));
    ind += 5;
  };
  return {
    calls: input,
    players
  }
}

function locWithNumber(playBoard, number) {
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      if (playBoard[x][y] == number) return [x,y];
    }
  }
}

function activeWinner(active) {
  //check rows
  let hasWin = active.findIndex(row => _.without(row, 'O').length == 5) >= 0;
  if (hasWin) return true;
  //check cols
  let colActive = matrixTranspose(active);
  hasWin = colActive.findIndex(row => _.without(row, 'O').length == 5) >= 0;
  if (hasWin) return true;
  return false;
}

function createMarkBoard() {
  return _.range(5).map(() => _.times(5, _.constant('O')));
}

function findWinner(game) {
  let winnerOrder = [];
  let winners = []
  let curCallInd = -1;
  const actives =game.players.map(() => {
    return createMarkBoard()
  })
  while (winnerOrder.length < game.players.length && curCallInd < game.calls.length) {
    curCallInd += 1;
    const callout = game.calls[curCallInd];
    game.players
      .map((playerBoard) => locWithNumber(playerBoard, callout))
      .forEach((loc, playerI) => {
        let noWinYet = winnerOrder.find(i => i == playerI) == null;
        if (loc) {
          if (noWinYet) {
            actives[playerI][loc[0]][loc[1]] = 'X';
          }
        }
      });
    actives.forEach((active, ind) => {
      let isWinner = activeWinner(active);
      let noWinYet = winnerOrder.find(i => i == ind) == null
      if ( isWinner && noWinYet ) {
        winners.push({
          finalCall: callout,
          markedBoard: active,
          playBoard: game.players[ind]
        })
        winnerOrder.push(ind);
      };
    })
  }

  return winners;
}

function calcFirstScore(winStatus) {
  let activeSum = 0;
  const {finalCall, markedBoard, playBoard} = _.first(winStatus);
  _.forEach(markedBoard, (codeList, x) => {
    _.forEach(codeList, (code, y) => {
      if (code === 'O') activeSum += parseInt(playBoard[x][y])
    })
  })
  return activeSum * finalCall;
}
function calcLastScore(winStatus) {
  let activeSum = 0;
  const {finalCall, markedBoard, playBoard} = _.last(winStatus);
  _.forEach(markedBoard, (codeList, x) => {
    _.forEach(codeList, (code, y) => {
      if (code === 'O') activeSum += parseInt(playBoard[x][y])
    })
  })
  return activeSum * finalCall;
}

const exampleGame = parseBoard(fetchInput('day4'));
const result = findWinner(exampleGame);
const final = calcLastScore(result);
const first = calcFirstScore(result);
console.info(`First Winner: ${first} Final Winner: ${final}`);