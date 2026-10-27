import { Pokemon } from './pokemon.model';

export const POKEMON_DATA: Pokemon[] = [
  { id: 1, nom: 'Charizard', descripcio: 'Drac que escup foc a altes temperatures.', categoria: 'Foc', dataFitxatge: new Date('2026-10-01'), preuMercat: 5000, esLlegendari: false },
  { id: 2, nom: 'Blastoise', descripcio: 'Té uns canons d\'aigua molt potents a la closca.', categoria: 'Aigua', dataFitxatge: new Date('2026-10-02'), preuMercat: 4500, esLlegendari: false },
  { id: 3, nom: 'Venusaur', descripcio: 'La flor de la seva esquena capta els raigs solars.', categoria: 'Planta', dataFitxatge: new Date('2026-10-03'), preuMercat: 4200 },
  { id: 4, nom: 'Mewtwo', descripcio: 'Creat genèticament per ser el millor en combat.', categoria: 'Psíquic', dataFitxatge: new Date('2026-09-15'), preuMercat: 25000, esLlegendari: true },
  { id: 5, nom: 'Gengar', descripcio: 'S\'amaga en les ombres per espantar la gent.', categoria: 'Fantasma', dataFitxatge: new Date('2026-10-05'), preuMercat: 3800, esLlegendari: false },
  { id: 6, nom: 'Pikachu', descripcio: 'Emmagatzema electricitat a les galtes.', categoria: 'Elèctric', dataFitxatge: new Date('2026-10-10'), preuMercat: 2000, esLlegendari: false },
  { id: 7, nom: 'Snorlax', descripcio: 'Només es desperta per menjar grans quantitats.', categoria: 'Normal', dataFitxatge: new Date('2026-08-22'), preuMercat: 1500 },
  { id: 8, nom: 'Lugia', descripcio: 'Guardià dels mars, pot causar tempestes.', categoria: 'Volador', dataFitxatge: new Date('2026-07-10'), preuMercat: 30000, esLlegendari: true },
  { id: 9, nom: 'Lucario', descripcio: 'Pot llegir les aures dels seus rivals.', categoria: 'Lluita', dataFitxatge: new Date('2026-10-12'), preuMercat: 6000, esLlegendari: false },
  { id: 10, nom: 'Gyarados', descripcio: 'Destructiu i molt difícil de domesticar.', categoria: 'Aigua', dataFitxatge: new Date('2026-09-30'), preuMercat: 5500, esLlegendari: false }
];