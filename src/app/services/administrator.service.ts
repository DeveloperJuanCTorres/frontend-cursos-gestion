import { Injectable } from '@angular/core';
import { Administrator } from '../interfaces/administrator';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroment';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllAdministrators(): Observable<Administrator[]> {
    const response = this.httpClient.get<Administrator[]>(`${this.baseUrl}admins`)
    return response
  }
}
