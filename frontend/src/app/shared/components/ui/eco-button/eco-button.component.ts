import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { mergeClasses } from '@shared/utils/merge-classes';

@Component({
  selector: 'app-eco-button',
  standalone: true,
  imports: [ZardButtonComponent],
  template: `
    <button z-button [class]="computedClass()">
      <ng-content></ng-content>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcoButtonComponent {
  readonly class = input<string>('');

  protected computedClass() {
    return mergeClasses(
      'group flex items-center gap-2 bg-amber-100 text-emerald-950 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white transition-all transform hover:scale-105 shadow-xl shadow-emerald-900/20 h-auto cursor-pointer',
      this.class()
    );
  }
}
