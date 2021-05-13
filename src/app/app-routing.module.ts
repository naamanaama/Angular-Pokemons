import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PokemonComponent } from './pokemon/pokemon.component';
import {FavoritsComponent} from './favorits/favorits.component';
import {PokemonDetailsComponent} from './pokemon-details/pokemon-details.component';



/**
 * A typical Angular Route has two properties:
 * path: a string that matches the URL in the browser address bar.
 * component: the component that the router should create when navigating to this route.
 */
const routes: Routes = [
{path: '', redirectTo: '/pokemons', pathMatch: 'full'},
{path: 'pokemons', component: PokemonComponent},
{path: 'favorits', component: FavoritsComponent},
{path: 'detail/:name' , component: PokemonDetailsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
