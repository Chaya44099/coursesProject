import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) { }

  getLessonsByCourseId(courseId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${courseId}/lessons`, { headers: this.getHeaders() });
  }
  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    });
  }

  getLessonById(courseId: string, lessonId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers: this.getHeaders() });
  }

  createLesson(courseId: string, lesson: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/lessons`, lesson, {
      headers:
        this.getHeaders()
    }
    );
  }



  updateLesson(courseId: string, lessonId: string, lesson: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, lesson, { headers: this.getHeaders() });
  }

  deleteLesson(courseId: string, lessonId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers: this.getHeaders() });
  }
}

