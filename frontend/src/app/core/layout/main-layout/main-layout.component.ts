import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@core/layout/header/header.component';
import { ZardToastComponent } from '@shared/components/toast/toast.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, HeaderComponent, ZardToastComponent],
  templateUrl: './main-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {}
