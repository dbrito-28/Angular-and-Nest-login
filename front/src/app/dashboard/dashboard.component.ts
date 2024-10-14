import { Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DashboardService } from './data-access/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export default class DashboardComponent {

  users: any
  constructor(private readonly _userService: DashboardService) {
    this.users = toSignal(this._userService.getUsers())

  }

}
