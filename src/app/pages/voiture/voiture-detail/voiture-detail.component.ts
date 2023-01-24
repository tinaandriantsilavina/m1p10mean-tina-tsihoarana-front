import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as $ from "node_modules/jquery/dist/jquery.js";
Chart.register(...registerables);

@Component({
  selector: 'app-voiture-detail',
  templateUrl: './voiture-detail.component.html',
  styleUrls: ['./voiture-detail.component.scss']
})
export class VoitureDetailComponent {
  isShowTab   : boolean = false;
  currentTab =1;
  ngOnInit(): void {
    this.chartInit()
  }
  showTab(id) {
    this.currentTab = id
    switch (id) {
      case 1: $("#breadcrumb_active").html("Rôles"); break;
      case 2: $("#breadcrumb_active").html("Permissions"); break;
      case 3: $("#breadcrumb_active").html("Capacité des rôles"); break;
      case 4: $("#breadcrumb_active").html("Rôles utilisateurs"); break;
      case 5: $("#breadcrumb_active").html("Liste des utilisateurs"); break;
      case 6: $("#breadcrumb_active").html("Utilisateurs Permissions"); break;
      case 7: $("#breadcrumb_active").html("Liste Gp Manager Permissions"); break;
      default: break;
    }
    this.isShowTab = !this.isShowTab;
  }

  chartInit() {
    var myChart = new Chart("myChart", {
      type: 'polarArea',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
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
