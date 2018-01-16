import { ChangePasswordResponseInterface } from './change-password-response.interface';
import { LoginResponseInterface } from './../login/login-response.interface';
import { LoginInterface } from './../login/login.interface';
import { AuthService } from './../../shared/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordService } from './change-password.service';
import { Http } from '@angular/http';
import { Configuration } from './../../app.constants';
import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EqualPasswordsValidator } from '../../theme/validators';
import { ChangePasswordInterface } from './change-password.interface';


@Component({
  selector: 'change-password',
  templateUrl: './change-password.html',
  styleUrls: ['./change-password.scss']
})
export class ChangePasswordComponent {

  form: FormGroup;
  idusuario: AbstractControl;
  nuevacontrasena: AbstractControl;
  anteriorcontrasena: AbstractControl;
  password: AbstractControl;
  repetircontrasena: AbstractControl;
  submitted: boolean = false;
  contrasena: AbstractControl;
  contrasenas: FormGroup;

  private _idusuario: string;
  

  constructor(fb: FormBuilder,
    private http: Http, 
    private configuration: Configuration, 
    private authService: AuthService,
    private service: ChangePasswordService,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService,
    ) {

    this._idusuario = this.localStorageService.get('idusuario').toString();

    this.form = fb.group({
      'idusuario': this._idusuario,
      'contrasena': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'contrasenas': fb.group({
        'nuevacontrasena': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repetircontrasena': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, { validator: EqualPasswordsValidator.validate('nuevacontrasena', 'repetircontrasena') })
    });

    this.contrasena = this.form.controls['contrasena'];
    this.contrasenas = <FormGroup> this.form.controls['contrasenas'];
    this.nuevacontrasena = this.contrasenas.controls['nuevacontrasena'];
    this.repetircontrasena = this.contrasenas.controls['repetircontrasena'];

  }

  onSubmit(values: LoginInterface): void {
    this.submitted = true;
    if (this.form.valid) {

      // Valida usuario contra contraseña anterior del usuario
      const credentials: LoginInterface = {
        email: values.email,
        password: values.password,
        recordarSesion: false
      };

      this.authService
        .login(credentials)
        .subscribe(
            (response: LoginResponseInterface) => this.changePassword(response, values));
    }
  }

  private changePassword(response: LoginResponseInterface, valuesChangePasswordForm: any) {
    if (response.success) {
      // Si fue validado el usuario con la contraseña anterior procede con el cambio de contrasena
      const newPassword = {
        idusuario: valuesChangePasswordForm.idusuario,
        contrasena: valuesChangePasswordForm.contrasenas.nuevacontrasena,
      };

      this.service
        .ChangePassword(newPassword)
        .subscribe(
            (data: ChangePasswordResponseInterface) => this.showToast(data));

    } else {
      // this.toastrService.error(response.result);
    }
  }

  private showToast(data: ChangePasswordResponseInterface) {
    if (data.success) {
      // this.toastrService.success(data.result);
      this.router.navigate(['login']);
    } else {
      // this.toastrService.error(data.result);
    }
  }

}
