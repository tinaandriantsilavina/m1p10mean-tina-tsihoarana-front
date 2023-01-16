import { NotfoundComponent } from './pages/notfound/notfound.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'connexion/loginform', component:  LoginComponent},
  { path :'not-found' , component:NotfoundComponent},
  {path: '**', redirectTo:'/not-found'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
