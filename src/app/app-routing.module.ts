import { VoitureListeComponent } from './pages/voiture-liste/voiture-liste.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisiteEncoursComponent } from './pages/visite-encours/visite-encours.component';
import { VoitureInscriptionComponent } from './pages/voiture/voiture-inscription/voiture-inscription.component';
import { VoitureDetailComponent } from './pages/voiture/voiture-detail/voiture-detail.component';

const routes: Routes = [
  { path: 'login', component:  LoginComponent},
  { path :'not-found' , component:NotfoundComponent},
  { path :'inscription-voiture' , component: VoitureInscriptionComponent},
  { path :'liste-voiture' , component: VoitureListeComponent},
  { path :'detail-voiture/:idvoiture' , component: VoitureDetailComponent},
  { path :'visite-encours' , component: VisiteEncoursComponent},
  { path :'inscription' , component : InscriptionComponent},


  {path: '**', redirectTo:'/not-found'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
