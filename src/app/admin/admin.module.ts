import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { ManageFlightsComponent } from './manage-flights/manage-flights.component';
import { FlightsComponent } from './flights/flights.component';
import {SlideMenuModule} from 'primeng/slidemenu';
import {InputTextModule} from 'primeng/inputtext';
import { AddFlightsComponent } from './add-flights/add-flights.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule, MatSelectModule} from '@angular/material';
import {CheckboxModule} from 'primeng/checkbox';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AddpassengerComponent } from './addpassenger/addpassenger.component';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { SpinnerModule } from 'primeng/spinner';
@NgModule({
  declarations: [HomeComponent, ManageFlightsComponent, FlightsComponent, AddFlightsComponent, EditUserComponent, AddpassengerComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,SlideMenuModule,FormsModule,ReactiveFormsModule,HttpClientModule,
    InputTextModule,ButtonModule,MatStepperModule,InputTextModule,FormsModule,ReactiveFormsModule,
    MatButtonModule,MatFormFieldModule,ButtonModule,MatInputModule,CheckboxModule,MatStepperModule,
    TableModule,DialogModule,HttpClientModule,MatCheckboxModule,CardModule,MatSelectModule,CalendarModule,SpinnerModule,
    MatFormFieldModule,MatButtonModule,MatInputModule,CheckboxModule,TableModule,DialogModule,MatCheckboxModule
  ]
})
export class AdminModule { }
