const _ = require('lodash');
const {fetchInput} = require('../../utils/basics');


function elevStatus (input) {
  return input.reduce((acc, depth, index) => {
    if (acc.length <= 0) {
      acc.push(0);
      return acc;
    }
    if (depth > input[index-1]) {
      acc.push(1);
    }
    else if (depth < input[index-1]) {
      acc.push(-1);
    }
    else acc.push(0);
    return acc;
  }, []);
}
function windowIncrease (input, windowSize) {
  const windowSums = input.map((_depth, index) => {
    const left = (index - windowSize) + 1;
    if (left < 0) return null;
    const window = _.slice(input, left < 0 ? 0 : left, index + 1);
    return _.sum(window);
  }).filter(i => i != null);
  return elevStatus(windowSums);
}

const exampleInput = fetchInput('day1.example').map(i => parseInt(i));
const actualInput = fetchInput('day1').map(i => parseInt(i));

const totalInclines = windowIncrease(actualInput, 1).filter(i => i > 0).length;
const totalHills = windowIncrease(actualInput, 3).filter(i => i > 0).length;

console.info(`Inclines: ${totalInclines}. Hills: ${totalHills}`);