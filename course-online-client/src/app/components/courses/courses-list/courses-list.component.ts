import { Component } from '@angular/core';
import { CoursesService } from '../../../services/course/courses.service';
import { CourseType } from '../../../models/course';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-courses-list',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css'
})
export class CoursesListComponent {
  courses: CourseType[] = [];
  enrolledCourseIds: string[] = [];
  isLoading = true;
  userRole: string;
  userId: string;

  constructor(private coursesService: CoursesService, private router: Router) {
    // שליפת הנתונים מה-sessionStorage
    this.userRole = sessionStorage.getItem('role') || '';
    this.userId = sessionStorage.getItem('userId') || '';
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading = true;
    this.coursesService.getAllCourses().subscribe({
      next: (data: CourseType[]) => {
        this.courses = data;

        // אם המשתמש הוא תלמיד, טען גם את הקורסים שהוא רשום אליהם
        if (this.userRole === 'student' && this.userId) {
          this.loadEnrolledCourses();
        } else {
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        this.isLoading = false;
      }
    });
  }

  loadEnrolledCourses(): void {
    this.coursesService.getStudentCourses(this.userId).subscribe({
      next: (enrolledCourses: CourseType[]) => {
        this.enrolledCourseIds = enrolledCourses.map(course => course.id);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading enrolled courses:', error);
        this.isLoading = false;
      }
    });
  }

  isEnrolled(courseId: string): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  joinCourse(courseId: string, event: Event): void {
    event.stopPropagation(); // מניעת הפצת האירוע

    if (this.userId) {
      this.isLoading = true;
      this.coursesService.enrollCourse(courseId, this.userId).subscribe({
        next: () => {
          if (!this.enrolledCourseIds.includes(courseId)) {
            this.enrolledCourseIds = [...this.enrolledCourseIds, courseId];
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error enrolling to course:', error);
          this.isLoading = false;
        }
      });
    }
  }

  leaveCourse(courseId: string, event: Event): void {
    event.stopPropagation(); 

    if (this.userId) {
      this.isLoading = true;
      this.coursesService.unenrollCourse(courseId, this.userId).subscribe({
        next: () => {
          this.enrolledCourseIds = this.enrolledCourseIds.filter(id => id !== courseId);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error unenrolling from course:', error);
          this.isLoading = false;
        }
      });
    }
  }

  updateCourse(courseId: string, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/courses/edit', courseId]);

  }

  deleteCourse(courseId: string, event: Event): void {
    event.stopPropagation(); 

    if (confirm('האם אתה בטוח שברצונך למחוק את הקורס הזה?')) {
      this.isLoading = true;
      this.coursesService.deleteCourse(courseId).subscribe({

        next: () => {
          this.courses = this.courses.filter(course => course.id !== courseId);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error deleting course:', error);
          this.isLoading = false;
        }
      });
    }
  }

  viewCourseDetails(courseId: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    const selectedCourse = this.courses.find(course => course.id === courseId);

    this.router.navigate(['/courses/details', courseId], {
      state: { courseData: selectedCourse }
    });
  }
}