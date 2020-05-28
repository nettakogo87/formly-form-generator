import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { SplitAreaDirective, SplitComponent } from 'angular-split';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneratorComponent implements OnInit {

  @ViewChild('split', {static: false}) split: SplitComponent;
  @ViewChild('area1', {static: false}) area1: SplitAreaDirective;
  @ViewChild('area2', {static: false}) area2: SplitAreaDirective;

  public direction = 'horizontal';

  constructor() { }

  public ngOnInit(): void {}
}
