import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { GroupeComponent } from './groupe/groupe.component';
import { ElementPedagogiqueComponent } from './element-pedagogique/element-pedagogique.component';
import { ExamenComponent } from './examen/examen.component';
import { SalleComponent } from './salle/salle.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PersonnelEditComponent } from './personnel-edit/personnel-edit.component';
import { ElementPedagogiqueEditComponent } from './element-pedagogique-edit/element-pedagogique-edit.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ExamenFormComponent } from './examen-form/examen-form.component';
import { ExamenAssignComponent } from './examen-assign/examen-assign.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonnelComponent,
    GroupeComponent,
    ElementPedagogiqueComponent,
    ExamenComponent,
    SalleComponent,
    PersonnelEditComponent,
    ElementPedagogiqueEditComponent,
    AccueilComponent,
    ExamenFormComponent,
    ExamenAssignComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
