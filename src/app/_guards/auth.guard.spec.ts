import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AppModule, RouterTestingModule],
            providers: [
                AuthGuard,
                AuthenticationService,
                Router,
                {
                    useClass: class { navigate = jasmine.createSpy('navigate'); }
                }
            ]
        });
    });

    it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
        expect(guard).toBeTruthy();
    }));
});
