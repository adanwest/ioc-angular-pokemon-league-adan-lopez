import { PokemonApiDTO } from '../models/pokemon-api.model';
import { Pokemon } from '../models/pokemon.model';

export class PokemonAdapter {
  /**
   * Transforma un únic objecte provinent de l'API al model intern normalitzat.
   */
  static fromApi(dto: PokemonApiDTO): Pokemon {
    return {
      id: String(dto.id).trim(),
      // 1. Neteja d'espais
      nom: dto.name ? dto.name.trim() : 'Sense nom',
      // 2. Substitució de textos buits o absents
      descripcio: dto.description && dto.description.trim() !== '' 
        ? dto.description.trim() 
        : 'Sense descripció disponible.',
      // 3. Normalització d'etiquetes de categoria (Primera majúscula, resta minúscula)
      categoria: this.normalitzarCategoria(dto.category),
      // 4. Transformació de data a objecte Date
      dataFitxatge: dto.signing_date ? new Date(dto.signing_date) : new Date(),
      regio: dto.region && dto.region.trim() !== '' ? dto.region.trim() : 'Desconeguda',
      // 5. Conversió numèrica segura
      preuMercat: this.convertirPreu(dto.market_price),
      // 6. Valor per defecte per a camps opcionals booleans
      esLlegendari: dto.is_legendary ?? false
    };
  }

  /**
   * Transforma un llistat complet provinent de l'API.
   */
  static fromApiList(dtos: PokemonApiDTO[]): Pokemon[] {
    if (!Array.isArray(dtos)) return [];
    return dtos.map(dto => this.fromApi(dto));
  }

  /**
   * Prepara un objecte del model intern per ser enviat via POST a l'API.
   */
  static toApi(pokemon: Omit<Pokemon, 'id'>): Omit<PokemonApiDTO, 'id'> {
    return {
      name: pokemon.nom.trim(),
      description: pokemon.descripcio.trim(),
      category: this.normalitzarCategoria(pokemon.categoria),
      market_price: Number(pokemon.preuMercat) || 0,
      signing_date: pokemon.dataFitxatge.toISOString().split('T')[0],
      region: pokemon.regio?.trim() || 'Desconeguda',
      is_legendary: Boolean(pokemon.esLlegendari)
    };
  }

  private static normalitzarCategoria(cat?: string): string {
    if (!cat || cat.trim() === '') return 'General';
    const neta = cat.trim().toLowerCase();
    return neta.charAt(0).toUpperCase() + neta.slice(1);
  }

  private static convertirPreu(valor: number | string): number {
    const num = Number(valor);
    return isNaN(num) || num < 0 ? 0 : num;
  }
}