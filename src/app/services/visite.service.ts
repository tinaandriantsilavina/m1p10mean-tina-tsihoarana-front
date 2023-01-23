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

   getvisiteencours(){
    console.log();
    return this.http.get(base_url + 'api/visites/client/encours',  this.authService.option(true));
  }

  creervisite(voiture,body){
    console.log();
    return this.http.post(base_url + `api/visites/atelier/voiture/${voiture}/create`, body ,  this.authService.option(true));
  }
}
