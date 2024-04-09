import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor() { }

  accesso = livelli.ospite
   
   isOspite()
   {
 
     if(this.accesso == livelli.ospite)
       return true
     else return false
     
   }
   isUser()
   {
 
     if(this.accesso == livelli.utente)
       return true
     else return false
     
   }
   isAdmin()
   {
 
     if(this.accesso == livelli.admin)
       return true
     else return false
     
   }
 }
 
 export enum livelli{
   ospite = "Ospite",
   utente = "Utente",
   admin = "Admin",
   
 }
 
