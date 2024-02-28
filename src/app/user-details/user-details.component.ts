import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId !== null) {
      const parsedUserId = parseInt(userId, 10);
      if (!isNaN(parsedUserId)) {
        this.userService.getUserById(parsedUserId)
          .subscribe(data => {
            this.user = data.data;
          });
      } else {
        console.error('Invalid user ID');
      }
    } else {
      console.error('User ID is null');
    }
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
