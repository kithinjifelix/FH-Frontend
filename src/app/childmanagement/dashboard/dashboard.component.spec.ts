import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from '../childmanagement.routing';
import {
    MatDialogModule, MatFormFieldModule, MatSelectModule,
    MatDatepickerModule, MatTableModule, MatNativeDateModule,
    MatPaginatorModule, MatSortModule, MatIconModule,
    MatCheckboxModule, MatDividerModule, MatInputModule
} from '@angular/material';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { Router } from '@angular/router';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, DashboardRoutingModule, MatDialogModule,
                MatFormFieldModule, MatSelectModule,
                MatDatepickerModule, MatTableModule,
                MatNativeDateModule, MatPaginatorModule,
                MatSortModule, MatIconModule, MatCheckboxModule,
                ReactiveFormsModule, MatDividerModule,
                MatInputModule, ChartsModule],
            declarations: [DashboardComponent],
            providers: [
                FormBuilder,
                Router
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
