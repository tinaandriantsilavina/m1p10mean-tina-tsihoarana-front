// import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
    VoitureDemandeComponent
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
    ModalModule
  ],
  exports: [
    NgxSpinnerModule,
  ],
  providers: [
    ToastrService
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
