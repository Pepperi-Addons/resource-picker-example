import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourcePickerComponent } from './resource-picker.component';
import { PepPageLayoutModule } from '@pepperi-addons/ngx-lib/page-layout';
import { PepSizeDetectorModule } from '@pepperi-addons/ngx-lib/size-detector';
import { TranslateModule } from '@ngx-translate/core';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SingleSelectionTabComponent } from './single-selection-tab/single-selection-tab.component';
import { PepSelectModule } from '@pepperi-addons/ngx-lib/select';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';
import { PepTextboxModule } from '@pepperi-addons/ngx-lib/textbox';
import { MultiSelectionTabComponent } from './multi-selection-tab/multi-selection-tab.component';
import { PepChipsModule } from '@pepperi-addons/ngx-lib/chips';


@NgModule({
  declarations: [
    ResourcePickerComponent,
    SingleSelectionTabComponent,
    MultiSelectionTabComponent,
  ],
  imports: [
    CommonModule,
    PepPageLayoutModule,
    PepSizeDetectorModule,
    TranslateModule,
    MatTabsModule,
    BrowserAnimationsModule,
    PepSelectModule,
    TranslateModule,
    PepButtonModule,
    PepTextboxModule,
    PepChipsModule
  ]
})
export class ResourcePickerModule { }
