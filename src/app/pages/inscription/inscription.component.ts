import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  submitted=false;
  formulaire : FormGroup;
  message="";
  testdata : any;

  ngAfterViewInit(): void {
  }

  constructor(
    public route:ActivatedRoute,
    public router:Router,
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
        st1:["tsila", [Validators.required]],
        st2:["123456", [Validators.required]]
      }
    ); //methode retourn objet de type FormGroup
  }
  
  ngOnInit(): void {
    this.initForm();
  }
}
