import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthenticationService)
  const router = inject(Router)
  if(!authService.getIsAuthenticated())
  {

    router.createUrlTree(['login']);
    return false;
  }
  else
  {
    return true;
  }
};
