import { Component } from '@angular/core';
import { LessonsService } from '../../../../services/lesson/lessons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lesson-edit',
  imports: [FormsModule],
  templateUrl: './lesson-edit.component.html',
  styleUrl: './lesson-edit.component.css'
})
export class LessonEditComponent {
  id: string = '';
  lessonId: string = '';
  lesson = {
    title: '',
    content: '',
    courseId: ''
  };

  constructor(
    private lessonService: LessonsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      const lessonId = params.get('id');
      const courseId = params.get('courseId');

      if (lessonId && courseId) {
        this.lessonId = lessonId;
        this.id = courseId;
        this.loadLesson(courseId, lessonId);
      }
    });
  }

  loadLesson(courseId: string, lessonId: string): void {
    this.lessonService.getLessonById(courseId, lessonId).subscribe(lesson => {
      this.lesson.title = lesson.title;
      this.lesson.content = lesson.content;
      this.lesson.courseId = lesson.courseId; 
    });
  }

  onSubmit() {
    this.lessonService.updateLesson(this.id, this.lessonId, this.lesson).subscribe(
      response => {
        console.log('Lesson updated successfully:', response);
        this.router.navigate(['/courses']); // חזרה לדף הקורס
      },
      error => {
        console.error('Error updating lesson:', error);
      }
    );
  }
}
