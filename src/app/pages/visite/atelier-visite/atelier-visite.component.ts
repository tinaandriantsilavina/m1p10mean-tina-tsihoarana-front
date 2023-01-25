import { ReparationService } from './../../../services/reparation.service';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { VisiteService } from './../../../services/visite.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-atelier-visite',
  templateUrl: './atelier-visite.component.html',
  styleUrls: ['./atelier-visite.component.scss']
})
export class AtelierVisiteComponent implements OnInit {
  @Input() numero = ""
  message = ""
  list = [];
  visiteselectionner ="";
  submitted = false;
  formulaire: FormGroup;
  constructor(
    private visiteService: VisiteService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public formBuilder: FormBuilder,
    private reparationService:ReparationService
  ) {

  }
  ngOnInit() {
    this.getlistevisite()
  }

  onSubmit(): void {
    this.submitted = true; // ijerena ftsn we ef nanindry an ilay boutton ve izy
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formulaire.controls;
  }
  initForm(idvisite) {
    this.visiteselectionner = idvisite
    console.log(this.visiteselectionner)
    this.formulaire = this.formBuilder.group(
      {
        piece: ["pneu", [Validators.required]],
        duree: [20, [Validators.required,Validators.pattern("^[0-9]*$"), Validators.min(1)]],
        avancement: [1, [Validators.required,Validators.pattern("^[0-9]*$"), Validators.min(1)]],
        prix: [1000, [Validators.required,Validators.pattern("^[0-9]*$"), Validators.min(1)]]
      }
    );
  }


  getlistevisite() {
    this.spinner.show()
    return new Promise((resolve, reject) => {
      this.visiteService.ateliervisite(this.numero).subscribe(
        d => {
          let data = (d as { [key: string]: any })
          if (data['status'] == 200) {
            this.list = data['datas']
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


  creervisite() {
    new Promise((resolve, reject) => {
      this.visiteService.creervisite(this.numero, null).subscribe(
        d => {
          let data = (d as { [key: string]: any })
          if (data['status'] == 200) {
            this.message = "Visite crée "
            this.toastr.error(this.message, "Success")
            this.getlistevisite()
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

  creationreparation() {
    if(this.formulaire.valid){
      new Promise((resolve, reject) => {
        this.reparationService.ateliercreationreparation(this.visiteselectionner, this.formulaire.getRawValue()).subscribe(
          d => {
            let data = (d as { [key: string]: any })
            if (data['status'] == 200) {
              this.getlistevisite()
              this.message = "Reparation crée "
              this.visiteselectionner =""
            this.toastr.success(this.message, "Success")
            }
            else {
              this.message = data['message'];
              this.toastr.warning( this.message,"Erreur")
            }
            this.spinner.hide()
          }, error => {
            this.spinner.hide()
            this.message = "Echec de la connexion"
            this.toastr.error(this.message, "Erreur")
          }
        );
      })
    }else{
      this.message =" Veuillez Completer correctement les champs"
      this.toastr.warning(this.message, "Champs incorrecte")
    }
  }
}
