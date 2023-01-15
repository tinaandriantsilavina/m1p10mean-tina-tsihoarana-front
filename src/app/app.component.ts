import { AuthService } from './services/auth/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'meanfront';
  users : any;
  class : any;
  constructor(public authservice: AuthService, public router: Router) {
    if (authservice.users == null) {
      this.class = ""
    } else {
      this.class = 'main-content';
    }
  }
  // deconnexion(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.authservice.deconnexion().subscribe(
  //       data => {
  //         if(data['status'] ==200){
  //           console.log("DECOOOCOCOCOCOCOCOCKKKKk")
  //           // this.router.navigate(['connexion/loginform'])
  //           this.router.navigate([''])
  //             .then(() => {
  //               window.location.reload();
  //               window.location.reload();
  //             });
  //         }
  //         else{
  //           // reject('Erreur Connexx');
  //         }
  //       },error => {
  //         let message = <any>error;
  //         if(message != null){
  //           reject(message);

  //         }
  //       }
  //     );
  //   })
  // }
  // ngOnInit(): void {
  //   console.log("APP COMPONENT io " +this.authservice.users)
  //   if(localStorage.getItem('users')!=null){
  //     // console.log("hjhksjdhkfjhk")
  //     // console.log(localStorage.getItem('users'))
  //     this.users=this.authservice.users
  //   }else{
  //     this.router.navigate(['connexion/loginform'])
  //   }
  //   //
  // }
}
