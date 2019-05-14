import { AfterViewInit, Component, ContentChildren, Input, ViewChild } from '@angular/core';
import { ColumnComponent, PageChangeEvent } from '@progress/kendo-angular-grid';
import * as R from 'ramda';
import { GridSetting } from '../../iris-schema';

@Component({
  selector: 'hyd-grid',
  templateUrl: './grid.component.html'
})
export class GridComponent implements AfterViewInit {
  @Input() public gridSettings: GridSetting;
  @ViewChild('grid') public gridRef;
  @ContentChildren(ColumnComponent) gridColumns;

  constructor() {}

  ngAfterViewInit() {
    this.gridRef.columns.reset(this.getColumns());
  }

  getColumns() {
    // Columns from the custom columns defined by the developer while using the grid
    const designerColumns: any[] = this.gridColumns.toArray();
    const designerColumnFields: any[] = R.pluck('field', designerColumns);

    // Get the rest of the columns
    const dynamicColumns = this.getDynamicColumns(designerColumnFields);
    return R.concat(designerColumns, dynamicColumns);
  }

  getDynamicColumns(excludeColumnList: any[] = []) {
    const dynamicColumns: any[] = [];
    if (R.isEmpty(this.gridSettings.gridView.data[0])) {
      return [];
    }

    R.keys(this.gridSettings.gridView.data[0]).forEach(field => {
      if (!R.contains(field, excludeColumnList)) {
        const columnComponent: ColumnComponent = new ColumnComponent();
        columnComponent.field = field.toString();
        columnComponent.title = this.getLabel(field.toString());
        dynamicColumns.push(columnComponent);
      }
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
}
