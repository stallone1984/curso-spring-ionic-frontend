import { StorageService } from './storage.service';
import { LocalUser } from './../models/local_user';
import { API_CONFIG } from './../config/api.config';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

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

  successfulLogin(authorizationValue: string) {
    let token = authorizationValue.substring(7);
    let user : LocalUser = {
      token: token
    }

    this.storageService.setLocalUser(user);
  }

  logout() {
    this.storageService.setLocalUser(null);
  }
}
