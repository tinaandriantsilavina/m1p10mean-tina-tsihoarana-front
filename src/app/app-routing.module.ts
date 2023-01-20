import { VoitureListeComponent } from './pages/voiture-liste/voiture-liste.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { DepotVoitureComponent } from './pages/depot-voiture/depot-voiture.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'connexion/loginform', component:  LoginComponent},
  { path :'not-found' , component:NotfoundComponent},
  { path :'depot-voiture' , component: DepotVoitureComponent},
  { path :'liste-voiture' , component: VoitureListeComponent},
  { path :'inscription' , component : InscriptionComponent},


  {path: '**', redirectTo:'/not-found'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
