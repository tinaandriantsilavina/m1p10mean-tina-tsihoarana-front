import { MailService } from './../../../services/mail.service';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { AuthService } from './../../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BondesortieService } from 'src/app/services/bondesortie.service';
import { ExportationService } from 'src/app/services/exportation.service';
import { UploadfileService } from 'src/app/services/uploadfile.service';
import { UtilService } from 'src/app/services/util.service';
import { VisiteService } from 'src/app/services/visite.service';

@Component({
  selector: 'app-bon-sortie-list',
  templateUrl: './bon-sortie-list.component.html',
  styleUrls: ['./bon-sortie-list.component.scss']
})
export class BonSortieListComponent implements OnInit {
  bonsortiestatic = [
    {
      "_id": "63d55ff7b664465d30d89366",
      "user": "63d4066b4acdfe4efcccfa69",
      "visite": "63d4080cc295fb18c02fc89b",
      "prix": 50000,
      "etat": 1,
      "__v": 0,
      "date_paye": "2023-01-25T00:00:00.000Z",
      "visite_detail": {
        "_id": "63d4080cc295fb18c02fc89b",
        "date_debut": "2023-01-27T17:08:31.858Z",
        "user": "63d4066b4acdfe4efcccfa69",
        "voiture": "63d406b1c295fb18c02fc893",
        "etat": 2,
        "reparations": [
          {
            "_id": "63d40945c295fb18c02fc8a9",
            "piece": "pneu",
            "duree": 1,
            "avancement": 2,
            "prix": 50000,
            "visite": "63d4080cc295fb18c02fc89b"
          }
        ],
        "__v": 1,
        "date_fin": "2023-01-25T00:00:00.000Z",
        "date_recup": "2023-01-27T17:55:39.424Z"
      }
    }
  ]
  list;
  etat = 1; // 0: non payé, 1: payé
  message = "";
  formulaire: FormGroup;
  submitted = false;
  bondesortieselectionner: any;
  constructor(
    public bondesortieService: BondesortieService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public uploadFileService: UploadfileService,
    public exportationService: ExportationService,
    private visiteService: VisiteService,
    public http: HttpClient,
    public util: UtilService,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    private mailService: MailService
  ) { }

  async ngOnInit() {
    this.etat = -1
    this.getBondeSortie()
  }

  async getBondeSortie() {
    let val = await this.getListeBonSortie(this.etat)
    this.list = val;
    // console.log(this.list)
  }
  async export(){
    if(this.list.length>0){
      this.exportationService.bonsortie_list(this.etat,this.list)
    }else{
      this.toastr.info("La liste est vide","Info")
    }
  }
  async getListeBonSortie(etat) {
    let val = new Array();;
    try {
      this.spinner.show()
      const response = await this.bondesortieService.bondesortie_list(etat).toPromise();
      if (response) {
        if (response['status'] === 200) {
          let data = await response['datas'];
          for (let l of data) {
            await this.getVisiteById(l['visite']).then(result => {
              l['visite_detail'] = result
              val.push(l)
            });

          }
        } else {
          this.toastr.warning(response['message'])
        }
      }
      this.spinner.hide()
    } catch (error) {
      this.spinner.hide()
      this.toastr.warning("Erreur Connex")
    }
    return val;

  }

  async getVisiteById(id) {
    let val = new Array();
    try {
      const response = await this.visiteService.ateliervisitebyid(id).toPromise()
      if (response && response['status'] === 200) {
        val = await response['datas'];
      }
      else {
        console.log("error in fetching data");
      }
    } catch (error) {
      console.log('Error while fetching data: ', error);
    }
    return val;

  }
  async addVisiteDetails(bonsortie) {
    let val = new Array()
    for (let l of bonsortie) {
      l['viviviv'] = await this.getVisiteById(l['visite'])
      val.push(l)
    }
    return val
  }
  async fonctionFinale(etat) {
    const données = await this.getListeBonSortie(etat);
    // const résultat = await addVisiteDetails(données);
    // return résultat;
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
  onSubmit(): void {
    this.submitted = true; // ijerena ftsn we ef nanindry an ilay boutton ve izy
  }


  get f(): { [key: string]: AbstractControl } {
    return this.formulaire.controls;
  }
  getRef(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  initForm(bd) {
    this.bondesortieselectionner = bd
    this.formulaire = this.formBuilder.group(
      {
        date_paye: ["2023-05-01", [Validators.required]],
        email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        name: ["Hasina", [Validators.required]],
        ref: [this.getRef(10000,99999), [Validators.required]],
      }
    );
  }

  payerbonsortie() {
    if (this.bondesortieselectionner != null) {
      if(this.formulaire.valid){
        new Promise((resolve, reject) => {
          this.bondesortieService.payerbonsortie(this.bondesortieselectionner['_id'], this.formulaire.getRawValue()).subscribe(
            d => {
              let data = (d as { [key: string]: any })
              if (data['status'] == 200) {
                this.message = "Payement effectué"
                this.toastr.success(this.message, "Success")
              }
              else {
                this.message = data['message'];
                this.toastr.warning("Erreur", this.message)
              }
              this.spinner.hide()
              this.envoieMail()
              this.getBondeSortie()
            }, error => {
              this.spinner.hide()
              this.message = "Echec de la connexion"
              this.toastr.error(this.message, "Erreur")
            }
          );
        })
      }else {
        this.toastr.warning("Veuillez remplir correctement les champs", "Erreur Champs")
      }

    } else {
      this.toastr.error("Veuilez selectionner un bon de sortie pour puvoir payé", "Erreur")
    }
  }

  envoieMail() {
    new Promise((resolve, reject) => {
      this.mailService.mail_payement(this.formulaire.getRawValue()).subscribe(
        d => {
          let data = (d as { [key: string]: any })
          if (data['status'] == 200) {
            this.toastr.success("Mail Envoyé", "Mail Envoyé")
          }
          else {
            this.message = data['message'];
            this.toastr.warning("Envoie Mail erreur", "Erreur")
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
