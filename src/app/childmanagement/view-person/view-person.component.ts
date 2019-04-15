import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChildmanagementService } from '../_services/childmanagement.service';

@Component({
    selector: 'app-view-person',
    templateUrl: './view-person.component.html',
    styleUrls: ['./view-person.component.scss']
})
export class ViewPersonComponent implements OnInit {
    personType: number;
    personId: number;
    title: string;

    firstName: string;
    middleName: string;
    lastName: string;
    sex: string;
    registrationDate: Date;
    dob: Date;

    constructor(private route: ActivatedRoute,
        private childmanagementService: ChildmanagementService) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params) => {
                const { personType, personId } = params;
                this.personType = personType;
                this.personId = personId;
            }
        );

        if (this.personType == 1) {
            this.title = 'View Child Registration';
        } else {
            this.title = 'View Sponsor Registration';
        }

        this.childmanagementService.getRegisteredPerson(this.personId).subscribe(
            (result) => {
                // console.log(result);
                const { firstName, middleName, lastName, sex, registrationDate, dob } = result;
                this.firstName = firstName;
                this.middleName = middleName;
                this.lastName = lastName;
                this.sex = sex === 'm' ? 'Male' : 'Female';
                this.registrationDate = registrationDate;
                this.dob = dob;
            },
            (error) => {

            }
        );
    }
}
