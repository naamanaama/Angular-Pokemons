import { Component, OnInit } from '@angular/core';
import {Pokemon} from '../interface-pokemon';
import {PokemonsArray} from '../interface-pokemons-array';
import {PokemonService} from '../pokemon.service';
import {AlertService} from '../_alert';
import {MatCardModule, MatButtonModule} from '@angular/material';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  pokemons: any[] = [];
  favLength: number;
  pokemonsArray: PokemonsArray = {count: 0 ,
    next: new URL('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20'), previous: null, results: []};

  /**when angular creates pokemon component the Dependency Injection system
   * sets Pokemon service to an instance of PokemonService
   */
  constructor(private pokemonService: PokemonService) {
   }

  /**
   * we call getPokemons here and not in the constructor so the constructor will perform minimal actions.
   * angular will call this method at the appropriate time after construction,
   * and then we can get the pokemons list from the PokemonServicr
   */
  ngOnInit() {
    this.pokemons = this.pokemonService.getPokemonDetails();
    this.favLength = this.pokemonService.getFavoritesList().length;

  }

  addToFavorits(pokemon: Pokemon) {
    if (this.pokemonService.getFavoritesList().length === 6) {
    } else {
      this.pokemonService.storeOnLocalStorage(pokemon);
    }
  }

}
