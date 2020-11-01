import { Component, OnInit, Input, AfterViewInit, DoCheck } from '@angular/core';
import { StaffService } from '../Services/staff.service';

@Component({
  selector: 'app-passengers-details',
  templateUrl: './passengers-details.component.html',
  styleUrls: ['./passengers-details.component.css']
})
export class PassengersDetailsComponent implements OnInit,DoCheck{
  passengerDetails:any;
  constructor(private service:StaffService) { }

  ngOnInit() {
        this.passengerDetails= this.service.passengerDetails;
    console.log(this.passengerDetails);
  }
ngDoCheck(){
  this.passengerDetails= this.service.passengerDetails;
}
}
