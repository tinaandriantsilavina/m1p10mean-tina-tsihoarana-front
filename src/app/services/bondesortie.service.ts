import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { base_url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BondesortieService {

  private url:any;
  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) {
    this.url = base_url
   }

  creerbonsortie(visite){
    console.log();
    return this.http.post(base_url + `api/visites/atelier/terminer/${visite}`, null ,  this.authService.option(true));
  }
}
