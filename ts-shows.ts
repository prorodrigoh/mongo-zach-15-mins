import { ObjectId } from 'mongodb';
import { getDb } from './db';

// typescript here
interface TvShows {
  name: string;
  platformIds: string[];  // Array of strings
  genre: string;
  maturityRating: 'G'|'PG'|'PG-13'|'PG-15'|'NC-17'|'M'|'R'
}

const getCollection = async () => {
  const db = await getDb();
                    // typescript here
  return db.collection<TvShows>('tv-shows');
};
                                  // typescript here
export const createTvShows = async (tvShows: TvShows) => {
  const col = await getCollection();
                                // typescript here
  const ret = await col.insertOne(tvShows);

  return ret.insertedId;
};

export const getTvShows = async () => {
  const col = await getCollection();
  const ret = col.find({});
  return ret.toArray();
};
                                        // typescript here
export const getShowsByPlatform = async (platformId: ObjectId) => {
  const col = await getCollection();
  const ret = col.find({
    platformIds: { $all: [platformId] },
  });
  return ret.toArray();
};
                                  // typescript here
export const getShowsByName = async (name: string) => {
  const col = await getCollection();
  const ret = col.find({
    name: {
      $regex: `.*${name}.*`,
    },
  });
  return ret.toArray();
};
                                            // typescript here
export const getShowsByNameExactMatch = async (name: string) => {
  const col = await getCollection();
  const ret = col.find({
    name,
  });
  return ret.toArray();
};
