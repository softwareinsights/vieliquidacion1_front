import { AuthService } from './../../../../shared/auth.service';
import { CorralonsResponseInterface } from './corralons-response.interface';
import { Observable } from 'rxjs/Observable';
import { CorralonsInterface } from './corralons.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CorralonsService {
    private actionUrl: string;
    private headers: Headers;
    private options: RequestOptions;
    private endPoint: string;
    constructor(
        private _http: Http,
        private _configuration: Configuration,
        private authService: AuthService) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
        this.headers.append('Authorization', 'JWT ' + this.authService.token);
        this.options = new RequestOptions({ headers: this.headers });
        this.endPoint = `${this._configuration.ServerWithApiUrl}corralon`;
       }

       goOutCorralon = ( corralon: CorralonsInterface ) : Observable<CorralonsResponseInterface> => {
           console.log('service corralon', corralon);
           return this._http.post(`${this.endPoint}/go-out-corralon`, corralon, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }

       all = () : Observable<CorralonsResponseInterface> => {
           return this._http.get(this.endPoint, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id ) : Observable<CorralonsResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( corralon: CorralonsInterface ) : Observable<CorralonsResponseInterface> => {
           return this._http.patch(this.endPoint, corralon, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<CorralonsResponseInterface> => {
           return this._http.delete(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<CorralonsResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<CorralonsResponseInterface> => {
           return this._http.get(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( corralon: CorralonsInterface ) : Observable<CorralonsResponseInterface> => {
           return this._http.post(this.endPoint, corralon, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
