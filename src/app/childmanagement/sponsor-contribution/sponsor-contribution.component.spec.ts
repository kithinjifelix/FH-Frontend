import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorContributionComponent } from './sponsor-contribution.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AppModule } from '../../app.module';
import {
    MatDividerModule, MatFormFieldModule, MatTableModule,
    MatCheckboxModule, MatPaginatorModule,
    MatDialogModule, MatInputModule, MatSelectModule, MatDialogRef, MAT_DIALOG_DATA, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import { ChildmanagementService } from '../_services/childmanagement.service';

describe('SponsorContributionComponent', () => {
    let component: SponsorContributionComponent;
    let fixture: ComponentFixture<SponsorContributionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule,
                AppModule, MatDividerModule, MatFormFieldModule,
                MatTableModule, MatCheckboxModule, MatPaginatorModule,
                MatDialogModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule
            ],
            declarations: [SponsorContributionComponent],
            providers: [
                FormBuilder,
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: [] },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SponsorContributionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
