import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UserData {
  favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public storage: Storage,
    private httpClient: HttpClient,

  ) { }

  hasFavorite(sessionName: string): boolean {
    return (this.favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    this.favorites.push(sessionName);
  }

  public removeFavorite(sessionName: string): void {
    const index = this.favorites.indexOf(sessionName);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
  }

  public login(credentials: any): Observable<any> {
    // debugger
    return this.httpClient.post(environment.ibx_service + environment.login, credentials);
    // return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
    //   this.setUsername(credentials);
    //   return window.dispatchEvent(new CustomEvent('user:login'));
    // });
  }

  public async logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      return this.storage.remove('username');
    }).then(() => {
      window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }

  public async setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  public async getUserProfile(): Promise<any> {
    return await this.storage.get(environment.authtoken).then((res => Promise.resolve(jwt_decode(res)))).catch(rej => Promise.reject(jwt_decode(rej)));
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  public async isLoggedIn(): Promise<boolean> {
    return await this.storage.get(environment.authtoken).then((value) => {
      if(value)
        return this.isTokenExpired(value.access_token);
      else
        return false;
    });
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    // if (!token) { token = this.getToken(); }
    if (!token) { return true; }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) { return false; }
    return !(date.valueOf() > new Date().valueOf());
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }
  
}
