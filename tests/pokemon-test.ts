import {} from 'jasmine';
import {Pokemon} from '../src/pokemon/pokemon'

describe('Pokemon Tests', () => {
  it('validate api is up', async () => {
    const pokemon = new Pokemon();
    expect(await pokemon.getPokemonByName('pikachu')).toBeTruthy();
  });
  it('test valid name parameter', async () => {
    const pokemon = new Pokemon();
    expect(pokemon.checkNameValid('ads')).toBeTruthy();
  });

  it('test invalid name parameter', async () => {
    const pokemon = new Pokemon();
    expect(pokemon.checkNameValid('')).toBeFalsy();
  });

  it('test pokemon name list: all valid input', async () => {
    const pokemon = new Pokemon();
    let pokemonNameList = await pokemon.getPokemonsByNameList(['pikachu','squirtle'])
    expect(pokemonNameList.length).toBe(2);
  });

  it('test pokemon name list: no valid input', async () => {
    const pokemon = new Pokemon();
    let pokemonNameList = await pokemon.getPokemonsByNameList(['asdasd','dsadsa'])
    expect(pokemonNameList.length).toBe(0);
  });

  it('test pokemon name list: some valid input', async () => {
    const pokemon = new Pokemon();
    let pokemonNameList = await pokemon.getPokemonsByNameList(['pikachu','dsadsa'])
    expect(pokemonNameList.length).toBe(1);
  });
});
