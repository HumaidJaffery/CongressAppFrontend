import { Injectable } from '@angular/core';
import { Question } from './Question';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) {}

  public createQuestion(question: Question): Observable<any> {
    return this.http.post(`${environment.apiServerUrl}/question/add`, question);
  }

  public getQuestions(roomKey: number, numOfQuestions: any): Observable<any>{
    return this.http.get(`${environment.apiServerUrl}/question/get/${roomKey}/${numOfQuestions}`);
  }

  public deleteQuestion(questionId: number): Observable<any>{
    return this.http.delete(`${environment.apiServerUrl}/question/delete/${questionId}`);
  } 
}
