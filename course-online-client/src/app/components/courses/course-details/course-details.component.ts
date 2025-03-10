import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseType } from '../../../models/course';
import { CoursesService } from '../../../services/course/courses.service';
import { LessonsService } from '../../../services/lesson/lessons.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {  MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { LessonType } from '../../../models/lessons';


@Component({
  selector: 'app-course-details',
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDividerModule,
    MatListModule
  ],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courseData: CourseType = {}as CourseType;
  courseId: string = '';
  userRole: string = '';
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService,
    private lessonsService: LessonsService
  ) {

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.courseData = navigation.extras.state['courseData'] as CourseType;
      this.isLoading = false;
    }
    this.userRole = sessionStorage.getItem('role') || '';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id') || '';
      if (!this.courseData && this.courseId) {
        this.loadCourseData(this.courseId);
      }
      this.loadCourseLessons(this.courseId);
    });
  }

    private loadCourseData(courseId: string): void {
    this.isLoading = true;
    this.coursesService.getCourseById(courseId).subscribe({
      next: (data: CourseType) => {
        this.courseData = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('שגיאה בטעינת פרטי הקורס:', error);
        this.isLoading = false;
      }
    });
  }
  private loadCourseLessons(courseId: string): void {
    this.lessonsService.getLessonsByCourseId(courseId).subscribe({
      next: (data: LessonType[]) => {
        this.courseData.lessons = data;
      },
      error: (error) => {
        console.error('שגיאה בטעינת רשימת השיעורים:', error);
      }
    });
  }

  //
  // מחיקת שיעור 
  deleteLesson(lessonId: string): void {
    if (confirm('האם אתה בטוח שברצונך למחוק את השיעור הזה?')) {
      this.isLoading = true;
      this.lessonsService.deleteLesson(this.courseId, lessonId).subscribe({
        next: () => {
          // עדכון רשימת השיעורים אחרי המחיקה
          if (this.courseData && this.courseData.lessons) {
            this.courseData.lessons = this.courseData.lessons.filter(lesson => lesson.id !== lessonId);
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('שגיאה במחיקת השיעור:', error);
          this.isLoading = false;
        }
      });
    }
  }

  // עריכת שיעור 
  editLesson(lessonId: string): void {
    this.router.navigate(['/courses/lessons/edit', this.courseId, lessonId]);
}

  //הוספת שיעור חדש
  addLesson(): void {
    this.router.navigate(['/lessons/add'], {
      state: { 
        courseId: this.courseId,
        returnUrl: `/courses/details/${this.courseId}`
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }
}