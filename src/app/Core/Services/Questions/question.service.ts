import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  // Get all questions
  getQuestions() {
    return this.http.get(`${environment.apiUrl}/auth/getQuestionsByMainGroups`);
  }

  // Create a new question
  createQuestion(body: any) {
    return this.http.post(`${environment.apiUrl}/auth/createQuestion`, body);
  }

  // Update a question
  updateQuestion(mainid: number , questionid : number, body: any) {
    return this.http.patch(`${environment.apiUrl}/auth/updateSingleQuestion/${mainid}/${questionid}`, body);
  }

  // Delete a question
  deleteQuestion(mainid: number , questionid : number) {
    return this.http.delete(`${environment.apiUrl}/auth/deleteSingleQuestion/${mainid}/${questionid}`);
  }

  // Create Score
  createScore(body: any) {
    return this.http.post(`${environment.apiUrl}/auth/createEvaluation`, body);
  }

  // get Score
  getScore() {
    return this.http.get(`${environment.apiUrl}/auth/getEvaluations`);
  }

}
