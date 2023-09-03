import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
    
  public login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiServerUrl}/auth/login`, {email, password}, httpOptions)
      .pipe(
        map((response: any) => {
          console.log(response);
          if(response && response.status == 200){
            localStorage.setItem('jwt_token', response.body);
          }

          return response;
        })
      )
  }

  public register(email: string, username: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiServerUrl}/auth/login`, {username, email, password}, httpOptions).pipe(
      map((response: any) => {
        console.log("Registered" + response);
          if(response && response.status == 200){
            localStorage.setItem('jwt_token', response.body);
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
