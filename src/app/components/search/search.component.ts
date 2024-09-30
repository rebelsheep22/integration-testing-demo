import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Output() searchChange = new EventEmitter<string>();
  searchControl: FormControl;

  constructor() {
    this.searchControl = new FormControl('');

    // Emit the value after a delay (debounce)
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.searchChange.emit(value);
    });
  }
}
