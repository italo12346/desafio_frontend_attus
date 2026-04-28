import { Component } from '@angular/core';
import { UserListComponent } from './features/users/components/user-list/user-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserListComponent],
  template: '<app-user-list />',
  styles: [`
    :host { display: block; }
  `],
})
export class AppComponent {}
