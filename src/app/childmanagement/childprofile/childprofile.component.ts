import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { AssignSponsorModalComponent } from '../assign-sponsor-modal/assign-sponsor-modal.component';
import { ChildmanagementService } from '../_services/childmanagement.service';
import { ActivatedRoute } from '@angular/router';
import { SponsorContributionComponent } from '../sponsor-contribution/sponsor-contribution.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app-childprofile',
    templateUrl: './childprofile.component.html',
    styleUrls: ['./childprofile.component.scss']
})
export class ChildprofileComponent implements OnInit {
    personId: number;
    childId: number;
    displayedColumns = ['firstName', 'middleName', 'lastName', 'dob', 'sex', 'fullName'];
    dataSource = new MatTableDataSource();

    contributionColumns = ['amount', 'contributionDate'];
    contributiondataSource = new MatTableDataSource();

    public barChartData: any[] = [
        { data: [] }
    ];
    public barChartLabels: string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    // barChart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLegend = true;
    public barChartType = 'bar';

    form: FormGroup;

    constructor(private dialog: MatDialog,
        private childmanagementService: ChildmanagementService,
        private route: ActivatedRoute,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params) => {
                const { personId, childId } = params;
                this.personId = personId;
                this.childId = childId;
            }
        );

        this.form = this.fb.group({
            years: new FormControl('', [Validators.required]),
        });

        this.childmanagementService.getChildSponsors(this.childId).subscribe(
            (result) => {
                // console.log(result);
                const rows = [];
                result.forEach(element => rows.push({
                    'childSponsorId': element.id,
                    'sponsorId': element['sponsor']['id'],
                    'firstName': element['sponsor']['person']['firstName'],
                    'middleName': element['sponsor']['person']['middleName'],
                    'lastName': element['sponsor']['person']['lastName'],
                    'dob': element['sponsor']['person']['dob'],
                    'sex': element['sponsor']['person']['sex']
                }
                ));
                this.dataSource.data = rows;
            }
        );

        this.childmanagementService.getContributions(this.childId).subscribe(
            (result) => {
                console.log(result);
                this.contributiondataSource.data = result;
                // console.log(years);
            }
        );
    }

    newSponsor() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.height = '75%';
        dialogConfig.width = '60%';

        dialogConfig.data = {
        };

        const dialogRef = this.dialog.open(AssignSponsorModalComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(
            data => {

                if (!data) {
                    return;
                }

                const assignSponsorCommand: any = {
                    'childId': this.childId,
                    'sponsorId': data[0].id,
                    'deleteFlag': false
                };

                this.childmanagementService.assignSponsor(assignSponsorCommand).subscribe(
                    (result) => {
                        console.log(result);
                        location.reload();
                    },
                    (error) => {

                    }
                );
            }
        );
    }

    getChartByYear() {
        this.childmanagementService.getContributions(this.childId).subscribe(
            (result) => {
                const chartData = [];
                let month0 = 0;
                let month1 = 0;
                let month2 = 0;
                let month3 = 0;
                let month4 = 0;
                let month5 = 0;
                let month6 = 0;
                let month7 = 0;
                let month8 = 0;
                let month9 = 0;
                let month10 = 0;
                let month11 = 0;

                for (let index = 0; index < result.length; index++) {
                    const element = result[index];
                    const year = new Date(element.contributionDate).getFullYear();
                    console.log(year);
                    if (year == this.form.value.years) {
                        const month = new Date(element.contributionDate).getMonth();
                        console.log(month);
                        if (month == 0) {
                            month0 += element.amount;
                        } else if (month == 1) {
                            month1 += element.amount;
                        } else if (month == 2) {
                            month2 += element.amount;
                        } else if (month == 3) {
                            console.log(month3);
                            month3 += element.amount;
                            console.log(month3);
                            console.log(element.amount);
                        } else if (month == 4) {
                            month4 += element.amount;
                        } else if (month == 5) {
                            month5 += element.amount;
                        } else if (month == 6) {
                            month6 += element.amount;
                        } else if (month == 7) {
                            month7 += element.amount;
                        } else if (month == 8) {
                            month8 += element.amount;
                        } else if (month == 9) {
                            month9 += element.amount;
                        } else if (month == 10) {
                            month10 += element.amount;
                        } else if (month == 11) {
                            month11 += element.amount;
                        }
                    }
                }

                result.forEach(element => {

                });
                chartData.push({
                    data: [month0, month1, month2, month3, month4, month5, month6, month7, month8, month9, month10, month11],
                    label: this.form.value.years
                });

                console.log(chartData);

                this.barChartData = chartData;
            }
        );
    }

    getSelectedRow(row: any) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.height = '75%';
        dialogConfig.width = '60%';

        dialogConfig.data = {
        };

        const dialogRef = this.dialog.open(SponsorContributionComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(
            data => {

                if (!data) {
                    return;
                }

                const childContribution: any = {
                    'childSponsorId': row.childSponsorId,
                    'amount': data.amount,
                    'contributionDate': data.contributionDate
                };

                this.childmanagementService.makeChildContribution(childContribution).subscribe(
                    (result) => {
                        console.log(result);
                        location.reload();
                    },
                    (error) => {

                    }
                );
                console.log(data);
            }
        );
    }
}
