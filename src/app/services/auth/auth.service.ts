import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { base_url } from 'src/environments/environment';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: any;
  constructor(
    private http:HttpClient,
    private sharedService : SharedService
    ) {
    let tok=localStorage.getItem('token');
    this.sharedService.user$.subscribe(value => {
      this.users = value;
    });
    this.getUsersByToken(tok);
    if(localStorage.getItem('users')!=null ){
        this.users=JSON.parse(localStorage.getItem('users') || '{}');
      }
    console.log("Constructor  Am auth TOKEN "+tok)
  }
  getUsersByToken(token : any) {
    let body={
      "st1":token
    }
    // new Promise((resolve, reject) => {
    //   this.http.post(base_url + 'login/verifierToken', body).subscribe(
    //     data => {
    //       // let d = (data as {[key: string]: any})
    //       if(data['status'] ==200){
    //         localStorage.setItem('users',JSON.stringify(data['data'][0]))
    //         localStorage.setItem('token',data['data'][1])
    //         console.log("Verification TOTOTOT")
    //         console.log(this.users)
    //       }
    //       else{
    //         console.log("===========>>>> " )
    //         console.log(body)
    //         localStorage.clear()
    //         // reject('Erreur Connexx');
    //       }
    //     },error => {
    //       let message = <any>error;
    //       if(message != null){
    //         // reject(message);
    //         localStorage.clear()
    //       }
    //     }
    //   );
    // })
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
            'Content-Type': 'application/json',
            'x-auth-token':tok
          })}
    }
    return headers;
  }
  verifierToken(){

  }

  inscription(body){
    console.log(body);
    return this.http.post(base_url + 'api/users', body);
  }
  connexion(body: any){
    console.log(body);
    return this.http.post(base_url + 'api/auth', body);
  }
  deconnexion(){
    let body={
      "int1":this.users.idusers
    }
    console.log(body)
    return this.http.post(base_url + 'deconnexion', body);
  }
}
