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
      let color =  this.random_rgba()
      this.backgroundColor.push(color.bg)
      this.borderColor.push(color.bd)
    }
    console.log(this.data)
    console.log(this.backgroundColor)
    console.log(this.borderColor)
    this.chartInit()
  }

  random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    // let bd= 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',1'+ ')';
    // let bg = 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',0.4'+ ')';
    let color ='rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) ;
    let bd= color + ',1'+ ')'
    let bg = color + ',0.4'+ ')'
    return {bd,bg}
  }

  // random_rgba_bg() {
  //   var o = Math.round, r = Math.random, s = 255;
  //   return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',0.4'+ ')';
  // }

  // random_rgba_bd() {
  //   var o = Math.round, r = Math.random, s = 255;
  //   return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',1'+ ')';
  // }

  // random_rgba() {
  //   var o = Math.round, r = Math.random, s = 255;
  //   return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
  // }
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  chartInit() {
    var myChart = new Chart(this.idcanvas, {
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
