import { Component } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { DatePipe } from '@angular/common'; // <-- Importem el pipe per a les dates
import { POKEMON_DATA } from '../../models/pokemon.mock';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokemonFilterComponent } from '../pokemon-filter/pokemon-filter.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonCardComponent, PokemonFilterComponent, DatePipe],// <-- Afegim DatePipe
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent {
  // Carreguem les dades mock
  llistaPokemon: Pokemon[] = POKEMON_DATA;
  llistaFiltrada: Pokemon[] = [...this.llistaPokemon];
  // Variable per guardar el Pokémon que estiguem veient al detall
  pokemonSeleccionat: Pokemon | null = null;

  // Rep l'avís de l'@Output de la targeta
  onPokemonSeleccionat(pokemon: Pokemon) {
    console.log('S\'ha seleccionat el Pokémon:', pokemon.nom);
    this.pokemonSeleccionat = pokemon;
  }

  // Funció que s'executa quan el filtre emet dades
  onAplicarFiltre(criteris: { text: string, categoria: string }) {
    this.llistaFiltrada = this.llistaPokemon.filter(poke => {
    // Comprovem si el text de cerca coincideix (ignorant majúscules/minúscules)
    const compleixText = poke.nom.toLowerCase().includes(criteris.text.toLowerCase());
    // Comprovem la categoria només si l'usuari n'ha seleccionat alguna
    const compleixCat = criteris.categoria ? poke.categoria === criteris.categoria : true;
      
    return compleixText && compleixCat;
    });
    // Si filtrem, amaguem el detall per netejar la pantalla
    this.pokemonSeleccionat = null;
}
}