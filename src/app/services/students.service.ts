import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../interfaces/student';
import { environment } from '../../../enviroment';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  baseUrl = environment.apiUrl;
  
  constructor(private httpClient: HttpClient) { }

  getAllStudents(): Observable<Student[]> {
    const response = this.httpClient.get<Student[]>(`${this.baseUrl}students`)
    return response
  }

  setStudent(item: Student): Observable<Response> {
    console.log('create student');
    const response = this.httpClient.post<Response>(`${this.baseUrl}students/store`, item)
    return response
  }

  updateStudent(item: Student): Observable<Response> {
    console.log('update student');
    const response = this.httpClient.put<Response>(`${this.baseUrl}students/update`, item)
    return response
  }

  deleteStudent(id?: number | null): Observable<Response> {
    const response = this.httpClient.delete<Response>(`${this.baseUrl}students/delete?id=${id}`)
    return response
  }

  getAllCoursesStudent(id?: number | null): Observable<Student[]> {
    const response = this.httpClient.get<Student[]>(`${this.baseUrl}course_student/search?id=${id}`)
    return response
  }

  assignCourse(item: any): Observable<Response> {
    const response = this.httpClient.post<Response>(`${this.baseUrl}course_student/store`, item)
    return response
  }

  removeCourse(id?: number | null): Observable<Response> {
    const response = this.httpClient.delete<Response>(`${this.baseUrl}students/delete?id=${id}`)
    return response
  }
}
