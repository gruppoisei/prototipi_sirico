import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsertPersonaComponent } from './pages/insert-persona/insert-persona.component';

const routes: Routes = [
  {path: "inserimento-persona", component: InsertPersonaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
