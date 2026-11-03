import { Pokemon } from './pokemon.model';

export const POKEMON_DATA: Pokemon[] = [
 // Inicials Kanto i Evolucions
  { id: 1, nom: 'Bulbasaur', descripcio: 'Rèptil amb un bulb a l\'esquena.', categoria: 'Planta', dataFitxatge: new Date('2026-01-01'), preuMercat: 1000, esLlegendari: false },
  { id: 2, nom: 'Ivysaur', descripcio: 'El bulb de la seva esquena es converteix en un capoll.', categoria: 'Planta', dataFitxatge: new Date('2026-01-02'), preuMercat: 2500, esLlegendari: false },
  { id: 3, nom: 'Venusaur', descripcio: 'Una gran flor floreix a la seva esquena, captant energia solar.', categoria: 'Planta', dataFitxatge: new Date('2026-01-03'), preuMercat: 5000, esLlegendari: false },
  { id: 4, nom: 'Charmander', descripcio: 'Té una flama a la punta de la cua que indica el seu estat vital.', categoria: 'Foc', dataFitxatge: new Date('2026-01-04'), preuMercat: 1000, esLlegendari: false },
  { id: 5, nom: 'Charmeleon', descripcio: 'Molt agressiu, ataca amb urpes afilades i flames.', categoria: 'Foc', dataFitxatge: new Date('2026-01-05'), preuMercat: 2500, esLlegendari: false },
  { id: 6, nom: 'Charizard', descripcio: 'Drac volador que escup foc a temperatures extremes.', categoria: 'Foc', dataFitxatge: new Date('2026-01-06'), preuMercat: 6500, esLlegendari: false },
  { id: 7, nom: 'Squirtle', descripcio: 'Petita tortuga que dispara aigua amb precisió.', categoria: 'Aigua', dataFitxatge: new Date('2026-01-07'), preuMercat: 1000, esLlegendari: false },
  { id: 8, nom: 'Wartortle', descripcio: 'Tortuga amb orelles i cua en forma d\'ona, símbol de longevitat.', categoria: 'Aigua', dataFitxatge: new Date('2026-01-08'), preuMercat: 2500, esLlegendari: false },
  { id: 9, nom: 'Blastoise', descripcio: 'Gran tortuga amb canons d\'aigua potents a la closca.', categoria: 'Aigua', dataFitxatge: new Date('2026-01-09'), preuMercat: 5500, esLlegendari: false },
  
  // Famosos i Competitius Kanto
  { id: 25, nom: 'Pikachu', descripcio: 'Emmagatzema electricitat a les galtes; la mascota per excel·lència.', categoria: 'Elèctric', dataFitxatge: new Date('2026-02-10'), preuMercat: 2500, esLlegendari: false },
  { id: 59, nom: 'Arcanine', descripcio: 'Un Pokémon molt lleial, famós per la seva velocitat i bellesa.', categoria: 'Foc', dataFitxatge: new Date('2026-03-15'), preuMercat: 5500, esLlegendari: false },
  { id: 65, nom: 'Alakazam', descripcio: 'El seu cervell superdesenvolupat té un coeficient intel·lectual de 5000.', categoria: 'Psíquic', dataFitxatge: new Date('2026-03-20'), preuMercat: 6000, esLlegendari: false },
  { id: 94, nom: 'Gengar', descripcio: 'S\'amaga en les ombres per espantar la gent.', categoria: 'Fantasma', dataFitxatge: new Date('2026-04-05'), preuMercat: 5800, esLlegendari: false },
  { id: 130, nom: 'Gyarados', descripcio: 'Destructiu i molt difícil de domesticar; evolució sorprenent de Magikarp.', categoria: 'Aigua', dataFitxatge: new Date('2026-04-12'), preuMercat: 6500, esLlegendari: false },
  { id: 143, nom: 'Snorlax', descripcio: 'Només es desperta per menjar grans quantitats. Una muralla defensiva.', categoria: 'Normal', dataFitxatge: new Date('2026-05-22'), preuMercat: 7000, esLlegendari: false },
  
  // Llegendaris i Semi-Llegendaris Kanto
  { id: 144, nom: 'Articuno', descripcio: 'Ocell llegendari capaç de controlar el gel i la neu.', categoria: 'Gel', dataFitxatge: new Date('2026-06-01'), preuMercat: 20000, esLlegendari: true },
  { id: 145, nom: 'Zapdos', descripcio: 'Ocell llegendari que controla l\'electricitat i apareix en tempestes.', categoria: 'Elèctric', dataFitxatge: new Date('2026-06-02'), preuMercat: 21000, esLlegendari: true },
  { id: 146, nom: 'Moltres', descripcio: 'Ocell llegendari de foc les ales del qual irradien calor intensa.', categoria: 'Foc', dataFitxatge: new Date('2026-06-03'), preuMercat: 20000, esLlegendari: true },
  { id: 149, nom: 'Dragonite', descripcio: 'Drac volador amb un cor noble però amb una força destructiva impressionant.', categoria: 'Drac', dataFitxatge: new Date('2026-06-10'), preuMercat: 9500, esLlegendari: false },
  { id: 150, nom: 'Mewtwo', descripcio: 'Creat genèticament a partir de l\'ADN de Mew per ser imbatible.', categoria: 'Psíquic', dataFitxatge: new Date('2026-06-15'), preuMercat: 30000, esLlegendari: true },
  { id: 151, nom: 'Mew', descripcio: 'Posseeix els gens de tots els Pokémon; gairebé impossible de trobar.', categoria: 'Psíquic', dataFitxatge: new Date('2026-06-20'), preuMercat: 35000, esLlegendari: true },

  // Inicials Johto i Evolucions
  { id: 152, nom: 'Chikorita', descripcio: 'Utilitza la fulla del seu cap per mesurar la temperatura.', categoria: 'Planta', dataFitxatge: new Date('2026-07-01'), preuMercat: 1000, esLlegendari: false },
  { id: 153, nom: 'Bayleef', descripcio: 'Té brots al coll que desprenen un aroma curatiu.', categoria: 'Planta', dataFitxatge: new Date('2026-07-02'), preuMercat: 2500, esLlegendari: false },
  { id: 154, nom: 'Meganium', descripcio: 'L\'aroma de la seva flor calma les emocions i reviu les plantes.', categoria: 'Planta', dataFitxatge: new Date('2026-07-03'), preuMercat: 5000, esLlegendari: false },
  { id: 155, nom: 'Cyndaquil', descripcio: 'Quan s\'espanta o s\'enfada, les flames del seu llom cremen amb força.', categoria: 'Foc', dataFitxatge: new Date('2026-07-04'), preuMercat: 1000, esLlegendari: false },
  { id: 156, nom: 'Quilava', descripcio: 'El seu foc es torna més potent i el fa servir de manera tàctica.', categoria: 'Foc', dataFitxatge: new Date('2026-07-05'), preuMercat: 2500, esLlegendari: false },
  { id: 157, nom: 'Typhlosion', descripcio: 'Causa explosions espectaculars fregant el seu pelatge ardent.', categoria: 'Foc', dataFitxatge: new Date('2026-07-06'), preuMercat: 5500, esLlegendari: false },
  { id: 158, nom: 'Totodile', descripcio: 'Molt enèrgic i mossega absolutament tot el que es mou.', categoria: 'Aigua', dataFitxatge: new Date('2026-07-07'), preuMercat: 1000, esLlegendari: false },
  { id: 159, nom: 'Croconaw', descripcio: 'Mai deixa anar la seva presa gràcies als seus ullals corbats.', categoria: 'Aigua', dataFitxatge: new Date('2026-07-08'), preuMercat: 2500, esLlegendari: false },
  { id: 160, nom: 'Feraligatr', descripcio: 'Intimida els rivals obrint les seves enormes i perilloses fauces.', categoria: 'Aigua', dataFitxatge: new Date('2026-07-09'), preuMercat: 5500, esLlegendari: false },

  // Famosos i Competitius Johto
  { id: 197, nom: 'Umbreon', descripcio: 'La llum de la lluna va alterar la seva genètica. Gran muralla defensiva.', categoria: 'Sinistre', dataFitxatge: new Date('2026-08-05'), preuMercat: 5000, esLlegendari: false },
  { id: 212, nom: 'Scizor', descripcio: 'El seu cos té la duresa de l\'acer. Les seves pinces aixafen qualsevol cosa.', categoria: 'Acer', dataFitxatge: new Date('2026-08-15'), preuMercat: 6500, esLlegendari: false },
  { id: 248, nom: 'Tyranitar', descripcio: 'Poderós i ferotge; pot enderrocar muntanyes per refer el seu territori.', categoria: 'Roca', dataFitxatge: new Date('2026-08-30'), preuMercat: 10000, esLlegendari: false },

  // Llegendaris Johto
  { id: 243, nom: 'Raikou', descripcio: 'Bèstia llegendària que corre pel món rugint com un llamp.', categoria: 'Elèctric', dataFitxatge: new Date('2026-09-10'), preuMercat: 18000, esLlegendari: true },
  { id: 244, nom: 'Entei', descripcio: 'Bèstia llegendària nascuda de l\'erupció d\'un volcà.', categoria: 'Foc', dataFitxatge: new Date('2026-09-11'), preuMercat: 18000, esLlegendari: true },
  { id: 245, nom: 'Suicune', descripcio: 'Bèstia llegendària que purifica qualsevol aigua contaminada al seu pas.', categoria: 'Aigua', dataFitxatge: new Date('2026-09-12'), preuMercat: 19000, esLlegendari: true },
  { id: 249, nom: 'Lugia', descripcio: 'Guardià dels mars; el simple aleteig de les seves ales pot causar tempestes.', categoria: 'Volador', dataFitxatge: new Date('2026-09-20'), preuMercat: 30000, esLlegendari: true },
  { id: 250, nom: 'Ho-Oh', descripcio: 'Au celestial que deixa un arc de Sant Martí al volar i promet felicitat.', categoria: 'Foc', dataFitxatge: new Date('2026-09-21'), preuMercat: 30000, esLlegendari: true },
  { id: 251, nom: 'Celebi', descripcio: 'Llegendari guardià del bosc amb la capacitat de viatjar pel temps.', categoria: 'Psíquic', dataFitxatge: new Date('2026-09-25'), preuMercat: 28000, esLlegendari: true }
];