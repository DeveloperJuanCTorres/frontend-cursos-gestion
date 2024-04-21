import { Component, Input, SimpleChanges } from '@angular/core';
import { Courses } from '../../../interfaces/courses';
import { CommonModule } from '@angular/common';
import { Student } from '../../../interfaces/student';
import { StudentsService } from '../../../services/students.service';
import Swal from 'sweetalert2';
import { CoursesService } from '../../../services/courses.service';

@Component({
  selector: 'app-courses-assign',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './courses-assign.component.html',
  styleUrl: './courses-assign.component.css'
})
export class CoursesAssignComponent {
  @Input() studentEdit!: Student;
  
  data: Courses[] = [];
  dataAssigned: Courses[] = [];

  constructor(private apiService: StudentsService, private apiCoursesService: CoursesService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['studentEdit']) {
      this.apiService.getAllCoursesStudent(changes['studentEdit'].currentValue?.id).subscribe((data: any[]) => {
        this.dataAssigned = data;
        this.data = this.data.map(item => {
          const assignedItem = this.dataAssigned.find((assignItem: any) => assignItem.course_id === item.id);
          return { ...item, isAssigned: assignedItem ? true : false };
        });
      })
    }
  }

  assignCourse(i: number, item: Courses) {
    Swal.fire({
      title: '¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const assignedItem = this.dataAssigned.find((assignItem: any) => assignItem.course_id === item.id);
        const itemAssign = { 
          id: assignedItem?.id,
          course_id: item.id,
          student_id: this.studentEdit.id
        };
        const assign = !item.isAssigned ? this.apiService.assignCourse(itemAssign) : this.apiService.removeCourse(assignedItem?.id);
        assign.subscribe((data) => {
          if (data.status) {
            Swal.fire({
              icon: 'success',
              title: '¡Proceso Exitoso!',
              text: `Curso ${itemAssign.id ? 'asignado' : 'eliminado'} correctamente.`,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: `Hubo un problema al ${itemAssign.id ? 'asignar' : 'eliminar'} el curso asignado.`,
            });
          }
          this.data[i].isAssigned = !this.data[i].isAssigned;
        });
      }
    });
  }

  getAllCourses() {
    this.apiCoursesService.getAllCourses().subscribe((data) => {
      this.data = data;
    })
  }

  ngOnInit() {
    this.getAllCourses();
  }
}
