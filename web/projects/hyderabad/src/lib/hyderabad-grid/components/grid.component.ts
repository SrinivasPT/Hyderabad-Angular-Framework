import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { DialogService } from '@progress/kendo-angular-dialog';
import { ColumnComponent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { NGXLogger } from 'hyderabad-logger';
import * as R from 'ramda';
import { GridSetting } from '../../iris-schema';

@Component({
  selector: 'hyd-grid',
  templateUrl: './grid.component.html'
})
export class GridComponent implements AfterViewInit {
  @Input() public gridSettings: GridSetting;
  @ViewChild('grid') public gridRef;

  constructor(private dialogService: DialogService, protected logger: NGXLogger) {}

  ngAfterViewInit() {
    this.gridRef.columns.reset(this.getColumns());
  }

  getColumns() {
    // designerColumns are the custom columns defined by the developer while using the grid
    const designerColumns: any[] = this.gridRef.columns.toArray();
    const designerColumnFieldNames: any[] = R.pluck('field', designerColumns);
    const dynamicColumns = this.getDynamicColumnsExcludingDesignerColumns(designerColumnFieldNames);
    return R.concat(designerColumns, dynamicColumns);
  }

  getDynamicColumnsExcludingDesignerColumns(excludeColumnList: any[] = []) {
    const dynamicColumns: any[] = [];
    if (R.isEmpty(this.gridSettings.gridView.data[0])) {
      return [];
    }

    R.difference(R.keys(this.gridSettings.gridView.data[0]), excludeColumnList).forEach(field => {
      const columnComponent: ColumnComponent = new ColumnComponent();
      columnComponent.field = field.toString();
      columnComponent.title = this.getLabel(field.toString());
      dynamicColumns.push(columnComponent);
    });

    return dynamicColumns;
  }

  pageChange(event: PageChangeEvent) {
    this.gridSettings.skip = event.skip;
    this.gridSettings.gridView = {
      data: R.clone(this.gridSettings.gridData).slice(this.gridSettings.skip, this.gridSettings.skip + this.gridSettings.pageSize),
      total: this.gridSettings.gridView.total
    };
  }

  getLabel = (label: string) => (label.charAt(0).toUpperCase() + label.slice(1)).split(/(?=[A-Z])/).join(' ');

  onRowEdit(data) {
    const dialogRef = this.dialogService.open({
      title: 'Confirmation?',
      content: this.gridSettings.content,
      actions: [{ text: 'Yes', primary: true }, { text: 'No' }]
    });

    const dialogComponentInstance = dialogRef.content.instance;
    dialogComponentInstance.formData = data;
    this.logger.debug('Data passed from Grid to the component', data);
  }
}
