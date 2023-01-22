import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { base_url } from 'src/environments/environment';
import { delay } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class VoitureService {
  private url:any;
  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) {
    this.url = base_url
   }
 
  enregistrerVoiture(body){
    console.log(body);
    return this.http.post(base_url + 'api/voitures/client/enregistrer', body, this.authService.option(true));
  }

  getlisteVoiture(){
    console.log();
    return this.http.post(base_url + 'api/voitures/client/enregistrer',  this.authService.option(true));
  }

  getlistevisiteencours(){
    console.log();
    return this.http.post(base_url + 'api/',  this.authService.option(true));
  }

  getlistvoiture() {
    return   this.http.get('assets/datajson/voiture.json')
  }


}
