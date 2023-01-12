import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { base_url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: any;
  constructor(private http:HttpClient) {
    let tok=localStorage.getItem('token');
    this.getUsersByToken(tok);
    if(localStorage.getItem('users')!=null ){
        // this.users=JSON.parse(localStorage.getItem('users'));
      }
    console.log("Constructor  Am auth TOKEN "+tok)
  }
  getUsersByToken(token : any) {
    let body={
      "st1":token
    }
    new Promise((resolve, reject) => {
      this.http.post(base_url + 'login/verifierToken', body).subscribe(
        data => {
          let d = (data as {[key: string]: any})
          if(d['status'] ==200){
            localStorage.setItem('users',JSON.stringify(d['data'][0]))
            localStorage.setItem('token',d['data'][1])
            console.log("Verification TOTOTOT")
            console.log(this.users)
          }
          else{
            console.log("===========>>>> " )
            console.log(body)
            localStorage.clear()
            // reject('Erreur Connexx');
          }
        },error => {
          let message = <any>error;
          if(message != null){
            // reject(message);
            localStorage.clear()
          }
        }
      );
    })
  }

  option (use_authorization = false) {
    let tok=localStorage.getItem('token')
    let headers: any
    if(!use_authorization){
      headers = {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json'
          })}
    }
    if (use_authorization && tok!=null) {
      headers =  {
        headers: new HttpHeaders(
          {
            'Authorization': 'Bearer ' + tok,
            'Content-Type': 'application/json'
          })}
    }
    return headers;
  }
  verifierToken(){

  }

  connexion(body: any){
    console.log(body);
    return this.http.post(base_url + 'login/connexionusers', body);
  }
  deconnexion(){
    let body={
      "int1":this.users.idusers
    }
    console.log(body)
    // localStorage.clear()
    // this.users=[];
    return this.http.post(base_url + 'login/deconnexionusers', body);
  }
}
