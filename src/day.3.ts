import fs from 'fs';

function parseInput() {
  return fs
    .readFileSync('src/day.3.input.txt')
    .toString()
    .split('\n')
    .filter((x) => x.length);
}

function getCode(c: string) {
  return c.charCodeAt(0) - (c.charCodeAt(0) < 97 ? 64 - 26 : 64 + 32);
}

export function part1() {
  const input = parseInput().map((x) => [
    x.slice(0, x.length / 2),
    x.slice(x.length / 2),
  ]);

  return input.reduce((total, items, i) => {
    const [a, b] = items;

    const getValue = (x: string, y: string): number => {
      let error = 0;

      for (const z of x) {
        if (y.includes(z)) {
          error = getCode(z);
          break;
        }
      }

      return error || getValue(y, x);
    };

    return total + getValue(a, b);
  }, 0);
}

export function part2() {
  const groups: string[][] = [];
  const input = parseInput();

  let total = 0;

  input.map((rucksack, i) => {
    if (i % 3 === 0) {
      groups.push([rucksack]);
    } else {
      groups[groups.length - 1].push(rucksack);
    }
  });

  for (const group of groups) {
    const groupMatches: { [key: string]: number } = {};
    let uniqTypes = '';

    for (const rucksack of group) {
      let _type = '';
      for (const item of rucksack) {
        if (!_type.includes(item)) _type += item;
      }
      uniqTypes += _type;
    }

    for (const uniqType of uniqTypes) {
      if (groupMatches[uniqType]) {
        if (++groupMatches[uniqType] === 3) {
          total += getCode(uniqType);
          break;
        }
      } else groupMatches[uniqType] = 1;
    }
  }

  return total;
}
