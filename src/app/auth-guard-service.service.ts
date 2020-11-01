import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private route: Router) { }
  canActivate(): boolean {
    var user = sessionStorage.getItem('user')
    if (user != null) {
      if (user != '') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }
}
