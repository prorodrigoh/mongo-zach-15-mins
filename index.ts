import {
  createCharacters,
  getCharactersByTvShow,
} from './characters';
import { createPlatform, getPlatforms } from './platforms';
import {
  createTvShows,
  getShowsByName,
  getShowsByPlatform,
  getTvShows,
} from './ts-shows';

// because we are converting to ES5, we cannot use top-level await
// we have to wrap everything with const run = async () => { }
const run = async () => {

      // we have to change all the input to satisfy the interface 
    await createPlatform({name: 'Netflix', price: 10, hasFreeTrial: false});
    await createPlatform({name: 'Hulu', price: 10, hasFreeTrial: true});

    const platforms = await getPlatforms();

    await createTvShows(
      {name: '30 Rock', 
      platformIds: [platforms[0]._id.toString(), platforms[1]._id.toString()],
      genre: 'Action',
      maturityRating: 'PG'
      });

    await createTvShows(
      {name: 'The Office', 
      platformIds: [platforms[0]._id.toString(), platforms[1]._id.toString()],
      genre: 'Drama',
      maturityRating: 'NC-17'
      });

    const showsByPlatforms = await getShowsByPlatform(platforms[0]._id);
    console.log(`${platforms[0].name} 2nd TV Show: ${showsByPlatforms[1].name}`);

    const tvShows = await getTvShows();
    console.log(tvShows);

    await createCharacters({name: 'Michael Scott', tvShowId: tvShows[1]._id.toString()});
    await createCharacters({name: 'Pam Beasley', tvShowId: tvShows[1]._id.toString()});

    const characters = await getCharactersByTvShow(showsByPlatforms[1]._id.toString());
    console.log(`These are my characters ${characters}`);
    const tvShowsByName = await getShowsByName('30');
    console.log(tvShowsByName);

}

run();