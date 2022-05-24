import { ObjectId } from 'mongodb';
import { getDb } from './db';

interface Character {
  name: string;
  tvShowId: ObjectId;
}

const getCollection = async () => {
  const db = await getDb();
                  // typescript here
  return db.collection<Character>('characters');
};
                                        // typescript here
export const createCharacters = async (character: Character) => {
  const col = await getCollection();
  const ret = await col.insertOne(character);

  return ret.insertedId;
};

export const getCharacters = async () => {
  const col = await getCollection();
  const ret = col.find({});
  return ret.toArray();
};
                                            // typescript here
export const getCharactersByTvShow = async (tvShowId: ObjectId) => {
  const col = await getCollection();
  const ret = col.find({tvShowId});
  return ret.toArray();
};
