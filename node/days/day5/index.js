const _ = require('lodash');
const {fetchInput} = require('../../utils/basics');

function pathAngle(coords) {
  if (coords[0][0] != coords[1][0]){
    if (coords[0][1] != coords[1][1]) {
      return 'd';
    }
    return 'h'
  } else {
    return 'v'
  }
}
function parseVents(input) {
  return input.map((line) => {
    let coords = line.split('->').map(point => point.trim().split(',').map(p => parseInt(p)));
    return {
      from: coords[0],
      to: coords[1],
      path: pathAngle(coords)
    }
  })
}

function findBox(vents) {
  let xMax = 0;
  let yMax = 0;
  vents.forEach(v => {
    xMax = _.max([xMax, v.from[0], v.to[0]])
    yMax = _.max([yMax, v.from[1], v.to[1]]);
  })
  return [xMax, yMax];
}
function calcPath(start, end) {
  const xDist = end[0] - start[0];
  const yDist = end[1] - start[1];
  const xDir = xDist != 0 ? xDist / Math.abs(xDist) : 0;
  const yDir = yDist != 0 ? yDist / Math.abs(yDist) : 0;
  const fullDist = _.max([Math.abs(xDist), Math.abs(yDist)]);
  return _.range(fullDist + 1).map((_ign, step) => {
    _.noop(xDir, yDir);
    let x = start[0] + (step * xDir);
    let y= start[1] + (step * yDir);
    return [x,y]
  });
}
function createVentMap(vents, skipDiag) {
  let bound = findBox(vents);
  let map = _.range(0, bound[1] + 1).map(() => _.range(0, bound[0] + 1).map(() => 0))
  vents.forEach(vent => {
    try {
      _.noop(vents);
      let path = calcPath(vent.from, vent.to);
      if (skipDiag && vent.path == 'd') {
        return;
      }
      path.forEach((i) => {
        map[i[1]][i[0]] += 1;
      });
      _.noop();
    } catch (e) {
      console.error(e);
    }
  })
  return map;
}

function calcDangerous(map, dangerLevel) {
  return map.reduce((acc, row) => {
    acc += row.filter(c => c >= dangerLevel).length;
    return acc;
  }, 0)
}

const lines = parseVents(fetchInput('day5'));
const singleAxisVents = createVentMap(lines, true);
const pointsWithVentsSingleAxis = calcDangerous(singleAxisVents, 2);
const allVents = createVentMap(lines);
const pointsWithVents = calcDangerous(allVents, 2);
console.info(`SingleAxis: ${pointsWithVentsSingleAxis}. All Dangerous: ${pointsWithVents}`)