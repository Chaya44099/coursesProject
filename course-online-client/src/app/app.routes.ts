import { Routes } from '@angular/router';
import { LoginButtonsComponent } from './components/authentication/login-buttons/login-buttons.component';
import { LoginFormComponent } from './components/authentication/login-form/login-form.component';
import { LogupFormComponent } from './components/authentication/logup-form/logup-form.component';
import { CoursesListComponent } from './components/courses/courses-list/courses-list.component';
import { authGuard } from './guards/auth.guard';
import { CourseDetailsComponent } from './components/courses/course-details/course-details.component';
import { CourseEditComponent } from './components/courses/course-edit/course-edit.component';
import { CourseAddComponent } from './components/courses/course-add/course-add.component';
import { LessonAddComponent } from './components/courses/lessons/lesson-add/lesson-add.component';
import { teacherGuard } from './guards/teacher.guard';
import { LessonEditComponent } from './components/courses/lessons/lesson-edit/lesson-edit.component';


export const routes: Routes = [
    { path: '', component: LoginButtonsComponent, pathMatch: 'full' },
    { path: 'login', component: LoginFormComponent },
    { path: 'logup', component: LogupFormComponent },
    { path: 'courseslist', component: CoursesListComponent, canActivate: [authGuard] },
    { path: 'courses', component: CoursesListComponent, canActivate: [authGuard] },
    { path: 'courses/details/:id', component: CourseDetailsComponent, canActivate: [authGuard] },
    { path: 'courses/edit/:courseId', component: CourseEditComponent, canActivate: [teacherGuard] },
    { path: 'courses/add', component: CourseAddComponent, canActivate: [teacherGuard] },
    { path: 'lessons/add', component: LessonAddComponent, canActivate: [teacherGuard] },
    { path: 'courses/lessons/edit/:courseId/:id', component: LessonEditComponent, canActivate: [teacherGuard] }


 ];
