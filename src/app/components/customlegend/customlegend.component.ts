import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-customlegend',
  templateUrl: './customlegend.component.html',
  styleUrls: ['./customlegend.component.scss']
})

/**
 * Custom legend component renders the custom legends
 * and also provides the clear functionality for each legend
 */

export class CustomlegendComponent {

  /** input legend data for the custom legend */
  @Input() legendData: String[] = null;

  /** legend colors for the radio buttons */
  @Input() clearText : String =  '';

  /**Legend click call back used to invoke the call back function on click legend */
  @Output() legendClickCallBack = new EventEmitter<string>();

  /** Clear click call back used to invoke the callback function on click of clear  */
  @Output() clearClickCallBack = new EventEmitter();

  /** Place holder for the selected legend label */
  selectedLegLabel = '';


  constructor() { }

  /**
     * Invoke the legend call back function and provide the selected legend label
     * @param selectedLabel selected legend label
  **/
  legendClick(selectedLabel) {
    this.selectedLegLabel = selectedLabel;
    this.legendClickCallBack.emit(selectedLabel);
  }

  /**
    * invoke the clear call back function and reset the seleected legend label
  **/
  clearClick() {
    this.clearClickCallBack.emit();
    this.selectedLegLabel = '';
  }


}
