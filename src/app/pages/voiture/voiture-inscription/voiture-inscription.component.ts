import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ImageUploadComponent } from 'src/app/components/image-upload/image-upload.component';
import { UploadfileService } from 'src/app/services/uploadfile.service';
import { VoitureService } from 'src/app/services/voiture.service';
import { Buffer } from 'buffer';
@Component({
  selector: 'app-voiture-inscription',
  templateUrl: './voiture-inscription.component.html',
  styleUrls: ['./voiture-inscription.component.scss']
})
export class VoitureInscriptionComponent implements OnInit {
  submitted = false;
  formulaire: FormGroup;
  message = "";
  testdata: any;
  maxsize = 90000;

  @ViewChild(ImageUploadComponent, { static: false }) image: ImageUploadComponent;
  @ViewChild('modalcontent', { static: true }) modalcontent: TemplateRef<any>;
  ngAfterViewInit(): void {
  }
  allRole = [{
    slug: "huhu",
    id: 1,

  }]
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public formBuilder: FormBuilder,
    public uploadService: UploadfileService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private voitureService: VoitureService
  ) {
  }

  onSubmit(): void {
    this.submitted = true;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formulaire.controls;
  }
  initForm() {
    this.formulaire = this.formBuilder.group(
      {
        marque: ["Mercedes-benz", [Validators.required]],
        modele: ["Sprinter 312", [Validators.required]],
        numero: ["3198TAB", [Validators.required]]
      }
    );
  }

  ngOnInit(): void {
    this.initForm();
  }

  async valider() {
    if (this.formulaire.valid && this.image.image != null) {
      console.log(this.image.image)
      if (this.image.image.size < this.maxsize) {
        this.message = " "
        let image = await this.uploadService.encodeFileToBase64(this.image.image);
        let form = {}
        form = this.formulaire.getRawValue()
        form['image'] = image //Buffer.from(image, 'base64')
        this.enregistrervoiture(form)
        console.log(form)
        // this.toastr.warning("Demande du depot voiture effectuer avec success");
      } else {
        // this.message = "la taille de l'image ne doit pas dépasser" + this.maxsize / 1000 + " ko";
        this.toastr.warning("Taille max", "la taille de l'image ne doit pas dépasser de " + this.maxsize / 1000 + " ko")
      }
    } else {
      this.message = "Veuillez remplir le formulaire correctement";
      this.toastr.warning(this.message)
    }
  }


  enregistrervoiture(body) {

    this.spinner.show()
    return new Promise((resolve, reject) => {
      this.voitureService.enregistrerVoiture(body).subscribe(
        d => {
          let data = (d as { [key: string]: any })
          if(data['status'] ==200){
          console.log(data);
          this.toastr.success("Enregistrement voiture terminé", "Success")
          this.router.navigate(['/liste-voiture'])
          }
          else{
            this.message=data['message'];
            this.toastr.warning("Erreur",this.message)
          }
          this.spinner.hide()
        }, error => {
          this.spinner.hide()
          this.message= "Echec de la connexion"
          this.toastr.error(this.message, "Erreur")
        }
      );
    })
  }
}
