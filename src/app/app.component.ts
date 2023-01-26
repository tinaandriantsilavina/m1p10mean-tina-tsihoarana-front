import { AuthService } from './services/auth/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from './components/_modal';
import { spinner_background, spinner_type } from 'src/environments/variable';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'meanfront';
  users: any;
  class: any;
  spinner_type = ""
  spinner_background = ""
  menutoogle: boolean = false
  constructor(public authservice: AuthService,
    public router: Router,
    private modalService: ModalService,
    private sharedService: SharedService
  ) {
    this.spinner_type = spinner_type;
    this.spinner_background = spinner_background;

    this.sharedService.class$.subscribe(value => {
      this.class = value;
    });
    if (authservice.users == null) {
      this.class = ""
    } else {
      this.class = 'main-content';
    }
  }
  deconnexion() {
    localStorage.clear()
    this.sharedService.changeUser(null);
    this.sharedService.changeClass("");
    this.router.navigate(['login'])
    // .then(() => {
    //   window.location.reload();
    // });
    // return new Promise((resolve, reject) => {
    //   this.authservice.deconnexion().subscribe(
    //     data => {
    //       let d = (data as {[key: string]: any})
    //       if(d['status'] === 'success'){
    //         // this.router.navigate(['connexion/loginform'])
    //         this.router.navigate([''])
    //           .then(() => {
    //             window.location.reload();
    //           });
    //       }
    //       else{
    //         reject('Erreur Connexx');
    //       }
    //     },error => {
    //       let message = <any>error;
    //       if(message != null){
    //         reject(message);

    //       }
    //     }
    //   );
    // })
  }
  ngOnInit(): void {
    console.log("APP COMPONENT io " , this.authservice.users)
    if (localStorage.getItem('users') != null) {
      // console.log("hjhksjdhkfjhk")
      // console.log(localStorage.getItem('users'))
      // this.users=this.authservice.users
      // localStorage.setItem('users',JSON.stringify(this.authservice.users) )
    } else {
      this.router.navigate(['login'])
    }
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
