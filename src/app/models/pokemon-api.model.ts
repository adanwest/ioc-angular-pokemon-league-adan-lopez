export interface PokemonApiDTO {
  id: string;
  name: string;
  description?: string;
  category: string;
  market_price: number | string; // Pot venir com a número o text des de l'API
  signing_date: string;
  region?: string;               // Camp d'ubicació/classificació
  is_legendary?: boolean;        // Pot venir omès en alguns registres
}