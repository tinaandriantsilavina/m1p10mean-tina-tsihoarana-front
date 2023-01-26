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

  atelierlistereparation(idvisite){
    return this.http.get(base_url + `api/reparations/atelier/visite/${idvisite}`,  this.authService.option(true));
  }

  ateliercreationreparation(visite,body){
    return this.http.post(base_url + `api/reparations/atelier/create/visite/${visite}`, body ,  this.authService.option(true));
  }

  atelierdeletereparation(visite,reparation){
    return this.http.delete(base_url + `api/reparations/atelier/visite/${visite}/reparation/${reparation}` ,  this.authService.option(true));
  }

  
  atelierupdatereparation(visite,reparation,body){
    return this.http.put(base_url + `api/reparations/atelier/visite/${visite}/reparation/${reparation}`, body ,  this.authService.option(true));
  }
}
