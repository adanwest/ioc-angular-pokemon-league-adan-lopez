import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Obligatori per als formularis

@Component({
  selector: 'app-pokemon-filter',
  standalone: true,
  templateUrl: './pokemon-filter.component.html',
  styleUrl: './pokemon-filter.component.scss',
  imports: [FormsModule], // <-- Afegim als imports
})
export class PokemonFilterComponent {
// Variables vinculades a l'HTML
  filtreText: string = '';
  filtreCategoria: string = '';

  // Emetrà un avís al pare amb els criteris quan s'apliquin els filtres
  @Output() aplicarFiltre = new EventEmitter<{ text: string, categoria: string }>();

  onAplicar() {
    this.aplicarFiltre.emit({ text: this.filtreText, categoria: this.filtreCategoria });
  }

  onRestablir() {
    this.filtreText = '';
    this.filtreCategoria = '';
    this.aplicarFiltre.emit({ text: '', categoria: '' });
}
}