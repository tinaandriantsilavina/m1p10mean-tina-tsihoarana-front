import { VisiteService } from './../../../services/visite.service';
import { Component } from '@angular/core';
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
  constructor(
    private voitureService: VoitureService,
    private visiteService : VisiteService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
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
            this.toastr.error('Erreur',"Erreur connexion")
            this.spinner.hide()
          }
        );
      })
    }

    creervisite(voiture){
      new Promise((resolve, reject) => {
        // this.loadSouscription=1;
        this.visiteService.creervisite(voiture).subscribe(
          data => {
            console.log(data)
            // if (data['status'] == 200) {
                // this.list = data ['data']
                // this.toastr.error("Visite crée avec success")
                // this.list= data;
                // this.getlistdemande()
            // }
            // else {
            //   // this.spinner.hide();
            //   this.toastr.error('Erreur',"Erreur connexion")
            //   reject('Erreur Connexx');
            // }
            this.spinner.hide()
          }, error => {
            reject("erreur");
            this.toastr.error('Erreur',"Erreur connexion")
            this.spinner.hide()
          }
        );
      })
    }
}
