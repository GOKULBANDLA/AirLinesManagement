import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user= new BehaviorSubject<string>('');
  items: MenuItem[] = [{
    label: 'Manage Flights',
    items: [
        {label: 'Add', icon: 'pi pi-fw pi-plus',routerLink:'/admin/AddFlights'},
        {label: 'Edit', icon: 'pi pi-fw pi-pencil',routerLink:'/admin/manageFlights'}
    ]
},
{
    label: 'Manage Users',
    items: [
      {label: 'Add Passengers', icon: 'pi pi-fw pi-plus',routerLink:'/admin/adduser'},
        {label: 'Edit User', icon: 'pi pi-fw pi-pencil',routerLink:'/admin/edituser'}
    ]
}
];
  constructor() { }

  ngOnInit() {
   this.user.next(sessionStorage.getItem('user'));
   console.log(this.user.value)
}

}