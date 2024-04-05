import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

export const authGuard: CanActivateFn = () => {
  debugger
  const authService = inject(AuthenticationService)
  const router = inject(Router)
  if(!authService.getIsAuthenticated())
  {

    router.navigate(["login"])
    return false;
  }
  else
  {
    console.log(authService.getIsAuthenticated())
    return true;
  }
};
