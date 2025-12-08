import { Component, input, output, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZardInputDirective } from '@shared/components/input/input.directive';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { CheckoutFormData } from '../../models/checkout-form-data.interface';

@Component({
  selector: 'app-customer-form',
  imports: [CommonModule, ReactiveFormsModule, ZardInputDirective, ZardButtonComponent],
  templateUrl: './customer-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  initialData = input<Partial<CheckoutFormData>>({});
  disabledFields = input<string[]>([]);

  cancel = output<void>();
  submitForm = output<CheckoutFormData>();

  form!: FormGroup;

  ngOnInit(): void {
    const data = this.initialData();
    const disabled = this.disabledFields();

    this.form = this.fb.group({
      fullName: [
        { value: data.fullName || '', disabled: disabled.includes('fullName') },
        [Validators.required, Validators.minLength(3)],
      ],
      email: [
        { value: data.email || '', disabled: disabled.includes('email') },
        [Validators.required, Validators.email],
      ],
      cellPhone: [
        { value: data.cellPhone || '', disabled: disabled.includes('cellPhone') },
        [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)],
      ],
      document: [
        { value: data.document || '', disabled: disabled.includes('document') },
        [Validators.required, Validators.minLength(5)],
      ],
      documentType: [
        { value: data.documentType || '', disabled: disabled.includes('documentType') },
        [Validators.required],
      ],
    });
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onContinue(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitForm.emit(this.form.getRawValue() as CheckoutFormData);
  }
}
