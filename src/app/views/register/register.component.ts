import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';

import { NotificationService } from '../../_services/notification-service.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder,
        private userService: UserService,
        private router: Router,
        private snotifyService: SnotifyService,
        private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            username: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });
    }

    registerUser() {
        if (this.form.valid) {
            const { username, email, password } = this.form.value;
            this.userService.registerUser(username, email, password).subscribe(
                (res) => {
                    this.snotifyService.success('Successfully Registered a user', 'Register', this.notificationService.getConfig());
                    this.router.navigate(['/login']);
                },
                (error) => {
                    this.snotifyService.error('Error registering user ' + error, 'Register', this.notificationService.getConfig());
                    // console.log(error);
                }
            );
        } else {
            console.log('here');
            this.snotifyService.error('Error registering user', 'Register', this.notificationService.getConfig());
            // user did not complete all the fields
            return false;
        }
    }
}
