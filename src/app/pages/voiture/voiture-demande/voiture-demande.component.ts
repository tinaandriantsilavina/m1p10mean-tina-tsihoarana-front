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
  voiture_enattente=[];
  voitureaccepter =[]
  message="";
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
      this.getlistevoitureetat(1)
    }

    // getlistdemande() {
    //   this.spinner.show()
    //   new Promise((resolve, reject) => {
    //     // this.loadSouscription=1;
    //     this.voitureService.getlistedemande().subscribe(
    //       data => {
    //         console.log(data)
    //         // if (data['status'] == 200) {
    //             // this.list = data ['data']
    //             console.log(data)
    //             this.list= data;
    //         // }
    //         // else {
    //         //   // this.spinner.hide();
    //         //   this.toastr.error('Erreur',"Erreur connexion")
    //         //   reject('Erreur Connexx');
    //         // }
    //         this.spinner.hide()
    //       }, error => {
    //         reject("erreur");
    //         this.toastr.error("Erreur connexion",'Erreur')
    //         this.spinner.hide()
    //       }
    //     );
    //   })
    // }


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


    getlistdemande() {
      this.spinner.show()
      return new Promise((resolve, reject) => {
        this.voitureService.getlistedemande().subscribe(
          d => {
            let data = (d as { [key: string]: any })
            if(data['status'] ==200){
              this.voiture_enattente = data['datas']
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
    getlistevoitureetat(etat) {
      this.spinner.show()
      return new Promise((resolve, reject) => {
        this.voitureService.getlistevoitureetat(etat).subscribe(
          d => {
            let data = (d as { [key: string]: any })
            if(data['status'] ==200){
              this.voitureaccepter = data['datas']
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


    demandeaccepter(id) {
      this.spinner.show()
      return new Promise((resolve, reject) => {
        this.voitureService.demandevoitureaccepter(id).subscribe(
          d => {
            let data = (d as { [key: string]: any })
            if(data['status'] ==200){
              this.message ="voiture terminé"
              this.toastr.warning(this.message, "Success")
              this.getlistdemande()
              this.getlistevoitureetat(1)
            }
            else{
              this.message=data['message'];
              this.toastr.warning(this.message,"Erreur")
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
