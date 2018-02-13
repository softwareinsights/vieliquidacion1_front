import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {

  Server: string = 'http://localhost:3000/';
  ApiUrl: string = '';
  imageServerWithApiUrl: string = 'http://aidihosting.com/proyectos/proyectura_api/v1/';
  ServerWithApiUrl = this.Server + this.ApiUrl;
}
