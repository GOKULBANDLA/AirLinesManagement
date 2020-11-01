import { Component, OnInit } from '@angular/core';
import { PassengerTickets } from 'src/app/staff/Classes/passengerTicket';
import { StaffService } from 'src/app/staff/Services/staff.service';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
userBookedTickets:PassengerTickets[]=[];
cols:any;
  constructor(private service:StaffService,private adminService:AdminService) { }

  ngOnInit() {
    this.service.fetchBookedTickets().subscribe(x=>{
    this.userBookedTickets=x;
    })
    this.initializeCols();
  }
  ChangeData(rowData){
this.seatDetails=rowData;
this.displayDialog=true;
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
  displayDialog:boolean=false;
  initializeCols() {
    this.cols=[
      { field: 'personName', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'gender', header: 'Gender' },
      { field: 'aadharNumber', header: 'Aadhar Number' },
      { field: 'address', header: 'Address' },
      { field: 'seat', header: 'Seat Number' },
      { field: 'wheelChairProvision', header: 'Chair Required' },
      { field: 'food', header: 'Food required' },
      { field: 'childAllow', header: 'Infants' },
      { field: 'flightnumber', header: 'Flight Number' },
      { field: 'flighttime', header: 'Flight Time' },
      { field: 'id', header: 'Change' },

    ]
  }
  Update(){
    this.displayDialog=false;
    this.adminService.updateUserDetails(this.seatDetails).subscribe(x=>{
      alert('Updated Successfully');
    },error=>{
      alert('Sorry! Not able to update. Please try again');
    })
  }
}
