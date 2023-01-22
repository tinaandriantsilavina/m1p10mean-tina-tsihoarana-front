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
        email:["baba@a.com", [Validators.required]],
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
          // if(data['status'] ==200){
            console.log(data);
            this.router.navigate(['login'])
            this.toastr.success("Inscription","inscription terminé avec success, vous pouvez se connecter")
            // this.toastr.warning("Inscription","Echec de l'inscription")
            this.spinner.hide()
          // }
          // else{
          //   this.message="Mot de Passe ou User Incorrecte";
          // }
        },error => {
          this.spinner.hide()
          this.message = <any>error;
          if(this.message != null){
          }
        }
      );
    })
  }
}
