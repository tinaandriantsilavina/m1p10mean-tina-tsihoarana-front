import { AuthService } from './../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit , AfterViewInit{

  submitted=false;
  formulaire : FormGroup;
  message="";
  testdata : any;

  ngAfterViewInit(): void {
    if(this.authservice.users!=null){
        this.router.navigate(['/actuel/dashboard']);
    }
  }

  constructor(
    public route:ActivatedRoute,
    public router:Router,
    public authservice:AuthService,
    public formBuilder:FormBuilder) {

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
        email:["a@a.com", [Validators.required]],
        password:["12345", [Validators.required]]
      }
    ); //methode retourn objet de type FormGroup
  }
  testtoken(){
    this.testdata=localStorage.getItem('users');
  }
  connexion(){
    return new Promise((resolve, reject) => {
      this.authservice.connexion(this.formulaire.getRawValue()).subscribe(
        d => {
          let data = (d as {[key: string]: any})
          // if(data['status'] ==200){
            console.log(data);
            // localStorage.setItem('users',JSON.stringify(data['data'][0]))
            // localStorage.setItem('token',data['data'][1])
            let user = {
              name:"huhu",
              surname:"heheh"              
          }
            localStorage.setItem('users', JSON.stringify(user))
            localStorage.setItem('token',data['token'])
            
            this.router.navigate(['liste-voiture'])
              .then(() => {
                window.location.reload();
              });
          // }
          // else{
          //   this.message="Mot de Passe ou User Incorrecte";
          // }
        },error => {
          this.message = <any>error;
          if(this.message != null){
          }
        }
      );
    })
  }
  ngOnInit(): void {
    this.initForm();
  }
  connexionn(){
    console.log(this.formulaire.getRawValue());
  }

}
