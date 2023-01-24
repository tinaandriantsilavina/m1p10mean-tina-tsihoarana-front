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
  message ="";
  listevoiture =[]
  constructor(
    public voitureService: VoitureService,
    private spinner: NgxSpinnerService ,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getlistvoiturejson()
    this.getlistevoiture()
  }
  getlistvoiturejson() {
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
            reject('Erreur Connex');
          }
          this.spinner.hide()
        }, error => {
          reject("erreur");
          this.spinner.hide()
        }
      );
    })
  }

  getlistevoiture() {
    this.spinner.show()
    return new Promise((resolve, reject) => {
      this.voitureService.getlistevoiture().subscribe(
        d => {
          let data = (d as { [key: string]: any })
          if(data['status'] ==200){
            this.listevoiture = data['datas']
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

  
  deposervoiture(numero) {
    this.spinner.show()
    let body ={
      numero : numero
    }
    return new Promise((resolve, reject) => {
      this.voitureService.deposervoiture(body).subscribe(
        d => {
          let data = (d as { [key: string]: any })
          if(data['status'] ==200){
            this.message ="Depot voiture "+numero+" terminé"
            this.toastr.warning(this.message, "Success")
            this.getlistevoiture()
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
