import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'block-resource-picker',
  templateUrl: './resource-picker.component.html',
  styleUrls: ['./resource-picker.component.scss']
})
export class ResourcePickerComponent implements OnInit {
  currentTabIndex: number = 0
  constructor() { }

  ngOnInit(): void {
  }
  onTabChanged($event){
    // console.log(`${JSON.stringify($event)}`);
    debugger
    this.currentTabIndex = $event.index
  }

}
