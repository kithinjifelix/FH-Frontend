import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ChildmanagementService } from '../_services/childmanagement.service';
import { NotificationService } from '../../_services/notification-service.service';
import { SnotifyService } from 'ng-snotify';

@Component({
    selector: 'app-addperson',
    templateUrl: './addperson.component.html',
    styleUrls: ['./addperson.component.scss']
})
export class AddpersonComponent implements OnInit {
    form: FormGroup;
    personType: number;
    personId: number;
    genderList = GenderList;
    maxDate: Date;
    isEdit = false;
    title: string;

    constructor(private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private childmanagementService: ChildmanagementService,
        private snotifyService: SnotifyService,
        private notificationService: NotificationService) {
        this.maxDate = new Date();
    }

    ngOnInit() {
        this.route.params.subscribe(
            (params) => {
                const { personType, personId } = params;
                this.personType = personType;
                this.personId = personId;
            }
        );

        this.form = this.fb.group({
            firstName: new FormControl('', [Validators.required]),
            middleName: new FormControl(''),
            lastName: new FormControl('', [Validators.required]),
            dob: new FormControl('', [Validators.required]),
            sex: new FormControl('', [Validators.required]),
            registrationDate: new FormControl('', [Validators.required])
        });

        if (this.personId) {
            this.loadPerson();
            this.isEdit = true;
            if (this.personType == 1) {
                this.title = 'Update Child Registration';
            } else {
                this.title = 'Update Sponsor Registration';
            }
        } else {
            if (this.personType == 1) {
                this.title = 'New Child Registration';
            } else {
                this.title = 'New Sponsor Registration';
            }
        }
    }

    loadPerson() {
        this.childmanagementService.getRegisteredPerson(this.personId).subscribe(
            (result) => {
                console.log(result);
                this.form.get('firstName').setValue(result.firstName);
                this.form.get('middleName').setValue(result.middleName);
                this.form.get('lastName').setValue(result.lastName);
                this.form.get('dob').setValue(result.dob);
                this.form.get('sex').setValue(result.sex);
                this.form.get('registrationDate').setValue(result.registrationDate);
            }
        );
    }

    savePerson() {
        if (this.form.valid) {
            const { firstName, middleName, lastName, dob, sex, registrationDate } = this.form.value;
            const personRegistrationCommand: Person = {
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                dob: dob,
                sex: sex,
                registrationDate: registrationDate,
                user_id: 11,
                persontype: this.personType
            };

            if (this.isEdit) {
                personRegistrationCommand.id = this.personId;

                this.updatePerson(personRegistrationCommand);
            } else {
                this.saveNewPerson(personRegistrationCommand);
            }
        } else {
            return false;
        }
    }

    updatePerson(personRegistrationCommand: Person) {
        this.childmanagementService.updatePerson(personRegistrationCommand).subscribe(
            (res) => {
                this.snotifyService.success('Successfully updated person', 'Person', this.notificationService.getConfig());
                this.router.navigate(['/dashboard']);
            },
            (error) => {
                this.snotifyService.error('Error updating a person', 'Person', this.notificationService.getConfig());
                console.log(error);
            }
        );
    }

    saveNewPerson(personRegistrationCommand: Person) {
        this.childmanagementService.registerNewPerson(personRegistrationCommand).subscribe(
            (res) => {
                this.snotifyService.success('Successfully added a new person', 'Person', this.notificationService.getConfig());
                this.router.navigate(['/dashboard']);
            },
            (error) => {
                this.snotifyService.error('Error adding a person', 'Person', this.notificationService.getConfig());
                console.log(error);
            }
        );
    }
}

export interface Person {
    firstName: string;
    middleName: string;
    lastName: string;
    dob: Date;
    sex: string;
    registrationDate: Date;
    user_id: number;
    persontype: number;
    id?: number;
}

export const GenderList: any[] = [
    { id: 'm', name: 'Male' },
    { id: 'f', name: 'Female' }
];
