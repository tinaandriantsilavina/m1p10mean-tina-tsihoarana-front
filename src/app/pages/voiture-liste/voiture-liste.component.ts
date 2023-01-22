import { VoitureService } from './../../services/voiture.service';
import { Component, OnInit } from '@angular/core';
import { Spinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-voiture-liste',
  templateUrl: './voiture-liste.component.html',
  styleUrls: ['./voiture-liste.component.scss']
})
export class VoitureListeComponent implements OnInit {
  list=[]
  constructor(
    public voitureService: VoitureService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getlistvoiture()
  }
  getlistvoiture() {
    this.spinner.show()
    return new Promise((resolve, reject) => {
      // this.loadSouscription=1;
      this.voitureService.getlistvoiture().subscribe(
        data => {
          if (data['status'] == 'success') {
              this.list = data ['data']
              console.log(this.list)
          }
          else {
            // this.spinner.hide();
            reject('Erreur Connexx');
          }
          this.spinner.hide()
        }, error => {
          reject("erreur");
          this.spinner.hide()
        }
      );
    })
  }
}
