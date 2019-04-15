import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ChildmanagementService } from '../_services/childmanagement.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
    form: FormGroup;
    afterSearch = false;
    linkText: number;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns = ['firstName', 'middleName', 'lastName', 'dob', 'sex', 'fullName', 'edit'];
    dataSource = new MatTableDataSource();
    constructor(private fb: FormBuilder,
        private childmanagementService: ChildmanagementService,
        private router: Router) { }

    ngOnInit() {
        this.dataSource.sort = this.sort;

        this.form = this.fb.group({
            firstName: new FormControl(''),
            middleName: new FormControl(''),
            lastName: new FormControl(''),
            sex: new FormControl('m'),
            persontype: new FormControl('1')
        });
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    searchPerson() {
        const { firstName, middleName, lastName, sex, persontype } = this.form.value;

        const searchCommand: any = {
            firstName, middleName, lastName, sex, persontype
        };
        this.childmanagementService.searchPerson(searchCommand).subscribe(
            (result) => {
                this.linkText = this.form.value.persontype;
                this.dataSource.data = result;
                this.afterSearch = true;
            },
            (error) => {

            }
        );
    }

    getSelectedRow(row: any) {
        if (this.linkText == 1) {
            this.router.navigate(['/dashboard/childprofile/' + this.linkText + '/' + row.personId + '/' + row.id]);
        } else {
            this.router.navigate(['/dashboard/view/' + this.linkText + '/' + row.personId]);
        }

    }

    onEdit(row: any) {
        if (this.linkText == 1) {
            this.router.navigate(['/dashboard/updatechild/' + this.linkText + '/' + row.personId]);
        } else {
            this.router.navigate(['/dashboard/updatesponsor/' + this.linkText + '/' + row.personId]);
        }

    }

    onView(row: any) {
        this.router.navigate(['/dashboard/view/' + this.linkText + '/' + row.personId]);
    }
}
