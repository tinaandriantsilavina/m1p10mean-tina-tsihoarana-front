import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartType } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() type: ChartType = "pie";
  @Input() idcanvas = "myChart";
  @Input() data :any  = [12, 19, 3, 5, 2, 3];
  @Input() labels =['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
  @Input() label ="# of Votes";
  backgroundColor :any = [];
  borderColor :any =[];
  constructor() {

  }
  ngOnInit() {

    for(let i=0; i<this.data.length; i++){
      this.backgroundColor.push(this.getRandomColor())
      this.borderColor.push(this.getRandomColor())
    }
    console.log(this.data)
    this.chartInit()
    console.log(this.random_rgba())
  }

  random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
  }
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  chartInit() {
    var myChart = new Chart("myChart", {
      type: this.type,
      data: {
        labels: this.labels,
        datasets: [{
          label: this.label,
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: this.backgroundColor,
          borderColor: this.borderColor,
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

  chartInitt() {
    var myChart = new Chart("myChart", {
      type: 'polarArea',
      data: {
        labels:this.labels,
        datasets: [{
          label:this.label,
          data: this.data,
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
