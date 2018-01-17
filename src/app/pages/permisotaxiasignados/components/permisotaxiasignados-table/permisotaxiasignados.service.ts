import { AuthService } from './../../../../shared/auth.service';
import { PermisotaxiasignadosResponseInterface } from './permisotaxiasignados-response.interface';
import { Observable } from 'rxjs/Observable';
import { PermisotaxiasignadosInterface } from './permisotaxiasignados.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PermisotaxiasignadosService {
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
        this.endPoint = `${this._configuration.ServerWithApiUrl}permisotaxiasignado`;
       }

       sendToRepair = ( permisotaxiasignado: PermisotaxiasignadosInterface ) : Observable<PermisotaxiasignadosResponseInterface> => {
           return this._http.post(`${this.endPoint}/send-to-repair`, permisotaxiasignado, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }


       all = () : Observable<PermisotaxiasignadosResponseInterface> => {
           return this._http.get(this.endPoint, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id ) : Observable<PermisotaxiasignadosResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( permisotaxiasignado: PermisotaxiasignadosInterface ) : Observable<PermisotaxiasignadosResponseInterface> => {
           return this._http.patch(this.endPoint, permisotaxiasignado, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<PermisotaxiasignadosResponseInterface> => {
           return this._http.delete(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<PermisotaxiasignadosResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<PermisotaxiasignadosResponseInterface> => {
           return this._http.get(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( permisotaxiasignado: PermisotaxiasignadosInterface ) : Observable<PermisotaxiasignadosResponseInterface> => {
           return this._http.post(this.endPoint, permisotaxiasignado, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
