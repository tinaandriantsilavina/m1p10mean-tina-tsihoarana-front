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
  currentTab =2;
  constructor(
    private router:ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.numero= this.router.snapshot.params.numero;
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
}
