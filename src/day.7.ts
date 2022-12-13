import fs from 'fs';

type ReturnValue = { dirs: string[]; size: number };
type Children = { [key: string]: TreeNode };

class TreeNode {
  name: string;
  size: number;
  level: number;
  children: Children;

  constructor(
    _name: string,
    _size: number = 0,
    _level: number = 0,
    _children: Children = {},
  ) {
    this.name = _name;
    this.size = _size;
    this.level = _level;
    this.children = _children;
  }
}

function parseInput() {
  return fs
    .readFileSync('src/day.7.input.txt')
    .toString()
    .split('\n')
    .filter((x) => x)
    .map((x) => x);
}

function createFS(input: string[]) {
  const filesystem = new TreeNode('/');
  let currentNode: TreeNode = filesystem;
  const pwd = [];

  const instructions = input.reduce((i, line) => {
    const args = line.split(' ');
    if (args[0] === '$') {
      i.push([line.slice(2)]);
    } else {
      i[i.length - 1].push(line);
    }

    return i;
  }, [] as string[][]);

  for (const instruction of instructions) {
    const [cmd, arg] = instruction[0].split(' ');

    if (cmd === 'cd') {
      if (arg === '..') {
        pwd.pop();
        currentNode = findNode(filesystem, pwd.slice(1));
      } else {
        pwd.push(arg);
        currentNode = arg === '/' ? filesystem : currentNode.children[arg];
      }
    } else if (cmd === 'ls') {
      instruction.shift();

      for (const item of instruction) {
        const args = item.split(' ');
        if (args[0] === 'dir') {
          if (!currentNode.children[args[1]]) {
            currentNode.children[args[1]] = new TreeNode(
              args[1],
              0,
              currentNode.level + 1,
            );
          }
        } else {
          if (!currentNode.children[args[1]]) {
            currentNode.children[args[1]] = new TreeNode(
              args[1],
              parseInt(args[0]),
              currentNode.level + 1,
            );
          }
        }
      }
    }
  }

  return filesystem;
}

function findNode(node: TreeNode, path: string[]): TreeNode {
  if (path.length === 0) {
    return node;
  }

  const next = path.shift()!;
  return findNode(node.children[next], path);
}

function traverse(
  node: TreeNode,
  dirs: string[] = [],
  maxSize?: number,
): ReturnValue {
  let { size } = node;

  if (node.size === 0) {
    for (const child in node.children) {
      size += traverse(node.children[child], dirs, maxSize).size;
    }

    if (!maxSize) {
      dirs.push(`${node.name}|${size}`);
    } else if (size < maxSize) {
      dirs.push(`${node.name}|${size}`);
    }
  }

  return { dirs, size };
}

function printFS(node: TreeNode) {
  const prefix = node.level === 0 ? '|_' : `  ${'| '.repeat(node.level - 1)}|_`;
  const suffix = node.size === 0 ? '(dir)' : `(file, size=${node.size})`;
  console.log(`${prefix} ${node.name} ${suffix}`);

  if (node.size === 0) {
    for (const child in node.children) {
      printFS(node.children[child]);
    }
  }
}

export function part1() {
  const filesystem = createFS(parseInput());

  const { dirs } = traverse(filesystem, [], 100000);

  const calcVal = dirs.reduce(
    (total, dir) => total + parseInt(dir.split('|')[1]),
    0,
  );

  return calcVal;
}

export function part2() {
  const UNUSED_SIZE = 40000000;

  const input = parseInput();
  const filesystem = createFS(input);
  const { dirs } = traverse(filesystem);

  let sizeNeeded = 0;
  for (const dir of dirs) {
    const [name, size] = dir.split('|');

    if (name === '/') {
      sizeNeeded = parseInt(size) - UNUSED_SIZE;
      break;
    }
  }

  const sorted = dirs.sort(
    (a, b) => parseInt(a.split('|')[1]) - parseInt(b.split('|')[1]),
  );

  let matchSize = 0;
  for (const dir of sorted) {
    const [, _size] = dir.split('|');
    const size = parseInt(_size);

    if (size > sizeNeeded) {
      matchSize = size;
      break;
    }
  }

  return matchSize;
}
