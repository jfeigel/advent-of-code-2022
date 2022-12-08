import fs from 'fs';

function parseInput() {
  return fs
    .readFileSync('src/day.1.input.txt')
    .toString()
    .split(/\n{1}/)
    .reduce<number[]>((totals, cals) => {
      if (cals === '') {
        totals.push(0);
      } else {
        totals[totals.length - 1] = totals[totals.length - 1] + parseInt(cals);
      }

      return totals;
    }, []);
}

export function part1() {
  const results = parseInput();

  return Math.max(...results);
}

export function part2() {
  const [a, b, c] = parseInput().sort((a, b) => b - a);

  return a + b + c;
}
