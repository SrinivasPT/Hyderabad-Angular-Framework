import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { EditorModule } from '@progress/kendo-angular-editor';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { MenuModule } from '@progress/kendo-angular-menu';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { RippleModule } from '@progress/kendo-angular-ripple';

@NgModule({
  declarations: [],
  imports: [
    // CommonModule,
    ButtonsModule,
    DialogsModule,
    DropDownsModule,
    ExcelExportModule,
    EditorModule,
    GridModule,
    InputsModule,
    LabelModule,
    MenuModule,
    NotificationModule,
    RippleModule,
    DateInputsModule,
    LayoutModule
  ],
  exports: [
    // CommonModule,
    ButtonsModule,
    DialogsModule,
    DropDownsModule,
    ExcelExportModule,
    EditorModule,
    GridModule,
    InputsModule,
    LabelModule,
    MenuModule,
    NotificationModule,
    RippleModule,
    DateInputsModule,
    LayoutModule
  ]
})
export class KendoControlsModule {}
