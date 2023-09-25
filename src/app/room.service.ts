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
    return this.http.post(`${environment.apiServerUrl}/room/add`, room);
  }

  public getRoom(roomKey: number): Observable<any> {
    return this.http.get(`${environment.apiServerUrl}/room/get/${roomKey}`);
  }

  public getPublicRooms(page: number): Observable<any> {
    return this.http.get(`${environment.apiServerUrl}/room/getPublic/${page}`);
  }
}
