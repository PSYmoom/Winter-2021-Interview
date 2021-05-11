import express from 'express';
import { Pokemon, IReturnObject } from './pokemon/pokemon';

const app = express();
app.use(express.json());
const port = 8001; // default port to listen

// define a route handler for the default home page
app.get('/', async (_request: any, response: any) => {
  response.send({});
});

// Test the pokemon endpoint
app.get('/pokemon', async (request, response) => {
  const p = new Pokemon();
  // Sends in the requested name
  try {
    const pokemonNameList: string[] = String(request.query.name).split(',');
    const result = await p.getPokemonsByNameList(pokemonNameList);

    let returnObject: IReturnObject = {
      data: result
    }

    if (pokemonNameList.length != result.length) {
      returnObject.error = "Some pokemon names were invalid";
    }

    // Sends back the id of the pokemon
    response.send(returnObject);
  } catch (e) {
    console.log(e);
    response.status(500);
    response.send({
      error: 'Could not find pokemon'
    })
  }
});

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
