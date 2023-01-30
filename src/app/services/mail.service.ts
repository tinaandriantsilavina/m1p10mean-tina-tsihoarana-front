import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { Injectable } from '@angular/core';
import { base_url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  private url:any;
  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) {
    this.url = base_url
   }

  mail_payement(body){
    console.log();
    return this.http.post(base_url + `api/mail/financier/send`, body,  this.authService.option(true));
  }

  payerbonsortie(id,body){
    return this.http.post(base_url + `api/bondesorties/financier/${id}/payer`, body ,  this.authService.option(true));
  }

  bondesortie_list(etat){

    let user = 'client'
    if(this.authService.users.code_type==0) user ='client'
    if(this.authService.users.code_type==1) user ='atelier'
    if(this.authService.users.code_type==2) user ='financier'
    let requete =this.http.get(base_url + `api/bondesorties/${user}?etat=${etat}`,  this.authService.option(true));
    if(etat==-1){
      requete = this.http.get(base_url + `api/bondesorties/${user}`,  this.authService.option(true));
    }
    return requete
  }
}
