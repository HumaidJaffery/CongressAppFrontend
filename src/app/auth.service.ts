import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map, catchError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text' as 'json' 
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
    
  public login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiServerUrl}/auth/login`, {"email":email, "password": password}, httpOptions)
      .pipe(
        map((response: any) => {
          if(response){
            localStorage.setItem('jwt_token', response);
          }
          return response;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<string> {
    if (error.status === 403) {
      // Handle 403 Forbidden
      throw Error('Invalid login credentials');
    } else {
      throw Error('Something went wrong. Please try again later.');
    }
  }

  public signup(email: string, username: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiServerUrl}/auth/signup`, {username, email, password}, httpOptions).pipe(
      map((response: any) => {
          if(response){
            localStorage.setItem('jwt_token', response);
          }
          return response;
      })
    )
  }

  public logout(): void{
    localStorage.removeItem('jwt_token');
  }

  public getJwtToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  public isLoggedIn(): boolean{
    return !!localStorage.getItem('jwt_token');
  }

}
