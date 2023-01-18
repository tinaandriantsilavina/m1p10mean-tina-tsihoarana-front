import { UploadfileService } from './../../services/uploadfile.service';
import { ImageUploadComponent } from './../../components/image-upload/image-upload.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-depot-voiture',
  templateUrl: './depot-voiture.component.html',
  styleUrls: ['./depot-voiture.component.scss']
})
export class DepotVoitureComponent implements OnInit {
  submitted=false;
  formulaire : FormGroup;
  message="";
  testdata : any;
  @ViewChild(ImageUploadComponent, { static: false }) image: ImageUploadComponent;
  ngAfterViewInit(): void {
  }

  constructor(
    public route:ActivatedRoute ,
    public router:Router,
    public formBuilder:FormBuilder,
    public uploadService:UploadfileService
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
        st1:["tsila", [Validators.required]],
        st2:["123456", [Validators.required]]
      }
    ); //methode retourn objet de type FormGroup
  }

  ngOnInit(): void {
    this.initForm();
  }

  async valider(){
    if(this.formulaire.valid){
      this.message =" "
      console.log(this.image.image)
      console.log(this.formulaire.getRawValue())
      const base64 = await this.uploadService.encodeFileToBase64(this.image.image);
      console.log(base64)
    }else{
      this.message = "Veuillez remplir le formulaire correctement";
    }
  }
}
