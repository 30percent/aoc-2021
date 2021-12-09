const _ = require('lodash');
const {fetchInput} = require('../../utils/basics');

function calcRate(input, comp) {
  return _.zip(...input)
    .map(column => {
      let cntOne = column.filter(i => i > 0).length;
      return comp(column.length - cntOne, cntOne) ? 0 : 1;
    })

}

let gammaComp = (zero, one) => zero > one;
let epsilonComp = (zero, one) => zero <= one;

function findMatchCriteria(input, comp, position) {
  if (input.length === 1) {
    return input[0];
  } else if (input.length < 1) {
    return [0];
  }
  const rate = calcRate(input, comp);
  const nextInp = input.filter(i => i[position] == rate[position]);
  return findMatchCriteria(nextInp, comp, position + 1);
}

function multiplyRatings(first, second) {
  let fNum = parseInt(first.join(''), 2);
  let sNum = parseInt(second.join(''), 2);
  return fNum * sNum;
}

const actualDiag = fetchInput('day3').map(i => {
  return i.split('').map(i => parseInt(i))
});
const actualGamma = calcRate(actualDiag, gammaComp);
const actualEpsilon = calcRate(actualDiag, epsilonComp);
const powerCon = multiplyRatings(actualGamma, actualEpsilon);

const oxygenRating = findMatchCriteria(actualDiag, gammaComp, 0);
const co2Rating = findMatchCriteria(actualDiag, epsilonComp, 0);
const lifeSupport = multiplyRatings(oxygenRating, co2Rating);
console.info(`Power consumption: ${powerCon}. Life Support: ${lifeSupport}`);