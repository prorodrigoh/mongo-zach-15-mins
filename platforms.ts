import { getDb } from './db';

interface Platform {
  name: string;
}

const getCollection = async () => {
  const db = await getDb();
  // insert a generic type <Platform> to make sure only data of 
  // type platform is accepted to input or output
  // in case the shape changes, all other fields inside the interface
  // become optional newField?: type
  return db.collection<Platform>('platforms');
};

// change the parameter from name to platform: Platform
export const createPlatform = async (platform: Platform) => {
  const col = await getCollection();
  // change from name to platform
  const insertedResults = await col.insertOne(platform);

  return insertedResults.insertedId;
};

export const getPlatforms = async () => {
  const col = await getCollection();
  const ret = col.find({});
  return ret.toArray();
};
