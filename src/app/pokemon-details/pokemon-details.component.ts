import { Component, OnInit, Input } from '@angular/core';
import {Pokemon} from '../interface-pokemon';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PokemonService} from '../pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

  @Input() pokemon?: Pokemon;
  private evolvsFrom: string ='';
  constructor(private route: ActivatedRoute, private pokemonService: PokemonService, private location: Location) {

   }

  ngOnInit() {
    this.getPokemon();

  }

  getPokemon(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.pokemon = this.pokemonService.getPokemon(name);
    console.log(this.pokemon.evolvsFrom);
    
  }


  goBack(): void {
    this.location.back();
  }

}
