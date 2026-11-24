# Documentació Tècnica — EAC3: Serveis HTTP, Formularis Reactius i Qualitat

## 1. Arquitectura de Serveis i Flux de Dades
L'aplicació segueix una separació estricta de responsabilitats:
- **Models (`src/app/models/`)**:
  - `pokemon-api.model.ts` (`PokemonApiDTO`): contracte exacte de dades que retorna l'API externa (`snake_case`).
  - `pokemon.model.ts` (`Pokemon`): model intern normalitzat del domini de l'aplicació (`camelCase` i tipus `Date`).
- **Adaptador (`src/app/adapters/pokemon.adapter.ts`)**: classe `PokemonAdapter` amb mètodes purs `fromApi()` i `toApi()` que desacoblen la vista dels canvis del servidor i apliquen valors per defecte segurs.
- **Servei Reactiu (`src/app/services/pokemon.service.ts`)**: gestiona l'estat global mitjançant `BehaviorSubject` (`pokemons$`, `loading$`, `error$`) i encadena operadors RxJS (`debounceTime`, `distinctUntilChanged`, `switchMap`, `catchError`).
- **Interceptor Funcional (`src/app/interceptors/api.interceptor.ts`)**: `apiInterceptor` registrat amb `withInterceptors([apiInterceptor])` a `app.config.ts` per injectar capçaleres comunes (`Accept`, `X-Client-App`) i registrar errors HTTP.

## 2. Gestió d'Errors i Recuperació
- Els errors HTTP (`status 0`, `404`, `500`) es capturen a `PokemonService` i s'exposen a través de `error$`.
- El component `PokemonListComponent` renderitza un banner d'alerta (`role="alert"`) amb el botó **Reintentar**, que executa `pokemonService.reintentar()` per tornar a llançar la petició sense recarregar la pàgina.

## 3. Proves Unitàries i Build
- **Tests unitaris (Vitest)**: cobreixen `PokemonAdapter`, `PokemonService` (amb `HttpTestingController`) i les validacions de `PokemonListComponent`.
- **Compilació de producció**: verificada mitjançant `ng build`.