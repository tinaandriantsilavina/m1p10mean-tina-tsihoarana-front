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
  submitted = false;
  formulaire: FormGroup;
  message = "";
  testdata: any;
  maxsize =1;
  @ViewChild(ImageUploadComponent, { static: false }) image: ImageUploadComponent;
  ngAfterViewInit(): void {
  }

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public formBuilder: FormBuilder,
    public uploadService: UploadfileService
  ) {

  }

  onSubmit(): void {
    this.submitted = true; // ijerena ftsn we ef nanindry an ilay boutton ve izy
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formulaire.controls;
  }
  initForm() {
    this.formulaire = this.formBuilder.group(
      {
        marque_voiture: ["Mercedes-benz", [Validators.required]],
        model_voiture: ["Sprinter 312", [Validators.required]],
        date_deposition: ["2022-01-10", [Validators.required]]
      }
    ); //methode retourn objet de type FormGroup
  }

  ngOnInit(): void {
    this.initForm();
  }

  async valider() {
    if (this.formulaire.valid && this.image.image != null) {
      console.log(this.image.image)
      if (this.image.image.size > this.maxsize) {
        this.message = " "
        let image = await this.uploadService.encodeFileToBase64(this.image.image);
        let form = {}
        form = this.formulaire.getRawValue()
        form['image'] = image
        console.log(form)
      }else{
        this.message = "la taille de l'image ne doit pas dépasser"+this.maxsize/1000+  " ko";
      }
    } else {
      this.message = "Veuillez remplir le formulaire correctement";
    }
  }
}
