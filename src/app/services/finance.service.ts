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



  //depense
  depensecreer(body){
    return this.http.post(base_url + `api/depenses/financier/create`, body ,  this.authService.option(true));
  }

  depenseliste(){
    return this.http.get(base_url + `api/depenses/financier`,  this.authService.option(true));
  }

  sumdepensemois(annee, mois){
    return this.http.get(base_url + `api/depenses/financier/sum?annee=${annee}&mois=${mois}`,  this.authService.option(true));
  }

  depenseupdate(id,body){
    return this.http.put(base_url + `api/depenses/financier/${id}`, body ,  this.authService.option(true));
  }

  depensedelete(id){
    return this.http.delete(base_url + `api/depenses/financier/${id}`,  this.authService.option(true));
  }

  depensebyid(id){
    return this.http.get(base_url + `api/depenses/financier/${id}`,  this.authService.option(true));
  }


  // Stat
  stat_chiffre_affaire_date(debut, fin){
    console.log();
    return this.http.get(base_url + `api/statistiques/financier/chiffre_affaire?debut=${debut}&fin=${fin}`,  this.authService.option(true));
  }

  
  stat_chiffre_affaire_mois_annee(mois, annee){
    console.log();
    return this.http.get(base_url + `api/statistiques/financier/chiffre_affaire/mois?mois=${mois}&annee=${annee}`,  this.authService.option(true));
  }

  stat_chiffre_affaire_annee(annee){
    console.log();
    return this.http.get(base_url + `api/statistiques/financier/chiffre_affaire/data/${annee}`,  this.authService.option(true));
  }



  stat_reparation_moyenne(){
    console.log();
    return this.http.get(base_url + `api/statistiques/financier/reparation_moyenne`,  this.authService.option(true));
  }



  stat_benefice(mois, annee){
    console.log();
    return this.http.get(base_url + `api/statistiques/financier/benefice/mois?mois=${mois}&annee=${annee}`,  this.authService.option(true));
  }

}



