import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { NotificationService } from '../../_services/notification-service.service';
import { SnotifyService } from 'ng-snotify';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    returnUrl: string;
    /**
     * constructor
     */
    constructor(private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private snotifyService: SnotifyService,
        private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        if (this.form.valid) {
            // user provided all the fields
            const { username, password } = this.form.value;
            this.authenticationService.login(username, password).subscribe(
                (res) => {
                    this.snotifyService.success('Login successful', 'Login', this.notificationService.getConfig());
                    this.router.navigate([this.returnUrl]);
                },
                (error) => {
                    this.snotifyService.error('Wrong email or password', 'Login', this.notificationService.getConfig());
                }
            );
        } else {
            // user did not provide all the fields
            this.snotifyService.error('Provide all the fields before login', 'Login', this.notificationService.getConfig());
            return false;
        }
    }

    register() {
        this.router.navigate(['/register']);
    }
}
