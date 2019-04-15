import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models/user';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class UserService {
    // get api
    private API_URL = environment.API_URL;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${this.API_URL}/api/users`);
    }

    registerUser(username: string, email: string, password: string) {
        const Indata = {
            'name': username,
            'email': email,
            'password': password
        };
        return this.http.post<any>(`${this.API_URL}/api/register`, JSON.stringify(Indata), httpOptions).pipe(
            tap(registerUser => this.log('successfully registered user')),
            catchError(this.handleError<any[]>('registerUser', []))
        );
    }

    public handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

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
