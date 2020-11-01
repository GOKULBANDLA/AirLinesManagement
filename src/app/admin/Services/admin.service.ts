import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flights } from '../Classes/flights';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
 api='http://localhost:3000/'
  constructor(private http:HttpClient) { }

addFlights(flightObj){
return this.http.post(this.api+'flights',flightObj);
}
getFlightDetails(){
  return this.http.get<Flights[]>(this.api+'flights');
}
deleteFlight(id){
  return this.http.delete<any>(this.api+'flights/'+id);
}
updateFlight(flightObj){
  return this.http.put<any>(this.api+'flights/'+flightObj.id,flightObj);
}
updateUserDetails(passenger) {
  return this.http.put<any>(this.api+'passengers/'+passenger.id,passenger);
}
}
