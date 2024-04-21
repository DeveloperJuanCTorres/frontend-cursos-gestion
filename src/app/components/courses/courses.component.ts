import { Component , ElementRef, ViewChild } from '@angular/core';
import { Courses } from '../../interfaces/courses';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormCourseComponent } from './form-course/form-course.component';
import { CoursesService } from '../../services/courses.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    FormCourseComponent
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  @ViewChild('myModal') myModal!: ElementRef;

  data: Courses[] = [
    // { id: 1, name: 'curso 3', schedule: 'xxx', date_ini: new Date("2024-04-10"), date_end: new Date("2024-04-19"), type: 'P' },
    // { id: 2, name: 'curso 2', schedule: 'xxx', date_ini: new Date("2024-04-10"), date_end: new Date("2024-04-19"), type: 'V' },
    // { id: 3, name: 'curso 1', schedule: 'xxx', date_ini: new Date("2024-04-10"), date_end: new Date("2024-04-19"), type: 'V' }
  ];

  courseEdit!: Courses;

  constructor(private apiService: CoursesService) { }

  newItem() {
    this.courseEdit = {
      id: null,
      name: "",
      schedule: "",
      date_ini: null,
      date_end: null,
      type: ""
    };
    
  }

  editItem(item: Courses) {
    this.courseEdit = item;
  }

  deleteItem(item: Courses) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteCourses(item.id).subscribe((data) => {
          if (data.status) {
            Swal.fire({
              icon: 'success',
              title: '¡Proceso Exitoso!',
              text: `Los datos se ha eliminado correctamente.`,
            });
            this.getAllCourses();
          } else {
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: `Hubo un problema al eliminar el registro.`,
            });
          }
        });
      }
    });
  }

  getAllCourses() {
    console.log('get all courses');
    this.apiService.getAllCourses().subscribe((data) => {
      this.data = data;
    })
  }

  ngOnInit() {
    this.getAllCourses();
  }

}






