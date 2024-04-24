import { Injectable } from '@angular/core';
import { CalendarioComponent } from '../pages/rapportino/calendario/calendario.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingLoginService {
  
  newRoute:any[]=[]
  constructor(private router:Router) { }
  db:any[] = []

  AggiornaRoute()
  {
    this.newRoute = []
    this.db.map(menu => {
      let addMenu:any = {path:menu.path,children:[]}
      menu.children.map((sottomenu: { path: any; component: any; }) => {
        let addFiglio = {path:sottomenu.path,component:listaComponenti.find((componente: { idComponente: any; }) => componente.idComponente == sottomenu.component)}
        addMenu.children.push(addFiglio)
      })
      this.newRoute.push(addMenu)
    })
    console.log(this.newRoute)
    this.router.resetConfig(this.newRoute);

  }
}

export const listaComponenti = [
  {
    idComponente: 0,
    component: CalendarioComponent,
  },
  
]