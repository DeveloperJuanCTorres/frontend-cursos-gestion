import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment';
import { Observable } from 'rxjs';
import { Dashboard } from '../interfaces/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = environment.apiUrl;
  
  constructor(private httpClient: HttpClient) { }

  getDashboard(): Observable<Dashboard[]> {
    const response = this.httpClient.get<Dashboard[]>(`${this.baseUrl}dashboard`)
    return response
  }
}
