import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourcePickerComponent } from '../resource-picker/resource-picker.component';
// import { SettingsComponent } from './settings.component';

const routes: Routes = [
    {
        path: ':settingsSectionName/:addonUUID/:slugName',
        // component: SettingsComponent,
        children: [
            {
                path: '',
                component: ResourcePickerComponent
            },
            // {
            //     path: ':form_key',
            //     loadChildren: () => import('./editor-form/editor-form.module').then(m => m.EditorFormModule)
            // },
            // {
            //     path: '**',
            //     loadChildren: () => import('./editor-list/editor-list.module').then(m => m.EditorListModule),
            // }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }



