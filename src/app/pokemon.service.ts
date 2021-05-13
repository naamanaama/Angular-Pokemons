import {Inject,  Injectable } from '@angular/core';
import {Pokemon} from './interface-pokemon';
import {PokemonsArray} from './interface-pokemons-array';
import {Observable, of} from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { catchError, map, tap } from 'rxjs/operators';


const STORAGE_KEY = 'local_favoritsList';
/**
 * @Injectable marks the class as one that participates in the dependency injection system.
 * accepts a metadata object for the service
 * we register a provider in order to make PokemonService available to the dependency injection.
 */
@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokemonsUrl  = 'https://pokeapi.co/api/v2/pokemon?limit=151';
  private gamesUrl = 'https://pokeapi.co/api/v2/generation/';
  private pokemonArr: Pokemon[] = [];
  private evolvsFromArr: string [] =[];

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService, private http: HttpClient) {

   }

 /**
   * fetch the 'allPokemons' general array' and calls fetchPokemonData on each element
   * in order to parse the details of each pokemon
   */
  getPokemonDetails(): any[] {
    fetch(this.pokemonsUrl).then(response => response.json()).then((allpokemon) => {
      allpokemon.results.forEach((pokemon: Pokemon) => {
          this.fetchPokemonData(pokemon);
      });
    });
    return this.pokemonArr;
  }

  /**
   * @param pokemon gets an element of type Pokemon, and using the Url gets the details on pokemon
   */
  fetchPokemonData = (pokemon: Pokemon) => {
      const url = pokemon.url;
      fetch(String(url)).then(response => response.json()).then((pokeData) => {
        this.renderPokemon(pokeData, pokemon.url);
    });
  }

  /**
   * parse the pokemon data from json and fill pokemons Array
   */
  renderPokemon(pokeData , pokeUrl) {
    const pokeNumber: number = +`#${pokeData.id}`;
    const pokeName = pokeData.name;
    const pokeTypesArr: string[] = [];
    pokeData.types.forEach((obj) => {
      pokeTypesArr.push(obj.type.name);

    });
    const pokeMovesArr: string [] = [];
    pokeData.moves.forEach((obj) => {
      pokeMovesArr.push(obj.move.name);
    });
    const pokemonSprites = pokeData.sprites.back_default;
    const pokemonMainSprites = pokeData.sprites.front_default;

    const pokeGamesArray: string [] = [];
    pokeData.game_indices.forEach((obj) => {
      pokeGamesArray.push(obj.game_index);
    });

    // what pokemon did this pokemon developed from and what is his evolution options.
    //using the pokemon species
    const pokemonSpecies = pokeData.species.url;
    let evolvsFrom: string [] = [];
    let evolutionChain: URL[] = [];
    fetch(pokemonSpecies).then(response => response.json()).then((data) => {
      if(data.evolves_from_species != null){
      evolvsFrom[0] = data.evolves_from_species.name;
      evolutionChain[0] = data.evolution_chain;
    }
    else{
      evolvsFrom[0] = '-1';
    }
    });

    const newPokemon: Pokemon = {
    id: pokeNumber,
    url: pokeUrl ,
    name: pokeName,
    type: pokeTypesArr,
    moves: pokeMovesArr,
    image2: pokemonSprites,
    image: pokemonMainSprites,
    species: pokemonSpecies,
    evolvsFrom: evolvsFrom};
    this.pokemonArr.push(newPokemon);
  }

  /**
   * @param name  returns the pokemon object with this name from pokemons list
   */
  getPokemon(name: string) {
    return this.pokemonArr.find(pokemon => pokemon.name === name);
  }

  renderPokemonEvolation(data): string{
    console.log(data);
    return data.evolves_from_species;
  }

  /**
   * get the favorite pokemons list from storage
   */
  public getFavoritesList() {
    return this.storage.get(STORAGE_KEY);
  }

  /**
   * @param key remove the pokemon with this key (name) from the list of favorite pokemons
   */
  public removeFromFavorits(key) {
    const currentPokemonsList = this.storage.get(STORAGE_KEY) || [];
    currentPokemonsList.forEach((pokemon: Pokemon, index: number) => {
      if (pokemon.name === key) {
        currentPokemonsList.splice(index, 1);
      }
    });
    this.storage.set(STORAGE_KEY, currentPokemonsList);
    return currentPokemonsList;
  }

/**
 * @param pokemon adds this pokemon to the favorit pokemons list and save it to storage
 */
  public storeOnLocalStorage(pokemon: Pokemon): void {
    const currentPokemonsList = this.storage.get(STORAGE_KEY) || [];
    // if pokemon not in add it
    if (currentPokemonsList.find(poke => poke.name === pokemon.name) === undefined) {
        currentPokemonsList.push(pokemon);
        this.storage.set(STORAGE_KEY, currentPokemonsList);
    } else {
        return;
    }
  }
}

