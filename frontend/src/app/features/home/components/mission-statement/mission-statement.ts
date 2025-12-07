import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-mission-statement',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './mission-statement.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissionStatementComponent {}
