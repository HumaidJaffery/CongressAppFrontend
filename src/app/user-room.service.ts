import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRoomService {

  constructor(private http: HttpClient) { }

  public getUserRoomInfo(roomKey: number): Observable<any> {
    return this.http.get(`${environment.apiServerUrl}/user-room/getUserRoomInfo/${roomKey}`);
  }

  public gradeQuiz(roomKey: number, submittedQuestions: any[]){
    return this.http.post(`${environment.apiServerUrl}/user-room/gradeQuiz/${roomKey}`, submittedQuestions);
  }

  public getUserRoomStatistics(roomKey: number){
    return this.http.get(`${environment.apiServerUrl}/user-room/getUserRoomStatistics/${roomKey}`);
  }
}
