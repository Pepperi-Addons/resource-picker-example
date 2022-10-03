import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ResourcePickerService } from 'src/app/services/resource-picker.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { PepSelectOption } from 'src/metadata';
import { PepAddonBlockLoaderService } from '@pepperi-addons/ngx-lib/remote-loader';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'single-selection-tab',
  templateUrl: './single-selection-tab.component.html',
  styleUrls: ['./single-selection-tab.component.scss']
})
export class SingleSelectionTabComponent implements OnInit {
  selectedResource: any
  resourcesDropDown: PepSelectOption<any>[]
  isResourceSelected: boolean = false
  resourcePickerCompRef: MatDialogRef<any,any>
  selectedObjectKey: string
  

  constructor(
    private resourcePickerService: ResourcePickerService,
    private utilitiesService: UtilitiesService,
    private addonBlockService: PepAddonBlockLoaderService,
    private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    this.init()
  }

  async init(){
    await this.createResourcesDropDown()
    this.isResourceSelected = true
    // this.loadResourcePicker()
  }
  async createResourcesDropDown(){
    const resources = await this.resourcePickerService.getResources() || []
    this.resourcesDropDown = this.utilitiesService.convertArrayToDropDown(resources, 'Name')
    this.selectedResource = this.resourcesDropDown.length > 0 ? this.resourcesDropDown[0].key : undefined
  }

  onResourceChanged(event){
    this.selectedResource = event
  }

  loadResourcePicker(){
    const hostObj = this.getResourcePickerHostObj()
    this.resourcePickerCompRef = this.addonBlockService.loadAddonBlockInDialog({
      container: this.viewContainerRef,
      name: 'ResourceSelection',
      hostObject: hostObj,
      hostEventsCallback: (event) => { this.onEvent(event); }
    })
  }
  getResourcePickerHostObj(){
    return {
      resource: this.selectedResource.Name,
      selectionMode: 'single',
    }
  }
  onEvent(event){
    if(event.action == 'on-save'){
      this.selectedObjectKey = event.data?.selectedObjectKeys?.length > 0 ? event.data.selectedObjectKeys[0] : undefined
      this.resourcePickerCompRef.close()
    }
    if(event.action == 'on-cancel'){
      this.resourcePickerCompRef.close()
    }
  }
  onButtonClicked(){
    this.loadResourcePicker()
  }

}
