import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from '../../../services/course/courses.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-add',
  imports: [FormsModule],
  templateUrl: './course-add.component.html',
  styleUrl: './course-add.component.css'
})
export class CourseAddComponent {
  course = {
    title: '',
    description: '',
    teacherId: null
  };

  constructor(private courseService: CoursesService, private router: Router) {}

  onSubmit() {
    this.courseService.createCourse(this.course).subscribe(
      response => {
        console.log('Course created successfully:', response);
        this.router.navigate(['/courses']); 
      },
      error => {
        console.error('Error creating course:', error);
      }
    );
  }
}

