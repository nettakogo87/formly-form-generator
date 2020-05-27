import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-library',
  templateUrl: './form-library.component.html',
  styleUrls: ['./form-library.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormLibraryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
