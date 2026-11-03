import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component'; // Afegit

@Component({
  imports: [RouterOutlet, PokemonListComponent],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App {
  // Propietat pública obligatòria
  nomAplicacio = 'Pokémon League';
  protected readonly title = signal('ioc-angular-pokemon-league-adan-lopez');
}
