import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Courses } from '../interfaces/courses';
import { environment } from '../../../enviroment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllCourses(): Observable<Courses[]> {
    const response = this.httpClient.get<Courses[]>(`${this.baseUrl}courses`)
    return response
  }

  setCourses(item: Courses): Observable<Response> {
    const response = this.httpClient.post<Response>(`${this.baseUrl}courses/store`, item)
    return response
  }

  updateCourses(item: Courses): Observable<Response> {
    const response = this.httpClient.put<Response>(`${this.baseUrl}courses/update`, item)
    return response
  }

  deleteCourses(id?: number | null): Observable<Response> {
    const response = this.httpClient.delete<Response>(`${this.baseUrl}courses/delete?id=${id}`)
    return response
  }

  getReportCourses(id?: number | null): Observable<Courses[]> {
    const response = this.httpClient.get<Courses[]>(`${this.baseUrl}report?id=${id}`)
    return response
  }

}
