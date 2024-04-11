import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { firstValueFrom } from 'rxjs';
import { ReadPropExpr } from '@angular/compiler';

/* export const notLogged: CanActivateFn = () => {

  const authService = inject(AuthenticationService)
  const router = inject(Router)
  debugger 
   authService.ValidateToken().subscribe({
      next : (res) => 
        {
          debugger
          if(res.status == 200)
            {
              const utente = res.body.utenteLoggato;
              const ruolo = utente?.idRuolo
              if(ruolo == ruoloUtente.NonLoggato)
                {
                  return true;
                }
                else{
                  router.navigate(['homepage'])
                  return false
                }
            }
            else
            {
              router.navigate(['homepage']);
              return false;
            }
        },
        error  :(err) =>
        {
          console.log(err)
          router.navigate(['homepage']);
          return false
        },
    })
    return false
}; */

export const notLogged: CanActivateFn = async () => {

  const authService = inject(AuthenticationService)
  const router = inject(Router)
  const response =  await firstValueFrom(authService.ValidateToken())
  if(response == ruoloUtente.NonLoggato)
    {
      return true;
    }
    else
    {
      router.navigate(['homepage'])
      return false
    }
  
};


export const basicUser: CanActivateFn = async () => {

  const authService = inject(AuthenticationService)
  const router = inject(Router)
  const response =  await firstValueFrom(authService.ValidateToken())
  console.log(response)
  if(response == ruoloUtente.UtenteBase)
  {
    return true
  }
  else
  {
    router.navigate(['homepage'])
    return false;
  }
};

export enum ruoloUtente 
{
  NonLoggato = 1  ,
  UtenteBase,
  Segreteria,
  Amministrazione
}