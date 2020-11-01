import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../Services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-flights',
  templateUrl: './add-flights.component.html',
  styleUrls: ['./add-flights.component.css']
})
export class AddFlightsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private adminService:AdminService,private route:Router) { }
  flightInput :FormGroup;
  facilitiesFormGroup:FormGroup;
  isLinear = true;


  ngOnInit() {
    this.flightInput=this.formBuilder.group({
      flightnumber:['',Validators.required],
      flightname:['',Validators.required],
      flightorigin:['',Validators.required],
      flightdest:['',Validators.required],
      flighttime:['',Validators.required],
      flightprice:['',Validators.required],
      reachtime:['',Validators.required]
    });
    this.facilitiesFormGroup=this.formBuilder.group({
      food:[false],
      childAllow:[false],
      wheelChairProvision:[false],
    })
    
  }
  addFlightDetails(){
    var flightObj={};
    flightObj['flightnumber']=this.flightInput.controls['flightnumber'].value;
    flightObj['flightname']=this.flightInput.controls['flightname'].value;
    flightObj['flightorigin']=this.flightInput.controls['flightorigin'].value;
    flightObj['flightdest']=this.flightInput.controls['flightdest'].value;
    flightObj['flighttime']=this.flightInput.controls['flighttime'].value;
    flightObj['flightprice']=this.flightInput.controls['flightprice'].value;
    flightObj['reachtime']=this.flightInput.controls['reachtime'].value;
    flightObj['food']=this.facilitiesFormGroup.controls['food'].value==true?'Yes':'No';
    flightObj['childAllow']=this.facilitiesFormGroup.controls['childAllow'].value==true?'Yes':'No';
    flightObj['wheelChairProvision']=this.facilitiesFormGroup.controls['wheelChairProvision'].value==true?'Yes':'No';
    this.adminService.addFlights(flightObj).subscribe(x=>{
    this.route.navigate(['/admin/flights']);
    },error=>{
      alert('Not able to add Flight Details');
    })
  }
}
