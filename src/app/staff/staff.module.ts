import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { HomeComponent } from './home/home.component';
import {SlideMenuModule} from 'primeng/slidemenu';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material';
import {CheckboxModule} from 'primeng/checkbox';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FlightsDetailsComponent } from './flights-details/flights-details.component';
import {CardModule} from 'primeng/card';
import {MatSelectModule} from '@angular/material/select';
import {CalendarModule} from 'primeng/calendar';
import {SpinnerModule} from 'primeng/spinner';
import {MatStepperModule} from '@angular/material/stepper';
import { PassengersDetailsComponent } from './passengers-details/passengers-details.component';
import { PassengerCheckinComponent } from './passenger-checkin/passenger-checkin.component';
import { InflightComponent } from './inflight/inflight.component';
@NgModule({
  declarations: [HomeComponent, FlightsDetailsComponent, PassengersDetailsComponent, PassengerCheckinComponent, InflightComponent],
  imports: [
    CommonModule,
    StaffRoutingModule,SlideMenuModule,InputTextModule,FormsModule,ReactiveFormsModule,
    MatButtonModule,MatFormFieldModule,ButtonModule,MatInputModule,CheckboxModule,MatStepperModule,
    TableModule,DialogModule,HttpClientModule,MatCheckboxModule,CardModule,MatSelectModule,CalendarModule,SpinnerModule
  ]
})
export class StaffModule { }
