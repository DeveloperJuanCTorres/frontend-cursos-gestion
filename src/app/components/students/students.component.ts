import { Component, ElementRef, ViewChild } from '@angular/core';
import { Student } from '../../interfaces/student';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormStudentComponent } from './form-student/form-student.component';
import { StudentsService } from '../../services/students.service';
import Swal from 'sweetalert2';
import { CoursesAssignComponent } from './courses-assign/courses-assign.component';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    CommonModule,
    FormStudentComponent,
    CoursesAssignComponent,
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {
  @ViewChild('myModal') myModal!: ElementRef;

  data: Student[] = [
    // { id: 1, name: 'Juan', last_name: 'Pérez', age: 23, card: '1234', email: 'juan@gmail.com' },
    // { id: 2, name: 'María', last_name: 'González', age: 26, card: '1234', email: 'maria@gmail.com' },
    // { id: 3, name: 'Juan', last_name: 'López', age: 28, card: '1234', email: 'carlos@gmail.com' }
  ];

  studentEdit!: Student;

  constructor(private apiService: StudentsService) { }

  newItem() {
    this.studentEdit = {
      id: null,
      name: "",
      last_name: "",
      age: 18,
      card: "",
      email: ""
    };
  }

  editItem(item: Student) {
    this.studentEdit = item;
  }

  deleteItem(item: Student) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteStudent(item.id).subscribe((data) => {
          if (data.status) {
            Swal.fire({
              icon: 'success',
              title: '¡Proceso Exitoso!',
              text: `Los datos se ha eliminado correctamente.`,
            });
            this.getAllStudents();
          } else {
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: `Hubo un problema al eliminar el registro.`,
            });
          }
        })
      }
    });
  }

  getAllStudents() {
    this.apiService.getAllStudents().subscribe((data) => {
      this.data = data;
    })
  }

  assignItem(item: Student) {
    this.studentEdit = item;
  }

  ngOnInit() {
    this.getAllStudents();
  }

}
