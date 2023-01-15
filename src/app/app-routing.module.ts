import { NotfoundComponent } from './pages/notfound/notfound.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { DepotVoitureComponent } from './pages/depot-voiture/depot-voiture.component';

const routes: Routes = [
  { path: 'connexion/loginform', component:  LoginComponent},
  { path :'not-found' , component:NotfoundComponent},
  { path :'inscription' , component:InscriptionComponent},
  { path :'depot-voiture' , component:DepotVoitureComponent},
  {path: '**', redirectTo:'/not-found'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
