import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Courses } from '../../../interfaces/courses';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators  } from '@angular/forms';
import { CoursesService } from '../../../services/courses.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-course',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form-course.component.html',
  styleUrl: './form-course.component.css'
})
export class FormCourseComponent {
  courses: Courses;
  selectedOption: string ;
  @Input() courseEdit!: Courses;
  formCourses: FormGroup;
  @Output() listEvent = new EventEmitter<string>();

  options: any[] = [
    { value: 'P', label: 'Presencial' },
    { value: 'V', label: 'Virtual' },
    // Agrega más opciones según tus necesidades
  ];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['courseEdit']) {
      this.loadItem(changes['courseEdit'].currentValue);
    }
  }

  constructor(private apiService: CoursesService, private formBuilder: FormBuilder) {
    this.formCourses = this.formBuilder.group({
      name: ['', Validators.required],
      schedule: [''],
      date_ini: [null, [Validators.required]],
      date_end: [null],
      type: ['', Validators.required],
    });

    this.courses = {
      id: null,
      name: "",
      schedule: "",
      date_ini: null,
      date_end: null,
      type: ""
    };
    this.selectedOption = "";
  }

  loadItem(item: Courses) {
    if (item && item !== undefined)
      this.courses = item;
  }

  saveItem() {
    if (this.formCourses.valid) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          const save = this.courses.id ? this.apiService.updateCourses(this.courses) : this.apiService.setCourses(this.courses);

          save.subscribe((data) => {
            if (data.status) {
              Swal.fire({
                icon: 'success',
                title: '¡Proceso Exitoso!',
                text: `Los datos se han ${this.courses.id ? 'editado' : 'guardado'} correctamente.`,
              });
              this.listEvent.emit();
            } else {
              Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: `Hubo un problema al ${this.courses.id ? 'editar' : 'guardar'} los datos.`,
              });
            }
          })
        }
      });
    }
  }
}
