// import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ProgressComponent } from './components/progress/progress.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from './components/_modal';
import { VoitureInscriptionComponent } from './pages/voiture/voiture-inscription/voiture-inscription.component';
import { VoitureDetailComponent } from './pages/voiture/voiture-detail/voiture-detail.component';
import { VoitureListComponent } from './pages/voiture/voiture-list/voiture-list.component';
import { VisiteEncoursComponent } from './pages/visite/visite-encours/visite-encours.component';
import { ConnexionComponent } from './pages/user/connexion/connexion.component';
import { InscriptionComponent } from './pages/user/inscription/inscription.component';
import { VoitureDemandeComponent } from './pages/voiture/voiture-demande/voiture-demande.component';
import { AtelierDetailVoitureComponent } from './pages/voiture/atelier-detail-voiture/atelier-detail-voiture.component';
import { AtelierVisiteComponent } from './pages/visite/atelier-visite/atelier-visite.component';
import { AtelierReparationListComponent } from './pages/reparation/atelier-reparation-list/atelier-reparation-list.component';
import { AccueilComponent } from './pages/accueil/accueil/accueil.component';
import { VisiteHistoriqueComponent } from './pages/visite/visite-historique/visite-historique.component';
import { FinanceStatComponent } from './pages/financier/finance-stat/finance-stat.component';
import { BonSortieListComponent } from './pages/bondesortie/bon-sortie-list/bon-sortie-list.component';
import { DepensesComponent } from './pages/financier/depenses/depenses.component';
import { ChartComponent } from './components/chart/chart.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { FooterComponent } from './components/footer/footer.component';
registerLocaleData(localeFr, 'fr');
@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    ProgressComponent,
    NotfoundComponent,
    InscriptionComponent,
    ImageUploadComponent,
    VoitureDetailComponent,
    VisiteEncoursComponent,
    VoitureInscriptionComponent,
    VoitureDetailComponent,
    VoitureListComponent,
    ConnexionComponent,
    VoitureDemandeComponent,
    AtelierDetailVoitureComponent,
    AtelierVisiteComponent,
    AtelierReparationListComponent,
    AccueilComponent,
    VisiteHistoriqueComponent,
    FinanceStatComponent,
    BonSortieListComponent,
    DepensesComponent,
    ChartComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ModalModule,
  ],
  exports: [
    NgxSpinnerModule,
  ],
  providers: [
    ToastrService,
    { provide: LOCALE_ID, useValue: "fr-FR" }
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
