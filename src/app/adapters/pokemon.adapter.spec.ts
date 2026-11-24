import { PokemonAdapter } from './pokemon.adapter';
import { PokemonApiDTO } from '../models/pokemon-api.model';

describe('PokemonAdapter', () => {
  it('ha de transformar correctament un DTO complet al model intern Pokemon', () => {
    const dto: PokemonApiDTO = {
      id: '1',
      name: '  bulbasaur  ',
      description: '  Pokémon llavor inicial de Kanto  ',
      category: 'planta',
      signing_date: '2026-10-01T10:00:00Z',
      region: 'kanto',
      market_price: 15000,
      is_legendary: false
    };

    const resultat = PokemonAdapter.fromApi(dto);

    expect(resultat.id).toBe('1');
    expect(resultat.nom).toBe('bulbasaur');
    expect(resultat.descripcio).toBe('Pokémon llavor inicial de Kanto');
    expect(resultat.categoria).toBe('Planta');
    expect(resultat.regio).toBe('kanto');
    expect(resultat.preuMercat).toBe(15000);
    expect(resultat.esLlegendari).toBe(false);
    expect(resultat.dataFitxatge instanceof Date).toBe(true);
  });

  it('ha d’aplicar valors per defecte segurs quan falten camps opcionals o vénen nuls', () => {
    const dtoIncomplet = {
      id: '99',
      name: '',
      description: '   ',
      category: '',
   
    } as PokemonApiDTO;

    const resultat = PokemonAdapter.fromApi(dtoIncomplet);

    expect(resultat.nom).toBe('Sense nom');
    expect(resultat.descripcio).toBe('Sense descripció disponible.');
    expect(resultat.categoria).toBe('General');
    expect(resultat.regio).toBe('Desconeguda');
    expect(resultat.preuMercat).toBe(0);
    expect(resultat.esLlegendari).toBe(false);
    expect(isNaN(resultat.dataFitxatge.getTime())).toBe(false);
  });
});