import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { VoitureService } from 'src/app/services/voiture.service';

@Component({
  selector: 'app-voiture-list',
  templateUrl: './voiture-list.component.html',
  styleUrls: ['./voiture-list.component.scss']
})
export class VoitureListComponent {
  list=[]
  constructor(
    public voitureService: VoitureService,
    private spinner: NgxSpinnerService ,
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
