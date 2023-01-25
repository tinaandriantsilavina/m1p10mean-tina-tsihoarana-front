import { ReparationService } from './../../../services/reparation.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { VisiteService } from 'src/app/services/visite.service';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-atelier-reparation-list',
  templateUrl: './atelier-reparation-list.component.html',
  styleUrls: ['./atelier-reparation-list.component.scss']
})
export class AtelierReparationListComponent {
  @Input() visiteselectionner= ""
  isUpdateReparation =false;
  isCreateReparation = false;
  message = ""
  list = [];
  reparationselectionner ="";
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
    this.getlistereparation()
  }

  onSubmit(): void {
    this.submitted = true; // ijerena ftsn we ef nanindry an ilay boutton ve izy
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formulaire.controls;
  }
  initForm(id) {
    this.isCreateReparation = true
    this.isUpdateReparation = false;
    this.reparationselectionner = id
    console.log(this.reparationselectionner)
    this.formulaire = this.formBuilder.group(
      {
        piece: ["pneu", [Validators.required]],
        duree: [20, [Validators.required,Validators.pattern("^[0-9]*$"), Validators.min(1)]],
        avancement: [1, [Validators.required,Validators.pattern("^[0-9]*$"), Validators.min(1)]],
        prix: [1000, [Validators.required,Validators.pattern("^[0-9]*$"), Validators.min(1)]]
      }
    );
  }
  initFormUpdate(rep){
    console.log(rep)
    this.isUpdateReparation =true
    this.isCreateReparation =false
    this.reparationselectionner = rep['_id']
    console.log(this.reparationselectionner)
    this.formulaire = this.formBuilder.group(
      {
        piece: [rep['piece'], [Validators.required]],
        duree: [rep['duree'], [Validators.required,Validators.pattern("^[0-9]*$"), Validators.min(1)]],
        avancement: [rep['avancement'], [Validators.required,Validators.pattern("^[0-9]*$"), Validators.min(1)]],
        prix: [rep['prix'], [Validators.required,Validators.pattern("^[0-9]*$"), Validators.min(1)]]
      }
    );
  }
  creationreparation() {
    if(this.formulaire.valid){
      new Promise((resolve, reject) => {
        this.reparationService.ateliercreationreparation(this.visiteselectionner['_id'], this.formulaire.getRawValue()).subscribe(
          d => {
            let data = (d as { [key: string]: any })
            if (data['status'] == 200) {
              this.getlistereparation()
              this.message = "Reparation crée "
              this.visiteselectionner =""
            this.toastr.success(this.message, "Success")
            this.isCreateReparation = false
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




  updatereparation() {
    if(this.formulaire.valid){
      new Promise((resolve, reject) => {
        this.reparationService.atelierupdatereparation(this.visiteselectionner['_id'],this.reparationselectionner,this.formulaire.getRawValue()).subscribe(
          d => {
            let data = (d as { [key: string]: any })
            if (data['status'] == 200) {
              this.getlistereparation()
              this.message = "Modification terminé"
              this.visiteselectionner =""
            this.toastr.success(this.message, "Success")
            this.isUpdateReparation = false
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
  getlistereparation() {
    this.spinner.show()
    return new Promise((resolve, reject) => {
      this.reparationService.atelierlistereparation(this.visiteselectionner['_id']).subscribe(
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
}