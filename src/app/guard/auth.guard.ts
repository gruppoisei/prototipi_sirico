import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { firstValueFrom } from 'rxjs';

export const notLogged: CanActivateFn = async () => {

  const authService = inject(AuthenticationService)
  const router = inject(Router)
  const response =  await firstValueFrom(authService.ValidateToken())
  if(response == ruoloUtente.NonLoggato)
    {
      return true;
    }
    else{
      router.navigate([''])
      return false
    }
};


export const basicUser: CanActivateFn = async () => {

  const authService = inject(AuthenticationService)
  const router = inject(Router)
  const response =  await firstValueFrom(authService.ValidateToken())
  if(response == ruoloUtente.UtenteBase)
  {
    return true
  }
  else{
    router.navigate([''])
    return false;
  }
};

export enum ruoloUtente 
{
  NonLoggato = 1,
  UtenteBase,
  Segreteria,
  Amministrazione
}