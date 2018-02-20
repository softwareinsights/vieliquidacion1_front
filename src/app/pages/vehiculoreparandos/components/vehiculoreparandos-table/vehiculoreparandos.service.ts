import { AuthService } from './../../../../shared/auth.service';
import { VehiculoreparandosResponseInterface } from './vehiculoreparandos-response.interface';
import { Observable } from 'rxjs/Observable';
import { VehiculoreparandosInterface } from './vehiculoreparandos.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class VehiculoreparandosService {
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
        this.endPoint = `${this._configuration.ServerWithApiUrl}vehiculoreparando`;
       }

       goOutVehicle = ( vehiculoreparando: VehiculoreparandosInterface ) : Observable<VehiculoreparandosResponseInterface> => {
           return this._http.post(`${this.endPoint}/go-out-vehicle`, vehiculoreparando, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }

       findByIdEnviotaller = ( id ) : Observable<VehiculoreparandosResponseInterface> => {
           return this._http.get(`${this.endPoint}/enviotaller/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findByIdEstado = ( id ) : Observable<VehiculoreparandosResponseInterface> => {
           return this._http.get(`${this.endPoint}/estado/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findByIdMecanico = ( id ) : Observable<VehiculoreparandosResponseInterface> => {
           return this._http.get(`${this.endPoint}/mecanico/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findByIdVehiculo = ( id ) : Observable<VehiculoreparandosResponseInterface> => {
           return this._http.get(`${this.endPoint}/vehiculo/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findByIdTaller = ( id ) : Observable<VehiculoreparandosResponseInterface> => {
           return this._http.get(`${this.endPoint}/taller/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       all = () : Observable<VehiculoreparandosResponseInterface> => {
           return this._http.get(this.endPoint, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id ) : Observable<VehiculoreparandosResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( vehiculoreparando: VehiculoreparandosInterface ) : Observable<VehiculoreparandosResponseInterface> => {
           return this._http.patch(this.endPoint, vehiculoreparando, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<VehiculoreparandosResponseInterface> => {
           return this._http.delete(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<VehiculoreparandosResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<VehiculoreparandosResponseInterface> => {
           return this._http.get(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( vehiculoreparando: VehiculoreparandosInterface ) : Observable<VehiculoreparandosResponseInterface> => {
           return this._http.post(this.endPoint, vehiculoreparando, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
