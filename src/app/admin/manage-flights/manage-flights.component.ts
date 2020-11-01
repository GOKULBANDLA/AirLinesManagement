import { Component, OnInit } from '@angular/core';
import { Flights } from '../Classes/flights';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-manage-flights',
  templateUrl: './manage-flights.component.html',
  styleUrls: ['./manage-flights.component.css']
})
export class ManageFlightsComponent implements OnInit {
  flights:Flights[]=[];
  cols: any[];
  displayDialog: boolean;

  flight: any = {
  
  };

  selectedFlight: Flights;
    constructor(private adminservice:AdminService) { }
  
    ngOnInit() {
      this.cols = [
        { field: 'id', header: 'Id',hidden:true },
        { field: 'flightnumber', header: 'Flight Number' },
        { field: 'flightname', header: 'Name' },
        { field: 'flightorigin', header: 'From' },
        { field: 'flightdest', header: 'To' },
        {field:'flighttime',header:'Departure Time'},
        {field:'reachtime',header:'Reach Destination By'},
        {field:'flightprice',header:'Price'},
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
  onRowSelect(event) {
    this. flight= this.cloneFlight(event.data);
    this.displayDialog = true;
}
cloneFlight(c: Flights):any {
  let car = {};
  for (let prop in c) {
      car[prop] = c[prop];
  }
  if(car['food']=="Yes"){
    car['food']=true;
  }
  else{
    car['food']=false;
  }
  if(car['childAllow']=="Yes"){
    car['childAllow']=true;
  }
  else{
    car['childAllow']=false;
  }
  if(car['wheelChairProvision']=="Yes"){
    car['wheelChairProvision']=true;
  }
  else{
    car['wheelChairProvision']=false;
  }
  return car;
}
delete(){
  this.adminservice.deleteFlight(this.flight.id).subscribe(x=>{
    this.displayDialog=false;
    alert('deleted');
    this.getFlights();
  },error=>{
    console.log(error);
  })
}
update(){
  this.flight.food= this.flight.food==true || this.flight.food=="Yes"?"Yes":"No";
  this.flight.childAllow= this.flight.childAllow==true || this.flight.childAllow=="Yes"?"Yes":"No";
  this.flight.wheelChairProvision= this.flight.wheelChairProvision==true || this.flight.wheelChairProvision=="Yes"?"Yes":"No";
  this.adminservice.updateFlight(this.flight).subscribe(x=>{
    this.displayDialog=false;
    alert('updated');
    this.getFlights();
  },error=>{
    console.log(error);
  })
}
}
