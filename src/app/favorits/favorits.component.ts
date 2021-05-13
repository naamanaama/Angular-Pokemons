import { Component, OnInit } from '@angular/core';
import {Pokemon} from '../interface-pokemon';
// import {PokemonsArray} from '../interface-pokemons-array'
import {PokemonService} from '../pokemon.service';

@Component({
  selector: 'app-favorits',
  templateUrl: './favorits.component.html',
  styleUrls: ['./favorits.component.css']
})
export class FavoritsComponent implements OnInit {

  favoritPokemons: Pokemon[] = [];
  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.favoritPokemons = this.pokemonService.getFavoritesList();
  }

  removeFromFavorits(pokemon: Pokemon) {
    this.favoritPokemons = this.pokemonService.removeFromFavorits(pokemon.name);
  }

}
