import { AppModule } from './../../app.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSponsorModalComponent } from './assign-sponsor-modal.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDividerModule, MatFormFieldModule, MatTableModule, MatCheckboxModule, MatPaginatorModule, MatDialogModule, MatInputModule, MatSelectModule } from '@angular/material';
import { Inject } from '@angular/core';
import { ChildmanagementService } from '../_services/childmanagement.service';

describe('AssignSponsorModalComponent', () => {
    let component: AssignSponsorModalComponent;
    let fixture: ComponentFixture<AssignSponsorModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule,
                AppModule, MatDividerModule, MatFormFieldModule,
                MatTableModule, MatCheckboxModule, MatPaginatorModule,
                MatDialogModule, MatInputModule, MatSelectModule,
            ],
            declarations: [
                AssignSponsorModalComponent
            ],
            providers: [
                FormBuilder,
                ChildmanagementService,
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: [] },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AssignSponsorModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
