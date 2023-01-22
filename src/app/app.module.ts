// import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ProgressComponent } from './components/progress/progress.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from './components/_modal';
import { VoitureListeComponent } from './pages/voiture-liste/voiture-liste.component';
import { VisiteEncoursComponent } from './pages/visite-encours/visite-encours.component';
import { VoitureInscriptionComponent } from './pages/voiture/voiture-inscription/voiture-inscription.component';
import { VoitureDetailComponent } from './pages/voiture/voiture-detail/voiture-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FileUploadComponent,
    ProgressComponent,
    NotfoundComponent,
    InscriptionComponent,
    ImageUploadComponent,
    VoitureListeComponent,
    VoitureDetailComponent,
    VisiteEncoursComponent,
    VoitureInscriptionComponent,
    VoitureDetailComponent
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
