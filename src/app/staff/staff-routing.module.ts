import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FlightsDetailsComponent } from './flights-details/flights-details.component';
import { PassengerCheckinComponent } from './passenger-checkin/passenger-checkin.component';
import { InflightComponent } from './inflight/inflight.component';
import { AuthGuardService } from '../auth-guard-service.service';

const routes: Routes = [ {
  path: '',
  component: HomeComponent,
  children:[
    {path:'flights',component:FlightsDetailsComponent,canActivate: [ AuthGuardService ] },
    {path:'checkin',component:PassengerCheckinComponent,canActivate: [ AuthGuardService ] },
    {path:'inflight',component:InflightComponent,canActivate: [ AuthGuardService ] }
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
