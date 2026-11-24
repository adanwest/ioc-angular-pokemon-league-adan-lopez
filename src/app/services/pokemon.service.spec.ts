import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom, skip, take } from 'rxjs';
import { PokemonService } from './pokemon.service';
import { PokemonApiDTO } from '../models/pokemon-api.model';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  const mockDtos: PokemonApiDTO[] = [
    {
      id: '1',
      name: 'Pikachu',
      description: 'Ratolí elèctric',
      category: 'Elèctric',
      signing_date: '2026-10-05T14:20:00Z',
      region: 'Kanto',
      market_price: 42000,
      is_legendary: false
    },
    {
      id: '2',
      name: 'Charizard',
      description: 'Drac de foc',
      category: 'Foc',
      signing_date: '2026-10-03T12:00:00Z',
      region: 'Kanto',
      market_price: 55000,
      is_legendary: false
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonService, provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('ha de carregar els Pokémon inicials i transformar-los mitjançant l’adapter', async () => {
    const pokemonsPromise = firstValueFrom(service.pokemons$.pipe(skip(1), take(1)));

    const req = httpMock.expectOne('http://localhost:3000/pokemons');
    expect(req.request.method).toBe('GET');
    req.flush(mockDtos);

    const pokemons = await pokemonsPromise;
    const error = await firstValueFrom(service.error$);
    const loading = await firstValueFrom(service.loading$);

    expect(pokemons.length).toBe(2);
    expect(pokemons[0].nom).toBe('Pikachu');
    expect(error).toBeNull();
    expect(loading).toBe(false);
  });

  it('ha de capturar errors HTTP i informar error$ amb un missatge amigable', async () => {
    const req = httpMock.expectOne('http://localhost:3000/pokemons');
    req.flush('Error intern', { status: 500, statusText: 'Server Error' });

    const pokemons = await firstValueFrom(service.pokemons$);
    const error = await firstValueFrom(service.error$);
    const loading = await firstValueFrom(service.loading$);

    expect(pokemons.length).toBe(0);
    expect(error).toContain("No s'ha pogut connectar amb el servidor de la Lliga Pokémon");
    expect(loading).toBe(false);
  });

  it('ha d’enviar un POST en crear un Pokémon nou', () => {
    httpMock.expectOne('http://localhost:3000/pokemons').flush(mockDtos);

    service
      .crearPokemon({
        nom: 'Mewtwo',
        descripcio: 'Pokémon genètic',
        categoria: 'Psíquic',
        dataFitxatge: new Date('2026-11-01T10:00:00Z'),
        regio: 'Kanto',
        preuMercat: 95000,
        esLlegendari: true
      })
      .subscribe((creat) => {
        expect(creat.nom).toBe('Mewtwo');
        expect(creat.esLlegendari).toBe(true);
      });

    const postReq = httpMock.expectOne('http://localhost:3000/pokemons');
    expect(postReq.request.method).toBe('POST');
    expect(postReq.request.body.name).toBe('Mewtwo');

    postReq.flush({
      ...postReq.request.body,
      id: '13'
    });
  });
});