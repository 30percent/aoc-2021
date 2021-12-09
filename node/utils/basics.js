const fs = require('fs');
function fetchInput(name) {
  let splitFile = fs.readFileSync(`${__dirname}/../../inputs/${name}.txt`, 'utf8').split('\n');
  return splitFile.filter((i) => i.trim() !== '');
}

function matrixTranspose(arr) {
  return arr[0].map((x,i) => arr.map(x => x[i]));
}
module.exports = {
  fetchInput,
  matrixTranspose,
}