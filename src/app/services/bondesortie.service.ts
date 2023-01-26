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
    return this.http.post(base_url + `api/bondesorties/atelier/visite/${visite}/create`, {} ,  this.authService.option(true));
  }

  bondesortie_list(etat){
    let user = 'client'
    if(this.authService.users.code_type==0) user ='client'
    if(this.authService.users.code_type==1) user ='atelier'
    if(this.authService.users.code_type==2) user ='financier'
    return this.http.get(base_url + `api/bondesorties/${user}?etat=${etat}`,  this.authService.option(true));
  }

}
