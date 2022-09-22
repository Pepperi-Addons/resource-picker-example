import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourcePickerComponent } from './resource-picker.component';
import { PepPageLayoutModule } from '@pepperi-addons/ngx-lib/page-layout';
import { PepSizeDetectorModule } from '@pepperi-addons/ngx-lib/size-detector';
import { TranslateModule } from '@ngx-translate/core';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    ResourcePickerComponent,
  ],
  imports: [
    CommonModule,
    PepPageLayoutModule,
    PepSizeDetectorModule,
    TranslateModule,
    MatTabsModule,
    BrowserAnimationsModule,
    
  ]
})
export class ResourcePickerModule { }
