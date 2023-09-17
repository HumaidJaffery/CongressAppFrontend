import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Room } from './Room';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) {}

  public createRoom(room: Room): Observable<any> {
    console.log(room);
    return this.http.post(`${environment.apiServerUrl}/room/create`, room);
  }

  public getRoom(roomKey: number): Observable<any> {
    return this.http.get(`${environment.apiServerUrl}/room/get/${roomKey}`);
  }
}
