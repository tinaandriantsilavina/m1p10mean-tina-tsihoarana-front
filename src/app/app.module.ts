// import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { DepotVoitureComponent } from './pages/depot-voiture/depot-voiture.component';
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
import { VoitureDetailsComponent } from './pages/voiture-details/voiture-details.component';
import { VisiteEncoursComponent } from './pages/visite-encours/visite-encours.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FileUploadComponent,
    ProgressComponent,
    NotfoundComponent,
    InscriptionComponent,
    DepotVoitureComponent,
    ImageUploadComponent,
    VoitureListeComponent,
    VoitureDetailsComponent,
    VisiteEncoursComponent
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
    ToastrService
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
