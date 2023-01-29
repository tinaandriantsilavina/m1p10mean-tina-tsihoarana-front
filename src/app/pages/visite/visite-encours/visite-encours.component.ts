import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from 'src/app/services/util.service';
import { VisiteService } from 'src/app/services/visite.service';

@Component({
  selector: 'app-visite-encours',
  templateUrl: './visite-encours.component.html',
  styleUrls: ['./visite-encours.component.scss']
})
export class VisiteEncoursComponent implements OnInit {
  list =[]
  numero:any;
  constructor(
    private router : ActivatedRoute,
    private visiteService: VisiteService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private route : Router,
    public util : UtilService
  ){

  }
    ngOnInit(): void {
      this.numero = this.router.snapshot.params.numero;
      this.getlist()
      console.log(this.numero)
    }

    getlist() {
      this.spinner.show()
      if(this.numero!=null){
        new Promise((resolve, reject) => {
          // this.loadSouscription=1;
          this.visiteService.clientvisite_voiture(this.numero).subscribe(
            data => {
              if (data['status'] == 200) {
                  this.list = data ['datas']
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
      }else{
        this.toastr.warning("Il y eu une erreur sur le numero du voiture","Erreur")
        this.route.navigate(['/accueil'])
      }
    }
}
