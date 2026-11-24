import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { Pokemon } from '../../models/pokemon.model';
import { CriterisCerca, PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import {
  termeCercaSyncValidator,
  termeExistentAsyncValidator
} from '../../validators/pokemon-search.validators';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PokemonCardComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {
  private readonly pokemonService = inject(PokemonService);
  private readonly destroyRef = inject(DestroyRef);

  // Clau utilitzada per persistir l'historial a localStorage
  readonly STORAGE_KEY = 'pokemon_league_historial_cerques_v1';

  // Observables exposats pel servei
  readonly pokemons$ = this.pokemonService.pokemons$;
  readonly loading$ = this.pokemonService.loading$;
  readonly error$ = this.pokemonService.error$;

  readonly categories: string[] = [
    'Totes',
    'Planta',
    'Foc',
    'Aigua',
    'Elèctric',
    'Psíquic',
    'Fantasma',
    'Normal',
    'Gel',
    'Drac',
    'Sinistre',
    'Acer',
    'Roca',
    'Volador'
  ];

  readonly cercaForm = new FormGroup({
    terme: new FormControl<string>('', {
      nonNullable: true,
      validators: [termeCercaSyncValidator()],
      asyncValidators: [termeExistentAsyncValidator(this.pokemonService)]
    }),
    categoria: new FormControl<string>('Totes', {
      nonNullable: true
    })
  });

  historialCerques: CriterisCerca[] = [];
  pokemonSeleccionat: Pokemon | null = null;
  missatgeCreacio: string | null = null;
  private ultimaCercaExecutada = JSON.stringify({ terme: '', categoria: 'Totes' });

  ngOnInit(): void {
    this.carregarHistorial();
  
    // Escoltem els canvis dels valors i de l'estat (per esperar la validació asíncrona)
    this.cercaForm.statusChanges
      .pipe(
        debounceTime(300),
        filter((status) => status === 'VALID'),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        const valorActual = JSON.stringify(this.cercaForm.getRawValue());
        if (valorActual !== this.ultimaCercaExecutada) {
          this.executarCerca();
        }
      });

    // Assegurem que el canvi del select de categoria també dispari la cerca encara que l'estat ja fos VALID
    this.cercaForm.controls.categoria.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.executarCerca();
      });
 
    // Reaccionem als canvis quan el formulari (validació síncrona i asíncrona) és VALID
    this.cercaForm.statusChanges
      .pipe(
        debounceTime(300),
        filter((status) => status === 'VALID'),
        distinctUntilChanged(
          (prev, curr) =>
            prev === curr &&
            JSON.stringify(this.cercaForm.getRawValue()) === this.ultimaCercaExecutada
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.executarCerca();
      });
  }

  get termeControl(): FormControl<string> {
    return this.cercaForm.controls.terme;
  }

  get mostrarErrorTerme(): boolean {
    return this.termeControl.invalid && (this.termeControl.dirty || this.termeControl.touched);
  }

  executarCerca(): void {
    if (this.cercaForm.invalid || this.cercaForm.pending) {
      return;
    }

    const { terme, categoria } = this.cercaForm.getRawValue();
    const termeNet = terme.trim();

    this.ultimaCercaExecutada = JSON.stringify({ terme: termeNet, categoria });
    this.pokemonService.cercar(termeNet, categoria);

    // Desem a l'historial només si hi ha algun filtre actiu
    if (termeNet !== '' || categoria !== 'Totes') {
      this.afegirAHistorial({ terme: termeNet, categoria });
    }
  }

  aplicarDesdeHistorial(item: CriterisCerca): void {
    this.cercaForm.setValue({
      terme: item.terme,
      categoria: item.categoria
    });
    this.executarCerca();
  }

  netejarFiltres(): void {
    this.cercaForm.reset({
      terme: '',
      categoria: 'Totes'
    });
    this.executarCerca();
    this.pokemonSeleccionat = null;
  }

  netejarHistorial(): void {
    this.historialCerques = [];
    this.pokemonSeleccionat = null;
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error en esborrar l\'historial de localStorage:', error);
    }
  }

  private afegirAHistorial(novaCerca: CriterisCerca): void {
    const ultim = this.historialCerques[0];

    // Evitem duplicats consecutius comparant amb l'últim element desat
    if (
      ultim &&
      ultim.terme.toLowerCase() === novaCerca.terme.toLowerCase() &&
      ultim.categoria === novaCerca.categoria
    ) {
      return;
    }

    this.historialCerques = [novaCerca, ...this.historialCerques].slice(0, 8);
    this.desarHistorial();
  }

  private carregarHistorial(): void {
    try {
      const dadesGuardades = localStorage.getItem(this.STORAGE_KEY);
      if (dadesGuardades) {
        const parsed = JSON.parse(dadesGuardades);
        if (Array.isArray(parsed)) {
          this.historialCerques = parsed;
        }
      }
    } catch (error) {
      console.error('Error en llegir l\'historial des de localStorage:', error);
      this.historialCerques = [];
    }
  }

  private desarHistorial(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.historialCerques));
    } catch (error) {
      console.error('Error en desar l\'historial a localStorage:', error);
    }
  }

  seleccionarPokemon(pokemon: Pokemon): void {
    this.pokemonSeleccionat = pokemon;
  }

  reintentarConsulta(): void {
    this.pokemonService.reintentar();
  }

  afegirPokemonDeProva(): void {
    this.missatgeCreacio = null;

    const nouPokemon: Omit<Pokemon, 'id'> = {
      nom: 'Dragonite',
      descripcio: 'Drac volador noble fitxat mitjançant petició POST.',
      categoria: 'Drac',
      dataFitxatge: new Date(),
      regio: 'Kanto',
      preuMercat: 68000,
      esLlegendari: false
    };

    this.pokemonService.crearPokemon(nouPokemon).subscribe({
      next: (creat) => {
        this.missatgeCreacio = `S'ha fitxat ${creat.nom} (ID: ${creat.id}) correctament via POST!`;
        this.pokemonSeleccionat = creat;
      }
    });
  }
}