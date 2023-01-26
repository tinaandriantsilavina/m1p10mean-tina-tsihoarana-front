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

  getlistevoiture(){
    console.log();
    return this.http.get(base_url + 'api/voitures/client',  this.authService.option(true));
  }

  getlistedemande(){
    console.log();
    return this.http.get(base_url + 'api/voitures/atelier/demande',  this.authService.option(true));
  }

  getlistevoiturecustome(numero,etat){
    console.log();
    return this.http.get(base_url + `api/voitures/atelier?numero=${numero}&etat=${etat}`,  this.authService.option(true));
  }

  getlistevoitureetat(etat){
    console.log();
    return this.http.get(base_url + `api/voitures/atelier?etat=${etat}`,  this.authService.option(true));
  }

  demandevoitureaccepter(id){
    console.log();
    let body =null;
    return this.http.post(base_url + `api/voitures/atelier/demande/accepter/${id}`, body,  this.authService.option(true));
  }

  deposervoiture(body){
    console.log();
    return this.http.post(base_url + 'api/voitures/client/deposer',body,  this.authService.option(true));
  }

  getlistevisiteencours(){
    console.log();
    return this.http.post(base_url + 'api/',  this.authService.option(true));
  }

  getlistvoiture() {
    return   this.http.get('assets/datajson/voiture.json')
  }


}
