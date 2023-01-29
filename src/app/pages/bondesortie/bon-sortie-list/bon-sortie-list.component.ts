import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BondesortieService } from 'src/app/services/bondesortie.service';
import { ExportationService } from 'src/app/services/exportation.service';
import { UploadfileService } from 'src/app/services/uploadfile.service';
import { VisiteService } from 'src/app/services/visite.service';

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
    public exportationService : ExportationService,
    private visiteService: VisiteService
  ) { }

  async ngOnInit() {
    // await this.getlist(0) 
    // this.list.forEach(l => {
    //   console.log(l)
    // });
    // this.exportationService.visite_list(this.list)
    this.list = await this.getlistAsync(0)
    let result = []
    this.list.forEach((l,i) => {
      // await this.getvisiteid(l)
    });
  } 
  
  async getlist(etat) {
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


  async getlistAsync(etat) {
    this.spinner.show()
    let result :any =null
    result =await this.bondesortieService.bondesortie_list(etat).toPromise()
   
    if(result==null){
      this.spinner.hide()
      result = []
    }
    return  result
  }

  async getvisiteid(id) {
    this.spinner.show()
    let result :any =null
    result = await this.visiteService.ateliervisitebyid(id).toPromise()
    if(result==null){
      this.spinner.hide()
      result = []
    }
    return  result
  }

  search(id) {
    let promise = new Promise((resolve, reject) => {
      //TODO
    });
    return promise;
  }

  getvisitebyid(id) {
    this.spinner.show()
    new Promise((resolve, reject) => {
      this.visiteService.ateliervisitebyid(id).subscribe(
        d => {
          let data = (d as { [key: string]: any })
          if (data['status'] == 200) {
            // this.list = data['datas']
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
