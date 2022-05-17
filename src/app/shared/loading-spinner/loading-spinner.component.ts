import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="loadingio-spinner-blocks-er6ro3ebic">
      <div class="ldio-qxwykj0yi7p">
        <div style="left:57px;top:57px;animation-delay:0s"></div>
        <div style="left:120px;top:57px;animation-delay:0.125s"></div>
        <div style="left:183px;top:57px;animation-delay:0.25s"></div>
        <div style="left:57px;top:120px;animation-delay:0.875s"></div>
        <div style="left:183px;top:120px;animation-delay:0.375s"></div>
        <div style="left:57px;top:183px;animation-delay:0.75s"></div>
        <div style="left:120px;top:183px;animation-delay:0.625s"></div>
        <div style="left:183px;top:183px;animation-delay:0.5s"></div>
      </div>
    </div>
  `,
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinner {}
