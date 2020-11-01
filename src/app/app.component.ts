import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StaffService } from './staff/Services/staff.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AirlineManagement';
  isloggedin:boolean=false;
  staffCredentials:any[]=[];
  username= new FormControl('',Validators.required);
  password= new FormControl('',Validators.required);
  constructor(private route:Router,public staffService:StaffService){

  }
  ngOnInit(){
    sessionStorage.setItem('user','');
this.staffService.getStaffCredentials().subscribe(x=>{
  this.staffCredentials=x;
},error=>{
  console.log(error);
})
  }
  display: boolean=false;
  validateUser(){
if(this.username.value=='Admin' && this.password.value=='123'){
  sessionStorage.setItem('user','admin');
  this.isloggedin=true;
this.route.navigate(['/admin/flights'])
}
else {
var staff=this.staffCredentials.find(x=>x.username==this.username.value&&x.password==this.password.value);
if(staff==null){
  alert('Invalid Credentials')
}
else{
  this.isloggedin=true;
    sessionStorage.setItem('user','staff');
  this.route.navigate(['/staff/flights'])
 // alert('Welcome')
}
}
this.display=false;
this.username.reset();
this.password.reset();
  }
  showLogin(){
    this.display=true;
  }
  logOut(){
    this.route.navigate(['/']);
    sessionStorage.clear();
    this.isloggedin=false;
  }
}