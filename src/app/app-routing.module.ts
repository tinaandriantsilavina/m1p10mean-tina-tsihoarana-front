import { VoitureListeComponent } from './pages/voiture-liste/voiture-liste.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { DepotVoitureComponent } from './pages/depot-voiture/depot-voiture.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoitureDetailsComponent } from './pages/voiture-details/voiture-details.component';
import { VisiteEncoursComponent } from './pages/visite-encours/visite-encours.component';

const routes: Routes = [
  { path: 'login', component:  LoginComponent},
  { path :'not-found' , component:NotfoundComponent},
  { path :'depot-voiture' , component: DepotVoitureComponent},
  { path :'liste-voiture' , component: VoitureListeComponent},
  { path :'detail-voiture/:idvoiture' , component: VoitureDetailsComponent},
  { path :'visite-encours' , component: VisiteEncoursComponent},
  { path :'inscription' , component : InscriptionComponent},


  {path: '**', redirectTo:'/not-found'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
