import { StorageService } from './storage.service';
import { LocalUser } from './../models/local_user';
import { API_CONFIG } from './../config/api.config';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    public http: HttpClient,
    public storageService: StorageService
  ) {

  }

  authenticate(creds: CredenciaisDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/login`,
      creds,
      {
        observe: 'response',
        responseType: 'text'
      }
    )
  }

  refreshToken() {
    return this.http.post(
      `${API_CONFIG.baseUrl}/auth/refres_token`,
      {},
      {
        observe: 'response',
        responseType: 'text'
      }
    )
  }

  successfulLogin(authorizationValue: string) {
    let tok = authorizationValue.substring(7);
    let user : LocalUser = {
      token: tok,
      email: this.jwtHelper.decodeToken(tok).sub
    }

    this.storageService.setLocalUser(user);
  }

  logout() {
    this.storageService.setLocalUser(null);
  }
}
