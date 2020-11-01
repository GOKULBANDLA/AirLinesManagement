import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { Flights } from '../Classes/flights';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
flights:Flights[];
cols: any[];
  constructor(private adminservice:AdminService) { }

  ngOnInit() {
    this.cols = [
      { field: 'flightnumber', header: 'Flight Number' },
      { field: 'flightname', header: 'Name' },
      { field: 'flightorigin', header: 'From' },
      { field: 'flightdest', header: 'To' },
      {field:'flighttime',header:'Departure Time'},
      { field: 'flightprice', header: 'Price' },
      { field: 'reachtime', header: 'Reach Destination' },
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
