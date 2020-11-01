import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StaffService } from '../Services/staff.service';
import { Router } from '@angular/router';
import { Flights } from 'src/app/admin/Classes/flights';
import { PassengerTickets } from '../Classes/passengerTicket';

@Component({
  selector: 'app-passenger-checkin',
  templateUrl: './passenger-checkin.component.html',
  styleUrls: ['./passenger-checkin.component.css']
})
export class PassengerCheckinComponent implements OnInit {
  passengerSearchForm:FormGroup;
  minDate: Date;
  maxDate: Date;
  stepper: any;
  isLinear: boolean = true;
  flights: Flights[] = [];
  bookedTickets:PassengerTickets[]=[];
  passengersBookedTickets:PassengerTickets[]=[];
  cols:any;
  constructor(private formbuilder:FormBuilder,private service: StaffService,private route:Router) { }

  ngOnInit() {
    this.passengerSearchForm=this.formbuilder.group({
      origin: ['', Validators.required],
      dest: ['', Validators.required],
      date: ['', Validators.required],
    });
    this.setDates();
    this.fetchCities();
    //this.fetchBookedTickets();
    this.initializeCols();
    this.service.fetchBookedTickets().subscribe(x=>{
      this.bookedTickets=x;
    });
  }
  initializeCols() {
    this.cols=[
      { field: 'ticketnumber', header: 'Ticket Number' },
      { field: 'personName', header: 'Passenger' },
      { field: 'flightname', header: 'Flight Name' },
      { field: 'flightorigin', header: 'From' },
      { field: 'flightdest', header: 'To' },
      { field: 'flighttime', header: 'Departure Time' },
      { field: 'seat', header: 'Seat Number' },
      { field: 'dateofjourney', header: 'Date of Journey' },
      { field: 'checkedin', header: 'Check In' }

    ]
  }
 
  setDates() {
    let today = new Date();
    let month = today.getMonth();
    let nextMonth = (month === 11) ? 0 : month + 3;
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
  }
  searchpassengersToCheckIn(stepper){
    this.stepper=stepper;
    stepper.next();
   // this.passengerSearchForm.reset();
    this.ticketsToCheckIn();
   
  }
  ticketsToCheckIn() {
    var tickedOnDateSearch=this.bookedTickets.filter(x=>x.dateofjourney== new Date(this.passengerSearchForm.value['date']).toLocaleDateString() &&
    x.flightdest==this.passengerSearchForm.value['dest'] && x.flightorigin===this.passengerSearchForm.value['origin'])
    if(tickedOnDateSearch!=null){
      if(tickedOnDateSearch.length==0){
        alert('No tickets available');
        this.stepper.previous();
        return;
      }
      else{
        this.passengersBookedTickets=tickedOnDateSearch;
      }
    }
    else{
     this.passengersBookedTickets=[];
     alert('No tickets available');
    }
    this.fetchBookedTickets();
  }
  fetchBookedTickets() {
    this.service.fetchBookedTickets().subscribe(x=>{
      this.bookedTickets=x;
  //this.ticketsToCheckIn();
    })
  
  }
  moveBackToSearchPage(){
    this.stepper.previous();
   // this.fetchBookedTickets();
  }
  CheckIn(rowdata){
    rowdata.checkedin=true;
    this.service.checkIn(rowdata).subscribe(x=>{
      this.fetchBookedTickets();
      alert('Success. You are checkedin successfully')
    })
  }
  fetchCities() {

    this.service.fetchFlights().subscribe(x => {
      this.flights = x;
    }
    )
  }
}
