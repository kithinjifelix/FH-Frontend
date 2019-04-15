import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-sponsor-contribution',
    templateUrl: './sponsor-contribution.component.html',
    styleUrls: ['./sponsor-contribution.component.scss']
})
export class SponsorContributionComponent implements OnInit {
    form: FormGroup;
    maxDate: Date;

    constructor(private fb: FormBuilder,
        private dialogRef: MatDialogRef<SponsorContributionComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
        this.maxDate = new Date();
    }

    ngOnInit() {
        this.form = this.fb.group({
            amount: new FormControl('', [Validators.required]),
            contributionDate: new FormControl('', [Validators.required])
        });
    }

    saveContribution() {
        if (this.form.valid) {
            this.dialogRef.close(this.form.value);
        } else {
            return;
        }
    }

    close() {
        this.dialogRef.close();
    }
}
