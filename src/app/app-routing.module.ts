import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PersonnelComponent} from "./personnel/personnel.component";
import {GroupeComponent} from "./groupe/groupe.component";
import {ElementPedagogiqueComponent} from "./element-pedagogique/element-pedagogique.component";
import {ExamenComponent} from "./examen/examen.component";
import {SalleComponent} from "./salle/salle.component";
import {PersonnelEditComponent} from "./personnel-edit/personnel-edit.component";
import {ElementPedagogiqueEditComponent} from "./element-pedagogique-edit/element-pedagogique-edit.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {ExamenFormComponent} from "./examen-form/examen-form.component";
import {ExamenAssignComponent} from "./examen-assign/examen-assign.component";

const routes: Routes = [
  { path: 'personnel', component: PersonnelComponent },
  { path: 'groupe', component: GroupeComponent },
  { path: 'element-pedagogique', component: ElementPedagogiqueComponent },
  { path: 'examen', component: ExamenComponent },
  { path: 'salle', component: SalleComponent },
  {path: "personnel-edit/:idPersonnel", component: PersonnelEditComponent},
  {path: "element-pedagogique-edit/:idElement", component: ElementPedagogiqueEditComponent},
  {path: "accueil", component: AccueilComponent},
  { path: 'examens', component: ExamenComponent },
  { path: 'examens/add', component: ExamenFormComponent },
  { path: 'examens/edit/:id', component: ExamenFormComponent },
  { path: 'examens/assign/:id', component: ExamenAssignComponent },
  { path: '', redirectTo: '/accueil', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
