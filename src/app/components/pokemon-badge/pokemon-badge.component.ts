import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-badge',
  standalone: true,
  templateUrl: './pokemon-badge.component.html',
  styleUrl: './pokemon-badge.component.scss'
})
export class PokemonBadgeComponent {
  // @Input permet rebre dades des del component pare (pokemon-card)
  @Input({ required: true }) textCategoria!: string;
}