import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor() { 
    
  }

  utenteRuolo = livelli.ospite
   
   isOspite()
   {
 
     if(this.utenteRuolo == livelli.ospite)
       return true
     else return false
     
   }
   isUser()
   {
 
     if(this.utenteRuolo == livelli.utente)
       return true
     else return false
     
   }
   isAdmin()
   {
 
     if(this.utenteRuolo == livelli.admin)
       return true
     else return false
     
   }
 }
 
 export enum livelli{
   ospite = "Ospite",
   utente = "Utente",
   admin = "Admin",
   
 }
 
