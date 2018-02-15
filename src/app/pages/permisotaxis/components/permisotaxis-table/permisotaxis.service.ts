import { AuthService } from './../../../../shared/auth.service';
import { PermisotaxisResponseInterface } from './permisotaxis-response.interface';
import { Observable } from 'rxjs/Observable';
import { PermisotaxisInterface } from './permisotaxis.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PermisotaxisService {
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
       findLiquidacionByIdInThisDayAtThisHour = ( id ) : Observable<PermisotaxisResponseInterface> => {
           return this._http.get(`${this.endPoint}/this-day/${id}/this-hour`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       
       findLiquidacionByIdInThisDay = ( id ) : Observable<PermisotaxisResponseInterface> => {
           return this._http.get(`${this.endPoint}/this-day/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       
       findByIdEstado = ( id ) : Observable<PermisotaxisResponseInterface> => {
           return this._http.get(`${this.endPoint}/estado/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findByIdPersona = ( id ) : Observable<PermisotaxisResponseInterface> => {
           return this._http.get(`${this.endPoint}/persona/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findByIdVehiculo = ( id ) : Observable<PermisotaxisResponseInterface> => {
           return this._http.get(`${this.endPoint}/vehiculo/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       all = () : Observable<PermisotaxisResponseInterface> => {
           return this._http.get(this.endPoint, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       allDisponibles = () : Observable<PermisotaxisResponseInterface> => {
        return this._http.get(`${this.endPoint}/disponibles`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
       findById = ( id ) : Observable<PermisotaxisResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( permisotaxi: PermisotaxisInterface ) : Observable<PermisotaxisResponseInterface> => {
           return this._http.patch(this.endPoint, permisotaxi, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<PermisotaxisResponseInterface> => {
           return this._http.delete(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<PermisotaxisResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<PermisotaxisResponseInterface> => {
           return this._http.get(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( permisotaxi: PermisotaxisInterface ) : Observable<PermisotaxisResponseInterface> => {
           return this._http.post(this.endPoint, permisotaxi, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
