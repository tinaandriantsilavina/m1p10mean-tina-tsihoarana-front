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
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
    withCredentials: true
  };

  //* conf header form data **/

  defaultHttpOptions = {
    headers: new HttpHeaders({
    }),
    withCredentials: true
  };

  enregistrerVoiture(body){
    console.log(body);
    return this.http.post(base_url + 'api/voitures/client/enregistrer', body, this.authService.option(true));
  }

  // getreparation(dcs : any) {
  //   const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
  //   return this.http.get(this.url + 'get/docs/' + dcs, { headers, responseType: 'json', withCredentials: true });
  // }

  // depotvoiture(body={}){
  //   const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
  //   return this.http.post(this.url+'reouvrirTicket', body, { headers, responseType: 'json', withCredentials: true});
  // }


  getlistvoiture() {
    return   this.http.get('assets/datajson/voiture.json')
  }


}
