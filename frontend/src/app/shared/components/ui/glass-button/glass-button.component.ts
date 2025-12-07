import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { mergeClasses } from '@shared/utils/merge-classes';

@Component({
  selector: 'app-glass-button',
  standalone: true,
  imports: [ZardButtonComponent],
  template: `
    <button z-button [class]="computedClass()">
      <ng-content></ng-content>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlassButtonComponent {
  readonly class = input<string>('');

  protected computedClass() {
    return mergeClasses(
      'p-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors pointer-events-auto cursor-pointer text-white flex items-center justify-center h-auto w-auto',
      this.class()
    );
  }
}
