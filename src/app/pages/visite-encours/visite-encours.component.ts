import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { VisiteService } from 'src/app/services/visite.service';

@Component({
  selector: 'app-visite-encours',
  templateUrl: './visite-encours.component.html',
  styleUrls: ['./visite-encours.component.scss']
})
export class VisiteEncoursComponent implements OnInit {
  list =[]
  constructor(
    private visiteService: VisiteService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ){

  }
    ngOnInit(): void {
      this.getlistvoiture()
    }

    getlistvoiture() {
      this.spinner.show()
      return new Promise((resolve, reject) => {
        // this.loadSouscription=1;
        this.visiteService.getvisiteencours().subscribe(
          data => {
            if (data['status'] == 'success') {
                // this.list = data ['data']
                console.log(data)
            }
            else {
              // this.spinner.hide();
              this.toastr.error('Erreur',"Erreur connexion")
              reject('Erreur Connexx');
            }
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
