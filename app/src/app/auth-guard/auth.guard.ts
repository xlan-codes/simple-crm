import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { UserData } from '../providers/user-data';

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
      private router: Router,
      private userData: UserData
    ) {}

  public async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {

    let authenticated = this.userData.isLoggedIn();

    if (authenticated) {
      this.router.navigate(["login"]);
      return false;
    }

    return true;
  }
}