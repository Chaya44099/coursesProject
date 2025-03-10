import { Component } from '@angular/core';
import { LessonsService } from '../../../../services/lesson/lessons.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lesson-add',
  imports: [FormsModule],
  templateUrl: './lesson-add.component.html',
  styleUrl: './lesson-add.component.css'
})
export class LessonAddComponent {
  lesson = {
    title: '',
    content: '',
    courseId: ''
  };

  constructor(private lessonService: LessonsService, private router: Router) {}

  onSubmit() {
   
      if (this.lesson.courseId !== null) {
        this.lessonService.createLesson(this.lesson.courseId, this.lesson).subscribe(
          response => {
            console.log('Lesson created successfully:', response);
            this.router.navigate(['/courses']); // ניווט לדף השיעורים
          },
          error => {
            console.error('Error creating lesson:', error);
          }
        );
      } else {
        console.error('Course ID is null');
      }
  }
}