import { UploadfileService } from 'src/app/services/uploadfile.service';
import { Component, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { VoitureService } from 'src/app/services/voiture.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageUploadComponent } from 'src/app/components/image-upload/image-upload.component';

@Component({
  selector: 'app-voiture-list',
  templateUrl: './voiture-list.component.html',
  styleUrls: ['./voiture-list.component.scss']
})
export class VoitureListComponent {
  list = []
  message = "";
  listevoiture = []
  submitted = false;
  formulaire: FormGroup;
  voitureSelection: any;
  @ViewChild(ImageUploadComponent, { static: false }) image: ImageUploadComponent;
  maxsize = 1

  constructor(
    public voitureService: VoitureService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public uploadFileService: UploadfileService,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getlistvoiturejson()
    this.getlistevoiture()
  }
  getlistvoiturejson() {
    this.spinner.show()
    return new Promise((resolve, reject) => {
      // this.loadSouscription=1;
      this.voitureService.getlistvoiture().subscribe(
        data => {
          if (data['status'] == 'success') {
            this.list = data['data']
          }
          else {
            reject('Erreur Connex');
          }
          this.spinner.hide()
        }, error => {
          reject("erreur");
          this.spinner.hide()
        }
      );
    })
  }

  getlistevoiture() {
    this.spinner.show()
    return new Promise((resolve, reject) => {
      this.voitureService.getlistevoiture().subscribe(
        d => {
          let data = (d as { [key: string]: any })
          if (data['status'] == 200) {
            this.listevoiture = data['datas']
          }
          else {
            this.message = data['message'];
            this.toastr.warning("Erreur", this.message)
          }
          this.spinner.hide()
        }, error => {
          this.spinner.hide()
          this.message = "Echec de la connexion"
          this.toastr.error(this.message, "Erreur")
        }
      );
    })
  }

  onSubmit(): void {
    this.submitted = true;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formulaire.controls;
  }
  initFormUpdate(voiture) {
    this.voitureSelection = voiture
    this.formulaire = this.formBuilder.group(
      {
        marque: [this.voitureSelection?.marque, [Validators.required]],
        modele: [this.voitureSelection?.modele, [Validators.required]],
        numero: [this.voitureSelection?.numero, [Validators.required]]
      }
    );
  }


  async valider() {
    if (this.formulaire.valid && this.image.image != null) {
      console.log(this.image.image)
      if (this.image.image.size > this.maxsize) {
        this.message = " "
        let image = await this.uploadFileService.encodeFileToBase64(this.image.image);
        let form = {}
        form = this.formulaire.getRawValue()
        form['image'] = image //Buffer.from(image, 'base64')
        this.updatevoiture()
        console.log(form)
        // this.toastr.warning("Demande du depot voiture effectuer avec success");
      } else {
        // this.message = "la taille de l'image ne doit pas dépasser" + this.maxsize / 1000 + " ko";
        this.toastr.warning("Taille max", "la taille de l'image ne doit pas dépasser" + this.maxsize / 1000 + " ko")
      }
    } else {
      this.message = "Veuillez remplir le formulaire correctement";
      this.toastr.warning(this.message)
    }
  }

  updatevoiture() {

    this.spinner.show()
    return new Promise((resolve, reject) => {
      this.voitureService.updatevoiture(this.voitureSelection?.numero, this.formulaire.getRawValue()).subscribe(
        d => {
          let data = (d as { [key: string]: any })
          if (data['status'] == 200) {
            console.log(data);
            this.toastr.success("Modofcation voiture terminé", "Success")
            this.getlistevoiture()
          }
          else {
            this.message = data['message'];
            this.toastr.warning("Erreur", this.message)
          }
          this.spinner.hide()
        }, error => {
          this.spinner.hide()
          this.message = "Echec de la connexion"
          this.toastr.error(this.message, "Erreur")
        }
      );
    })
  }



  recuperervoiture(voiture) {

    if (confirm('voulez vous recuperer la voiture')) {
      this.spinner.show()
      new Promise((resolve, reject) => {
        this.voitureService.recuperervoiture(voiture?.numero).subscribe(
          d => {
            let data = (d as { [key: string]: any })
            if (data['status'] == 200) {
              console.log(data);
              this.toastr.success("Voiture recuperer", "Success")
              this.getlistevoiture()
            }
            else {
              this.message = data['message'];
              this.toastr.warning("Erreur", this.message)
            }
            this.spinner.hide()
          }, error => {
            this.spinner.hide()
            this.message = "Echec de la connexion"
            this.toastr.error(this.message, "Erreur")
          }
        );
      })
    }
  }




  deposervoiture(numero) {
    this.spinner.show()
    let body = {
      numero: numero
    }
    new Promise((resolve, reject) => {
      this.voitureService.deposervoiture(body).subscribe(
        d => {
          let data = (d as { [key: string]: any })
          if (data['status'] == 200) {
            this.message = "Depot voiture " + numero + " terminé"
            this.toastr.warning(this.message, "Success")
            this.getlistevoiture()

          }
          else {
            this.message = data['message'];
            this.toastr.warning(this.message, "Erreur")
          }
          this.spinner.hide()
        }, error => {
          this.spinner.hide()
          this.message = "Echec de la connexion"
          this.toastr.error(this.message, "Erreur")
        }
      );
    })
  }
}
