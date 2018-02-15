import { AuthService } from './../../../../shared/auth.service';
import { LiquidacionsResponseInterface } from './liquidacions-response.interface';
import { Observable } from 'rxjs/Observable';
import { LiquidacionsInterface } from './liquidacions.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LiquidacionsService {
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
        this.endPoint = `${this._configuration.ServerWithApiUrl}liquidacion`;
       }
       

        liquidacionFromIdchoferFecha = ( data ) : Observable<LiquidacionsResponseInterface> => {

            // MODIFICO LA FECHA PARA REEMPLAZAR - POR _ Y NO FALLE AL LLAMAR ENDPOINT, EN ENDPOINT VUELVO A ARMAR CON -

            const newFecha = data.fecha.split('-');
            const fecha = newFecha[0] + "_" + newFecha[1] + "_" + newFecha[2];
            
           return this._http.get(`${this.endPoint}/liquidacion-from-idchofer/${data.chofer_idchofer}/fecha/${fecha}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }

       allAdeudandoFromIdChofer = ( id ) : Observable<LiquidacionsResponseInterface> => {
           return this._http.get(`${this.endPoint}/adeudando-from-idchofer/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }

       findByIdChofer = ( id ) : Observable<LiquidacionsResponseInterface> => {
           return this._http.get(`${this.endPoint}/chofer/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findByIdEstado = ( id ) : Observable<LiquidacionsResponseInterface> => {
           return this._http.get(`${this.endPoint}/estado/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findByIdPermisotaxiasignado = ( id ) : Observable<LiquidacionsResponseInterface> => {
           return this._http.get(`${this.endPoint}/permisotaxiasignado/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       all = () : Observable<LiquidacionsResponseInterface> => {
           return this._http.get(this.endPoint, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id ) : Observable<LiquidacionsResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( liquidacion: LiquidacionsInterface ) : Observable<LiquidacionsResponseInterface> => {
           return this._http.patch(this.endPoint, liquidacion, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<LiquidacionsResponseInterface> => {
           return this._http.delete(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<LiquidacionsResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<LiquidacionsResponseInterface> => {
           return this._http.get(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( liquidacion: LiquidacionsInterface ) : Observable<LiquidacionsResponseInterface> => {
           return this._http.post(this.endPoint, liquidacion, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
