import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, delay, finalize, map, of, switchMap, tap } from 'rxjs';
import { API_CONFIG } from '../app.config';
import { PokemonApiDTO } from '../models/pokemon-api.model';
import { Pokemon } from '../models/pokemon.model';
import { PokemonAdapter } from '../adapters/pokemon.adapter';

export interface CriterisCerca {
  terme: string;
  categoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = API_CONFIG.endpoints.pokemons;

  // Estats reactius exposats a la interfície
  private readonly pokemonsSubject = new BehaviorSubject<Pokemon[]>([]);
  public readonly pokemons$ = this.pokemonsSubject.asObservable();

  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loadingSubject.asObservable();

  private readonly errorSubject = new BehaviorSubject<string | null>(null);
  public readonly error$ = this.errorSubject.asObservable();

  // Disparador reactiu per a cerques, filtres i reintents amb switchMap
  private readonly searchTriggerSubject = new BehaviorSubject<CriterisCerca>({
    terme: '',
    categoria: 'Totes'
  });

  // Memòria de l'última consulta per permetre reintentar
  private ultimsCriteris: CriterisCerca = { terme: '', categoria: 'Totes' };

  constructor() {
    this.inicialitzarFluxCerca();
  }

  /**
   * Configura el flux reactiu principal utilitzant switchMap.
   * Cada vegada que canvien els criteris o es demana un reintent,
   * cancel·la peticions anteriors en curs i consulta l'API.
   */
  private inicialitzarFluxCerca(): void {
    this.searchTriggerSubject
      .pipe(
        tap((criteris) => {
          this.ultimsCriteris = criteris;
          this.loadingSubject.next(true);
          this.errorSubject.next(null);
        }),
        switchMap((criteris) =>
          this.obtenirPokemonsDesDeApi(criteris).pipe(
            catchError((err) => {
              console.error('Error en obtenir Pokémon de l\'API:', err);
              this.errorSubject.next(
                'No s\'ha pogut connectar amb el servidor de la Lliga Pokémon. Comprova que l\'API estigui en marxa.'
              );
              return of([]);
            }),
            finalize(() => this.loadingSubject.next(false))
          )
        )
      )
      .subscribe((pokemonsAdaptats) => {
        this.pokemonsSubject.next(pokemonsAdaptats);
      });
  }

  /**
   * Petició HTTP GET amb adaptació i filtratge.
   */
  private obtenirPokemonsDesDeApi(criteris: CriterisCerca): Observable<Pokemon[]> {
    // Si hi ha una categoria específica seleccionada, la passem com a filtre query a json-server
    const url =
      criteris.categoria && criteris.categoria !== 'Totes'
        ? `${this.apiUrl}?category=${encodeURIComponent(criteris.categoria)}`
        : this.apiUrl;

    return this.http.get<PokemonApiDTO[]>(url).pipe(
      // Petit retard artificial de 400ms perquè l'estat de càrrega sigui visible i capturable a la UI
      delay(400),
      map((dtos) => PokemonAdapter.fromApiList(dtos)),
      map((pokemons) => {
        const termeNet = criteris.terme.trim().toLowerCase();
        if (!termeNet) return pokemons;

        return pokemons.filter(
          (p) =>
            p.nom.toLowerCase().includes(termeNet) ||
            p.descripcio.toLowerCase().includes(termeNet) ||
            (p.regio && p.regio.toLowerCase().includes(termeNet))
        );
      })
    );
  }

  /**
   * Actualitza els criteris de cerca i dispara una nova consulta via switchMap.
   */
  cercar(terme: string, categoria: string): void {
    this.searchTriggerSubject.next({ terme, categoria });
  }

  /**
   * Repeteix l'última consulta executada.
   */
  reintentar(): void {
    this.searchTriggerSubject.next({ ...this.ultimsCriteris });
  }

  /**
   * Petició HTTP POST per crear un nou Pokémon a l'API.
   */
  crearPokemon(nouPokemon: Omit<Pokemon, 'id'>): Observable<Pokemon> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    const payloadApi = PokemonAdapter.toApi(nouPokemon);

    return this.http.post<PokemonApiDTO>(this.apiUrl, payloadApi).pipe(
      map((dtoCreat) => PokemonAdapter.fromApi(dtoCreat)),
      tap((pokemonAdaptat) => {
        // Afegim el nou element a la llista actual sense haver de recarregar tota la pàgina
        const llistaActual = this.pokemonsSubject.getValue();
        this.pokemonsSubject.next([...llistaActual, pokemonAdaptat]);
      }),
      catchError((err) => {
        console.error('Error en crear el Pokémon:', err);
        this.errorSubject.next('Error en desar el nou Pokémon al servidor.');
        throw err;
      }),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  /**
   * Mètode auxiliar per a la validació asíncrona de l'Exercici 4:
   * Comprova si existeix almenys un Pokémon que coincideixi amb el terme.
   */
  comprovarExistenciaTerme(terme: string): Observable<boolean> {
    const termeNet = terme.trim().toLowerCase();
    if (!termeNet) return of(true);

    return this.http.get<PokemonApiDTO[]>(this.apiUrl).pipe(
      map((dtos) => PokemonAdapter.fromApiList(dtos)),
      map((pokemons) =>
        pokemons.some(
          (p) =>
            p.nom.toLowerCase().includes(termeNet) ||
            p.descripcio.toLowerCase().includes(termeNet) ||
            (p.regio && p.regio.toLowerCase().includes(termeNet))
        )
      ),
      catchError(() => of(true)) // En cas d'error de xarxa no bloquegem el camp per validació
    );
  }
}