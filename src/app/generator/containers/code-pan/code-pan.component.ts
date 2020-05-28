import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-pan',
  templateUrl: './code-pan.component.html',
  styleUrls: ['./code-pan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodePanComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
