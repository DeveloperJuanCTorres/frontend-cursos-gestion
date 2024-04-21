import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Student } from '../../../interfaces/student';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentsService } from '../../../services/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-student',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form-student.component.html',
  styleUrl: './form-student.component.css'
})
export class FormStudentComponent {
  student: Student;
  @Input() studentEdit!: Student;
  formStudent: FormGroup;
  @Output() listEvent = new EventEmitter<string>();
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['studentEdit']) {
      this.loadItem(changes['studentEdit'].currentValue);
    }
  }

  constructor(private apiService: StudentsService, private formBuilder: FormBuilder) {
    this.formStudent = this.formBuilder.group({
      name: ['', Validators.required],
      last_name: [''],
      age: [null, [Validators.required, Validators.min(18)]],
      email: [''],
      card: ['', Validators.required],
    });

    this.student = {
      id: null,
      name: "",
      last_name: "",
      age: 18,
      card: "",
      email: ""
    };
  }

  loadItem(item: Student) {
    if (item && item !== undefined)
      this.student = item;
  }

  saveItem() {
    if (this.formStudent.valid) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          const save = this.student.id ? this.apiService.updateStudent(this.student) : this.apiService.setStudent(this.student);
        
          save.subscribe((data: any) => {
            if (data.status) {
              Swal.fire({
                icon: 'success',
                title: '¡Proceso Exitoso!',
                text: `Los datos se han ${this.student.id ? 'editado' : 'guardado'} correctamente.`,
              });
              this.listEvent.emit();
            } else {
              Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: `Hubo un problema al ${this.student.id ? 'editar' : 'guardar'} los datos.`,
              });
            }
          })
        }
      });
    }
  }
}
