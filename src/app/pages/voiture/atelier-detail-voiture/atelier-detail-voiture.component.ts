import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from "node_modules/jquery/dist/jquery";
@Component({
  selector: 'app-atelier-detail-voiture',
  templateUrl: './atelier-detail-voiture.component.html',
  styleUrls: ['./atelier-detail-voiture.component.scss']
})
export class AtelierDetailVoitureComponent implements OnInit {
  numero =""
  isShowTab   : boolean = false;
  breadcrumb_active = ""
  currentTab =2;
  constructor(
    private router:ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.numero= this.router.snapshot.params.numero;
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
}
