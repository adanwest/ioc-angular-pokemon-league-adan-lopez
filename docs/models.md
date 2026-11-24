# Documentació de Models i Adaptador (EAC3)

## Arquitectura de Dades
Per desacoblar l'aplicació del contracte extern de l'API REST, s'han separat els models en dos fitxers:
* **Model d'API (`src/app/models/pokemon-api.model.ts`):** Defineix la interfície `PokemonApiDTO` amb l'estructura exacta retornada per `json-server`.
* **Model Intern (`src/app/models/pokemon.model.ts`):** Defineix la interfície `Pokemon` tipada per als components i plantilles d'Angular.
* **Adaptador (`src/app/adapters/pokemon.adapter.ts`):** Classe `PokemonAdapter` encarregada de transformar i normalitzar els fluxos d'entrada (`fromApi`, `fromApiList`) i de sortida (`toApi`).

## Taula de Mapatge (API -> Model Intern)

| Camp API (`PokemonApiDTO`) | Tipus API | Camp Intern (`Pokemon`) | Tipus Intern | Regla de Transformació / Normalització |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `string` | `id` | `string` | Conversió a text i neteja d'espais amb `.trim()`. |
| `name` | `string` | `nom` | `string` | Eliminació d'espais en blanc sobrants amb `.trim()`. |
| `description` | `string?` | `descripcio` | `string` | Si és buida o absent, s'assigna `"Sense descripció disponible."`. |
| `category` | `string` | `categoria` | `string` | Normalització de format (*Capitalize*: primera majúscula, resta minúscula). |
| `signing_date` | `string` | `dataFitxatge` | `Date` | Conversió de cadena ISO (`YYYY-MM-DD`) a instància nativa `Date`. |
| `region` | `string?` | `regio` | `string` | Neteja amb `.trim()`; valor per defecte `"Desconeguda"` si falta. |
| `market_price` | `number \| string` | `preuMercat` | `number` | Conversió numèrica segura (`Number()`); retorna `0` si és `NaN` o negatiu. |
| `is_legendary` | `boolean?` | `esLlegendari` | `boolean` | Assignació per defecte a `false` mitjançant operador *nullish coalescing* (`??`). |