import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildprofileComponent } from './childprofile.component';
import { AppModule } from '../../app.module';
import {
    MatDividerModule, MatFormFieldModule,
    MatTableModule, MatCheckboxModule, MatPaginatorModule,
    MatDialogModule, MatInputModule, MatSelectModule
} from '@angular/material';
import { AssignSponsorModalComponent } from '../assign-sponsor-modal/assign-sponsor-modal.component';
import { SponsorContributionComponent } from '../sponsor-contribution/sponsor-contribution.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ChildprofileComponent', () => {
    let component: ChildprofileComponent;
    let fixture: ComponentFixture<ChildprofileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule, MatDividerModule, MatFormFieldModule,
                MatTableModule, MatCheckboxModule, MatPaginatorModule,
                MatDialogModule, MatInputModule, MatSelectModule,
            ],
            declarations: [
                ChildprofileComponent,
                AssignSponsorModalComponent,
                SponsorContributionComponent
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChildprofileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
