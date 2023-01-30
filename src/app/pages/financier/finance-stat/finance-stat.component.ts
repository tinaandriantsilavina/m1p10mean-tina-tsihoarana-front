import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FinanceService } from 'src/app/services/finance.service';
import { SharedService } from 'src/app/services/shared.service';
import { Chart, registerables, ChartType } from 'chart.js';
import { UtilService } from 'src/app/services/util.service';
Chart.register(...registerables);

@Component({
  selector: 'app-finance-stat',
  templateUrl: './finance-stat.component.html',
  styleUrls: ['./finance-stat.component.scss']
})
export class FinanceStatComponent {
  submitted = false;
  depenseSelectionner: any;
  isupdate = false;
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
  myChart: Chart;
  //chiffre affaire Mois Annee selection
  ca_mois: any;
  ca_annee: any;
  data_ca_mois_annee;

  //chiffre affaire Annee Selection
  ca_annee2: any;
  data_ca_annee: any
  data_chart_ca_annee: any


  //variable pour Chiffre Affaire entre 2 date
  ca_date_debut: any;
  ca_date_fin: any;
  data_ca_date: any

  ngAfterViewInit(): void {
    // if(this.authservice.users!=null){
    //     this.router.navigate(['/accueil']);
    // }
  }



  // Varable reparation moyenne
  data_reparation_moyenne=0

  ngOnInit() {
    this.ca_annee = 2023;
    this.ca_mois = 1;
    this.ca_annee2 = 2023
    this.ca_date_debut = "2023-01-01";
    this.ca_date_fin = "2023-08-01";


    this.chiffreAffaireAnnee()
    this.chiffreAffaireDate()
    this.chiffreAffaireMoisAnnee()

    this.getreparationmoyenne()
  }
  selectionUpdate(depense) {
    this.isupdate = true
    this.depenseSelectionner = depense
  }
  constructor(
    public authservice: AuthService,
    public sharedService: SharedService,
    public spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public financeService: FinanceService,
    public util : UtilService
  ) {

  }



  chiffreAffaireDate() {
    this.spinner.show()
    new Promise((resolve, reject) => {
      // this.loadSouscription=1;
      this.financeService.stat_chiffre_affaire_date(this.ca_date_debut, this.ca_date_fin).subscribe(
        data => {
          if (data['status'] == 200) {
            this.data_ca_date = data['datas']
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








  chiffreAffaireAnnee() {
    this.spinner.show()
    new Promise((resolve, reject) => {
      // this.loadSouscription=1;
      this.financeService.stat_chiffre_affaire_annee(this.ca_annee2).subscribe(
        data => {
          if (data['status'] == 200) {
            this.data_ca_annee = data['datas']
            let label: any[] = []; let datas: any[] = []
            data['datas'].forEach(l => {
              label.push(l['mois'])
              datas.push(l['chiffre_affaire'])
            });
            this.data_chart_ca_annee = { label, datas }
            this.chartInit()
            console.log(this.data_chart_ca_annee)
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

  chiffreAffaireMoisAnnee() {
    this.spinner.show()
    new Promise((resolve, reject) => {
      // this.loadSouscription=1;
      this.financeService.stat_chiffre_affaire_mois_annee(this.ca_mois, this.ca_annee).subscribe(
        data => {
          if (data['status'] == 200) {
            this.data_ca_mois_annee = data['datas']
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



  getreparationmoyenne() {
    this.spinner.show()
    new Promise((resolve, reject) => {
      // this.loadSouscription=1;
      this.financeService.stat_reparation_moyenne().subscribe(
        data => {
          if (data['status'] == 200) {
            this.data_reparation_moyenne = data['datas']
            console.log(this.data_reparation_moyenne)
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














  chartInit() {
    if (this.myChart) {
      this.myChart.destroy()
    }
    this.myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: this.data_chart_ca_annee.label,
        datasets: [{
          label: ` de l'année ${this.ca_annee2}`,
          data: this.data_chart_ca_annee.datas,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
