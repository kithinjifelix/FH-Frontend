import { Component, OnInit, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ChildmanagementService } from '../_services/childmanagement.service';

@Component({
    selector: 'app-assign-sponsor-modal',
    templateUrl: './assign-sponsor-modal.component.html',
    styleUrls: ['./assign-sponsor-modal.component.scss']
})
export class AssignSponsorModalComponent implements OnInit, AfterViewInit {
    form: FormGroup;
    displayedColumns: string[] = ['select', 'firstName', 'middleName', 'lastName', 'dob', 'sex'];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    selection: SelectionModel<any>;

    constructor(private fb: FormBuilder,
        private dialogRef: MatDialogRef<AssignSponsorModalComponent>,
        @Inject(MAT_DIALOG_DATA) data,
        private childmanagementService: ChildmanagementService) {
        const initialSelection = [];
        const allowMultiSelect = false;
        this.selection = new SelectionModel<any>(allowMultiSelect, initialSelection);
    }

    ngOnInit() {
        this.form = this.fb.group({
            firstName: new FormControl(''),
            middleName: new FormControl(''),
            lastName: new FormControl(''),
        });
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected == numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    findPerson() {
        const { firstName, middleName, lastName } = this.form.value;
        const searchCommand: any = {
            firstName, middleName, lastName
        };
        this.childmanagementService.findSponsors(searchCommand).subscribe(
            (result) => {
                // console.log(result);
                this.dataSource.data = result;
            }
        );
    }

    getSelectedPerson() {
        if (this.selection.selected.length == 0) {
            alert('not selected');
            // this.snotifyService.info('You have not selected any person', 'SEARCH', this.notificationService.getConfig());
            return;
        } else {
            this.dialogRef.close(this.selection.selected);
        }
    }

    close() {
        this.dialogRef.close();
    }
}
