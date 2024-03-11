import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  console.log("Guardia chiamata")
  //debugger
  const auth = inject(AuthenticationService)
  console.log('Is Authenticated:', auth.getIsAuthenticated());
  if(!auth.getIsAuthenticated)
  {
    console.log("Utente non autenticato")
    return false;
  }
  console.log("Utente autenticato")
  return true;
};
