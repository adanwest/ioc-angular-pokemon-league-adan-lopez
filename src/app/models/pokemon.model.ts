export interface Pokemon {
  id: number;
  nom: string;
  descripcio: string;
  categoria: string; // Ex: Foc, Aigua, Planta...
  dataFitxatge: Date; // Valor temporal
  preuMercat: number; // Camp numèric rellevant
  esLlegendari?: boolean; // Camp booleà opcional
}