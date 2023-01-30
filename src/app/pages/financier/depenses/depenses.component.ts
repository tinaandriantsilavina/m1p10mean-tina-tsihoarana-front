import { FinanceService } from './../../../services/finance.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-depenses',
  templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.scss']
})
export class DepensesComponent implements OnInit {
  submitted = false;
  depenseSelectionner: any;
  isupdate = false;
  formulaire: FormGroup;
  message = "";
  testdata: any;
  list = []
  annee = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026]
  mois = [
    { mois: "Janvier", value: 0 },
    { mois: "Fevrier", value: 1 },
    { mois: "Mars", value: 2 },
    { mois: "Avril", value: 3 },
    { mois: "Mai", value: 4 },
    { mois: "Juin", value: 5 },
    { mois: "Juillet", value: 6 },
    { mois: "Aout", value: 7 },
    { mois: "Septembre", value: 8 },
    { mois: "Octobre", value: 9 },
    { mois: "Novembre", value: 10 },
    { mois: "Decembre", value: 11 },

  ]

  anneeselection = "";
  moisselection = "";
  ngAfterViewInit(): void {
    // if(this.authservice.users!=null){
    //     this.router.navigate(['/accueil']);
    // }
  }

  ngOnInit() {
    this.initForm()
    this.anneeselection ="2023";
    this.moisselection ="0"

    this.depenselist()
  }
  selectionUpdate(depense) {
    this.isupdate = true
    this.depenseSelectionner = depense
    this.initFormUpdate(depense)
  }
  constructor(
    public authservice: AuthService,
    public formBuilder: FormBuilder,
    public sharedService: SharedService,
    public spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public financeService: FinanceService
  ) {

  }
  onSubmit(): void {
    this.submitted = true; // ijerena ftsn we ef nanindry an ilay boutton ve izy
  }


  get f(): { [key: string]: AbstractControl } {
    return this.formulaire.controls;
  }
  initForm() {
    this.formulaire = this.formBuilder.group(
      {
        type: ["salaire", [Validators.required]],
        prix: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]],
        date: ["2022-01", [Validators.required]]
      }
    ); //methode retourn objet de type FormGroup
  }

  initFormUpdate(depense) {
    this.formulaire = this.formBuilder.group(
      {
        type: [depense['type'], [Validators.required]],
        prix: [depense['prix'], [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]],
        date: [depense['date'], [Validators.required]]
      }
    ); //methode retourn objet de type FormGroup
  }

  delete(depense) {
    if (confirm("Vous ete sur de supprimer le depense ")) {
      this.depensedelete(depense['_id'])
    }
  }

  depensecreer() {
    this.spinner.show()
    return new Promise((resolve, reject) => {
      this.financeService.depensecreer(this.formulaire.getRawValue()).subscribe(
        d => {
          let data = (d as { [key: string]: any })
          if (data['status'] == 200) {
            this.initForm()
          } else {
            this.message = "Echec de insertion";
            this.toastr.warning(this.message, "Erreur inscription")
          }
          this.spinner.hide()
          this.depenselist()
        }, error => {
          this.message = "Erreur Connexion";
          this.toastr.error(this.message, "Erreur")
          this.spinner.hide()
        }
      );
    })
  }


  depensedelete(id) {
    this.spinner.show()
    return new Promise((resolve, reject) => {
      this.financeService.depensedelete(id).subscribe(
        d => {
          let data = (d as { [key: string]: any })
          if (data['status'] == 200) {
            this.initForm()
          } else {
            this.message = data['message'];
            this.toastr.warning(this.message, "Erreur inscription")
          }
          this.spinner.hide()
          this.depenselist()
        }, error => {
          this.message = "Erreur Connexion";
          this.toastr.error(this.message, "Erreur")
          this.spinner.hide()
        }
      );
    })
  }


  depenseupdate() {
    console.log(this.depenseSelectionner)
    this.spinner.show()
    return new Promise((resolve, reject) => {
      this.financeService.depenseupdate(this.depenseSelectionner['_id'], this.formulaire.getRawValue()).subscribe(
        d => {
          let data = (d as { [key: string]: any })
          if (data['status'] == 200) {
            this.toastr.success("Modification depense terminé", "Erreur ")
          } else {
            this.message = data['message'];
            this.toastr.warning(this.message, "Erreur")
          }
          this.spinner.hide()
          this.depenselist()
        }, error => {
          this.message = "Erreur Connexion"
          this.toastr.error(this.message, "Erreur")
          this.spinner.hide()
        }
      );
    })
  }

  depenselist() {
    this.spinner.show()
    new Promise((resolve, reject) => {
      // this.loadSouscription=1;
      this.financeService.depenseliste().subscribe(
        data => {
          if (data['status'] == 200) {
            this.list = data['datas']
            console.log(data)
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


  depensemois() {
    if (this.anneeselection == "" || this.moisselection == "") {
      this.toastr.warning('Veuillez verifier les champs ', "Champs")
    } else {
      this.spinner.show()
      new Promise((resolve, reject) => {
        // this.loadSouscription=1;
        this.financeService.sumdepensemois(this.anneeselection, this.moisselection).subscribe(
          data => {
            if (data['status'] == 200) {
              this.list = data['datas']
              console.log(data)
            }
            else {
              // this.spinner.hide();
              this.toastr.error('Erreur', "Erreur connexion")
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

}
