import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {

  submitted=false;
  formulaire : FormGroup;
  message="";
  testdata : any;
  @Output() emitClass = new EventEmitter<string>();

  ngAfterViewInit(): void {
    if(this.authservice.users!=null){
        this.router.navigate(['/actuel/dashboard']);
    }
  }

  constructor(
    public route:ActivatedRoute,
    public router:Router,
    public authservice:AuthService,
    public formBuilder:FormBuilder,
    public sharedService: SharedService,
    public spinner : NgxSpinnerService,
    private toastr : ToastrService
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
        email:["a@a.com", [Validators.required]],
        password:["12345", [Validators.required]]
      }
    ); //methode retourn objet de type FormGroup
  }
  testtoken(){
    this.testdata=localStorage.getItem('users');
  }
  connexion(){
    this.spinner.show()
    return new Promise((resolve, reject) => {
      this.authservice.connexion(this.formulaire.getRawValue()).subscribe(
        d => {
          let data = (d as {[key: string]: any})
          if(data['status'] ==200){
            console.log(data);
            let user = data['datas']['user']
            localStorage.setItem('users',JSON.stringify(user))
            localStorage.setItem('token',data['datas']["token"])
            this.sharedService.changeClass("main-content");
            this.sharedService.changeUser(user);
            this.router.navigate(['liste-voiture'])
          }else{
            this.message=data['message'];
            this.toastr.warning(this.message, "Erreur")

          }
          this.spinner.hide()
        },
        error => {
          this.message = "Erreur connexion";
          this.toastr.error(this.message, "Erreur")
          this.spinner.hide()
        }
      );
    })
  }
  ngOnInit(): void {
    this.initForm();
  }

}
