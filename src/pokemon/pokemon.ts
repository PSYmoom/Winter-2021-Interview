import fetch from 'node-fetch';

export interface IPokemon {
  id: number;
  weight: number;
  height: number;
  moves: string[];
}

export interface IResponse {
  id: number;
  weight: number;
  height: number;
  moves: IMoveObject[];
}

export interface IMoveObject {
  move: {
    name: string;
  }
}

export interface IReturnObject {
  data: IPokemon[];
  error?: string;
}

export class Pokemon {
  url = 'https://pokeapi.co/api/v2/pokemon';

  /**
   * Gets the list of Pokemon info objects
   * @param names list of names
   */
   public async getPokemonsByNameList(names: string[]): Promise<IPokemon[]> {
    if (names == null) {
      return null;
    }

    let data: IPokemon[] = [];

    for (const name of names) {
      try {
        let response: IResponse = await this.getPokemonByName(name.toLowerCase());
        let pokemon: IPokemon = {
          id: response.id,
          weight: response.weight,
          height: response.height,
          moves: []
        };

        for (let moveObject of response.moves) {
          pokemon.moves.push(moveObject.move.name);
        }

        data.push(pokemon);
      } catch(e) {
        // Do nothing
      }
    }

    return data;
   }

  /**
   * Gets a Pokemon info object
   * @param name
   */
  public async getPokemonByName(name: string): Promise<IResponse> {
    if (this.checkNameValid(name)) {
      const res = await fetch(`${this.url}/${name}`);
      const json: IResponse = await res.json();
      return json;
    } else {
      throw new Error('Name Invalid');
    }
  }

  /**
   * Checks the name parameter is valid
   * @param name string
   */
  checkNameValid(name: string) {
    return name.length > 0;
  }
}
