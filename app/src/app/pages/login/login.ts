import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router,
    private storage: Storage
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;
debugger
    if (form.valid) {
      debugger
      this.userData.login(this.login).subscribe((res) => {
        localStorage.setItem(environment.authtoken, res.access_token);
        this.storage.set(environment.authtoken, res.access_token).then((res) => {
          this.router.navigateByUrl('/schedule');
        });
      });

    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
