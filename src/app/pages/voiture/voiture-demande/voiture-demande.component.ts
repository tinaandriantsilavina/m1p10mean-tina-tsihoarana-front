import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ModalService } from './../../../components/_modal/modal.service';
import { VisiteService } from './../../../services/visite.service';
import { Component, TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { VoitureService } from 'src/app/services/voiture.service';

@Component({
  selector: 'app-voiture-demande',
  templateUrl: './voiture-demande.component.html',
  styleUrls: ['./voiture-demande.component.scss']
})
export class VoitureDemandeComponent {
  list;
  voitureSelectionner ="";
  submitted=false;
  formulaire : FormGroup;
  constructor(
    private voitureService: VoitureService,
    private visiteService : VisiteService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    public formBuilder:FormBuilder,
  ){

  }
    ngOnInit(): void {
      this.getlistdemande()
    }

    getlistdemande() {
      this.spinner.show()
      new Promise((resolve, reject) => {
        // this.loadSouscription=1;
        this.voitureService.getlistedemande().subscribe(
          data => {
            console.log(data)
            // if (data['status'] == 200) {
                // this.list = data ['data']
                console.log(data)
                this.list= data;
            // }
            // else {
            //   // this.spinner.hide();
            //   this.toastr.error('Erreur',"Erreur connexion")
            //   reject('Erreur Connexx');
            // }
            this.spinner.hide()
          }, error => {
            reject("erreur");
            this.toastr.error("Erreur connexion",'Erreur')
            this.spinner.hide()
          }
        );
      })
    }

    creervisite(){
      if(this.formulaire.valid){
        new Promise((resolve, reject) => {
          // this.loadSouscription=1;
          this.visiteService.creervisite(this.voitureSelectionner, this.formulaire.getRawValue()).subscribe(
            data => {
              console.log(data)
              this.voitureSelectionner ="" // supprimer la selection

              // if (data['status'] == 200) {
                  // this.list = data ['data']
                  // this.toastr.error("Visite crée avec success")
                  // this.list= data;

              // }
              // else {
              //   // this.spinner.hide();
              //   this.toastr.error('Erreur',"Erreur connexion")
              //   reject('Erreur Connexx');
              // }
              this.spinner.hide()
            }, error => {
              reject("erreur");
              this.toastr.error('Erreur connexion',"Erreur")
              this.spinner.hide()
            }
          );
        })
      }else {
        this.toastr.warning("Veuillez completer correctement le champ svp ", "Erreur input")
      }
    }
    onSubmit(): void {
      this.submitted = true; // ijerena ftsn we ef nanindry an ilay boutton ve izy
    }

    get f(): { [key: string]: AbstractControl } {
      return this.formulaire.controls;
    }
    initForm(numero){
      this.voitureSelectionner =numero
      this.formulaire = this.formBuilder.group(
        {
          date_debut:["2022-02-01", [Validators.required]]
        }
      );
    }
}
