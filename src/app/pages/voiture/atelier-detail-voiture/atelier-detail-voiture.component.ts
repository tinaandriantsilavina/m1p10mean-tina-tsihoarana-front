import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-atelier-detail-voiture',
  templateUrl: './atelier-detail-voiture.component.html',
  styleUrls: ['./atelier-detail-voiture.component.scss']
})
export class AtelierDetailVoitureComponent implements OnInit {
  numero = ""
  isShowTab: boolean = false;
  breadcrumb_active = ""
  currentTab = 2;
  visiteSelectionner:any = null
  constructor(
    private router: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.numero = this.router.snapshot.params.numero;
    this.showTab(this.currentTab)
  }


  emitListner(event) {
    this.visiteSelectionner =null
    this.spinner.show()
    setTimeout(() => {
      console.log("open:: " + event)
      this.visiteSelectionner = event
      this.spinner.hide()
    }, 200);
  }
  showTab(id) {
    this.currentTab = id
    switch (id) {
      case 1: this.breadcrumb_active = "Visite"; break;
      case 2: this.breadcrumb_active = "Reparation"; break;
      case 3: this.breadcrumb_active = "Historiuque Visite"; break;
      case 4: this.breadcrumb_active = ""; break;

      default: break;
    }
    this.isShowTab = !this.isShowTab;
  }
}
