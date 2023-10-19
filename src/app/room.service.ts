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

  public searchPublicRooms(page: number, keyword: string): Observable<any> {
    return this.http.get(`${environment.apiServerUrl}/room/search/${keyword}/${page}`);
  }

  public getTotalNumberOfQuestions(roomKey: number): Observable<any> {
    return this.http.get(`${environment.apiServerUrl}/room/getTotalNumberOfQuestions/${roomKey}`);
  }

  public likeRoom(roomKey: string): Observable<any> {
    return this.http.post(`${environment.apiServerUrl}/room/like/${roomKey}`, 1);
  }

  public unlikeRoom(roomKey: string): Observable<any> {
    return this.http.post(`${environment.apiServerUrl}/room/unlike/${roomKey}`, 1);
  }
}
