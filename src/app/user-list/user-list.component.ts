import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  loading: boolean = false;
  pageSize: number = 6;
  totalUsers: number = 0;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers(1);
  }

  getUsers(page: number): void {
    this.loading = true;
    this.userService.getUsers(page)
      .subscribe(data => {
        this.users = data.data;
        this.totalUsers = data.total;
        this.loading = false;
      });
  }

  onPageChange(event: any): void {
    this.getUsers(event.pageIndex + 1);
  }

  searchUserById(userId: string): void {
    if (userId.trim() === '') {
      this.getUsers(1);
      return;
    }
    const id = parseInt(userId, 10);
    this.userService.getUserById(id)
      .subscribe(data => {
        this.users = data.data ? [data.data] : [];
        this.totalUsers = this.users.length;
      });
  }



  viewUserDetails(userId: number): void {
    this.router.navigate(['/users', userId]);
  }
}
