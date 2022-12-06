import { MinPriorityQueue } from "./data-structure";

export type Graph = {
  vertices: Record<string, Record<string, number>>;
  getNeighbors: (key: string) => string[];
  getDistance: (x: string, y: string) => number;
};

export function dijkstra(
  { getNeighbors, getDistance }: Graph,
  source: string,
  target: string
) {
  const distanceLookup = new Map();
  distanceLookup.set(source, 0);

  const predecessorLookup = new Map();
  predecessorLookup.set(source, undefined);

  const priorityQueue = new MinPriorityQueue();
  priorityQueue.insert(source, distanceLookup.get(source));

  while (priorityQueue.size > 0) {
    const { key } = priorityQueue.pop()!;

    if (key === target) {
      break;
    }

    for (const neighborKey of getNeighbors(key)) {
      const distance = distanceLookup.get(key) + getDistance(key, neighborKey);

      if (
        distance < (distanceLookup.get(neighborKey) || Number.POSITIVE_INFINITY)
      ) {
        distanceLookup.set(neighborKey, distance);
        predecessorLookup.set(neighborKey, key);

        if (priorityQueue.includes(neighborKey)) {
          priorityQueue.update(neighborKey, distance);
        } else {
          priorityQueue.insert(neighborKey, distance);
        }
      }
    }
  }

  return { distanceLookup, predecessorLookup };
}
