import { AuthService } from 'src/app/services/auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
  constructor(
    public authservice: AuthService,
  ){

  }
}
