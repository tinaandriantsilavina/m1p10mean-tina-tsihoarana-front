import { UploadfileService } from 'src/app/services/uploadfile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VoitureService } from 'src/app/services/voiture.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-atelier-detail-voiture',
  templateUrl: './atelier-detail-voiture.component.html',
  styleUrls: ['./atelier-detail-voiture.component.scss']
})
export class AtelierDetailVoitureComponent implements OnInit {
  numero = ""
  isShowTab: boolean = false;
  breadcrumb_active = ""
  currentTab = 2;
  visiteSelectionner:any = null
  voiture:any;
  constructor(
    private router: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private voitureService: VoitureService,
    public uploadFileService: UploadfileService,
    private toastr : ToastrService
  ) { }

  ngOnInit(): void {
    this.numero = this.router.snapshot.params.numero;
    this.showTab(this.currentTab)
    this.getVoitureByNumero(this.numero)
  }


  emitListner(event) {
    this.visiteSelectionner =null
    this.spinner.show()
    setTimeout(() => {
      // console.log("open:: " , event)
      this.visiteSelectionner = event
      this.spinner.hide()
    }, 200);
  }
  showTab(id) {
    this.currentTab = id
    switch (id) {
      case 1: this.breadcrumb_active = "Visite"; break;
      case 2: this.breadcrumb_active = "Reparation"; break;
      case 3: this.breadcrumb_active = "Historiuque Visite"; break;
      case 4: this.breadcrumb_active = ""; break;

      default: break;
    }
    this.isShowTab = !this.isShowTab;
  }


  getVoitureByNumero(numero) {
    this.spinner.show()
    new Promise((resolve, reject) => {
      // this.loadSouscription=1;
      this.voitureService.getvoiturebynumero(numero).subscribe(
        data => {
          if (data['status'] == 200) {
            this.voiture = data['datas']
          }
          else {
            // this.spinner.hide();
            this.toastr.error(data['message'], "Erreur")
            reject('Erreur Connexx');
          }
          this.spinner.hide()
        }, error => {
          reject("erreur");
          this.toastr.error('Erreur', "Erreur connexion")
          this.spinner.hide()
        }
      );
    })
  }
}
