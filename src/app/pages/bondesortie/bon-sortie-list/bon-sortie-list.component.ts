import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BondesortieService } from 'src/app/services/bondesortie.service';
import { ExportationService } from 'src/app/services/exportation.service';
import { UploadfileService } from 'src/app/services/uploadfile.service';

@Component({
  selector: 'app-bon-sortie-list',
  templateUrl: './bon-sortie-list.component.html',
  styleUrls: ['./bon-sortie-list.component.scss']
})
export class BonSortieListComponent implements OnInit {

  list = []
  message = "";
  constructor(
    public bondesortieService: BondesortieService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public uploadFileService : UploadfileService,
    public exportationService : ExportationService
  ) { }

  ngOnInit(): void {
    this.getlist(0)
    // this.exportationService.visite_list(this.list)
  }
  
  getlist(etat) {
    this.spinner.show()
    new Promise((resolve, reject) => {
      this.bondesortieService.bondesortie_list(etat).subscribe(
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
