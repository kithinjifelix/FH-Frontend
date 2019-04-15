import { AppModule } from './../app.module';
import { TestBed, inject } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';

describe('AuthenticationService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, AppModule],
        providers: [AuthenticationService]
    }));

    it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
        expect(service).toBeTruthy();
    }));
});
