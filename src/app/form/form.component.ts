import { Component, OnInit, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface FormState {
  name: string;
  email: string;
  age: number;
  subscribe: boolean;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private history: FormState[] = [];
  private future: FormState[] = [];
  private isUndoRedoAction = false;

  myForm!: FormGroup;

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: [''],
      email: [''],
      age: [''],
      subscribe: [false],
    });

    this.history.push(this.myForm.value);

    this.myForm.valueChanges.subscribe(() => {
      if (!this.isUndoRedoAction) {
        this.history.push(this.myForm.value);
        if (this.future.length) {
          this.future = [];
        }
      }
      this.isUndoRedoAction = false;
    });
  }

  undo() {
    if (this.canUndo()) {
      const currentState = this.history.pop();
      if (currentState) {
        this.future.push(currentState);
      }
      const previousState = this.history[this.history.length - 1];
      this.isUndoRedoAction = true;
      this.myForm.setValue(previousState);
    }
  }

  redo() {
    if (this.canRedo()) {
      const nextState = this.future.pop();
      if (nextState) {
        this.isUndoRedoAction = true;
        this.history.push(nextState);
        this.myForm.setValue(nextState);
      }
    }
  }

  canUndo(): boolean {
    return this.history.length > 1;
  }

  canRedo(): boolean {
    return this.future.length > 0;
  }
}
