import { Configuration } from './../../app.constants';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ChangePasswordService {

    private headers: Headers;

    constructor(private http: Http, private configuration: Configuration) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
    }

    ChangePassword(values: Object): Observable<any> {

        const toAdd = JSON.stringify(values);
        return this.http.post(`${this.configuration.ServerWithApiUrl}CambiarContrasena`,
            toAdd,
            { headers: this.headers })
            .map((data) => data.json())
            .catch((error: Response) => this.handleError(error));
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}