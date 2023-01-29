import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { base_url } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VisiteService {

  private url:any;
  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) {
    this.url = base_url
   }

   clientvisiteencours_all(){
    return this.http.get(base_url + 'api/visites/client/encours',  this.authService.option(true));
  }

  clientvisiteetat(etat){
    return this.http.get(base_url + `api/visites/client?etat=${etat}`,  this.authService.option(true));
  }

  clientvisiteAll(){
    return this.http.get(base_url + `api/visites/client`,  this.authService.option(true));
  }

  clientvisite_voiture(numero){
    console.log();
    return this.http.get(base_url + `api/visites/client/voiture/${numero}`,  this.authService.option(true));
  }

  ateliervisite(numero){
    return this.http.get(base_url + `api/visites/atelier/voiture/${numero}`,  this.authService.option(true));
  }

  ateliervisitebyid(id){
    return this.http.get(base_url + `api/visites/atelier/${id}`,  this.authService.option(true));
  }



  creervisite(voiture,body){
    console.log();
    return this.http.post(base_url + `api/visites/atelier/voiture/${voiture}/create`, body ,  this.authService.option(true));
  }

  terminervisite(visite,body){
    console.log();
    return this.http.post(base_url + `api/visites/atelier/terminer/${visite}`, body ,  this.authService.option(true));
  }
}
