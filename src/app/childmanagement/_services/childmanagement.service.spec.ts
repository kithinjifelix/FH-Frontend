import { TestBed } from '@angular/core/testing';

import { ChildmanagementService } from './childmanagement.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppModule } from '../../app.module';

describe('ChildmanagementService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, AppModule],
    }));

    it('should be created', () => {
        const service: ChildmanagementService = TestBed.get(ChildmanagementService);
        expect(service).toBeTruthy();
    });
});
