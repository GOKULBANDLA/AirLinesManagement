import { Component, OnInit } from '@angular/core';
import { Flights } from 'src/app/admin/Classes/flights';
import { AdminService } from 'src/app/admin/Services/admin.service';

@Component({
  selector: 'app-flights-details',
  templateUrl: './flights-details.component.html',
  styleUrls: ['./flights-details.component.css']
})
export class FlightsDetailsComponent implements OnInit {
  flights:Flights[];
  cols: any[];
    constructor(private adminservice:AdminService) { }
  
    ngOnInit() {
      this.cols = [
        { field: 'flightnumber', header: 'Flight Number' },
        { field: 'flightname', header: 'Name' },
        { field: 'flightorigin', header: 'From' },
        { field: 'flightdest', header: 'To' },
        {field:'flighttime',header:'Time'},
        { field: 'food', header: 'Food Provision' },
        { field: 'childAllow', header: 'Child Allowing' },
        { field: 'wheelChairProvision', header: 'Wheel Chair Availability' },
    ];
    this.getFlights();
    }
  getFlights(){
  this.adminservice.getFlightDetails().subscribe(x=>{
    this.flights=x;
  })
  }

}
