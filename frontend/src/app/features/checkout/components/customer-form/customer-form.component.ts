import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZardInputDirective } from '@shared/components/input/input.directive';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { CheckoutFormData } from '../../models/checkout-form-data.interface';
import { CheckoutService } from '../../services/checkout.service';

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
  countries = signal<any[]>([]);
  currencies = signal<any[]>([]);

  private readonly checkoutService = inject(CheckoutService);

  ngOnInit(): void {
    const data = this.initialData();
    const disabled = this.disabledFields();

    this.checkoutService.getCountries().subscribe((response) => {
      this.countries.set(response || []);
    });

    this.form = this.fb.group({
      country: [
        { value: data.country || '', disabled: disabled.includes('country') },
        [Validators.required],
      ],
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
      currency: [
        { value: data.currency || '', disabled: disabled.includes('currency') },
        [Validators.required],
      ],
    });

    if (data.country) {
      this.checkoutService.getCurrencies(data.country).subscribe((response) => {
        this.currencies.set(response || []);
      });
    }

    this.form.get('country')?.valueChanges.subscribe((countryCode) => {
      if (countryCode) {
        const currentCurrency = this.form.get('currency')?.value;

        if (currentCurrency && data.country !== countryCode) {
          this.form.get('currency')?.setValue('');
        }

        this.checkoutService.getCurrencies(countryCode).subscribe((response) => {
          this.currencies.set(response || []);
        });
      } else {
        this.currencies.set([]);
        this.form.get('currency')?.setValue('');
      }
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
