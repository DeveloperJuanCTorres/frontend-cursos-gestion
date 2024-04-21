import { Component } from '@angular/core';
import { Student } from '../../interfaces/student';
import { Courses } from '../../interfaces/courses';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  topStudents: any[] = [
    // { id: 1, name: 'Juan', last_name: 'Pérez', courses_count: 12 },
    // { id: 2, name: 'María', last_name: 'González', courses_count: 11 },
    // { id: 3, name: 'Juan', last_name: 'López', courses_count: 10 }
  ];
  topCourses: any[] = [
    // { id: 1, name: 'curso 3', students_count: 20 },
    // { id: 2, name: 'curso 2', students_count: 18 },
    // { id: 3, name: 'curso 1', students_count: 15 },
  ];
  totalCourses: number = 0;
  totalStudents: number = 0;

  constructor(private apiService: DashboardService) { }

  getDashboard() {
    this.apiService.getDashboard().subscribe((data: any) => {
      this.topStudents = data.topStudents;
      this.topCourses = data.topCourses;
      this.totalCourses = data.totalCourses;
      this.totalStudents = data.totalStudents;
    })
  }

  ngOnInit() {
    this.getDashboard();
  }
}
