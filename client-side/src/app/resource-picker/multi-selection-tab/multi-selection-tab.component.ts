import { Component, OnInit, ViewChild, ViewContainerRef, ViewRef } from '@angular/core';
import { PepChipsComponent } from '@pepperi-addons/ngx-lib/chips';
import { PepAddonBlockLoaderService } from '@pepperi-addons/ngx-lib/remote-loader';
import { ResourcePickerService } from 'src/app/services/resource-picker.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { PepSelectOption } from 'src/metadata';

@Component({
  selector: 'multi-selection-tab',
  templateUrl: './multi-selection-tab.component.html',
  styleUrls: ['./multi-selection-tab.component.scss']
})
export class MultiSelectionTabComponent implements OnInit {
  @ViewChild('chipsComp') chipsComp: PepChipsComponent;
  selectedView: any
  chips: any[] = []
  viewsDropDown: PepSelectOption<any>[]
  isViewSelected: boolean = false
  selectedObjectKey: string
  @ViewChild('resourcePickerContainer', { static: false, read: ViewContainerRef }) resourcePickerContainer: ViewContainerRef;

  constructor(
    private resourcePickerService: ResourcePickerService,
    private addonBlockService: PepAddonBlockLoaderService,
    private viewContainerRef: ViewContainerRef,
    private utilitiesService: UtilitiesService) { }

  ngOnInit(): void {
    this.init()
  }
  async init(){
    await this.createViewsDropDown()
    if(this.selectedView){
      this.loadResourcePicker()
    }
  }
  async createViewsDropDown(){
    const views = await this.resourcePickerService.getViews()
    this.viewsDropDown = this.utilitiesService.convertArrayToDropDown(views, 'Name')
    this.selectedView = this.viewsDropDown?.length > 0 ? this.viewsDropDown[0].key : undefined
  }
  onViewChanged(event){
    this.selectedView = event
    this.loadResourcePicker()
    this.chips = []
  }
  loadResourcePicker(){
    const hostObj = this.getResourcePickerHostObj()
    this.resourcePickerContainer.clear()
    this.addonBlockService.loadAddonBlockInContainer({
      container: this.resourcePickerContainer,
      name: 'ResourcePicker',
      hostObject: hostObj,
      hostEventsCallback: (event) => { this.onEvent(event); }
    })
  }
  getResourcePickerHostObj(){
    const selectedObjectKeys = this.chips?.map(chip => chip.value) || []
    return {
      resource: this.selectedView?.Resource?.Name,
      view: this.selectedView?.Key,
      selectionMode: 'multi',
      selectedObjectKeys: selectedObjectKeys
    }
  }
  onEvent(event){
    if(event.action == 'on-save'){
      this.chips = event.data?.selectedObjectKeys?.map(selectedObjectKey => {
        return {
          value: selectedObjectKey
        }
      }) || []
    }
    if(event.action == 'on-cancel'){
      this.chips = []
    }
  }
}
