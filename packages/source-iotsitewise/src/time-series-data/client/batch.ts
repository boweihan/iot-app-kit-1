const MAX_BATCH_RESULTS = 4000;

// [[entries, undefined], [entries, 200], [entries, 100]]
export const createEntryBatches = <T extends { maxResults?: number }>(entries: T[]) => {
  const buckets: { [key: number]: T[] } = {};

  entries.forEach((entry) => {
    const key = entry.maxResults || MAX_BATCH_RESULTS;

    if (buckets[key]) {
      buckets[key] = buckets[key].concat([entry]);
    } else {
      buckets[key] = [entry];
    }
  });

  return Object.keys(buckets).map((key): [T[], number | undefined] => [buckets[Number(key)], Number(key)]);
};
