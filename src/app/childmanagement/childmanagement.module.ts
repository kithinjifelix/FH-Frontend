import { ChildmanagementService } from './_services/childmanagement.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './childmanagement.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddpersonComponent } from './addperson/addperson.component';

import {
    MatFormFieldModule, MatDatepickerModule,
    MatNativeDateModule, MatInputModule, MatSelectModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatDividerModule, MatCheckboxModule, MatDialogModule
} from '@angular/material';
import { ChildprofileComponent } from './childprofile/childprofile.component';
import { ViewPersonComponent } from './view-person/view-person.component';
import { AssignSponsorModalComponent } from './assign-sponsor-modal/assign-sponsor-modal.component';
import { SponsorContributionComponent } from './sponsor-contribution/sponsor-contribution.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [
        DashboardComponent,
        AddpersonComponent,
        ChildprofileComponent,
        ViewPersonComponent,
        AssignSponsorModalComponent,
        SponsorContributionComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule, MatDialogModule,
        MatFormFieldModule, MatSelectModule,
        MatDatepickerModule, MatTableModule,
        MatNativeDateModule, MatPaginatorModule,
        MatSortModule, MatIconModule, MatCheckboxModule,
        ReactiveFormsModule, MatDividerModule,
        MatInputModule, ChartsModule
    ],
    providers: [
        ChildmanagementService
    ],
    entryComponents: [
        AssignSponsorModalComponent,
        SponsorContributionComponent
    ]
})
export class ChildmanagementModule { }
