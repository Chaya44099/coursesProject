import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginButtonsComponent } from './components/authentication/login-buttons/login-buttons.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'course-online-client';
}
