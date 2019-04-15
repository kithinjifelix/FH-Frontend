import { TestBed, inject } from '@angular/core/testing';

import { NotificationService } from './notification-service.service';
import { SnotifyService, SnotifyModule, ToastDefaults } from 'ng-snotify';

describe('NotificationServiceService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [SnotifyModule],
        providers: [NotificationService, SnotifyService,
            {
                provide: 'SnotifyToastConfig',
                useValue: ToastDefaults
            },
        ],
    }));

    it('should be created', inject([NotificationService], (service: NotificationService) => {
        expect(service).toBeTruthy();
    }));
});
