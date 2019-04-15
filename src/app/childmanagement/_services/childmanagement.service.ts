import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class ChildmanagementService {
    // get Api
    private API_URL = environment.API_URL;

    constructor(private http: HttpClient) {
    }

    // Register a new perosn
    public registerNewPerson(personRegistrationCommand: any): Observable<any> {
        return this.http.post(`${this.API_URL}/api/persons`, JSON.stringify(personRegistrationCommand), httpOptions).pipe(
            tap(registerNewPerson => this.log('successfully registered a person')),
            catchError(this.handleError<any[]>('registerNewPerson'))
        );
    }

    public updatePerson(personRegistrationCommand: any): Observable<any> {
        return this.http.put(`${this.API_URL}/api/persons/` + personRegistrationCommand.id,
            JSON.stringify(personRegistrationCommand), httpOptions).pipe(
                tap(updatePerson => this.log('successfully updates a person')),
                catchError(this.handleError<any[]>('updatePerson'))
            );
    }

    public getRegisteredPerson(personId: number): Observable<any> {
        return this.http.get<any>(`${this.API_URL}/api/persons/getPersonById/` + personId).pipe(
            tap(getRegisteredPerson => this.log('successfully fetched a person')),
            catchError(this.handleError<any[]>('getRegisteredPerson'))
        );
    }

    // search registered persons
    public searchPerson(searchCommand: any): Observable<any> {
        return this.http.post<any>(`${this.API_URL}/api/persons/getChildrenOrSponsors`, JSON.stringify(searchCommand), httpOptions).pipe(
            tap(searchPerson => this.log('searched a person')),
            catchError(this.handleError<any[]>('searchPerson'))
        );
    }

    public findSponsors(searchCommand: any): Observable<any> {
        return this.http.post<any>(`${this.API_URL}/api/persons/findSponsors`, JSON.stringify(searchCommand), httpOptions).pipe(
            tap(findSponsors => this.log('searched sponsors')),
            catchError(this.handleError<any[]>('findSponsors'))
        );
    }

    public assignSponsor(assignChildSponsor: any): Observable<any> {
        return this.http.post<any>(`${this.API_URL}/api/childrensponsors`, JSON.stringify(assignChildSponsor), httpOptions).pipe(
            tap(assignSponsor => this.log('assign child sponsor')),
            catchError(this.handleError<any[]>('assignSponsor'))
        );
    }

    public getChildSponsors(childId): Observable<any> {
        return this.http.get<any>(`${this.API_URL}/api/childrensponsors/getChildSponsors/` + childId).pipe(
            tap(getChildSponsors => this.log('successfully child sponsors')),
            catchError(this.handleError<any[]>('getChildSponsors'))
        );
    }

    public makeChildContribution(childContribution: any): Observable<any> {
        return this.http.post<any>(`${this.API_URL}/api/contributions`, JSON.stringify(childContribution), httpOptions).pipe(
            tap(makeChildContribution => this.log('successfully made child contribution')),
            catchError(this.handleError<any[]>('makeChildContribution'))
        );
    }

    public getContributions(childId: number): Observable<any> {
        return this.http.get<any>(`${this.API_URL}/api/contributions/` + childId).pipe(
            tap(getContributions => this.log('successfully fetched contributions')),
            catchError(this.handleError<any[]>('getContributions'))
        );
    }

    public handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error);  // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);
            let message = '';
            for (let i = 0; i < error.error.errors.length; i++) {
                message += error.error.errors[i].message;
            }
            return throwError(message);
        };
    }

    /** Log a HeroService message with the MessageService */
    public log(message: string) {
        // tslint:disable-next-line:no-console
        console.info(message);
    }
}
