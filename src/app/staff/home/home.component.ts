import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user= new BehaviorSubject<string>('');
  items: MenuItem[] = [{
    label: 'Manage Passengers',
    items: [
        {label: 'Check In', icon: 'pi pi-fw pi-check',routerLink:'/staff/checkin'},
        {label: 'In Flight', icon: 'pi pi-fw pi-sign-in',routerLink:'/staff/inflight'},
    ]
},
{
    label: 'Flights',
    items: [
        {label: 'Flights', icon: 'pi pi-fw pi-search-plus',routerLink:'/staff/flights'},
      
    ]
}
];
  constructor() { }

  ngOnInit() {
    this.user.next(sessionStorage.getItem('user'));
  }

}
