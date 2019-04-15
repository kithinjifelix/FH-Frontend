import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPersonComponent } from './view-person.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ViewPersonComponent', () => {
    let component: ViewPersonComponent;
    let fixture: ComponentFixture<ViewPersonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [ViewPersonComponent],
            providers: [
                ActivatedRoute
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewPersonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
