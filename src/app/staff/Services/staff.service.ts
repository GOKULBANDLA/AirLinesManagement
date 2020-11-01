import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flights } from 'src/app/admin/Classes/flights';
import { PassengerTickets } from '../Classes/passengerTicket';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  checkIn(checkIn) {
    return this.http.put<any>(this.api+'passengers/'+checkIn.id,checkIn);
  }
  api='http://localhost:3000/'
  passengerDetails:any;
  constructor(private http:HttpClient) { }
  getStaffCredentials(){
    return this.http.get<any[]>(this.api+'staff');
  }
  
  fetchFlights(){
    return this.http.get<Flights[]>(this.api+'flights')
  }
  fetchBookedTickets(){
    return this.http.get<PassengerTickets[]>(this.api+'passengers');
  }
  addBookedTickets(tickets){
  
   return this.http.post<any>(this.api+'passengers',tickets);
  
  }
}
