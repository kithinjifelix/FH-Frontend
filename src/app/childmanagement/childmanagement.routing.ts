import { ViewPersonComponent } from './view-person/view-person.component';
import { ChildprofileComponent } from './childprofile/childprofile.component';
import { AddpersonComponent } from './addperson/addperson.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../_guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: DashboardComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'Dashboard'
                },
            },
            {
                path: 'addchild/:personType',
                component: AddpersonComponent,
                data: {
                    title: 'Add Child'
                },
            },
            {
                path: 'addsponsor/:personType',
                component: AddpersonComponent,
                data: {
                    title: 'Add Sponsor'
                },
            },
            {
                path: 'updatechild/:personType/:personId',
                component: AddpersonComponent,
                data: {
                    title: 'Edit Child'
                },
            },
            {
                path: 'updatesponsor/:personType/:personId',
                component: AddpersonComponent,
                data: {
                    title: 'Edit Sponsor'
                },
            },
            {
                path: 'view/:personType/:personId',
                component: ViewPersonComponent
            },
            {
                path: 'childprofile/:personType/:personId/:childId',
                component: ChildprofileComponent,
                data: {
                    title: 'Child Profile'
                },
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
