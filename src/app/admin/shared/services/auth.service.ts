import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {IUser} from '../interfaces/user';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {IAuthResponse} from '../interfaces/firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  public login(user: IUser): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.errorHandler.bind(this))
      );
  }

  public logout() {
    this.setToken(null);
  }

  public isAuth(): boolean {
    return !!localStorage.getItem('fb-token');
  }

  private setToken(token: IAuthResponse | null): void {
    if (token) {
      const expDate = new Date(new Date().getTime() + +token.expiresIn * 1000);
      localStorage.setItem('fb-token', token.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  private errorHandler(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    const message = error?.error?.error?.message || 'error';
    this.error$.next(message);
    return throwError(error);
  }
}
