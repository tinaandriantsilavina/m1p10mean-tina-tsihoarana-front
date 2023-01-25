import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-voiture-detail',
  templateUrl: './voiture-detail.component.html',
  styleUrls: ['./voiture-detail.component.scss']
})
export class VoitureDetailComponent {
  isShowTab   : boolean = false;
  currentTab =2;
  breadcrumb_active= ""
  ngOnInit(): void {
    // this.chartInit()
    this.showTab(this.currentTab)
  }
  showTab(id) {
    this.currentTab = id
    switch (id) {
      case 1: this.breadcrumb_active ="Visite" ; break ;
      case 2: this.breadcrumb_active ="Reparation" ; break ;
      case 3: this.breadcrumb_active ="Historiuque Visite" ; break ;
      case 4: this.breadcrumb_active ="" ; break ;

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
