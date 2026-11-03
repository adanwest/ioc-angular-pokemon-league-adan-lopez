import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonBadgeComponent } from '../pokemon-badge/pokemon-badge.component';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [PokemonBadgeComponent], // Importem l'etiqueta per poder usar-la a l'HTML
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  // Rep l'objecte sencer del component pare (pokemon-list)
  @Input({ required: true }) pokemon!: Pokemon;
  
  // Emet un esdeveniment cap al pare quan l'usuari selecciona aquesta targeta
  @Output() seleccionat = new EventEmitter<Pokemon>();

  seleccionarPokemon() {
    this.seleccionat.emit(this.pokemon);
  }
}