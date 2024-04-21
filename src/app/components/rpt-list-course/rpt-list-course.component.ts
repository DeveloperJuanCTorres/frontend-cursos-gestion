import { Component , ElementRef, ViewChild } from '@angular/core';
import { Courses } from '../../interfaces/courses';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, ReactiveFormsModule,} from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import Swal from 'sweetalert2';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-rpt-list-course',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './rpt-list-course.component.html',
  styleUrl: './rpt-list-course.component.css'
})
export class RptListCourseComponent {
  @ViewChild('myModal') myModal!: ElementRef;
  selectedStudent?: number | null = null;

  options: any[] = [
    { value: 'P', label: 'Presencial' },
    { value: 'V', label: 'Virtual' },
    // Agrega más opciones según tus necesidades
  ];

  data: Courses[] = [
    // { id: 1, name: 'curso 3', schedule: 'xxx', date_ini: new Date("2024-04-10"), date_end: new Date("2024-04-19"), type: 'P' },
    // { id: 2, name: 'curso 2', schedule: 'xxx', date_ini: new Date("2024-04-10"), date_end: new Date("2024-04-19"), type: 'V' },
    // { id: 3, name: 'curso 1', schedule: 'xxx', date_ini: new Date("2024-04-10"), date_end: new Date("2024-04-19"), type: 'V' }
  ];

  courseEdit!: Courses;

  constructor(private apiService: CoursesService,
    private apiStudentService: StudentsService) {

    this.selectedStudent = null;
  }

  getReportCourses() {
    this.apiService.getReportCourses(this.selectedStudent).subscribe((data) => {
      this.data = data;
    })
  }

  getAllStudents() {
    this.apiStudentService.getAllStudents().subscribe((data) => {
      const options = data.map((item) => {
        return { value: item.id, label: item.name + ' ' + item.last_name };
      });
      this.options = [
        { value: null, label: 'Seleccionar estudiante' },
        ...options
      ];
    })
  }

  ngOnInit() {
    this.getAllStudents();
  }
}
