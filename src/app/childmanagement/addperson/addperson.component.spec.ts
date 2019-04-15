import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpersonComponent } from './addperson.component';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from '../childmanagement.routing';
import {
    MatDialogModule, MatFormFieldModule,
    MatSelectModule, MatDatepickerModule,
    MatTableModule, MatNativeDateModule,
    MatPaginatorModule, MatSortModule,
    MatIconModule, MatCheckboxModule,
    MatDividerModule, MatInputModule
} from '@angular/material';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { Router, ActivatedRoute } from '@angular/router';
import { ChildmanagementService } from '../_services/childmanagement.service';
import { SnotifyService } from 'ng-snotify';
import { NotificationService } from '../../_services/notification-service.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddpersonComponent', () => {
    let component: AddpersonComponent;
    let fixture: ComponentFixture<AddpersonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, DashboardRoutingModule, MatDialogModule,
                MatFormFieldModule, MatSelectModule,
                MatDatepickerModule, MatTableModule,
                MatNativeDateModule, MatPaginatorModule,
                MatSortModule, MatIconModule, MatCheckboxModule,
                ReactiveFormsModule, MatDividerModule, RouterTestingModule,
                MatInputModule, ChartsModule],
            declarations: [AddpersonComponent],
            providers: [
                FormBuilder, NotificationService,
                Router, ChildmanagementService,
                ActivatedRoute, SnotifyService,
                { provide: Router, useClass: MockRouter }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddpersonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

class MockRouter {
    navigate = jasmine.createSpy('navigate');
}
