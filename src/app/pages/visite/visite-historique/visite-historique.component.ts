import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ExportationService } from 'src/app/services/exportation.service';
import { UploadfileService } from 'src/app/services/uploadfile.service';
import { VisiteService } from 'src/app/services/visite.service';

@Component({
  selector: 'app-visite-historique',
  templateUrl: './visite-historique.component.html',
  styleUrls: ['./visite-historique.component.scss']
})
export class VisiteHistoriqueComponent {

  list = []
  message = "";
  constructor(
    public visiteService: VisiteService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public uploadFileService : UploadfileService,
    public exportationService : ExportationService
  ) { }

  ngOnInit(): void {
    this.getlist(0)

  }

  getlist(etat) {
    this.spinner.show()
    return new Promise((resolve, reject) => {
      this.visiteService.clientvisiteetat(etat).subscribe(
        d => {
          let data = (d as { [key: string]: any })
          if (data['status'] == 200) {
            this.list = data['datas']
            this.exportationService.visite_list(this.list)
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
