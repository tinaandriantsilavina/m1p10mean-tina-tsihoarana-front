import { SharedService } from './../../../services/shared.service';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent {
  submitted=false;
  formulaire : FormGroup;
  message="";
  spinner_type =""
  spinner_background=""
  testdata : any;

  ngAfterViewInit(): void {
  }

  constructor(
    public route:ActivatedRoute,
    public router:Router,
    public formBuilder:FormBuilder,
    private authservice: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private sharedService : SharedService
    ) {

  }

  onSubmit(): void {
    this.submitted = true; // ijerena ftsn we ef nanindry an ilay boutton ve izy
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formulaire.controls;
  }
  initForm(){
    this.formulaire = this.formBuilder.group(
      {
        name:["Baba", [Validators.required]],
        email:["baba@garage.com", [Validators.required]],
        password:["12345", [Validators.required]]
      }
    );
  }

  ngOnInit(): void {
    this.initForm();
  }


  inscription(){
    this.spinner.show()
    return new Promise((resolve, reject) => {
      this.authservice.inscription(this.formulaire.getRawValue()).subscribe(
        d => {
          let data = (d as {[key: string]: any})
          if(data['status'] ==200){
            console.log(data);
            this.router.navigate(['login'])
            let user = data['datas']['user']
            localStorage.setItem('users',JSON.stringify(user))
            localStorage.setItem('token',data['datas']["token"])
            this.sharedService.changeClass("main-content");
            this.sharedService.changeUser(user);
            this.router.navigate(['liste-voiture'])
            this.toastr.success("inscription terminé avec success, vous pouvez se connecter", "Success")
          }else{
            this.message="Echec de l'inscription";
            this.toastr.warning(this.message,"Erreur inscription")
          }
          this.spinner.hide()
        },error => {
          this.message="Erreur Connexion";
          this.toastr.error(this.message,"Erreur")
          this.spinner.hide()
        }
      );
    })
  }
}
