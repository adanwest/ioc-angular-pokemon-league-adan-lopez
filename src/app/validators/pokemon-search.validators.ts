import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, map, of, switchMap, timer } from 'rxjs';
import { PokemonService } from '../services/pokemon.service';

/**
 * Validador síncron:
 * - Si el camp està completament buit (''), és vàlid (permet mostrar tota la llista).
 * - Si conté només espais en blanc, retorna { nomesEspais: true }.
 * - Si té text, exigeix un mínim de 2 caràcters útils ({ minLengthTrimmed: true }).
 * - Només permet lletres (incloent accents catalans/castellans), números, espais i guions ({ caractersInvalids: true }).
 */
export function termeCercaSyncValidator(): ValidatorFn {
  const regexPermesa = /^[a-zA-ZÀ-ÿ0-9\s\-]*$/;

  return (control: AbstractControl): ValidationErrors | null => {
    const valor: string = control.value ?? '';

    if (valor.length === 0) {
      return null;
    }

    const valorNet = valor.trim();

    if (valorNet.length === 0) {
      return { nomesEspais: true };
    }

    if (valorNet.length < 2) {
      return { minLengthTrimmed: { requiredLength: 2, actualLength: valorNet.length } };
    }

    if (!regexPermesa.test(valor)) {
      return { caractersInvalids: true };
    }

    return null;
  };
}

/**
 * Validador asíncron:
 * Consulta l'API via PokemonService per comprovar si el terme escrit
 * coincideix amb algun Pokémon existent. Si no n'hi ha cap, retorna { termeSenseResultats: true }.
 */
export function termeExistentAsyncValidator(pokemonService: PokemonService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const valor: string = (control.value ?? '').trim();

    // Si està buit o té menys de 2 caràcters, no fem petició HTTP innecessària
    if (valor.length < 2) {
      return of(null);
    }

    // Esperem 350ms abans de consultar l'API per evitar peticions a cada pulsació
    return timer(350).pipe(
      switchMap(() => pokemonService.comprovarExistenciaTerme(valor)),
      map((existeix) => (existeix ? null : { termeSenseResultats: true }))
    );
  };
}