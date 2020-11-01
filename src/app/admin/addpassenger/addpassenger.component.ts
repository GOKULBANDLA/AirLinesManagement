import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ValidatorFn, FormControl } from '@angular/forms';

import { Flights } from 'src/app/admin/Classes/flights';
import { MatStep, MatStepper } from '@angular/material';
import { SearchFlight } from 'src/app/staff/Classes/SearchFlight';
import { PassengerTickets } from 'src/app/staff/Classes/passengerTicket';
import { StaffService } from 'src/app/staff/Services/staff.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addpassenger',
  templateUrl: './addpassenger.component.html',
  styleUrls: ['./addpassenger.component.css']
})
export class AddpassengerComponent implements OnInit {
  isLinear: boolean = true;
  seatsToDisplay: any[] = []
  searchCick: boolean = false;
  selectedSeats: any[] = []
  minDate: Date;
  maxDate: Date;
  stepper: any;
  //Need to send to booking page
  flightSelected: SearchFlight;
  //objectToSendToDetailsPage: any;
  passengerFlights: SearchFlight[] = [];
  bookedTickets: PassengerTickets[] = [];
  addPassengersForm: FormGroup;
  //Form used after selecting seats
  passengersDetails:FormGroup;
  cols: any[];
  form: FormGroup;
  genders=[
    "Male",
    "Female",
    "TransGender"
  ]
  initializeCheckbox() {
    this.form = this.formBuilder.group({
      seats: new FormArray([])
    });
  }
  constructor(private formBuilder: FormBuilder, private service: StaffService,private route:Router) {
    this.initializeCheckbox();

    this.addCheckboxes();
  }
  flights: Flights[] = [];
  flightsToDisplays: SearchFlight[] = [];
  ngOnInit() {
   
    this.createPassengerDetailsForm();
    this.InitializeForm();
    this.fetchCities();
    this.setDates();
    this.FillTableColumns();
    this.seatsGeneration();
  }

  setDates() {
    let today = new Date();
    let month = today.getMonth();
    let nextMonth = (month === 11) ? 0 : month + 3;
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
  }
  fetchCities() {

    this.service.fetchFlights().subscribe(x => {
      this.flights = x;
    }
    )
  }

  InitializeForm() {
    this.addPassengersForm = this.formBuilder.group({
      origin: ['', Validators.required],
      dest: ['', Validators.required],
      date: ['', Validators.required],
      adultCount: ['', Validators.required],
      infantCount: ['', Validators.required]
    });
  }
  SearchFlights(stepper: MatStepper) {
    this.stepper = stepper;
    this.initializeCheckbox();
     this.form.reset();
    this.addCheckboxes();
    this.searchCick = true;
    this.addPassengersForm.markAsUntouched();
    if (this.addPassengersForm.value['origin'] === this.addPassengersForm.value['dest']) {
      alert('Source and Destination cities cannot be same')
      return;
    }
    //Fetching flights based on Source and Destination
    var requiredFlights = this.flights.filter(x => x.flightdest.toString() === this.addPassengersForm.value['dest'].toString() && x.flightorigin.toString() === this.addPassengersForm.value['origin'].toString())
    //If flights are available
    if (requiredFlights.length > 0) {
      //Checking Infant is there or not
      if(parseInt(this.addPassengersForm.value['infantCount'])>0){
        requiredFlights=requiredFlights.filter(x=>x.childAllow=="Yes");
      }
      if(requiredFlights.length>0){
//Fetching previous flight bookings  
this.getAlreadyBookedTickets(requiredFlights);
      }
      else{
        alert("No flights Available");
        this.searchCick = false;
      }

    }  //If No flights available
    else {
      this.searchCick = false;
      alert("No flights Available");
    }
  }
  CheckSeatsAvailability(flightTickets: PassengerTickets[], flightnumber: string): number {
    var seats = 70;
    if (flightTickets.length > 0) {
      var bookedSeats = flightTickets.filter(x => x.flightnumber.toString() === flightnumber.toString());
      if (bookedSeats != null) {
        //Checking tickets exists
        if (bookedSeats.length > 0) {
          //deducting tickets
          seats = seats - bookedSeats.length;
        }
      }

    }
    return seats;
  }
  getAlreadyBookedTickets(passengerFlights: Flights[]) {
    this.bookedTickets = [];
    //Calling service to fetch previously booked tickets of all flights
    this.service.fetchBookedTickets().subscribe(y => {
      //if transactions available
      if (y.length > 0) {
        //Fetching tickets of the filtered flights for that particulat date to get seats
        this.bookedTickets = y.filter(x => x.flightdest.toString() === this.addPassengersForm.value['dest'].toString() && x.flightorigin.toString() === this.addPassengersForm.value['origin'].toString()
          && x.dateofjourney ===new Date(this.addPassengersForm.value['date']).toLocaleDateString());
      }
      else {
        this.bookedTickets = [];
      }
      this.CreateListOfFlightsToDisplay(passengerFlights);
    }
    )

  }
  CreateListOfFlightsToDisplay(Flight: Flights[]) {
    this.passengerFlights=[];
    Flight.forEach(x => {
      var flightsToDisplay = new SearchFlight();
      flightsToDisplay.source = x.flightorigin;
      flightsToDisplay.departTime = x.flighttime;
      flightsToDisplay.destination = x.flightdest;
      flightsToDisplay.flightname = x.flightname;
      flightsToDisplay.flightnumber = x.flightnumber;
      flightsToDisplay.reachDestination = x.reachtime;
      flightsToDisplay.price = x.flightprice;
      flightsToDisplay.seatsAvailable = this.CheckSeatsAvailability(this.bookedTickets, x.flightnumber);
      if (flightsToDisplay.seatsAvailable >= parseInt(this.addPassengersForm.value['adultCount'])) {
        flightsToDisplay.bookingAvailability = "Available";
        flightsToDisplay.ableToBook=true;
      }
      else {
        flightsToDisplay.bookingAvailability = "Not Available";
        flightsToDisplay.ableToBook=false;
      }
      this.passengerFlights.push(flightsToDisplay);
    })
  }
  FillTableColumns() {
    this.cols = [
      { field: 'flightnumber', header: 'Flight Number' },
      { field: 'flightname', header: 'Name' },
      { field: 'price', header: 'Price' },
      { field: 'departTime', header: 'Departure' },
      { field: 'source', header: 'From' },
      { field: 'destination', header: 'To' },
      { field: 'bookingAvailability', header: 'Availability' },
    ];
  }
  ResetForm() {
    this.form.controls['seats'].reset();
  }
  display: boolean = false;
  // display all seats
  showSeats(rowData) {
    this.display = true;
    this.flightSelected = rowData;
    var flightNumber=this.flightSelected.flightnumber;
    this.FillBookedSeats(flightNumber);
    this.stepper.next();
    
  }
  
  total = 0;
  confirmJourney() {
    this.display = false;
    let passengerObj = {};
    passengerObj =this.cloneDetails(this.flightSelected);
    passengerObj['adultCount'] = this.addPassengersForm.value['adultCount'];
    passengerObj['date'] = this.addPassengersForm.value['date'];
    passengerObj['infantCount'] = this.addPassengersForm.value['infantCount'];
    this.service.passengerDetails=passengerObj;
    if(parseInt(passengerObj['infantCount'])>0){
      this.boolinfantRequired=true;
    }
    else{
      this.boolinfantRequired=false;
    }
   var flightShowedServices=this.flights.find(x=>x.flightname==this.flightSelected.flightname && x.flightnumber==this.flightSelected.flightnumber);
   if(flightShowedServices!=null){
     if(flightShowedServices.food=="Yes"){
       this.boolFoodRequired=true;
     }
     else{
      this.boolFoodRequired=false;
     }
     if(flightShowedServices.wheelChairProvision=="Yes"){
      this.boolChairRequired=true;
    }else{
      this.boolChairRequired=false;
     }
   }
    this.selectedSeats.forEach(x=>{
      this.createItem();
    });
  
   this.stepper.next();
  
  }
  FillBookedSeats(flightNumber: string) {
    this.ResetPreviousBookedSeats();
    if(this.bookedTickets.length>0){
      var selectedFlightBookedTickets=this.bookedTickets.filter(x=>x.flightnumber==flightNumber);
    }
    if(selectedFlightBookedTickets!=null && selectedFlightBookedTickets!=undefined){
      if(selectedFlightBookedTickets.length>0){
        selectedFlightBookedTickets.forEach(k=>{
         var seat= document.getElementById("img"+k.seat) as HTMLInputElement;
         seat.src= "../assets/img/fseat.png";
         var box=document.getElementById(k.seat) as HTMLInputElement
         box.disabled=true;
        })
      }
    }
    else{
      this.ResetPreviousBookedSeats();
      
    }
    
  }
  ResetPreviousBookedSeats() {
    this.seatsToDisplay.forEach(x=>{
      var box=document.getElementById(x) as HTMLInputElement
      box.disabled=false;
      var seat= document.getElementById("img"+x) as HTMLInputElement;
      seat.src= "../assets/img/bseat.png";
      
    })
  }
  createPassengerDetailsForm() {
    this.passengersDetails = this.formBuilder.group({
      detailsArray: this.formBuilder.array([ ])
    });
  }
  get passengerDetailsForms() {
    return this.passengersDetails.get('detailsArray') as FormArray
  }
  //To create array of Forms and to push into form array
  createItem() {
  const detail= this.formBuilder.group({
    personName: ['',Validators.required],
    personAge: ['',Validators.required],
    mobileNumber: ['',[Validators.required,Validators.min(1000000000), Validators.max(9999999999)]],
      gender:['',Validators.required],
      email:['',Validators.email],
      address:['',Validators.required],
      aadharNumber:['',[Validators.required,Validators.min(100000000000), Validators.max(999999999999)]]
    });
    this.passengerDetailsForms.push(detail);
  }
  cloneDetails(c: any):any {
    let flight = {};
    for (let prop in c) {
        flight[prop] = c[prop];
    }
    return flight;
  }
  //Creating seats manually and pushing to array
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
  //Method calling on seat click
  AddSeat(e) 
  {
    var element = document.getElementById("img"+e.target.id) as HTMLInputElement;
    if (e.currentTarget.checked) {
      this.selectedSeats.push(e.target.id);
           element.src= "../assets/img/fseat.png"
      if (this.selectedSeats.length > parseInt(this.addPassengersForm.value['adultCount'])) {
        element.src= "../assets/img/bseat.png"
        event.preventDefault();
        event.stopPropagation();
        this.selectedSeats.pop();
        var cb = document.getElementById(e.target.id) as HTMLInputElement;
        cb.checked = false;
         cb.innerHTML=`<img src="../assets/img/fseat.png" alt="">`
        alert('Selecting more seats than entered number')
        return;
      }
    }
    else {
      var index = this.selectedSeats.indexOf(e.target.id);
       element.src= "../assets/img/bseat.png"
      if (index >= 0) {
        if (index == 0) {
          this.selectedSeats.pop();
        }
        else {
          this.selectedSeats.splice(index, 1)
        }

      }
    }
  }
  private addCheckboxes() {
    this.seatsToDisplay.forEach((o, i) => {
      const control = new FormControl(false); // if first item set to true, else false
      (this.form.controls.seats as FormArray).push(control);
    });
  }
  backToSearchPage(){
    this.searchCick=false;
   // this.resetCheckBoxes();
    this.passengerFlights=[];
    this.stepper.previous();
  }
  moveBackToFlights(){
    this.selectedSeats=[];
    this.resetCheckBoxes();
    this.stepper.previous();
  }
  resetCheckBoxes() {
    if(this.selectedSeats.length>0){
      this.selectedSeats.forEach(element => {
        var cb = document.getElementById(element) as HTMLInputElement;
        cb.checked = false;
        var image=document.getElementById("img"+element) as HTMLInputElement; 
        image.src="../assets/img/bseat.png";
       });
    } 
  }
  infantRequired= new FormControl(false);
  wheelChairRequired= new FormControl(false);
  foodRequired= new FormControl(false);
  boolinfantRequired:boolean=false;
  boolFoodRequired:boolean=false;
  boolChairRequired:boolean=false;
  moveBackToFlightsSeatsSelection(){
    this.stepper.previous();
    this.stepper.previous();
    this.stepper.previous();

  }
  finishBooking(){
    var ticketNumber=this.generateTicketNumber();
    var tickets=[];
    for(var i=0;i<this.passengersDetails.value.detailsArray.length;i++){
      var element=this.passengersDetails.value.detailsArray[i];
      var objectTosend={};
      objectTosend= this.cloneDetails(element);
      var date=new Date(this.service.passengerDetails['date']).toLocaleDateString()
      objectTosend['dateofjourney']=date;
      objectTosend['infantCount']=this.service.passengerDetails['infantCount'];
      objectTosend['ticketnumber']=ticketNumber;
      objectTosend['flightnumber']=this.service.passengerDetails['flightnumber'];
      objectTosend['flightname']=this.service.passengerDetails['flightname'];
      objectTosend['flightorigin']=this.service.passengerDetails['source'];
      objectTosend['flightdest']=this.service.passengerDetails['destination'];
      objectTosend['flighttime']=this.service.passengerDetails['departTime'];
      objectTosend['food']=this.foodRequired.value?"Yes":"No";
      objectTosend['childAllow']= this.infantRequired.value?"Yes":"No";
      objectTosend['wheelChairProvision']=this.wheelChairRequired.value?"Yes":"No";
      objectTosend['seat']=this.selectedSeats[i];
      objectTosend['checkedin']=false;
      tickets.push(objectTosend)

    }
    
    tickets.forEach(bookedTicket => {
      this.service.addBookedTickets(bookedTicket).subscribe(x=>{
      this.route.navigate(['/admin/flights']);
      }
      ),error=>{
  alert('error')
      };
    }
    );
  }
   generateTicketNumber() {
    return 'xx-xx-4xx-yxx-xxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : ( r & 0x3 | 0x8 );
        return v.toString(16);
    });
   // Math.random().toString(36).slice(2);
}
}
