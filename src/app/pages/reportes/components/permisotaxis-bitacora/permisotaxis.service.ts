import { AuthService } from './../../../../shared/auth.service';
import { PermisotaxisBitacoraResponseInterface } from './permisotaxis-response.interface';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PermisotaxisBitacoraService {
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
        this.endPoint = `${this._configuration.ServerWithApiUrl}permisotaxi`;
       }

       
       findByIdPermisoTaxi = ( id ) : Observable<PermisotaxisBitacoraResponseInterface> => {
           return this._http.get(`${this.endPoint}/bitacora-pagos/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
     
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
