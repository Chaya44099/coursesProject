import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../services/course/courses.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-edit',
  imports: [FormsModule],
  templateUrl: './course-edit.component.html',
  styleUrl: './course-edit.component.css'
})
export class CourseEditComponent {
  courseId: string = ''; 
  course = {
    title: '',
    description: '',
    teacherId: ''
  };

  constructor(
    private courseService: CoursesService,
    private router: Router,
    private route: ActivatedRoute 
  ) 
  {
    this.route.paramMap.subscribe(params => {
      const courseId = params.get('courseId');
  
      
      if (courseId !== null) {
        this.courseId = courseId;
        this.loadCourse(courseId);
      }
    });
  }


  loadCourse(courseId: string): void {
    this.courseService.getCourseById(courseId).subscribe(course => {
      this.course.title = course.title
      this.course.description = course.description
      this.course.teacherId = course.teacherId.toString(); 
    });
  
    
  }

  onSubmit() {
    this.courseService.updateCourse(this.courseId, this.course).subscribe(
      response => {
        console.log('Course updated successfully:', response);
        this.router.navigate(['/courses']); // ניווט לדף הקורסים
      },
      error => {
        console.error('Error updating course:', error);
      }
    );
  }
}
