import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {StorageServiceModule} from 'ngx-webstorage-service';
import { AppComponent } from './app.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { AppRoutingModule } from './app-routing.module';
import { FavoritsComponent } from './favorits/favorits.component';
import { HttpClientModule } from '@angular/common/http';
import {AlertModule} from './_alert';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';


@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    PokemonDetailsComponent,
    FavoritsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // StorageServiceModule,
    AlertModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
