import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { StaffService } from '../Services/staff.service';
import { Flights } from 'src/app/admin/Classes/flights';
import { PassengerTickets } from '../Classes/passengerTicket';

@Component({
  selector: 'app-inflight',
  templateUrl: './inflight.component.html',
  styleUrls: ['./inflight.component.css']
})
export class InflightComponent implements OnInit {
  flightSearchForm:FormGroup;
  flights: Flights[] = [];
  minDate: Date;
  flightsToDisplay:Flights[]=[];
  maxDate: Date;
  stepper: any;
  cols:any;
  form: FormGroup;
  showDialog:boolean=false;
  bookedTickets:PassengerTickets[]=[];
  seatsToDisplay: any[] = []
  constructor(private formbuilder:FormBuilder,private service: StaffService,private route:Router) {
    this.initializeCheckbox();

    this.addCheckboxes();
   }

  ngOnInit() {
    this.flightSearchForm=this.formbuilder.group({
      origin: ['', Validators.required],
      dest: ['', Validators.required],
      date: ['', Validators.required],
    });
    this.seatsGeneration();
    this.fetchCities();
    this.setDates();
    this.initializeCols();
    this.fetchBookedTickets();
    this.ResetPreviousBookedSeats();
  }
  seatsGeneration() {
    let variable = ['A', 'B', 'C', 'D', 'E', 'F']
    for (var i = 1; i < 20; i++) {
      for (var j = 0; j < 6; j++) {
        var a = '';
        if (i < 10) {
          a = '0' + i.toString();
        }
        else {
          a = i.toString();
        }
        var seat = a + variable[j].toString();
        this.seatsToDisplay.push(seat)
      }
    }
  }
  private addCheckboxes() {
    this.seatsToDisplay.forEach((o, i) => {
      const control = new FormControl(false); 
      (this.form.controls.seats as FormArray).push(control);
    });
  }
  setDates() {
    let today = new Date();
    let month = today.getMonth();
    let nextMonth = (month === 11) ? 0 : month + 3;
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
  }
  initializeCols() {
    this.cols=[
      { field: 'flightnumber', header: 'Flight Number' },
      { field: 'flightname', header: 'Name' },
      { field: 'flightorigin', header: 'From' },
      { field: 'flightdest', header: 'To' },
      { field: 'flighttime', header: 'Departure Time' },
      { field: 'flightprice', header: 'Price' },
      { field: 'reachtime', header: 'Reach Destination By' },
      { field: 'id', header: 'Check Seats' },

    ]
  }
  fetchCities() {

    this.service.fetchFlights().subscribe(x => {
      this.flights = x;
    }
    )
  }
  moveBackToSearchPage(){
    this.stepper.previous();
  }
  searchFlightbasedOnSearch(stepper){
   this.stepper=stepper; 
   this.flightsToDisplay=this.flights.filter(x=>x.flightdest==this.flightSearchForm.value['dest'] && x.flightorigin==this.flightSearchForm.value['origin'])
   stepper.next();
  }
  initializeCheckbox() {
    this.form = this.formbuilder.group({
      seats: new FormArray([])
    });
  }
  ResetPreviousBookedSeats() {
    this.seatsToDisplay.forEach(x=>{
      var seat= document.getElementById("img"+x) as HTMLInputElement;
      seat.src= "../assets/img/bseat.png";
      
    })
  }
  bookedTicketsofSelectedFlight:PassengerTickets[]=[];
  checkSeats(rowData){
    this.bookedTicketsofSelectedFlight=[];
    this.stepper.next();
   this.bookedTicketsofSelectedFlight=this.bookedTickets.filter(x=>x.flightnumber==rowData.flightnumber && x.flighttime==rowData.flighttime && x.dateofjourney==new Date(this.flightSearchForm.value['date']).toLocaleDateString())
  if(this.bookedTicketsofSelectedFlight!=null){
    if(this.bookedTicketsofSelectedFlight.length==0){
      alert('No seats booked');
    }
    else{
      this.bookedTicketsofSelectedFlight.forEach(x=>{

    var seat= document.getElementById("img"+x.seat) as HTMLInputElement;
      seat.src= "../assets/img/fseat.png";
/*   var element=document.getElementById("lab"+x.seat) as HTMLInputElement;
  var img = document.createElement("img");
  img.src="../assets/img/fseat.png"
  element.appendChild(img);
   */
});
    }
  }else{
      alert('No seats booked');
  }
}
  fetchBookedTickets() {
    this.service.fetchBookedTickets().subscribe(x=>{
      this.bookedTickets=x;
    })
  
  }
  moveBackToFlights(){
    this.stepper.previous();
    this.ResetPreviousBookedSeats();
  }
  seatDetails:PassengerTickets={
    aadharNumber:'',
    address:'',
    checkedin:false,
    childAllow:'',
    dateofjourney:'',
    email:'',
    flightdest:'',
    flightname:'',
    flightnumber:'',
    flightorigin:'',
    flighttime:'',
    food:'',
    gender:'',
    id:0,
    infantCount:'',
    mobileNumber:'',
    personAge:'',
    personName:'',
    seat:'',
    ticketnumber:'',
    wheelChairProvision:''
  }
  showPassenger(e){
console.log(e.target.id);
this.seatDetails= new PassengerTickets();
 this.seatDetails=this.bookedTicketsofSelectedFlight.find(x=>x.seat==e.target.id);
 if(this.seatDetails!=null){
this.showDialog=true;
 }
  }
}
