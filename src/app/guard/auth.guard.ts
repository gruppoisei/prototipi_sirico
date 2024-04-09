import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthGuardService } from '../service/auth-guard.service';

export const authGuard: CanActivateFn = () => {
  // const authService = inject(AuthenticationService)
  // const router = inject(Router)
  // if(!authService.getIsAuthenticated())
  // {

  //   router.navigate(["login"])
  //   return false;
  // }
  // else
  // {
    return true;
  // }


  
};


export const myGuardOspite : CanActivateFn = () => {
  const router: Router = inject(Router);
  if(inject(AuthGuardService).isOspite()) return router.createUrlTree(["autenticazione"])
  else return true
}

export const myGuardUser : CanActivateFn = () => {
  const router: Router = inject(Router);
  if(inject(AuthGuardService).isOspite() || inject(AuthGuardService).isAdmin()) return true
  else return inject(AuthGuardService).isUser() || router.createUrlTree(["/products"])
}

export const myGuardAdmin : CanActivateFn = () => {
  const router: Router = inject(Router);
 if(inject(AuthGuardService).isAdmin()) return true 
 else return router.createUrlTree([""])
}