import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CourseType } from '../../models/course';
import { log } from 'console';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api';

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    });
  }

  // שליפת כל הקורסים
  getAllCourses(): Observable<CourseType[]> {
    return this.http.get<CourseType[]>(`${this.baseUrl}/courses`);
  }
  createCourse(course: any): Observable<any> {


    return this.http.post(`${this.baseUrl}/courses`, course, { headers: this.getHeaders() }
    ).pipe(
      tap((response: any) => {
        const courseId  = response;
      course.id = courseId;
      
      })
    );}

  // שליפת הקורסים שתלמיד רשום אליהם
  getStudentCourses(studentId: string): Observable<CourseType[]> {
    return this.http.get<CourseType[]>(`${this.baseUrl}/courses/student/${studentId}`,);
  }

  // הרשמה לקורס
  enrollCourse(courseId: string, userId: string): Observable<any> {
 

    return this.http.post(`${this.baseUrl}/courses/${+courseId}/enroll`, { userId },{headers: this.getHeaders()});
  }

  // ביטול הרשמה לקורס
  unenrollCourse(courseId: string, userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/courses/${courseId}/unenroll`, { body: { userId } , headers: this.getHeaders() });
  }

  // עדכון קורס
  updateCourse(courseId: string, courseData:{ title: string, description: string, teacherId: string}): Observable<CourseType> {
    return this.http.put<CourseType>(`${this.baseUrl}/courses/${courseId}`, {title:courseData.title,description:courseData.description,teacherId:courseData.teacherId}, { headers: this.getHeaders() });
  }

  // מחיקת קורס
  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/courses/${courseId}`,{ headers: this.getHeaders()}
    );
  }

  // קבלת פרטי קורס לפי מזהה
  getCourseById(courseId: string): Observable<CourseType> {
    return this.http.get<CourseType>(`${this.baseUrl}/courses/${courseId}`,{ headers: this.getHeaders() });
  }
}