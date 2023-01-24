import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-atelier-detail-voiture',
  templateUrl: './atelier-detail-voiture.component.html',
  styleUrls: ['./atelier-detail-voiture.component.scss']
})
export class AtelierDetailVoitureComponent implements OnInit {
  numero =""
  constructor(
    private router:ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.numero= this.router.snapshot.params.numero;
  }
}
