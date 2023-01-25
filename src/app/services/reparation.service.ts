import { AuthService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { base_url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReparationService {
  private url:any;
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  atelierlistereparation(numero){
    return this.http.get(base_url + `api/visites/atelier/voiture/${numero}`,  this.authService.option(true));
  }

  ateliercreationreparation(visite,body){
    return this.http.post(base_url + `api/reparations/atelier/create/visite/${visite}`, body ,  this.authService.option(true));
  }
}
