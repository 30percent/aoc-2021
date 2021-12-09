const _ = require('lodash');
const {fetchInput} = require('../../utils/basics');

function basicSubMove(path) {
  return path.reduce((pos, move) => {
    let [dir, amt] = move.split(' ');
    switch(dir) {
      case 'forward':
        pos[1] += parseInt(amt);
        break;
      case 'down':
        pos[0] += parseInt(amt);
        break;
      case 'up':
        pos[0] -= parseInt(amt);
        break;
    }
    return pos;
  }, [0,0])
}
/*
  Calculates final position of submarine based vaguely on idea of "up/down" pitch.
  Pitch affects next forward movement by modifying depth using (pitch * forward movement).
  path: Array of strings "<forward|up|down> <amount>"
  return: finalPosition of submarine in form [depth, distance, pitch]
*/
function aimSubMove(path) {
  // [v,h,a]
  return path.reduce((pos, move) => {
    let [dir, amtStr] = move.split(' ');
    let amt = parseInt(amtStr);
    switch(dir) {
      case 'forward':
        pos[1] += amt;
        pos[0] += pos[2] * amt;
        break;
      case 'down':
        pos[2] += amt;
        break;
      case 'up':
        pos[2] -= amt;
        break;
    }
    return pos;
  }, [0,0,0])
}
const actualPath = fetchInput('day2');
const posMoved = basicSubMove(actualPath);
const mulPosMoved = posMoved[0] * posMoved[1];
const aimMoved = aimSubMove(actualPath);
const mulActMoved = aimMoved[0] * aimMoved[1];
console.info(`Sub by point: ${mulPosMoved}. Sub by aim: ${mulActMoved}`);