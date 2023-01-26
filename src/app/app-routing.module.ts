import { FinanceStatComponent } from './pages/financier/finance-stat/finance-stat.component';
import { AccueilComponent } from './pages/accueil/accueil/accueil.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoitureInscriptionComponent } from './pages/voiture/voiture-inscription/voiture-inscription.component';
import { VoitureDetailComponent } from './pages/voiture/voiture-detail/voiture-detail.component';
import { VoitureListComponent } from './pages/voiture/voiture-list/voiture-list.component';
import { VisiteEncoursComponent } from './pages/visite/visite-encours/visite-encours.component';
import { ConnexionComponent } from './pages/user/connexion/connexion.component';
import { InscriptionComponent } from './pages/user/inscription/inscription.component';
import { VoitureDemandeComponent } from './pages/voiture/voiture-demande/voiture-demande.component';
import { AtelierDetailVoitureComponent } from './pages/voiture/atelier-detail-voiture/atelier-detail-voiture.component';
import { VisiteHistoriqueComponent } from './pages/visite/visite-historique/visite-historique.component';

const routes: Routes = [
  { path :'accueil' , component : AccueilComponent},
  { path :'' , component : AccueilComponent},
  { path: 'login', component:  ConnexionComponent},
  { path :'not-found' , component:NotfoundComponent},
  { path :'inscription-voiture' , component: VoitureInscriptionComponent},
  { path :'liste-voiture' , component: VoitureListComponent},
  { path :'detail-voiture/:idvoiture' , component: VoitureDetailComponent},
  { path :'visite-voiture/:numero' , component: VisiteEncoursComponent},
  { path :'historique-visite' , component: VisiteHistoriqueComponent},
  { path :'inscription' , component : InscriptionComponent},

 


  // responsable atelier
  { path :'atelier-voiture' , component: VoitureDemandeComponent},
  { path :'atelier-detail-voiture/:numero' , component: AtelierDetailVoitureComponent},


  // Finance
  { path :'finance-stat' , component: FinanceStatComponent},

  {path: '**', redirectTo:'/not-found'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
