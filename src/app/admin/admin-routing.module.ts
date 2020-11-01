import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageFlightsComponent } from './manage-flights/manage-flights.component';
import { FlightsComponent } from './flights/flights.component';
import { AddFlightsComponent } from './add-flights/add-flights.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddpassengerComponent } from './addpassenger/addpassenger.component';
import { AuthGuardService } from '../auth-guard-service.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children:[
      {path:'flights',component:FlightsComponent ,canActivate: [ AuthGuardService ],},
      {path:'AddFlights',component:AddFlightsComponent,canActivate: [ AuthGuardService ], },
      {path:'manageFlights',component:ManageFlightsComponent ,canActivate: [ AuthGuardService ],},
      {path:'edituser',component:EditUserComponent,canActivate: [ AuthGuardService ],},
      {path:'adduser',component:AddpassengerComponent,canActivate: [ AuthGuardService ], },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
