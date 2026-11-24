export interface Pokemon {
  id: string | number;
  nom: string;
  descripcio: string;
  categoria: string; // Ex: Foc, Aigua, Planta...
  dataFitxatge: Date; // Valor temporal
  regio?: string; // Camp d'ubicació/classificació
  preuMercat: number; // Camp numèric rellevant
  esLlegendari?: boolean; // Camp booleà opcional
}