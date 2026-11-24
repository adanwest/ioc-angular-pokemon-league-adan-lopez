import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Clonem la petició per afegir capçaleres comunes d'identificació i format
  const peticioModificada = req.clone({
    setHeaders: {
      'Accept': 'application/json',
      'X-Client-App': 'PokemonLeague-EAC3-Angular'
    }
  });

  return next(peticioModificada).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error(
        `[API Interceptor] Error HTTP ${error.status} a ${req.method} ${req.url}:`,
        error.message
      );
      return throwError(() => error);
    })
  );
};