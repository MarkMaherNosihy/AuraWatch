import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectOption } from '../../../models/form_models/select-option.interface';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input() options: SelectOption[] = [];
  @Output() selectedFilter = new EventEmitter<string>();

  onSelect(ev:any){
    const selectElement = ev.target as HTMLSelectElement;
    this.selectedFilter.emit(selectElement.value);
  }
}
