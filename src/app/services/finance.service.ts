import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { base_url } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {


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

